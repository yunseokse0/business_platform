"use client";

import { useSession } from "next-auth/react";
import * as React from "react";

export function RequireRole({ anyOf, children }: { anyOf: string[]; children: React.ReactNode }) {
	const { data: session, status } = useSession();
	if (status === "loading") return <div style={{ padding: 16 }}>Loading...</div>;
	const roles = ((session as any)?.user?.roles as string[] | undefined) ?? [];
	const allowed = anyOf.length === 0 || roles.some((r) => anyOf.includes(r));
	if (!allowed) {
		return <div style={{ padding: 16 }}>권한이 없습니다.</div>;
	}
	return <>{children}</>;
}


