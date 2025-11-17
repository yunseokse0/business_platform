"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

async function fetchOne(id: string) {
	const res = await fetch(`/api/sales/opportunities?id=${encodeURIComponent(id)}`, { cache: "no-store" });
	if (!res.ok) throw new Error("Failed to load");
	return res.json();
}

export default function SalesDetailPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { id } = params;
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);
	const [title, setTitle] = React.useState("");
	const [amount, setAmount] = React.useState<number>(0);
	const [stage, setStage] = React.useState("New");

	const load = React.useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await fetchOne(id);
			setTitle(data.title || "");
			setAmount(data.amount || 0);
			setStage(data.stage || "New");
		} catch (e: any) {
			setError(e?.message ?? "Error");
		} finally {
			setLoading(false);
		}
	}, [id]);

	React.useEffect(() => {
		load();
	}, [load]);

	const save = async () => {
		setLoading(true);
		try {
			const res = await fetch(`/api/sales/opportunities?id=${encodeURIComponent(id)}`, {
				method: "PUT",
				headers: { "content-type": "application/json", "x-role": "manager" },
				body: JSON.stringify({ title, amount, stage }),
			});
			if (!res.ok) throw new Error((await res.json()).error ?? "Failed");
			router.push("/dashboard/sales");
		} catch (e: any) {
			setError(e?.message ?? "Error");
		} finally {
			setLoading(false);
		}
	};

	const del = async () => {
		if (!confirm("정말 삭제하시겠습니까?")) return;
		setLoading(true);
		try {
			const res = await fetch(`/api/sales/opportunities?id=${encodeURIComponent(id)}`, {
				method: "DELETE",
				headers: { "x-role": "manager" },
			});
			if (!res.ok && res.status !== 204) throw new Error((await res.json()).error ?? "Failed");
			router.push("/dashboard/sales");
		} catch (e: any) {
			setError(e?.message ?? "Error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ padding: 20, display: "grid", gap: 12, maxWidth: 480 }}>
			<h1>Opportunity Detail</h1>
			{loading && <div>Loading...</div>}
			{error && <div style={{ color: "#dc2626" }}>{error}</div>}
			<label>
				<div>Title</div>
				<input value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: 8, border: "1px solid #e5e7eb", borderRadius: 6, width: "100%" }} />
			</label>
			<label>
				<div>Amount</div>
				<input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value || "0"))} style={{ padding: 8, border: "1px solid #e5e7eb", borderRadius: 6, width: "100%" }} />
			</label>
			<label>
				<div>Stage</div>
				<select value={stage} onChange={(e) => setStage(e.target.value)} style={{ padding: 8, border: "1px solid #e5e7eb", borderRadius: 6, width: "100%" }}>
					{["New", "Qualified", "Proposal", "Negotiation", "Won", "Lost"].map((s) => (
						<option key={s} value={s}>
							{s}
						</option>
					))}
				</select>
			</label>
			<div style={{ display: "flex", gap: 8 }}>
				<button onClick={save} disabled={loading} style={{ padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: 6, background: "#111827", color: "#fff" }}>
					Save
				</button>
				<button onClick={del} disabled={loading} style={{ padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: 6 }}>
					Delete
				</button>
				<button onClick={() => router.back()} style={{ padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: 6 }}>
					Back
				</button>
			</div>
		</div>
	);
}


