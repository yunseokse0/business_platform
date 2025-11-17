"use client";

import Link from "next/link";

type Document = { id: string; title: string; content: string; tags: string[] };

// Add mockDocuments to mockData if not exists
const mockDocumentsData: Document[] = [
	{ id: "1", title: "Company Handbook", content: "Welcome to our company! This handbook contains all the important information about our policies, procedures, and culture. It serves as a comprehensive guide for all employees to understand our values and expectations.", tags: ["hr", "policy"] },
	{ id: "2", title: "API Documentation", content: "API endpoints and usage guide for developers. This document provides detailed information about all available endpoints, request/response formats, authentication methods, and code examples.", tags: ["tech", "docs"] },
	{ id: "3", title: "Brand Guidelines", content: "Our brand guidelines ensure consistent messaging and visual identity across all channels. This includes logo usage, color palettes, typography, tone of voice, and design principles.", tags: ["branding", "design"] },
];

export default function DocsPage() {
	const documents = mockDocumentsData;

	return (
		<div style={{ padding: 32, display: "grid", gap: 32, background: "#f9fafb", minHeight: "100vh" }}>
			<div>
				<h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>문서 관리</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 16 }}>회사 문서와 지식 베이스를 관리하세요</p>
			</div>
			
			<section>
				<div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
					{documents.map((doc) => (
						<div
							key={doc.id}
							style={{ 
								padding: 24, 
								border: "1px solid #e5e7eb", 
								borderRadius: 16,
								background: "#fff",
								boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
								transition: "all 0.2s ease",
								cursor: "pointer",
								borderLeft: "4px solid #6366f1"
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = "translateY(-4px)";
								e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.12)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "translateY(0)";
								e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
							}}
						>
							<Link
								href={`/dashboard/docs/${doc.id}`}
								style={{ textDecoration: "none", color: "inherit", display: "block" }}
							>
								<h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: "600", color: "#111827" }}>{doc.title}</h3>
								<p style={{ margin: "0 0 16px", color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
									{doc.content.substring(0, 120)}...
								</p>
								<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
									{doc.tags.map((tag) => (
										<span 
											key={tag} 
											style={{ 
												padding: "6px 12px", 
												background: "#e0e7ff", 
												borderRadius: 20, 
												fontSize: 13,
												color: "#3730a3",
												fontWeight: "600"
											}}
										>
											{tag}
										</span>
									))}
								</div>
							</Link>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}

