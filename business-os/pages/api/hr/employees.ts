import type { NextApiRequest, NextApiResponse } from "next";
import { createApiHandler } from "@/lib/http";
import { ipRateLimiter } from "@/lib/rateLimit";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { recordAudit } from "@/lib/audit";

const createSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	department: z.string().optional(),
	position: z.string().optional(),
	status: z.string().default("Active"),
	hireDate: z.string().optional(),
});

const updateSchema = z.object({
	name: z.string().min(1).optional(),
	email: z.string().email().optional(),
	department: z.string().optional(),
	position: z.string().optional(),
	status: z.string().optional(),
	hireDate: z.string().optional(),
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
			const { id, department, status } = req.query as { id?: string; department?: string; status?: string };
			if (id) {
				const one = await prisma.employee.findUnique({ where: { id } });
				if (!one) return res.status(404).json({ error: "Not Found" });
				return res.status(200).json(one);
			}
			const where: any = {};
			if (department) where.department = department;
			if (status) where.status = status;
			const data = await prisma.employee.findMany({ where, orderBy: { createdAt: "desc" } });
			res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
			return res.status(200).json(data);
		},
		POST: async (req: NextApiRequest, res: NextApiResponse) => {
			const body = createSchema.parse(req.body);
			const created = await prisma.employee.create({
				data: {
					...body,
					hireDate: body.hireDate ? new Date(body.hireDate) : null,
				},
			});
			await recordAudit({ action: "create", entity: "employee", entityId: created.id });
			return res.status(201).json(created);
		},
		PUT: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = (req.query.id as string) || (req.body as any)?.id;
			if (!id) return res.status(400).json({ error: "id is required" });
			const body = updateSchema.parse(req.body);
			const data: any = { ...body };
			if (body.hireDate) data.hireDate = new Date(body.hireDate);
			const updated = await prisma.employee.update({ where: { id }, data });
			await recordAudit({ action: "update", entity: "employee", entityId: id });
			return res.status(200).json(updated);
		},
		DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
			const id = req.query.id as string;
			if (!id) return res.status(400).json({ error: "id is required" });
			await prisma.employee.delete({ where: { id } });
			await recordAudit({ action: "delete", entity: "employee", entityId: id });
			return res.status(204).end();
		},
	},
});

