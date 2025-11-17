"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

export function FunnelAmountChart({ data }: { data: Array<{ stage: string; amount: number }> }) {
	return (
		<div style={{ width: "100%", height: 240 }}>
			<ResponsiveContainer>
				<PieChart>
					<Pie data={data} dataKey="amount" nameKey="stage" outerRadius={90} label>
						{data.map((_, idx) => (
							<Cell key={idx} fill={COLORS[idx % COLORS.length]} />
						))}
					</Pie>
					<Tooltip />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}


