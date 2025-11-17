"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import * as React from "react";
import { mockKPIs } from "@/lib/mockData";

type KPI = { id: string; title: string; value: number; target: number; createdAt?: string };

export default function KPIPage() {
	const [title, setTitle] = React.useState("Monthly Revenue");
	
	// Mock data with timestamps for chart
	const mockKPIsWithDates: KPI[] = mockKPIs.map((kpi, index) => ({
		...kpi,
		createdAt: new Date(Date.now() - (mockKPIs.length - index) * 24 * 60 * 60 * 1000).toISOString(),
	}));

	const series = mockKPIsWithDates
		.filter((k) => k.title === title)
		.slice(0, 12)
		.reverse()
		.map((k) => ({ t: new Date(k.createdAt || Date.now()).toLocaleDateString(), value: k.value, target: k.target }));

	return (
		<div style={{ padding: 20 }}>
			<h1>KPI — {title}</h1>
			<div style={{ width: "100%", height: 260 }}>
				<ResponsiveContainer>
					<LineChart data={series}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="t" />
						<YAxis />
						<Tooltip />
						<Line type="monotone" dataKey="value" stroke="#3b82f6" />
						<Line type="monotone" dataKey="target" stroke="#ef4444" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}


