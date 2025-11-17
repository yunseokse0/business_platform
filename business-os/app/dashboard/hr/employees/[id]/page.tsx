"use client";

import { useRouter } from "next/navigation";
import { mockEmployees } from "@/lib/mockData";
import Link from "next/link";

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { id } = params;
	const employee = mockEmployees.find((e) => e.id === id);

	if (!employee) {
		return (
			<div style={{ padding: 32 }}>
				<h1>직원을 찾을 수 없습니다</h1>
				<Link href="/dashboard/hr" style={{ color: "#3b82f6", textDecoration: "none" }}>
					← 목록으로 돌아가기
				</Link>
			</div>
		);
	}

	return (
		<div style={{ padding: 32, maxWidth: 800, background: "#f9fafb", minHeight: "100vh" }}>
			<div style={{ marginBottom: 24 }}>
				<Link 
					href="/dashboard/hr" 
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
				<h1 style={{ margin: "16px 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>{employee.name}</h1>
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
						이메일
					</label>
					<div style={{ 
						padding: 12, 
						background: "#f9fafb", 
						borderRadius: 8,
						fontSize: 16,
						color: "#111827"
					}}>
						{employee.email}
					</div>
				</div>

				<div>
					<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
						부서
					</label>
					<div style={{ 
						padding: 12, 
						background: "#f9fafb", 
						borderRadius: 8,
						fontSize: 16,
						color: "#111827"
					}}>
						{employee.department || "N/A"}
					</div>
				</div>

				<div>
					<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
						직책
					</label>
					<div style={{ 
						padding: 12, 
						background: "#f9fafb", 
						borderRadius: 8,
						fontSize: 16,
						color: "#111827"
					}}>
						{employee.position || "N/A"}
					</div>
				</div>

				<div>
					<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
						상태
					</label>
					<div style={{ 
						padding: 12, 
						background: employee.status === "Active" ? "#f0fdf4" : "#fef2f2", 
						borderRadius: 8,
						fontSize: 16,
						color: employee.status === "Active" ? "#16a34a" : "#dc2626",
						fontWeight: "600"
					}}>
						{employee.status}
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

