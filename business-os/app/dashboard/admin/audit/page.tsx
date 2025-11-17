"use client";

import { mockAuditLogs } from "@/lib/mockData";

type Audit = {
	id: string;
	action: string;
	entity: string;
	entityId: string | null;
	userId: string | null;
	createdAt: string;
};

export default function AuditPage() {
	const audits: Audit[] = mockAuditLogs.map((log) => ({
		id: log.id,
		action: log.action,
		entity: log.entity,
		entityId: null,
		userId: null,
		createdAt: log.createdAt,
	}));
	return (
		<div style={{ padding: 20 }}>
			<h1>Audit Logs</h1>
			<div style={{ marginTop: 12 }}>
				<table style={{ width: "100%", borderCollapse: "collapse" }}>
					<thead>
						<tr>
							<th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: 8 }}>Time</th>
							<th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: 8 }}>Action</th>
							<th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: 8 }}>Entity</th>
							<th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: 8 }}>EntityId</th>
							<th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: 8 }}>User</th>
						</tr>
					</thead>
					<tbody>
						{audits.map((a) => (
							<tr key={a.id}>
								<td style={{ borderBottom: "1px solid #f3f4f6", padding: 8 }}>
									{new Date(a.createdAt).toLocaleString()}
								</td>
								<td style={{ borderBottom: "1px solid #f3f4f6", padding: 8 }}>{a.action}</td>
								<td style={{ borderBottom: "1px solid #f3f4f6", padding: 8 }}>{a.entity}</td>
								<td style={{ borderBottom: "1px solid #f3f4f6", padding: 8 }}>{a.entityId}</td>
								<td style={{ borderBottom: "1px solid #f3f4f6", padding: 8 }}>{a.userId}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}


