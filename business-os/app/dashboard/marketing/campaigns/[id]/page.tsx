"use client";

import { useRouter } from "next/navigation";
import { mockCampaigns } from "@/lib/mockData";
import Link from "next/link";

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { id } = params;
	const campaign = mockCampaigns.find((c) => c.id === id);

	if (!campaign) {
		return (
			<div style={{ padding: 32 }}>
				<h1>캠페인을 찾을 수 없습니다</h1>
				<Link href="/dashboard/marketing" style={{ color: "#3b82f6", textDecoration: "none" }}>
					← 목록으로 돌아가기
				</Link>
			</div>
		);
	}

	const percentage = campaign.budget ? (campaign.spent / campaign.budget) * 100 : 0;

	return (
		<div style={{ padding: 32, maxWidth: 800, background: "#f9fafb", minHeight: "100vh" }}>
			<div style={{ marginBottom: 24 }}>
				<Link 
					href="/dashboard/marketing" 
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
				<h1 style={{ margin: "16px 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>{campaign.name}</h1>
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
						{campaign.status}
					</div>
				</div>

				{campaign.budget && (
					<div>
						<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
							예산 사용률
						</label>
						<div style={{ marginBottom: 8 }}>
							<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 16 }}>
								<span style={{ fontWeight: "600" }}>${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
								<span style={{ color: "#6b7280" }}>{Math.round(percentage)}%</span>
							</div>
							<div style={{ width: "100%", height: 12, background: "#e5e7eb", borderRadius: 6, overflow: "hidden" }}>
								<div
									style={{
										width: `${Math.min(percentage, 100)}%`,
										height: "100%",
										background: percentage > 100 ? "#ef4444" : percentage > 75 ? "#f59e0b" : "#10b981",
										transition: "width 0.3s ease"
									}}
								/>
							</div>
						</div>
					</div>
				)}

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

