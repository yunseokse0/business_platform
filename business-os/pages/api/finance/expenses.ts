import type { NextApiRequest, NextApiResponse } from "next";
import { createApiHandler } from "@/lib/http";
import { ipRateLimiter } from "@/lib/rateLimit";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { recordAudit } from "@/lib/audit";

const createSchema = z.object({
	title: z.string().min(1),
	amount: z.number().nonnegative(),
	category: z.string().optional(),
	description: z.string().optional(),
	status: z.string().default("Pending"),
	submitterId: z.string().optional(),
});

const updateSchema = z.object({
	title: z.string().min(1).optional(),
	amount: z.number().nonnegative().optional(),
	category: z.string().optional(),
	description: z.string().optional(),
	status: z.string().optional(),
	approverId: z.string().optional(),
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
			const { id, status, category } = req.query as { id?: string; status?: string; category?: string };
			if (id) {
				const one = await prisma.expense.findUnique({ where: { id } });
				if (!one) return res.status(404).json({ error: "Not Found" });
				return res.status(200).json(one);
			}
			const where: any = {};
			if (status) where.status = status;
			if (category) where.category = category;
			const data = await prisma.expense.findMany({ where, orderBy: { createdAt: "desc" } });
			res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
			return res.status(200).json(data);
		},
		POST: async (req: NextApiRequest, res: NextApiResponse) => {
			const body = createSchema.parse(req.body);
			const created = await prisma.expense.create({ data: body });
			await recordAudit({ action: "create", entity: "expense", entityId: created.id });
			return res.status(201).json(created);
		},
		PUT: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = (req.query.id as string) || (req.body as any)?.id;
			if (!id) return res.status(400).json({ error: "id is required" });
			const body = updateSchema.parse(req.body);
			const data: any = { ...body };
			if (body.status === "Approved") {
				data.approvedAt = new Date();
			}
			const updated = await prisma.expense.update({ where: { id }, data });
			await recordAudit({ action: "update", entity: "expense", entityId: id });
			return res.status(200).json(updated);
		},
		DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = req.query.id as string;
			if (!id) return res.status(400).json({ error: "id is required" });
			await prisma.expense.delete({ where: { id } });
			await recordAudit({ action: "delete", entity: "expense", entityId: id });
			return res.status(204).end();
		},
	},
});

