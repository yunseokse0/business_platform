"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function FunnelCountsChart({ data }: { data: Array<{ stage: string; count: number }> }) {
	return (
		<div style={{ width: "100%", height: 220 }}>
			<ResponsiveContainer>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="stage" />
					<YAxis allowDecimals={false} />
					<Tooltip />
					<Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}


