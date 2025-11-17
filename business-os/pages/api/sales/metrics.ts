import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { createApiHandler } from "@/lib/http";

export default createApiHandler({
	requiredRoles: ["viewer"],
	handlers: {
		GET: async (_req: NextApiRequest, res: NextApiResponse) => {
			const stages = ["New", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];
			const counts = Object.fromEntries(
				await Promise.all(
					stages.map(async (stage) => {
						const [count, sum] = await Promise.all([
							prisma.opportunity.count({ where: { stage } }),
							prisma.opportunity.aggregate({ where: { stage }, _sum: { amount: true } }),
						]);
						return [stage, { count, amount: sum._sum.amount ?? 0 }];
					}),
				),
			);
			res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
			return res.status(200).json({ stages: counts });
		},
	},
});


