"use client";

import { useRouter } from "next/navigation";
import { mockLeaves } from "@/lib/mockData";
import Link from "next/link";

export default function LeaveDetailPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { id } = params;
	const leave = mockLeaves.find((l) => l.id === id);

	if (!leave) {
		return (
			<div style={{ padding: 32 }}>
				<h1>휴가를 찾을 수 없습니다</h1>
				<Link href="/dashboard/hr" style={{ color: "#3b82f6", textDecoration: "none" }}>
					← 목록으로 돌아가기
				</Link>
			</div>
		);
	}

	const startDate = new Date(leave.startDate);
	const endDate = new Date(leave.endDate);
	const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

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
				<h1 style={{ margin: "16px 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>{leave.type} 휴가</h1>
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
						휴가 유형
					</label>
					<div style={{ 
						padding: 12, 
						background: "#f9fafb", 
						borderRadius: 8,
						fontSize: 16,
						color: "#111827"
					}}>
						{leave.type}
					</div>
				</div>

				<div>
					<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
						시작일
					</label>
					<div style={{ 
						padding: 12, 
						background: "#f9fafb", 
						borderRadius: 8,
						fontSize: 16,
						color: "#111827"
					}}>
						{startDate.toLocaleDateString("ko-KR")}
					</div>
				</div>

				<div>
					<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
						종료일
					</label>
					<div style={{ 
						padding: 12, 
						background: "#f9fafb", 
						borderRadius: 8,
						fontSize: 16,
						color: "#111827"
					}}>
						{endDate.toLocaleDateString("ko-KR")}
					</div>
				</div>

				<div>
					<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
						휴가 일수
					</label>
					<div style={{ 
						padding: 12, 
						background: "#f9fafb", 
						borderRadius: 8,
						fontSize: 16,
						color: "#111827"
					}}>
						{days}일
					</div>
				</div>

				<div>
					<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
						상태
					</label>
					<div style={{ 
						padding: 12, 
						background: leave.status === "Approved" ? "#f0fdf4" : leave.status === "Pending" ? "#fffbeb" : "#fef2f2", 
						borderRadius: 8,
						fontSize: 16,
						color: leave.status === "Approved" ? "#16a34a" : leave.status === "Pending" ? "#d97706" : "#dc2626",
						fontWeight: "600"
					}}>
						{leave.status}
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

