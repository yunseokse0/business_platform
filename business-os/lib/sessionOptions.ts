import Credentials from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				// Mirror the route handler's in-memory users by role based on email prefix
				const email = credentials?.email?.toString().toLowerCase() || "";
				const map: Record<string, string[]> = {
					"admin@example.com": ["admin"],
					"manager@example.com": ["manager"],
					"editor@example.com": ["editor"],
					"viewer@example.com": ["viewer"],
				};
				const roles = map[email];
				if (!roles) return null;
				return { id: email, name: email.split("@")[0], email, roles } as any;
			},
		}),
	],
	session: { strategy: "jwt" },
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				(token as any).roles = (user as any).roles ?? ["viewer"];
			}
			return token;
		},
		async session({ session, token }) {
			(session as any).user = session.user || {};
			(session as any).user.roles = (token as any).roles ?? ["viewer"];
			return session;
		},
	},
};


