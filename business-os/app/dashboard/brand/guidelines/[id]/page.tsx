"use client";

import { useRouter } from "next/navigation";
import { mockGuidelines } from "@/lib/mockData";
import Link from "next/link";

export default function GuidelineDetailPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { id } = params;
	const guideline = mockGuidelines.find((g) => g.id === id);

	if (!guideline) {
		return (
			<div style={{ padding: 32 }}>
				<h1>가이드라인을 찾을 수 없습니다</h1>
				<Link href="/dashboard/brand" style={{ color: "#3b82f6", textDecoration: "none" }}>
					← 목록으로 돌아가기
				</Link>
			</div>
		);
	}

	return (
		<div style={{ padding: 32, maxWidth: 900, background: "#f9fafb", minHeight: "100vh" }}>
			<div style={{ marginBottom: 24 }}>
				<Link 
					href="/dashboard/brand" 
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
				<h1 style={{ margin: "16px 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>{guideline.title}</h1>
			</div>

			<div style={{ 
				background: "#fff", 
				borderRadius: 12, 
				padding: 32, 
				boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
				display: "grid",
				gap: 24
			}}>
				{guideline.category && (
					<div>
						<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
							카테고리
						</label>
						<div style={{ 
							padding: 12, 
							background: "#f9fafb", 
							borderRadius: 8,
							fontSize: 16,
							color: "#111827"
						}}>
							{guideline.category}
						</div>
					</div>
				)}

				{guideline.tags.length > 0 && (
					<div>
						<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
							태그
						</label>
						<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
							{guideline.tags.map((tag) => (
								<span 
									key={tag} 
									style={{ 
										padding: "6px 12px", 
										background: "#f3f4f6", 
										borderRadius: 12, 
										fontSize: 14,
										color: "#374151"
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

