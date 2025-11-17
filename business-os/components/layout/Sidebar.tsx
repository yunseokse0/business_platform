import Link from "next/link";
import { useSession } from "next-auth/react";

const links = [
	{ href: "/dashboard", label: "Dashboard", roles: ["viewer", "editor", "manager", "admin"] },
	{ href: "/dashboard/operation", label: "Operation", roles: ["viewer", "editor", "manager", "admin"] },
	{ href: "/dashboard/brand", label: "Brand", roles: ["viewer", "editor", "manager", "admin"] },
	{ href: "/dashboard/marketing", label: "Marketing", roles: ["viewer", "editor", "manager", "admin"] },
	{ href: "/dashboard/sales", label: "Sales", roles: ["viewer", "editor", "manager", "admin"] },
	{ href: "/dashboard/docs", label: "Docs", roles: ["viewer", "editor", "manager", "admin"] },
	{ href: "/dashboard/hr", label: "HR", roles: ["manager", "admin"] },
	{ href: "/dashboard/finance", label: "Finance", roles: ["manager", "admin"] },
	{ href: "/dashboard/product", label: "Product", roles: ["viewer", "editor", "manager", "admin"] },
	{ href: "/dashboard/admin/audit", label: "Audit", roles: ["admin"] }
] as const;

export function Sidebar() {
	const { data: session } = useSession();
	const roles = ((session as any)?.user?.roles as string[] | undefined) ?? [];
	return (
		<aside style={{ padding: 16, borderRight: "1px solid #e5e7eb" }}>
			<nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
				{links
					.filter((l) => l.roles.some((r) => roles.includes(r)))
					.map((l) => (
						<Link key={l.href} href={l.href}>
							{l.label}
						</Link>
					))}
			</nav>
		</aside>
	);
}


