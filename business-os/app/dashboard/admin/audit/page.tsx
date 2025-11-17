export const revalidate = 60;

type Audit = {
	id: string;
	action: string;
	entity: string;
	entityId: string | null;
	userId: string | null;
	createdAt: string;
};

async function getAudits(): Promise<Audit[]> {
	const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/audit` : "/api/admin/audit", {
		next: { revalidate: 60 },
	});
	return res.json();
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/sessionOptions";

export default async function AuditPage() {
	const session = await getServerSession(authOptions as any);
	const roles = ((session as any)?.user?.roles as string[] | undefined) ?? [];
	if (!roles.includes("admin")) {
		return <div style={{ padding: 20 }}>권한이 없습니다.</div>;
	}
	const audits = await getAudits();
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


