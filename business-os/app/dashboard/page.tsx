"use client";

import { mockKPIs, mockOpportunities, mockAuditLogs } from "@/lib/mockData";

type KPI = { id: string; title: string; value: number; target: number };
type Opportunity = { id: string; title: string; amount: number; stage: string };
type AuditLog = { id: string; action: string; entity: string; createdAt: string };

export default function Dashboard() {
	const roles = ["admin", "manager"]; // Mock roles for development
	
	const kpis = mockKPIs;
	const opportunities = mockOpportunities;
	const recentAudits = mockAuditLogs;

	const totalRevenue = opportunities
		.filter((o) => o.stage === "Won")
		.reduce((sum, o) => sum + o.amount, 0);
	const totalPipeline = opportunities.reduce((sum, o) => sum + o.amount, 0);
	const kpiProgress = kpis.map((kpi) => ({
		...kpi,
		progress: kpi.target > 0 ? (kpi.value / kpi.target) * 100 : 0,
	}));

	return (
		<div style={{ padding: 32, display: "grid", gap: 32, background: "#f9fafb", minHeight: "100vh" }}>
			<div>
				<h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>대시보드</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 16 }}>전체 운영 현황을 한눈에 확인하세요</p>
			</div>
			
			{/* KPI Summary Cards */}
			<section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
				<div style={{ 
					padding: 24, 
					background: "#fff", 
					borderRadius: 12, 
					border: "1px solid #e5e7eb",
					boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
				}}>
					<h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", fontWeight: 500 }}>총 매출</h3>
					<p style={{ margin: 0, fontSize: 28, fontWeight: "bold", color: "#111827" }}>${totalRevenue.toLocaleString()}</p>
				</div>
				<div style={{ 
					padding: 24, 
					background: "#fff", 
					borderRadius: 12, 
					border: "1px solid #e5e7eb",
					boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
				}}>
					<h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", fontWeight: 500 }}>총 파이프라인</h3>
					<p style={{ margin: 0, fontSize: 28, fontWeight: "bold", color: "#111827" }}>${totalPipeline.toLocaleString()}</p>
				</div>
				<div style={{ 
					padding: 24, 
					background: "#fff", 
					borderRadius: 12, 
					border: "1px solid #e5e7eb",
					boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
				}}>
					<h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", fontWeight: 500 }}>진행 중인 기회</h3>
					<p style={{ margin: 0, fontSize: 28, fontWeight: "bold", color: "#111827" }}>{opportunities.length}</p>
				</div>
				<div style={{ 
					padding: 24, 
					background: "#fff", 
					borderRadius: 12, 
					border: "1px solid #e5e7eb",
					boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
				}}>
					<h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#6b7280", fontWeight: 500 }}>추적 중인 KPI</h3>
					<p style={{ margin: 0, fontSize: 28, fontWeight: "bold", color: "#111827" }}>{kpis.length}</p>
				</div>
			</section>

			{/* KPI Progress */}
			<section>
				<h2 style={{ margin: "0 0 20px", fontSize: 24, fontWeight: "600", color: "#111827" }}>KPI 진행률</h2>
				<div style={{ display: "grid", gap: 16 }}>
					{kpiProgress.map((kpi) => (
						<div key={kpi.id} style={{ 
							padding: 24, 
							border: "1px solid #e5e7eb", 
							borderRadius: 12,
							background: "#fff",
							boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
						}}>
							<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
								<h3 style={{ margin: 0, fontSize: 18, fontWeight: "600", color: "#111827" }}>{kpi.title}</h3>
								<span style={{ fontSize: 18, fontWeight: "bold", color: "#374151" }}>
									{kpi.value.toLocaleString()} / {kpi.target.toLocaleString()}
								</span>
							</div>
							<div style={{ width: "100%", height: 10, background: "#e5e7eb", borderRadius: 5, overflow: "hidden" }}>
								<div
									style={{
										width: `${Math.min(kpi.progress, 100)}%`,
										height: "100%",
										background: kpi.progress >= 100 ? "#10b981" : kpi.progress >= 75 ? "#3b82f6" : "#f59e0b",
										transition: "width 0.3s ease"
									}}
								/>
							</div>
							<p style={{ margin: "8px 0 0", fontSize: 14, color: "#6b7280" }}>
								{Math.round(kpi.progress)}% 완료
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Recent Activity */}
			{roles.includes("admin") && (
				<section>
					<h2 style={{ margin: "0 0 20px", fontSize: 24, fontWeight: "600", color: "#111827" }}>최근 활동</h2>
					<div style={{ display: "grid", gap: 12 }}>
						{recentAudits.map((audit) => (
							<div key={audit.id} style={{ 
								padding: 16, 
								border: "1px solid #e5e7eb", 
								borderRadius: 8,
								background: "#fff",
								boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
							}}>
								<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
									<div>
										<p style={{ margin: 0, fontSize: 14, color: "#111827" }}>
											<span style={{ fontWeight: "600", textTransform: "capitalize" }}>{audit.action}</span>{" "}
											<span style={{ color: "#6b7280" }}>{audit.entity}</span>
										</p>
										<p style={{ margin: "4px 0 0", color: "#9ca3af", fontSize: 12 }}>
											{new Date(audit.createdAt).toLocaleString("ko-KR")}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			)}
		</div>
	);
}


