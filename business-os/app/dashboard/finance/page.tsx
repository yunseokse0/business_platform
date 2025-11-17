"use client";

import Link from "next/link";
import { mockExpenses, mockBudgets } from "@/lib/mockData";

type Expense = { id: string; title: string; amount: number; category?: string; status: string };
type Budget = { id: string; name: string; amount: number; spent: number; category?: string };

export default function FinancePage() {
	const expenses = mockExpenses;
	const budgets = mockBudgets;

	const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
	const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
	const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

	return (
		<div style={{ padding: 32, display: "grid", gap: 32, background: "#f9fafb", minHeight: "100vh" }}>
			<div>
				<h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>재무 관리</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 16 }}>비용과 예산을 관리하세요</p>
			</div>
			
			<section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
				<div style={{ 
					padding: 24, 
					background: "#fff", 
					borderRadius: 16,
					border: "1px solid #e5e7eb",
					boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
				}}>
					<h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", fontWeight: 500 }}>총 비용</h3>
					<p style={{ margin: 0, fontSize: 28, fontWeight: "bold", color: "#111827" }}>${totalExpenses.toLocaleString()}</p>
				</div>
				<div style={{ 
					padding: 24, 
					background: "#fff", 
					borderRadius: 16,
					border: "1px solid #e5e7eb",
					boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
				}}>
					<h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", fontWeight: 500 }}>총 예산</h3>
					<p style={{ margin: 0, fontSize: 28, fontWeight: "bold", color: "#111827" }}>${totalBudget.toLocaleString()}</p>
				</div>
				<div style={{ 
					padding: 24, 
					background: "#fff", 
					borderRadius: 16,
					border: "1px solid #e5e7eb",
					boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
				}}>
					<h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", fontWeight: 500 }}>총 지출</h3>
					<p style={{ margin: 0, fontSize: 28, fontWeight: "bold", color: "#111827" }}>${totalSpent.toLocaleString()}</p>
				</div>
			</section>

			<section>
				<h2 style={{ margin: "0 0 16px", fontSize: 24, fontWeight: "600", color: "#111827" }}>비용</h2>
				<div style={{ display: "grid", gap: 16 }}>
					{expenses.map((expense) => {
						const statusColors: Record<string, { bg: string; text: string }> = {
							Approved: { bg: "#d1fae5", text: "#065f46" },
							Pending: { bg: "#fef3c7", text: "#92400e" },
							Rejected: { bg: "#fee2e2", text: "#991b1b" },
						};
						const statusColor = statusColors[expense.status] || { bg: "#f3f4f6", text: "#6b7280" };
						
						return (
							<div
								key={expense.id}
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
									href={`/dashboard/finance/expenses/${expense.id}`}
									style={{ textDecoration: "none", color: "inherit", display: "block" }}
								>
									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
										<div style={{ flex: 1 }}>
											<h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: "600", color: "#111827" }}>{expense.title}</h3>
											<div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
												<span style={{ 
													fontSize: 16, 
													fontWeight: "600", 
													color: "#111827"
												}}>
													${expense.amount.toLocaleString()}
												</span>
												{expense.category && (
													<span style={{ 
														padding: "6px 12px", 
														background: "#e0e7ff", 
														color: "#3730a3",
														borderRadius: 20,
														fontSize: 13,
														fontWeight: "600"
													}}>
														{expense.category}
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
													{expense.status}
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
				<h2 style={{ margin: "0 0 16px", fontSize: 24, fontWeight: "600", color: "#111827" }}>예산</h2>
				<div style={{ display: "grid", gap: 16 }}>
					{budgets.map((budget) => {
						const percentage = budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0;
						return (
							<div 
								key={budget.id} 
								style={{ 
									padding: 24, 
									border: "1px solid #e5e7eb", 
									borderRadius: 16,
									background: "#fff",
									boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
									borderLeft: "4px solid #3b82f6"
								}}
							>
								<div style={{ marginBottom: 16 }}>
									<h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: "600", color: "#111827" }}>{budget.name}</h3>
									<div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
										<span style={{ 
											fontSize: 16, 
											fontWeight: "600", 
											color: "#111827"
										}}>
											${budget.spent.toLocaleString()} / ${budget.amount.toLocaleString()}
										</span>
										{budget.category && (
											<span style={{ 
												padding: "6px 12px", 
												background: "#e0e7ff", 
												color: "#3730a3",
												borderRadius: 20,
												fontSize: 13,
												fontWeight: "600"
											}}>
												{budget.category}
											</span>
										)}
										<span style={{ 
											fontSize: 14, 
											fontWeight: "600", 
											color: percentage > 100 ? "#ef4444" : "#10b981"
										}}>
											{Math.round(percentage)}%
										</span>
									</div>
								</div>
								<div style={{ width: "100%", height: 10, background: "#e5e7eb", borderRadius: 8, overflow: "hidden" }}>
									<div
										style={{
											width: `${Math.min(percentage, 100)}%`,
											height: "100%",
											background: percentage > 100 ? "#ef4444" : "#10b981",
											transition: "width 0.3s ease"
										}}
									/>
								</div>
							</div>
						);
					})}
				</div>
			</section>
		</div>
	);
}

