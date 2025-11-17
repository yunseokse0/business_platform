"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import * as React from "react";

export default function LoginPage() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <div style={{ padding: 24 }}>Loading...</div>;
	}
	if (session) {
		return (
			<div style={{ padding: 24, display: "grid", gap: 12 }}>
				<div>Signed in as {(session.user as any)?.email}</div>
				<div>Roles: {((session.user as any)?.roles || []).join(", ")}</div>
				<button onClick={() => signOut()} style={{ width: 160, padding: 8 }}>
					Sign out
				</button>
			</div>
		);
	}
	return (
		<div style={{ padding: 24, display: "grid", gap: 12, maxWidth: 360 }}>
			<h1>Sign In</h1>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					const form = e.currentTarget as HTMLFormElement;
					const email = (form.elements.namedItem("email") as HTMLInputElement).value;
					const password = (form.elements.namedItem("password") as HTMLInputElement).value;
					await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
				}}
				style={{ display: "grid", gap: 8 }}
			>
				<input name="email" placeholder="admin@example.com" style={{ padding: 8, border: "1px solid #e5e7eb" }} />
				<input name="password" type="password" placeholder="password" style={{ padding: 8, border: "1px solid #e5e7eb" }} />
				<button type="submit" style={{ padding: 8, width: 120 }}>
					Sign in
				</button>
			</form>
			<div style={{ color: "#6b7280" }}>
				Demo emails: admin@example.com, manager@example.com, editor@example.com, viewer@example.com (password any)
			</div>
		</div>
	);
}


