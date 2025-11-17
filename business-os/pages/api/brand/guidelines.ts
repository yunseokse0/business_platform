import type { NextApiRequest, NextApiResponse } from "next";
import { createApiHandler } from "@/lib/http";
import { ipRateLimiter } from "@/lib/rateLimit";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { recordAudit } from "@/lib/audit";

const createSchema = z.object({
	title: z.string().min(1),
	content: z.string().min(1),
	category: z.string().optional(),
	tags: z.array(z.string()).optional(),
});

const updateSchema = z.object({
	title: z.string().min(1).optional(),
	content: z.string().optional(),
	category: z.string().optional(),
	tags: z.array(z.string()).optional(),
});

export default createApiHandler({
	requiredRoles: {
		GET: ["viewer"],
		POST: ["editor"],
		PUT: ["editor"],
		DELETE: ["editor"],
	},
	rateLimit: ipRateLimiter({ capacity: 40, refillPerSec: 20 }),
	validate: {
		POST: (body) => void createSchema.parse(body),
		PUT: (body) => void updateSchema.parse(body),
	},
	handlers: {
		GET: async (req: NextApiRequest, res: NextApiResponse) => {
			const { id, category, q } = req.query as { id?: string; category?: string; q?: string };
			if (id) {
				const one = await prisma.guideline.findUnique({ where: { id } });
				if (!one) return res.status(404).json({ error: "Not Found" });
				return res.status(200).json(one);
			}
			const where: any = {};
			if (category) where.category = category;
			if (q) where.title = { contains: q, mode: "insensitive" };
			const data = await prisma.guideline.findMany({ where, orderBy: { createdAt: "desc" } });
			res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
			return res.status(200).json(data);
		},
		POST: async (req: NextApiRequest, res: NextApiResponse) => {
			const body = createSchema.parse(req.body);
			const created = await prisma.guideline.create({
				data: { ...body, tags: body.tags || [] },
			});
			await recordAudit({ action: "create", entity: "guideline", entityId: created.id });
			return res.status(201).json(created);
		},
		PUT: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = (req.query.id as string) || (req.body as any)?.id;
			if (!id) return res.status(400).json({ error: "id is required" });
			const data = updateSchema.parse(req.body);
			const updated = await prisma.guideline.update({ where: { id }, data });
			await recordAudit({ action: "update", entity: "guideline", entityId: id });
			return res.status(200).json(updated);
		},
		DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = req.query.id as string;
			if (!id) return res.status(400).json({ error: "id is required" });
			await prisma.guideline.delete({ where: { id } });
			await recordAudit({ action: "delete", entity: "guideline", entityId: id });
			return res.status(204).end();
		},
	},
});

