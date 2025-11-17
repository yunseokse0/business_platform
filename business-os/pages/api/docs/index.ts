import type { NextApiRequest, NextApiResponse } from "next";
import { createApiHandler } from "@/lib/http";
import { ipRateLimiter } from "@/lib/rateLimit";
import { prisma } from "@/lib/prisma";
import { documentCreateSchema, documentUpdateSchema } from "@/lib/validation";
import { recordAudit } from "@/lib/audit";

export default createApiHandler({
	requiredRoles: {
		GET: ["viewer"],
		POST: ["editor"],
		PUT: ["editor"],
		DELETE: ["manager"],
	},
	rateLimit: ipRateLimiter({ capacity: 30, refillPerSec: 15 }),
	validate: {
		POST: (body) => {
			documentCreateSchema.parse(body);
		},
		PUT: (body) => {
			documentUpdateSchema.parse(body);
		},
	},
	handlers: {
		GET: async (_req: NextApiRequest, res: NextApiResponse) => {
			const data = await prisma.document.findMany({ orderBy: { createdAt: "desc" } });
			return res.status(200).json(data);
		},
		POST: async (req: NextApiRequest, res: NextApiResponse) => {
			const { title, content, tags } = documentCreateSchema.parse(req.body);
			const created = await prisma.document.create({
				data: { title, content, tags },
			});
			await recordAudit({ action: "create", entity: "document", entityId: created.id });
			return res.status(201).json(created);
		},
		PUT: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = (req.query.id as string) || (req.body as any)?.id;
			if (!id) return res.status(400).json({ error: "id is required" });
			const data = documentUpdateSchema.parse(req.body);
			const updated = await prisma.document.update({ where: { id }, data });
			await recordAudit({ action: "update", entity: "document", entityId: id });
			return res.status(200).json(updated);
		},
		DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = req.query.id as string;
			if (!id) return res.status(400).json({ error: "id is required" });
			await prisma.document.delete({ where: { id } });
			await recordAudit({ action: "delete", entity: "document", entityId: id });
			return res.status(204).end();
		},
	},
});


