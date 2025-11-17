import type { NextApiRequest, NextApiResponse } from "next";
import { createApiHandler } from "@/lib/http";
import { ipRateLimiter } from "@/lib/rateLimit";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { recordAudit } from "@/lib/audit";

const createSchema = z.object({
	employeeId: z.string().optional(),
	type: z.string().min(1),
	startDate: z.string().min(1),
	endDate: z.string().min(1),
	status: z.string().default("Pending"),
	reason: z.string().optional(),
});

const updateSchema = z.object({
	type: z.string().optional(),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
	status: z.string().optional(),
	reason: z.string().optional(),
	approverId: z.string().optional(),
});

export default createApiHandler({
	requiredRoles: {
		GET: ["manager"],
		POST: ["manager"],
		PUT: ["manager"],
		DELETE: ["admin"],
	},
	rateLimit: ipRateLimiter({ capacity: 40, refillPerSec: 20 }),
	validate: {
		POST: (body) => void createSchema.parse(body),
		PUT: (body) => void updateSchema.parse(body),
	},
	handlers: {
		GET: async (req: NextApiRequest, res: NextApiResponse) => {
			const { id, status, employeeId } = req.query as { id?: string; status?: string; employeeId?: string };
			if (id) {
				const one = await prisma.leave.findUnique({ where: { id } });
				if (!one) return res.status(404).json({ error: "Not Found" });
				return res.status(200).json(one);
			}
			const where: any = {};
			if (status) where.status = status;
			if (employeeId) where.employeeId = employeeId;
			const data = await prisma.leave.findMany({ where, orderBy: { createdAt: "desc" } });
			res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
			return res.status(200).json(data);
		},
		POST: async (req: NextApiRequest, res: NextApiResponse) => {
			const body = createSchema.parse(req.body);
			const created = await prisma.leave.create({
				data: {
					...body,
					startDate: new Date(body.startDate),
					endDate: new Date(body.endDate),
				},
			});
			await recordAudit({ action: "create", entity: "leave", entityId: created.id });
			return res.status(201).json(created);
		},
		PUT: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = (req.query.id as string) || (req.body as any)?.id;
			if (!id) return res.status(400).json({ error: "id is required" });
			const body = updateSchema.parse(req.body);
			const data: any = { ...body };
			if (body.startDate) data.startDate = new Date(body.startDate);
			if (body.endDate) data.endDate = new Date(body.endDate);
			const updated = await prisma.leave.update({ where: { id }, data });
			await recordAudit({ action: "update", entity: "leave", entityId: id });
			return res.status(200).json(updated);
		},
		DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = req.query.id as string;
			if (!id) return res.status(400).json({ error: "id is required" });
			await prisma.leave.delete({ where: { id } });
			await recordAudit({ action: "delete", entity: "leave", entityId: id });
			return res.status(204).end();
		},
	},
});

