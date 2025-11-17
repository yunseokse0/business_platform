import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

type User = { id: string; name: string; email: string; roles: Array<"admin" | "manager" | "editor" | "viewer"> };

const USERS: User[] = [
	{ id: "u1", name: "Admin", email: "admin@example.com", roles: ["admin"] },
	{ id: "u2", name: "Manager", email: "manager@example.com", roles: ["manager"] },
	{ id: "u3", name: "Editor", email: "editor@example.com", roles: ["editor"] },
	{ id: "u4", name: "Viewer", email: "viewer@example.com", roles: ["viewer"] },
];

const handler = NextAuth({
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "email@example.com" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const email = credentials?.email?.toString().toLowerCase();
				const user = USERS.find((u) => u.email === email);
				if (!user) return null;
				// Demo only: accept any password
				return user;
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
});

export { handler as GET, handler as POST };


