import type { NextApiRequest, NextApiResponse } from "next";
import { createApiHandler } from "@/lib/http";
import { ipRateLimiter } from "@/lib/rateLimit";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { recordAudit } from "@/lib/audit";

const createSchema = z.object({
	title: z.string().min(1),
	description: z.string().optional(),
	priority: z.string().default("Medium"),
	status: z.string().default("Backlog"),
	assigneeId: z.string().optional(),
});

const updateSchema = z.object({
	title: z.string().min(1).optional(),
	description: z.string().optional(),
	priority: z.string().optional(),
	status: z.string().optional(),
	assigneeId: z.string().optional(),
});

export default createApiHandler({
	requiredRoles: {
		GET: ["viewer"],
		POST: ["editor"],
		PUT: ["editor"],
		DELETE: ["manager"],
	},
	rateLimit: ipRateLimiter({ capacity: 40, refillPerSec: 20 }),
	validate: {
		POST: (body) => void createSchema.parse(body),
		PUT: (body) => void updateSchema.parse(body),
	},
	handlers: {
		GET: async (req: NextApiRequest, res: NextApiResponse) => {
			const { id, status, priority } = req.query as { id?: string; status?: string; priority?: string };
			if (id) {
				const one = await prisma.requirement.findUnique({ where: { id } });
				if (!one) return res.status(404).json({ error: "Not Found" });
				return res.status(200).json(one);
			}
			const where: any = {};
			if (status) where.status = status;
			if (priority) where.priority = priority;
			const data = await prisma.requirement.findMany({ where, orderBy: { createdAt: "desc" } });
			res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
			return res.status(200).json(data);
		},
		POST: async (req: NextApiRequest, res: NextApiResponse) => {
			const body = createSchema.parse(req.body);
			const created = await prisma.requirement.create({ data: body });
			await recordAudit({ action: "create", entity: "requirement", entityId: created.id });
			return res.status(201).json(created);
		},
		PUT: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = (req.query.id as string) || (req.body as any)?.id;
			if (!id) return res.status(400).json({ error: "id is required" });
			const data = updateSchema.parse(req.body);
			const updated = await prisma.requirement.update({ where: { id }, data });
			await recordAudit({ action: "update", entity: "requirement", entityId: id });
			return res.status(200).json(updated);
		},
		DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = req.query.id as string;
			if (!id) return res.status(400).json({ error: "id is required" });
			await prisma.requirement.delete({ where: { id } });
			await recordAudit({ action: "delete", entity: "requirement", entityId: id });
			return res.status(204).end();
		},
	},
});

