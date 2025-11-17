"use client";

import * as React from "react";

type Opportunity = { id: string; title: string; amount: number; stage: string };
const STAGES = ["New", "Qualified", "Proposal", "Negotiation", "Won", "Lost"] as const;

export function Kanban({ initial }: { initial: Opportunity[] }) {
	const [items, setItems] = React.useState<Opportunity[]>(initial);
	const byStage = React.useMemo(
		() => Object.fromEntries(STAGES.map((s) => [s, items.filter((i) => i.stage === s)])),
		[items],
	) as Record<string, Opportunity[]>;

	const onDragStart = (e: React.DragEvent<HTMLElement>, id: string) => {
		e.dataTransfer.setData("text/plain", id);
	};
	const onDrop = async (e: React.DragEvent<HTMLDivElement>, stage: string) => {
		const id = e.dataTransfer.getData("text/plain");
		if (!id) return;
		setItems((prev) => prev.map((p) => (p.id === id ? { ...p, stage } : p)));
		// Persist
		await fetch(`/api/sales/opportunities?id=${encodeURIComponent(id)}`, {
			method: "PUT",
			headers: { "content-type": "application/json", "x-role": "manager" },
			body: JSON.stringify({ stage }),
		});
	};
	const allowDrop = (e: React.DragEvent) => e.preventDefault();

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${STAGES.length}, 1fr)`,
				gap: 12,
				alignItems: "start",
			}}
		>
			{STAGES.map((col) => (
				<div
					key={col}
					onDragOver={allowDrop}
					onDrop={(e) => onDrop(e, col)}
					style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 8, minHeight: 200 }}
				>
					<div style={{ fontWeight: 600, marginBottom: 8 }}>
						{col} ({byStage[col]?.length ?? 0})
					</div>
					<div style={{ display: "grid", gap: 8 }}>
						{byStage[col]?.map((o) => (
							<a
								key={o.id}
								draggable
								onDragStart={(e) => onDragStart(e, o.id)}
								style={{
									border: "1px solid #e5e7eb",
									borderRadius: 6,
									padding: 8,
									background: "#fff",
									cursor: "grab",
									textDecoration: "none",
									color: "inherit",
								}}
								href={`/dashboard/sales/${o.id}`}
							>
								<div style={{ fontWeight: 600 }}>{o.title}</div>
								<div style={{ color: "#6b7280" }}>${o.amount.toFixed(2)}</div>
							</a>
						))}
					</div>
				</div>
			))}
		</div>
	);
}


