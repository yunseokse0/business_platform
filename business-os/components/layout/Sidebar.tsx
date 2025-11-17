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
	// Mock roles for development - show all links
	const roles = ["admin", "manager", "editor", "viewer"];
	
	return (
		<aside style={{ 
			width: 240, 
			padding: 24, 
			borderRight: "1px solid #e5e7eb",
			background: "#fff",
			boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
		}}>
			<div style={{ marginBottom: 24 }}>
				<h2 style={{ margin: 0, fontSize: 20, fontWeight: "bold", color: "#111827" }}>Business OS</h2>
				<p style={{ margin: "4px 0 0", fontSize: 12, color: "#6b7280" }}>운영 시스템</p>
			</div>
			<nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
				{links
					.filter((l) => l.roles.some((r) => roles.includes(r)))
					.map((l) => (
						<div
							key={l.href}
							style={{
								padding: "12px 16px",
								borderRadius: 6,
								transition: "all 0.2s",
								cursor: "pointer"
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = "#f3f4f6";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = "transparent";
							}}
						>
							<Link 
								href={l.href}
								style={{
									textDecoration: "none",
									color: "#374151",
									fontSize: 14,
									display: "block"
								}}
							>
								{l.label}
							</Link>
						</div>
					))}
			</nav>
		</aside>
	);
}


