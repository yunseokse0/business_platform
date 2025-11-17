import type { NextApiRequest, NextApiResponse } from "next";
import { createApiHandler } from "@/lib/http";
import { prisma } from "@/lib/prisma";

export default createApiHandler({
	requiredRoles: ["admin"],
	handlers: {
		GET: async (_req: NextApiRequest, res: NextApiResponse) => {
			const data = await prisma.auditLog.findMany({
				orderBy: { createdAt: "desc" },
				take: 200,
				select: { id: true, action: true, entity: true, entityId: true, userId: true, createdAt: true },
			});
			res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
			return res.status(200).json(data);
		},
	},
});


