export type Role = "admin" | "manager" | "editor" | "viewer";

export function hasRole(userRoles: Role[] | undefined, required: Role[]): boolean {
	if (!required.length) return true;
	if (!userRoles || !userRoles.length) return false;
	return required.some((r) => userRoles.includes(r));
}

export function getMockUser(req?: { headers?: Record<string, any> }) {
	// Replace with real auth integration (NextAuth, Supabase, etc.)
	// For testing, allow overriding role via header: x-role: viewer|editor|manager|admin
	const hdr = req?.headers?.["x-role"]?.toString();
	const roles: Role[] = hdr && ["viewer", "editor", "manager", "admin"].includes(hdr) ? ([hdr] as Role[]) : (["admin"] as Role[]);
	return { id: "user_1", roles };
}


