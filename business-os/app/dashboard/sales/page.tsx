"use client";

import { Kanban } from "@/components/sales/Kanban";
import { OpportunityForm } from "@/components/sales/OpportunityForm";
import { FunnelCountsChart } from "@/components/charts/FunnelCountsChart";
import { FunnelAmountChart } from "@/components/charts/FunnelAmountChart";
import { mockOpportunities, mockSalesMetrics } from "@/lib/mockData";

type Opportunity = { id: string; title: string; amount: number; stage: string };

export default function SalesPage() {
	const opportunities = mockOpportunities;
	const metrics = mockSalesMetrics;
	const columns = ["New", "Qualified", "Proposal", "Negotiation", "Won", "Lost"] as const;
	const chartDataCounts = columns.map((c) => ({ stage: c, count: (metrics.stages as any)[c]?.count ?? 0 }));
	const chartDataAmount = columns.map((c) => ({ stage: c, amount: (metrics.stages as any)[c]?.amount ?? 0 }));

	return (
		<div style={{ padding: 20, display: "grid", gap: 16 }}>
			<h1>Sales — Pipeline (Kanban)</h1>
			<div style={{ maxWidth: 400 }}>
				<OpportunityForm onCreated={() => { /* rely on ISR to refresh; manual refresh can be added with router.refresh */ }} />
			</div>
			<Kanban initial={opportunities} />

			<h2>Funnel (Counts)</h2>
			<FunnelCountsChart data={chartDataCounts} />
			<h2>Funnel (Amount)</h2>
			<FunnelAmountChart data={chartDataAmount} />
		</div>
	);
}


