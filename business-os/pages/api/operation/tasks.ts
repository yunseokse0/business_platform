import type { NextApiRequest, NextApiResponse } from "next";
import { createApiHandler } from "@/lib/http";
import { ipRateLimiter } from "@/lib/rateLimit";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { recordAudit } from "@/lib/audit";

const createSchema = z.object({
	title: z.string().min(1),
	description: z.string().optional(),
	status: z.string().default("Todo"),
	priority: z.string().optional(),
	assigneeId: z.string().optional(),
	dueDate: z.string().optional(),
});

const updateSchema = z.object({
	title: z.string().min(1).optional(),
	description: z.string().optional(),
	status: z.string().optional(),
	priority: z.string().optional(),
	assigneeId: z.string().optional(),
	dueDate: z.string().optional(),
});

export default createApiHandler({
	requiredRoles: {
		GET: ["viewer"],
		POST: ["manager"],
		PUT: ["manager"],
		DELETE: ["manager"],
	},
	rateLimit: ipRateLimiter({ capacity: 40, refillPerSec: 20 }),
	validate: {
		POST: (body) => void createSchema.parse(body),
		PUT: (body) => void updateSchema.parse(body),
	},
	handlers: {
		GET: async (req: NextApiRequest, res: NextApiResponse) => {
			const { id, status, q } = req.query as { id?: string; status?: string; q?: string };
			if (id) {
				const one = await prisma.task.findUnique({ where: { id } });
				if (!one) return res.status(404).json({ error: "Not Found" });
				return res.status(200).json(one);
			}
			const where: any = {};
			if (status) where.status = status;
			if (q) where.title = { contains: q, mode: "insensitive" };
			const data = await prisma.task.findMany({ where, orderBy: { createdAt: "desc" } });
			res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
			return res.status(200).json(data);
		},
		POST: async (req: NextApiRequest, res: NextApiResponse) => {
			const body = createSchema.parse(req.body);
			const created = await prisma.task.create({
				data: {
					...body,
					dueDate: body.dueDate ? new Date(body.dueDate) : null,
				},
			});
			await recordAudit({ action: "create", entity: "task", entityId: created.id });
			return res.status(201).json(created);
		},
		PUT: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = (req.query.id as string) || (req.body as any)?.id;
			if (!id) return res.status(400).json({ error: "id is required" });
			const body = updateSchema.parse(req.body);
			const updated = await prisma.task.update({
				where: { id },
				data: {
					...body,
					dueDate: body.dueDate ? new Date(body.dueDate) : null,
				},
			});
			await recordAudit({ action: "update", entity: "task", entityId: id });
			return res.status(200).json(updated);
		},
		DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = req.query.id as string;
			if (!id) return res.status(400).json({ error: "id is required" });
			await prisma.task.delete({ where: { id } });
			await recordAudit({ action: "delete", entity: "task", entityId: id });
			return res.status(204).end();
		},
	},
});

