"use client";

import { useRouter } from "next/navigation";
import { mockBrandAssets } from "@/lib/mockData";
import Link from "next/link";

export default function BrandAssetDetailPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { id } = params;
	const asset = mockBrandAssets.find((a) => a.id === id);

	if (!asset) {
		return (
			<div style={{ padding: 32 }}>
				<h1>자산을 찾을 수 없습니다</h1>
				<Link href="/dashboard/brand" style={{ color: "#3b82f6", textDecoration: "none" }}>
					← 목록으로 돌아가기
				</Link>
			</div>
		);
	}

	return (
		<div style={{ padding: 32, maxWidth: 800, background: "#f9fafb", minHeight: "100vh" }}>
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
				<h1 style={{ margin: "16px 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>{asset.name}</h1>
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
					<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
						유형
					</label>
					<div style={{ 
						padding: 12, 
						background: "#f9fafb", 
						borderRadius: 8,
						fontSize: 16,
						color: "#111827"
					}}>
						{asset.type}
					</div>
				</div>

				{asset.url && (
					<div>
						<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
							URL
						</label>
						<a 
							href={asset.url} 
							target="_blank" 
							rel="noopener noreferrer"
							style={{ 
								padding: 12, 
								background: "#f9fafb", 
								borderRadius: 8,
								fontSize: 16,
								color: "#3b82f6",
								textDecoration: "none",
								display: "inline-block"
							}}
						>
							{asset.url}
						</a>
					</div>
				)}

				{asset.tags.length > 0 && (
					<div>
						<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
							태그
						</label>
						<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
							{asset.tags.map((tag) => (
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

