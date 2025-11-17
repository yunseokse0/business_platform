"use client";

import Link from "next/link";
import { mockCampaigns } from "@/lib/mockData";

type Campaign = { id: string; name: string; status: string; budget?: number; spent: number };

export default function MarketingPage() {
	const campaigns = mockCampaigns;

	return (
		<div style={{ padding: 32, display: "grid", gap: 32, background: "#f9fafb", minHeight: "100vh" }}>
			<div>
				<h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>마케팅 캠페인</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 16 }}>캠페인 성과를 관리하세요</p>
			</div>
			
			<section>
				<h2 style={{ margin: "0 0 16px", fontSize: 24, fontWeight: "600", color: "#111827" }}>캠페인 목록</h2>
				<div style={{ display: "grid", gap: 16 }}>
					{campaigns.map((campaign) => {
						const percentage = campaign.budget ? (campaign.spent / campaign.budget) * 100 : 0;
						const statusColors: Record<string, { bg: string; text: string }> = {
							Active: { bg: "#d1fae5", text: "#065f46" },
							Paused: { bg: "#fef3c7", text: "#92400e" },
							Completed: { bg: "#e0e7ff", text: "#3730a3" },
						};
						const statusColor = statusColors[campaign.status] || { bg: "#f3f4f6", text: "#6b7280" };
						
						return (
							<div
								key={campaign.id}
								style={{ 
									padding: 24, 
									border: "1px solid #e5e7eb", 
									borderRadius: 16,
									background: "#fff",
									boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
									transition: "all 0.2s ease",
									cursor: "pointer",
									borderLeft: `4px solid ${statusColor.text}`
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = "translateY(-4px)";
									e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.12)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = "translateY(0)";
									e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
								}}
							>
								<Link 
									href={`/dashboard/marketing/campaigns/${campaign.id}`}
									style={{ textDecoration: "none", color: "inherit", display: "block" }}
								>
									<div style={{ marginBottom: 16 }}>
										<h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: "600", color: "#111827" }}>{campaign.name}</h3>
										<span style={{ 
											padding: "6px 12px", 
											background: statusColor.bg, 
											color: statusColor.text,
											borderRadius: 20,
											fontSize: 13,
											fontWeight: "600"
										}}>
											{campaign.status}
										</span>
									</div>
									{campaign.budget && (
										<div>
											<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, color: "#6b7280" }}>
												<span>${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
												<span style={{ fontWeight: "600" }}>{Math.round(percentage)}%</span>
											</div>
											<div style={{ width: "100%", height: 10, background: "#e5e7eb", borderRadius: 8, overflow: "hidden" }}>
												<div
													style={{
														width: `${Math.min(percentage, 100)}%`,
														height: "100%",
														background: percentage > 100 ? "#ef4444" : "#3b82f6",
														transition: "width 0.3s ease"
													}}
												/>
											</div>
										</div>
									)}
								</Link>
							</div>
						);
					})}
				</div>
			</section>
		</div>
	);
}

