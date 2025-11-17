"use client";

import Link from "next/link";
import { mockTasks, mockIncidents } from "@/lib/mockData";

type Task = { id: string; title: string; status: string; priority?: string; dueDate?: string };
type Incident = { id: string; title: string; status: string; severity: string };

export default function OperationPage() {
	const tasks = mockTasks;
	const incidents = mockIncidents;

	return (
		<div style={{ padding: 32, display: "grid", gap: 32, background: "#f9fafb", minHeight: "100vh" }}>
			<div>
				<h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>운영 관리</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 16 }}>작업 및 인시던트를 관리하세요</p>
			</div>
			
			<section>
				<h2 style={{ margin: "0 0 16px", fontSize: 24, fontWeight: "600", color: "#111827" }}>작업</h2>
				<div style={{ display: "grid", gap: 16 }}>
					{tasks.map((task) => {
						const statusColors: Record<string, { bg: string; text: string }> = {
							Todo: { bg: "#f3f4f6", text: "#6b7280" },
							InProgress: { bg: "#dbeafe", text: "#1e40af" },
							Done: { bg: "#d1fae5", text: "#065f46" },
						};
						const priorityColors: Record<string, { bg: string; text: string }> = {
							High: { bg: "#fee2e2", text: "#991b1b" },
							Medium: { bg: "#fef3c7", text: "#92400e" },
							Low: { bg: "#e0e7ff", text: "#3730a3" },
						};
						const statusColor = statusColors[task.status] || { bg: "#f3f4f6", text: "#6b7280" };
						const priorityColor = task.priority ? (priorityColors[task.priority] || { bg: "#f3f4f6", text: "#6b7280" }) : null;
						
						return (
							<div
								key={task.id}
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
									href={`/dashboard/operation/tasks/${task.id}`}
									style={{ textDecoration: "none", color: "inherit", display: "block" }}
								>
									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
										<div style={{ flex: 1 }}>
											<h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: "600", color: "#111827" }}>{task.title}</h3>
											<div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
												<span style={{ 
													padding: "6px 12px", 
													background: statusColor.bg, 
													color: statusColor.text,
													borderRadius: 20,
													fontSize: 13,
													fontWeight: "600"
												}}>
													{task.status}
												</span>
												{priorityColor && (
													<span style={{ 
														padding: "6px 12px", 
														background: priorityColor.bg, 
														color: priorityColor.text,
														borderRadius: 20,
														fontSize: 13,
														fontWeight: "600"
													}}>
														{task.priority}
													</span>
												)}
												{task.dueDate && (
													<span style={{ color: "#6b7280", fontSize: 14 }}>
														마감일: {new Date(task.dueDate).toLocaleDateString("ko-KR")}
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

			<section>
				<h2 style={{ margin: "0 0 16px", fontSize: 24, fontWeight: "600", color: "#111827" }}>인시던트</h2>
				<div style={{ display: "grid", gap: 16 }}>
					{incidents.map((incident) => {
						const statusColors: Record<string, { bg: string; text: string }> = {
							Open: { bg: "#fee2e2", text: "#991b1b" },
							InProgress: { bg: "#dbeafe", text: "#1e40af" },
							Resolved: { bg: "#d1fae5", text: "#065f46" },
						};
						const severityColors: Record<string, { bg: string; text: string }> = {
							Critical: { bg: "#fee2e2", text: "#991b1b" },
							High: { bg: "#fef3c7", text: "#92400e" },
							Medium: { bg: "#e0e7ff", text: "#3730a3" },
							Low: { bg: "#f3f4f6", text: "#6b7280" },
						};
						const statusColor = statusColors[incident.status] || { bg: "#f3f4f6", text: "#6b7280" };
						const severityColor = severityColors[incident.severity] || { bg: "#f3f4f6", text: "#6b7280" };
						
						return (
							<div
								key={incident.id}
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
									href={`/dashboard/operation/incidents/${incident.id}`}
									style={{ textDecoration: "none", color: "inherit", display: "block" }}
								>
									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
										<div style={{ flex: 1 }}>
											<h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: "600", color: "#111827" }}>{incident.title}</h3>
											<div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
												<span style={{ 
													padding: "6px 12px", 
													background: statusColor.bg, 
													color: statusColor.text,
													borderRadius: 20,
													fontSize: 13,
													fontWeight: "600"
												}}>
													{incident.status}
												</span>
												<span style={{ 
													padding: "6px 12px", 
													background: severityColor.bg, 
													color: severityColor.text,
													borderRadius: 20,
													fontSize: 13,
													fontWeight: "600"
												}}>
													{incident.severity}
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
		</div>
	);
}

