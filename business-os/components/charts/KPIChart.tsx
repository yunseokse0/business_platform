type KPI = { id: string; title: string; value: number };

export function KPIChart({ data }: { data: KPI[] }) {
	return (
		<div style={{ display: "flex", gap: 12 }}>
			{data.map((kpi) => (
				<div key={kpi.id} style={{ textAlign: "center" }}>
					<div
						style={{
							width: 80,
							height: 80,
							borderRadius: "50%",
							border: "4px solid #3b82f6",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontWeight: 600,
						}}
					>
						{kpi.value}
					</div>
					<div style={{ marginTop: 8 }}>{kpi.title}</div>
				</div>
			))}
		</div>
	);
}


