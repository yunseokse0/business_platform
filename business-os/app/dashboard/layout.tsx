"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { useSession } from "next-auth/react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession();
	// Mock session for development
	const mockRoles = ["admin", "manager", "editor", "viewer"];
	
	return (
		<div style={{ display: "flex", minHeight: "100vh", background: "#f9fafb" }}>
			<Sidebar />
			<main style={{ flex: 1, padding: 0, background: "#fff" }}>
				{children}
			</main>
		</div>
	);
}

