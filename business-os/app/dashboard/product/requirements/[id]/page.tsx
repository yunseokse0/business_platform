"use client";

import { useRouter } from "next/navigation";
import { mockRequirements } from "@/lib/mockData";
import Link from "next/link";

export default function RequirementDetailPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { id } = params;
	const requirement = mockRequirements.find((r) => r.id === id);

	if (!requirement) {
		return (
			<div style={{ padding: 32 }}>
				<h1>요구사항을 찾을 수 없습니다</h1>
				<Link href="/dashboard/product" style={{ color: "#3b82f6", textDecoration: "none" }}>
					← 목록으로 돌아가기
				</Link>
			</div>
		);
	}

	return (
		<div style={{ padding: 32, maxWidth: 800, background: "#f9fafb", minHeight: "100vh" }}>
			<div style={{ marginBottom: 24 }}>
				<Link 
					href="/dashboard/product" 
					style={{ 
						color: "#3b82f6", 
						textDecoration: "none",
						fontSize: 14,
						marginBottom: 16,
						display: "inline-block"
					}}
				>
					← 목록으로 돌아가기
				</Link>
				<h1 style={{ margin: "16px 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>{requirement.title}</h1>
			</div>

			<div style={{ 
				background: "#fff", 
				borderRadius: 12, 
				padding: 32, 
				boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
				display: "grid",
				gap: 24
			}}>
				<div>
					<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
						상태
					</label>
					<div style={{ 
						padding: 12, 
						background: "#f9fafb", 
						borderRadius: 8,
						fontSize: 16,
						color: "#111827"
					}}>
						{requirement.status}
					</div>
				</div>

				<div>
					<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
						우선순위
					</label>
					<div style={{ 
						padding: 12, 
						background: requirement.priority === "High" ? "#fef2f2" : requirement.priority === "Medium" ? "#fffbeb" : "#f0fdf4", 
						borderRadius: 8,
						fontSize: 16,
						color: requirement.priority === "High" ? "#dc2626" : requirement.priority === "Medium" ? "#d97706" : "#16a34a",
						fontWeight: "600"
					}}>
						{requirement.priority}
					</div>
				</div>

				<div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid #e5e7eb" }}>
					<button 
						onClick={() => router.back()}
						style={{ 
							padding: "12px 24px", 
							background: "#111827", 
							color: "#fff",
							border: "none",
							borderRadius: 8,
							fontSize: 14,
							fontWeight: "600",
							cursor: "pointer"
						}}
					>
						뒤로가기
					</button>
				</div>
			</div>
		</div>
	);
}

