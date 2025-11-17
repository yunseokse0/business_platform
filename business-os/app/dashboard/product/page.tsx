"use client";

import Link from "next/link";
import { mockRequirements, mockReleases } from "@/lib/mockData";

type Requirement = { id: string; title: string; status: string; priority: string };
type Release = { id: string; name: string; version: string; status: string; releaseDate?: string };

export default function ProductPage() {
	const requirements = mockRequirements;
	const releases = mockReleases;

	return (
		<div style={{ padding: 32, display: "grid", gap: 32, background: "#f9fafb", minHeight: "100vh" }}>
			<div>
				<h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>제품 관리</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 16 }}>요구사항과 릴리즈를 관리하세요</p>
			</div>
			
			<section>
				<h2 style={{ margin: "0 0 16px", fontSize: 24, fontWeight: "600", color: "#111827" }}>요구사항</h2>
				<div style={{ display: "grid", gap: 16 }}>
					{requirements.map((req) => {
						const statusColors: Record<string, { bg: string; text: string }> = {
							InProgress: { bg: "#dbeafe", text: "#1e40af" },
							Backlog: { bg: "#f3f4f6", text: "#6b7280" },
							Done: { bg: "#d1fae5", text: "#065f46" },
						};
						const priorityColors: Record<string, { bg: string; text: string }> = {
							High: { bg: "#fee2e2", text: "#991b1b" },
							Medium: { bg: "#fef3c7", text: "#92400e" },
							Low: { bg: "#e0e7ff", text: "#3730a3" },
						};
						const statusColor = statusColors[req.status] || { bg: "#f3f4f6", text: "#6b7280" };
						const priorityColor = priorityColors[req.priority] || { bg: "#f3f4f6", text: "#6b7280" };
						
						return (
							<div
								key={req.id}
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
									href={`/dashboard/product/requirements/${req.id}`}
									style={{ textDecoration: "none", color: "inherit", display: "block" }}
								>
									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
										<div style={{ flex: 1 }}>
											<h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: "600", color: "#111827" }}>{req.title}</h3>
											<div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
												<span style={{ 
													padding: "6px 12px", 
													background: statusColor.bg, 
													color: statusColor.text,
													borderRadius: 20,
													fontSize: 13,
													fontWeight: "600"
												}}>
													{req.status}
												</span>
												<span style={{ 
													padding: "6px 12px", 
													background: priorityColor.bg, 
													color: priorityColor.text,
													borderRadius: 20,
													fontSize: 13,
													fontWeight: "600"
												}}>
													{req.priority}
												</span>
											</div>
										</div>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			</section>

			<section>
				<h2 style={{ margin: "0 0 16px", fontSize: 24, fontWeight: "600", color: "#111827" }}>릴리즈</h2>
				<div style={{ display: "grid", gap: 16 }}>
					{releases.map((release) => {
						const statusColors: Record<string, { bg: string; text: string }> = {
							Development: { bg: "#fef3c7", text: "#92400e" },
							Testing: { bg: "#dbeafe", text: "#1e40af" },
							Released: { bg: "#d1fae5", text: "#065f46" },
						};
						const statusColor = statusColors[release.status] || { bg: "#f3f4f6", text: "#6b7280" };
						
						return (
							<div
								key={release.id}
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
									href={`/dashboard/product/releases/${release.id}`}
									style={{ textDecoration: "none", color: "inherit", display: "block" }}
								>
									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
										<div style={{ flex: 1 }}>
											<h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: "600", color: "#111827" }}>
												{release.name} <span style={{ color: "#6b7280", fontWeight: "400" }}>v{release.version}</span>
											</h3>
											<div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
												<span style={{ 
													padding: "6px 12px", 
													background: statusColor.bg, 
													color: statusColor.text,
													borderRadius: 20,
													fontSize: 13,
													fontWeight: "600"
												}}>
													{release.status}
												</span>
												{release.releaseDate && (
													<span style={{ color: "#6b7280", fontSize: 14 }}>
														릴리즈 날짜: {new Date(release.releaseDate).toLocaleDateString("ko-KR")}
													</span>
												)}
											</div>
										</div>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			</section>
		</div>
	);
}

