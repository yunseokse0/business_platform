import type { NextApiRequest, NextApiResponse } from "next";
import { createApiHandler } from "@/lib/http";
import { ipRateLimiter } from "@/lib/rateLimit";
import { prisma } from "@/lib/prisma";
import { leadCreateSchema, leadUpdateSchema } from "@/lib/validation";
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
			leadCreateSchema.parse(body);
		},
		PUT: (body) => {
			leadUpdateSchema.parse(body);
		},
	},
	handlers: {
		GET: async (_req: NextApiRequest, res: NextApiResponse) => {
			const data = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
			return res.status(200).json(data);
		},
		POST: async (req: NextApiRequest, res: NextApiResponse) => {
			const { name, stage, history } = leadCreateSchema.parse(req.body);
			const created = await prisma.lead.create({
				data: { name, stage, history: history ?? null },
			});
			await recordAudit({ action: "create", entity: "lead", entityId: created.id });
			return res.status(201).json(created);
		},
		PUT: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = (req.query.id as string) || (req.body as any)?.id;
			if (!id) return res.status(400).json({ error: "id is required" });
			const data = leadUpdateSchema.parse(req.body);
			const updated = await prisma.lead.update({ where: { id }, data });
			await recordAudit({ action: "update", entity: "lead", entityId: id });
			return res.status(200).json(updated);
		},
		DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = req.query.id as string;
			if (!id) return res.status(400).json({ error: "id is required" });
			await prisma.lead.delete({ where: { id } });
			await recordAudit({ action: "delete", entity: "lead", entityId: id });
			return res.status(204).end();
		},
	},
});


