import type { NextApiRequest, NextApiResponse } from "next";
import { createApiHandler } from "@/lib/http";
import { ipRateLimiter } from "@/lib/rateLimit";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { recordAudit } from "@/lib/audit";

const createSchema = z.object({
	name: z.string().min(1),
	amount: z.number().nonnegative(),
	spent: z.number().nonnegative().default(0),
	category: z.string().optional(),
	period: z.string().optional(),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
});

const updateSchema = z.object({
	name: z.string().min(1).optional(),
	amount: z.number().nonnegative().optional(),
	spent: z.number().nonnegative().optional(),
	category: z.string().optional(),
	period: z.string().optional(),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
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
			const { id, category, period } = req.query as { id?: string; category?: string; period?: string };
			if (id) {
				const one = await prisma.budget.findUnique({ where: { id } });
				if (!one) return res.status(404).json({ error: "Not Found" });
				return res.status(200).json(one);
			}
			const where: any = {};
			if (category) where.category = category;
			if (period) where.period = period;
			const data = await prisma.budget.findMany({ where, orderBy: { createdAt: "desc" } });
			res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
			return res.status(200).json(data);
		},
		POST: async (req: NextApiRequest, res: NextApiResponse) => {
			const body = createSchema.parse(req.body);
			const created = await prisma.budget.create({
				data: {
					...body,
					startDate: body.startDate ? new Date(body.startDate) : null,
					endDate: body.endDate ? new Date(body.endDate) : null,
				},
			});
			await recordAudit({ action: "create", entity: "budget", entityId: created.id });
			return res.status(201).json(created);
		},
		PUT: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = (req.query.id as string) || (req.body as any)?.id;
			if (!id) return res.status(400).json({ error: "id is required" });
			const body = updateSchema.parse(req.body);
			const data: any = { ...body };
			if (body.startDate) data.startDate = new Date(body.startDate);
			if (body.endDate) data.endDate = new Date(body.endDate);
			const updated = await prisma.budget.update({ where: { id }, data });
			await recordAudit({ action: "update", entity: "budget", entityId: id });
			return res.status(200).json(updated);
		},
		DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = req.query.id as string;
			if (!id) return res.status(400).json({ error: "id is required" });
			await prisma.budget.delete({ where: { id } });
			await recordAudit({ action: "delete", entity: "budget", entityId: id });
			return res.status(204).end();
		},
	},
});

