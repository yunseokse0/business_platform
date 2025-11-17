"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

// Mock data - no API call needed
import { mockOpportunities } from "@/lib/mockData";

function fetchOne(id: string) {
	const opportunity = mockOpportunities.find((o) => o.id === id);
	if (!opportunity) throw new Error("Opportunity not found");
	return Promise.resolve(opportunity);
}

export default function SalesDetailPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { id } = params;
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);
	const [title, setTitle] = React.useState("");
	const [amount, setAmount] = React.useState<number>(0);
	const [stage, setStage] = React.useState("New");

	const load = React.useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await fetchOne(id);
			setTitle(data.title || "");
			setAmount(data.amount || 0);
			setStage(data.stage || "New");
		} catch (e: any) {
			setError(e?.message ?? "Error");
		} finally {
			setLoading(false);
		}
	}, [id]);

	React.useEffect(() => {
		load();
	}, [load]);

	const save = async () => {
		setLoading(true);
		try {
			// Mock save - just show success
			await new Promise((resolve) => setTimeout(resolve, 500));
			alert("저장되었습니다 (Mock)");
			router.push("/dashboard/sales");
		} catch (e: any) {
			setError(e?.message ?? "Error");
		} finally {
			setLoading(false);
		}
	};

	const del = async () => {
		if (!confirm("정말 삭제하시겠습니까?")) return;
		setLoading(true);
		try {
			// Mock delete
			await new Promise((resolve) => setTimeout(resolve, 500));
			router.push("/dashboard/sales");
		} catch (e: any) {
			setError(e?.message ?? "Error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ padding: 32, display: "grid", gap: 24, maxWidth: 800, background: "#f9fafb", minHeight: "100vh" }}>
			<div>
				<h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>영업 기회 상세</h1>
			</div>
			<div style={{ 
				background: "#fff", 
				borderRadius: 12, 
				padding: 32, 
				boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
				display: "grid",
				gap: 20
			}}>
				{loading && <div style={{ padding: 16, background: "#f3f4f6", borderRadius: 8 }}>로딩 중...</div>}
				{error && <div style={{ padding: 16, background: "#fef2f2", color: "#dc2626", borderRadius: 8 }}>{error}</div>}
				<label>
					<div style={{ marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>제목</div>
					<input 
						value={title} 
						onChange={(e) => setTitle(e.target.value)} 
						style={{ 
							padding: 12, 
							border: "1px solid #e5e7eb", 
							borderRadius: 8, 
							width: "100%",
							fontSize: 16
						}} 
					/>
				</label>
				<label>
					<div style={{ marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>금액</div>
					<input 
						type="number" 
						value={amount} 
						onChange={(e) => setAmount(parseFloat(e.target.value || "0"))} 
						style={{ 
							padding: 12, 
							border: "1px solid #e5e7eb", 
							borderRadius: 8, 
							width: "100%",
							fontSize: 16
						}} 
					/>
				</label>
				<label>
					<div style={{ marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>단계</div>
					<select 
						value={stage} 
						onChange={(e) => setStage(e.target.value)} 
						style={{ 
							padding: 12, 
							border: "1px solid #e5e7eb", 
							borderRadius: 8, 
							width: "100%",
							fontSize: 16
						}}
					>
						{["New", "Qualified", "Proposal", "Negotiation", "Won", "Lost"].map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</label>
				<div style={{ display: "flex", gap: 12, marginTop: 8 }}>
					<button 
						onClick={save} 
						disabled={loading} 
						style={{ 
							padding: "12px 24px", 
							border: "none", 
							borderRadius: 8, 
							background: "#111827", 
							color: "#fff",
							fontSize: 14,
							fontWeight: "600",
							cursor: "pointer"
						}}
					>
						저장
					</button>
					<button 
						onClick={del} 
						disabled={loading} 
						style={{ 
							padding: "12px 24px", 
							border: "1px solid #e5e7eb", 
							borderRadius: 8,
							background: "#fff",
							fontSize: 14,
							fontWeight: "600",
							cursor: "pointer"
						}}
					>
						삭제
					</button>
					<button 
						onClick={() => router.back()} 
						style={{ 
							padding: "12px 24px", 
							border: "1px solid #e5e7eb", 
							borderRadius: 8,
							background: "#fff",
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


