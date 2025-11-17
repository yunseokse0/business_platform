"use client";

import Link from "next/link";
import { mockEmployees, mockLeaves } from "@/lib/mockData";

type Employee = { id: string; name: string; email: string; department?: string; position?: string; status: string };
type Leave = { id: string; type: string; startDate: string; endDate: string; status: string };

export default function HRPage() {
	const employees = mockEmployees;
	const leaves = mockLeaves;

	return (
		<div style={{ padding: 32, display: "grid", gap: 32, background: "#f9fafb", minHeight: "100vh" }}>
			<div>
				<h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>인사 관리</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 16 }}>직원 및 휴가를 관리하세요</p>
			</div>
			
			<section>
				<h2 style={{ margin: "0 0 16px", fontSize: 24, fontWeight: "600", color: "#111827" }}>직원</h2>
				<div style={{ display: "grid", gap: 16 }}>
					{employees.map((employee) => {
						const statusColors: Record<string, { bg: string; text: string }> = {
							Active: { bg: "#d1fae5", text: "#065f46" },
							Inactive: { bg: "#f3f4f6", text: "#6b7280" },
						};
						const statusColor = statusColors[employee.status] || { bg: "#f3f4f6", text: "#6b7280" };
						
						return (
							<div
								key={employee.id}
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
									href={`/dashboard/hr/employees/${employee.id}`}
									style={{ textDecoration: "none", color: "inherit", display: "block" }}
								>
									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
										<div style={{ flex: 1 }}>
											<h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: "600", color: "#111827" }}>{employee.name}</h3>
											<div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 8 }}>
												<span style={{ color: "#6b7280", fontSize: 14 }}>{employee.email}</span>
											</div>
											<div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
												{employee.department && (
													<span style={{ 
														padding: "6px 12px", 
														background: "#e0e7ff", 
														color: "#3730a3",
														borderRadius: 20,
														fontSize: 13,
														fontWeight: "600"
													}}>
														{employee.department}
													</span>
												)}
												{employee.position && (
													<span style={{ 
														padding: "6px 12px", 
														background: "#f3f4f6", 
														color: "#374151",
														borderRadius: 20,
														fontSize: 13,
														fontWeight: "600"
													}}>
														{employee.position}
													</span>
												)}
												<span style={{ 
													padding: "6px 12px", 
													background: statusColor.bg, 
													color: statusColor.text,
													borderRadius: 20,
													fontSize: 13,
													fontWeight: "600"
												}}>
													{employee.status}
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
				<h2 style={{ margin: "0 0 16px", fontSize: 24, fontWeight: "600", color: "#111827" }}>휴가 신청</h2>
				<div style={{ display: "grid", gap: 16 }}>
					{leaves.map((leave) => {
						const statusColors: Record<string, { bg: string; text: string }> = {
							Approved: { bg: "#d1fae5", text: "#065f46" },
							Pending: { bg: "#fef3c7", text: "#92400e" },
							Rejected: { bg: "#fee2e2", text: "#991b1b" },
						};
						const statusColor = statusColors[leave.status] || { bg: "#f3f4f6", text: "#6b7280" };
						
						return (
							<div
								key={leave.id}
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
									href={`/dashboard/hr/leaves/${leave.id}`}
									style={{ textDecoration: "none", color: "inherit", display: "block" }}
								>
									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
										<div style={{ flex: 1 }}>
											<h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: "600", color: "#111827" }}>{leave.type} 휴가</h3>
											<div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
												<span style={{ color: "#6b7280", fontSize: 14 }}>
													{new Date(leave.startDate).toLocaleDateString("ko-KR")} - {new Date(leave.endDate).toLocaleDateString("ko-KR")}
												</span>
												<span style={{ 
													padding: "6px 12px", 
													background: statusColor.bg, 
													color: statusColor.text,
													borderRadius: 20,
													fontSize: 13,
													fontWeight: "600"
												}}>
													{leave.status}
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

