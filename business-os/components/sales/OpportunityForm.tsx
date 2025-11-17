"use client";

import * as React from "react";

export function OpportunityForm({ onCreated }: { onCreated?: () => void }) {
	const [title, setTitle] = React.useState("");
	const [amount, setAmount] = React.useState<number>(0);
	const [stage, setStage] = React.useState("New");
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("/api/sales/opportunities", {
				method: "POST",
				headers: { "content-type": "application/json", "x-role": "manager" },
				body: JSON.stringify({ title, amount, stage }),
			});
			if (!res.ok) throw new Error((await res.json()).error ?? "Failed");
			setTitle("");
			setAmount(0);
			setStage("New");
			onCreated?.();
		} catch (err: any) {
			setError(err?.message ?? "Error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
			<div style={{ fontWeight: 600 }}>Create Opportunity</div>
			<input
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				style={{ padding: 8, border: "1px solid #e5e7eb", borderRadius: 6 }}
			/>
			<input
				type="number"
				placeholder="Amount"
				value={amount}
				onChange={(e) => setAmount(parseFloat(e.target.value || "0"))}
				style={{ padding: 8, border: "1px solid #e5e7eb", borderRadius: 6 }}
			/>
			<select
				value={stage}
				onChange={(e) => setStage(e.target.value)}
				style={{ padding: 8, border: "1px solid #e5e7eb", borderRadius: 6 }}
			>
				{["New", "Qualified", "Proposal", "Negotiation", "Won", "Lost"].map((s) => (
					<option key={s} value={s}>
						{s}
					</option>
				))}
			</select>
			<button
				type="submit"
				disabled={loading}
				style={{ padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: 6, background: "#111827", color: "#fff" }}
			>
				{loading ? "Creating..." : "Create"}
			</button>
			{error && <div style={{ color: "#dc2626" }}>{error}</div>}
		</form>
	);
}


