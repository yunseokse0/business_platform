import type { NextApiRequest, NextApiResponse } from "next";
import { createApiHandler } from "@/lib/http";
import { ipRateLimiter } from "@/lib/rateLimit";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { recordAudit } from "@/lib/audit";

const createSchema = z.object({
	title: z.string().min(1),
	amount: z.number().nonnegative().default(0),
	stage: z.string().min(1), // New, Qualified, Proposal, Negotiation, Won, Lost
});

const updateSchema = z.object({
	title: z.string().min(1).optional(),
	amount: z.number().nonnegative().optional(),
	stage: z.string().min(1).optional(),
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
			const { id, stage, q, sort = "createdAt", order = "desc" } = req.query as {
				id?: string;
				stage?: string;
				q?: string;
				sort?: "createdAt" | "amount" | "title" | "stage";
				order?: "asc" | "desc";
			};
			if (id) {
				const one = await prisma.opportunity.findUnique({ where: { id } });
				if (!one) return res.status(404).json({ error: "Not Found" });
				res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
				return res.status(200).json(one);
			}
			const where: any = {};
			if (stage) where.stage = stage;
			if (q) where.title = { contains: q, mode: "insensitive" };
			const data = await prisma.opportunity.findMany({
				where,
				orderBy: { [sort]: order },
			});
			// cache hint
			res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
			return res.status(200).json(data);
		},
		POST: async (req: NextApiRequest, res: NextApiResponse) => {
			const { title, amount, stage } = createSchema.parse(req.body);
			const created = await prisma.opportunity.create({ data: { title, amount, stage } });
			await recordAudit({ action: "create", entity: "lead", entityId: created.id });
			return res.status(201).json(created);
		},
		PUT: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = (req.query.id as string) || (req.body as any)?.id;
			if (!id) return res.status(400).json({ error: "id is required" });
			const data = updateSchema.parse(req.body);
			const updated = await prisma.opportunity.update({ where: { id }, data });
			await recordAudit({ action: "update", entity: "lead", entityId: id });
			return res.status(200).json(updated);
		},
		DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = req.query.id as string;
			if (!id) return res.status(400).json({ error: "id is required" });
			await prisma.opportunity.delete({ where: { id } });
			await recordAudit({ action: "delete", entity: "lead", entityId: id });
			return res.status(204).end();
		},
	},
});


