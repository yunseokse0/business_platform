import { getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/lib/sessionOptions";

export async function getSessionRolesInApi(req: NextApiRequest, res: NextApiResponse): Promise<string[] | undefined> {
	// getServerSession for pages/api requires passing req/res with the auth options
	const anyReq = req as any;
	const anyRes = res as any;
	const session = await (getServerSession as any)(anyReq, anyRes, authOptions);
	return (session as any)?.user?.roles as string[] | undefined;
}


