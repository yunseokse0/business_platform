"use client";

import { useRouter } from "next/navigation";
import { mockExpenses } from "@/lib/mockData";
import Link from "next/link";

export default function ExpenseDetailPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { id } = params;
	const expense = mockExpenses.find((e) => e.id === id);

	if (!expense) {
		return (
			<div style={{ padding: 32 }}>
				<h1>비용을 찾을 수 없습니다</h1>
				<Link href="/dashboard/finance" style={{ color: "#3b82f6", textDecoration: "none" }}>
					← 목록으로 돌아가기
				</Link>
			</div>
		);
	}

	return (
		<div style={{ padding: 32, maxWidth: 800, background: "#f9fafb", minHeight: "100vh" }}>
			<div style={{ marginBottom: 24 }}>
				<Link 
					href="/dashboard/finance" 
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
				<h1 style={{ margin: "16px 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>{expense.title}</h1>
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
						금액
					</label>
					<div style={{ 
						padding: 12, 
						background: "#f9fafb", 
						borderRadius: 8,
						fontSize: 20,
						color: "#111827",
						fontWeight: "600"
					}}>
						${expense.amount.toLocaleString()}
					</div>
				</div>

				<div>
					<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
						카테고리
					</label>
					<div style={{ 
						padding: 12, 
						background: "#f9fafb", 
						borderRadius: 8,
						fontSize: 16,
						color: "#111827"
					}}>
						{expense.category || "N/A"}
					</div>
				</div>

				<div>
					<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
						상태
					</label>
					<div style={{ 
						padding: 12, 
						background: expense.status === "Approved" ? "#f0fdf4" : expense.status === "Pending" ? "#fffbeb" : "#fef2f2", 
						borderRadius: 8,
						fontSize: 16,
						color: expense.status === "Approved" ? "#16a34a" : expense.status === "Pending" ? "#d97706" : "#dc2626",
						fontWeight: "600"
					}}>
						{expense.status}
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

