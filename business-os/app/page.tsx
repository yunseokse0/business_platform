"use client";

import Link from "next/link";

export default function Home() {
	return (
		<main style={{ 
			minHeight: "100vh", 
			display: "flex", 
			flexDirection: "column", 
			alignItems: "center", 
			justifyContent: "center",
			background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
			padding: 24
		}}>
			<div style={{
				background: "#fff",
				borderRadius: 16,
				padding: 48,
				boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
				maxWidth: 600,
				textAlign: "center"
			}}>
				<h1 style={{ 
					margin: "0 0 16px", 
					fontSize: 48, 
					fontWeight: "bold",
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent"
				}}>
					Business OS
				</h1>
				<p style={{ 
					margin: "0 0 32px", 
					fontSize: 18, 
					color: "#6b7280",
					lineHeight: 1.6
				}}>
					사업의 모든 영역을 커버하는 운영 시스템
				</p>
				<div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
					<div
						style={{
							padding: "12px 24px",
							background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
							borderRadius: 8,
							transition: "transform 0.2s",
							display: "inline-block",
							cursor: "pointer"
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = "translateY(-2px)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = "translateY(0)";
						}}
					>
						<Link 
							href="/dashboard"
							style={{
								color: "#fff",
								textDecoration: "none",
								fontWeight: 600,
								display: "block"
							}}
						>
							대시보드 시작하기
						</Link>
					</div>
					<div
						style={{
							padding: "12px 24px",
							background: "#fff",
							border: "2px solid #667eea",
							borderRadius: 8,
							transition: "transform 0.2s",
							display: "inline-block",
							cursor: "pointer"
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = "translateY(-2px)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = "translateY(0)";
						}}
					>
						<Link 
							href="/login"
							style={{
								color: "#667eea",
								textDecoration: "none",
								fontWeight: 600,
								display: "block"
							}}
						>
							로그인
						</Link>
					</div>
				</div>
				<div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid #e5e7eb" }}>
					<p style={{ margin: "0 0 16px", fontSize: 14, color: "#9ca3af", fontWeight: 600 }}>
						주요 모듈
					</p>
					<div style={{ 
						display: "grid", 
						gridTemplateColumns: "repeat(2, 1fr)", 
						gap: 12,
						textAlign: "left"
					}}>
						{["Operation", "Brand", "Marketing", "Sales", "HR", "Finance", "Product", "Docs"].map((module) => (
							<div key={module} style={{ 
								padding: 12, 
								background: "#f9fafb", 
								borderRadius: 6,
								fontSize: 14,
								color: "#374151"
							}}>
								{module}
							</div>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}


