"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

type Document = { id: string; title: string; content: string; tags: string[] };

const mockDocumentsData: Document[] = [
	{ id: "1", title: "Company Handbook", content: "Welcome to our company! This handbook contains all the important information about our policies, procedures, and culture. It serves as a comprehensive guide for all employees to understand our values and expectations.", tags: ["hr", "policy"] },
	{ id: "2", title: "API Documentation", content: "API endpoints and usage guide for developers. This document provides detailed information about all available endpoints, request/response formats, authentication methods, and code examples.", tags: ["tech", "docs"] },
	{ id: "3", title: "Brand Guidelines", content: "Our brand guidelines ensure consistent messaging and visual identity across all channels. This includes logo usage, color palettes, typography, tone of voice, and design principles.", tags: ["branding", "design"] },
];

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { id } = params;
	const document = mockDocumentsData.find((d) => d.id === id);

	if (!document) {
		return (
			<div style={{ padding: 32 }}>
				<h1>문서를 찾을 수 없습니다</h1>
				<Link href="/dashboard/docs" style={{ color: "#3b82f6", textDecoration: "none" }}>
					← 목록으로 돌아가기
				</Link>
			</div>
		);
	}

	return (
		<div style={{ padding: 32, maxWidth: 900, background: "#f9fafb", minHeight: "100vh" }}>
			<div style={{ marginBottom: 24 }}>
				<Link 
					href="/dashboard/docs" 
					style={{ 
						color: "#3b82f6", 
						textDecoration: "none",
						fontSize: 14,
						marginBottom: 16,
						display: "inline-block"
					}}
				>
					← 목록으로 돌아가기
				</Link>
				<h1 style={{ margin: "16px 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>{document.title}</h1>
			</div>

			<div style={{ 
				background: "#fff", 
				borderRadius: 12, 
				padding: 32, 
				boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
				display: "grid",
				gap: 24
			}}>
				<div>
					<label style={{ display: "block", marginBottom: 12, fontSize: 14, fontWeight: "600", color: "#374151" }}>
						내용
					</label>
					<div style={{ 
						padding: 20, 
						background: "#f9fafb", 
						borderRadius: 8,
						fontSize: 16,
						color: "#111827",
						lineHeight: 1.7,
						whiteSpace: "pre-wrap"
					}}>
						{document.content}
					</div>
				</div>

				{document.tags.length > 0 && (
					<div>
						<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
							태그
						</label>
						<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
							{document.tags.map((tag) => (
								<span 
									key={tag} 
									style={{ 
										padding: "6px 12px", 
										background: "#f3f4f6", 
										borderRadius: 12, 
										fontSize: 14,
										color: "#374151",
										fontWeight: 500
									}}
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				)}

				<div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid #e5e7eb" }}>
					<button 
						onClick={() => router.back()}
						style={{ 
							padding: "12px 24px", 
							background: "#111827", 
							color: "#fff",
							border: "none",
							borderRadius: 8,
							fontSize: 14,
							fontWeight: "600",
							cursor: "pointer"
						}}
					>
						뒤로가기
					</button>
				</div>
			</div>
		</div>
	);
}

