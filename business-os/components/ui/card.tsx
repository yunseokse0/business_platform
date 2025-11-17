import * as React from "react";

export function Card({ children }: { children: React.ReactNode }) {
	return (
		<div
			style={{
				border: "1px solid #e5e7eb",
				borderRadius: 8,
				padding: 16,
				background: "#fff",
			}}
		>
			{children}
		</div>
	);
}

export function CardHeader({ children }: { children: React.ReactNode }) {
	return <div style={{ marginBottom: 8 }}>{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
	return <h3 style={{ margin: 0 }}>{children}</h3>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>;
}


