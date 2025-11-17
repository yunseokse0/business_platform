export const revalidate = 60;

import { Kanban } from "@/components/sales/Kanban";
import { OpportunityForm } from "@/components/sales/OpportunityForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/sessionOptions";
import { FunnelCountsChart } from "@/components/charts/FunnelCountsChart";
import { FunnelAmountChart } from "@/components/charts/FunnelAmountChart";

async function fetchJSON<T>(path: string): Promise<T> {
	const res = await fetch(path, { next: { revalidate: 60 } });
	return res.json();
}

type Opportunity = { id: string; title: string; amount: number; stage: string };

export default async function SalesPage() {
	const session = await getServerSession(authOptions as any);
	const roles = ((session as any)?.user?.roles as string[] | undefined) ?? [];
	if (!roles.some((r) => ["viewer", "editor", "manager", "admin"].includes(r))) {
		return <div style={{ padding: 20 }}>권한이 없습니다.</div>;
	}
	const opportunities = await fetchJSON<Opportunity[]>("/api/sales/opportunities");
	const metrics = await fetchJSON<{ stages: Record<string, { count: number; amount: number }> }>(
		"/api/sales/metrics",
	);
	const columns = ["New", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];
	const chartDataCounts = columns.map((c) => ({ stage: c, count: metrics.stages[c]?.count ?? 0 }));
	const chartDataAmount = columns.map((c) => ({ stage: c, amount: metrics.stages[c]?.amount ?? 0 }));

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


