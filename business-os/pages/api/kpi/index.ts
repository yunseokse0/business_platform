import type { NextApiRequest, NextApiResponse } from "next";
import { createApiHandler } from "@/lib/http";
import { ipRateLimiter } from "@/lib/rateLimit";
import { prisma } from "@/lib/prisma";
import { kpiCreateSchema, kpiUpdateSchema } from "@/lib/validation";
import { recordAudit } from "@/lib/audit";

export default createApiHandler({
	requiredRoles: {
		GET: ["viewer"],
		POST: ["manager"],
		PUT: ["manager"],
		DELETE: ["manager"],
	},
	rateLimit: ipRateLimiter({ capacity: 30, refillPerSec: 15 }),
	validate: {
		POST: (body) => {
			kpiCreateSchema.parse(body);
		},
		PUT: (body) => {
			kpiUpdateSchema.parse(body);
		},
	},
	handlers: {
		GET: async (_req: NextApiRequest, res: NextApiResponse) => {
			const data = await prisma.kPI.findMany({ orderBy: { createdAt: "desc" } });
			return res.status(200).json(data);
		},
		POST: async (req: NextApiRequest, res: NextApiResponse) => {
			const { title, value, target, ownerId } = kpiCreateSchema.parse(req.body);
			const created = await prisma.kPI.create({
				data: { title, value, target, ownerId: ownerId ?? null },
			});
			await recordAudit({ action: "create", entity: "kpi", entityId: created.id });
			return res.status(201).json(created);
		},
		PUT: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = (req.query.id as string) || (req.body as any)?.id;
			if (!id) return res.status(400).json({ error: "id is required" });
			const data = kpiUpdateSchema.parse(req.body);
			const updated = await prisma.kPI.update({ where: { id }, data });
			await recordAudit({ action: "update", entity: "kpi", entityId: id });
			return res.status(200).json(updated);
		},
		DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = req.query.id as string;
			if (!id) return res.status(400).json({ error: "id is required" });
			await prisma.kPI.delete({ where: { id } });
			await recordAudit({ action: "delete", entity: "kpi", entityId: id });
			return res.status(204).end();
		},
	},
});


