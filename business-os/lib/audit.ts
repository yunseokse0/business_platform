import { logInfo } from "./logger";
import { prisma } from "./prisma";

type AuditEvent = {
	action: "create" | "update" | "delete";
	entity: "kpi" | "lead" | "document" | "task" | "incident" | "brandAsset" | "guideline" | "campaign" | "employee" | "leave" | "expense" | "budget" | "requirement" | "release";
	entityId?: string;
	userId?: string;
	meta?: Record<string, unknown>;
};

export async function recordAudit(evt: AuditEvent) {
	logInfo("AUDIT", evt);
	try {
		const data: any = {
			action: evt.action,
			entity: evt.entity,
			entityId: evt.entityId ?? null,
			userId: evt.userId ?? null,
		};
		if (typeof evt.meta !== "undefined") {
			data.meta = evt.meta as any;
		}
		await prisma.auditLog.create({ data });
	} catch {
		// swallow audit persistence errors to not block main flow
	}
}


