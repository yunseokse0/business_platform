import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { hasRole, type Role, getMockUser } from "./auth";
import { getSessionRolesInApi } from "./session";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type HandlerMap = Partial<Record<Method, NextApiHandler>>;

type CreateApiHandlerOptions = {
	requiredRoles?: Role[] | Partial<Record<Method, Role[]>>;
	handlers: HandlerMap;
	validate?: Partial<Record<Method, (body: unknown) => void>>;
	rateLimit?: (req: NextApiRequest) => Promise<void> | void;
};

function sendError(res: NextApiResponse, status: number, message: string, details?: unknown) {
	return res.status(status).json({ error: message, details });
}

export function createApiHandler(options: CreateApiHandlerOptions): NextApiHandler {
	const { requiredRoles = [], handlers, validate = {}, rateLimit } = options;

	return async function handler(req: NextApiRequest, res: NextApiResponse) {
		try {
			// Optional basic rate limiting
			if (rateLimit) {
				await rateLimit(req);
			}

			// AuthN/AuthZ: prefer NextAuth session roles if available, otherwise header mock fallback
			const sessionRoles = await getSessionRolesInApi(req, res);
			const user = sessionRoles?.length ? { id: "session", roles: sessionRoles as Role[] } : getMockUser(req);
			const method = (req.method || "GET").toUpperCase() as Method;
			let required: Role[] = [];
			if (Array.isArray(requiredRoles)) {
				required = requiredRoles;
			} else if (typeof requiredRoles === "object" && requiredRoles) {
				required = (requiredRoles as Partial<Record<Method, Role[]>>)[method] || [];
			}
			if (!hasRole(user.roles, required)) {
				return sendError(res, 403, "Forbidden");
			}

			const methodHandler = handlers[method];
			if (!methodHandler) {
				return sendError(res, 405, "Method Not Allowed");
			}

			// Optional validation
			const validator = validate[method];
			if (validator) {
				try {
					validator(req.body);
				} catch (e: any) {
					return sendError(res, 400, "Invalid request body", e?.message ?? String(e));
				}
			}

			return await methodHandler(req, res);
		} catch (e: any) {
			// Standardized server error
			return sendError(res, 500, "Internal Server Error");
		}
	};
}


