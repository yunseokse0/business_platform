"use client";

import Link from "next/link";
import { mockBrandAssets, mockGuidelines } from "@/lib/mockData";

type BrandAsset = { id: string; name: string; type: string; url?: string; tags: string[] };
type Guideline = { id: string; title: string; category?: string; tags: string[] };

export default function BrandPage() {
	const assets = mockBrandAssets;
	const guidelines = mockGuidelines;

	return (
		<div style={{ padding: 32, display: "grid", gap: 32, background: "#f9fafb", minHeight: "100vh" }}>
			<div>
				<h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>브랜드 관리</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 16 }}>브랜드 자산과 가이드라인을 관리하세요</p>
			</div>
			
			<section>
				<h2 style={{ margin: "0 0 16px", fontSize: 24, fontWeight: "600", color: "#111827" }}>브랜드 자산</h2>
				<div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
					{assets.map((asset) => (
						<div
							key={asset.id}
							style={{ 
								padding: 24, 
								border: "1px solid #e5e7eb", 
								borderRadius: 16,
								background: "#fff",
								boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
								transition: "all 0.2s ease",
								cursor: "pointer",
								borderLeft: "4px solid #8b5cf6"
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
								href={`/dashboard/brand/assets/${asset.id}`}
								style={{ textDecoration: "none", color: "inherit", display: "block" }}
							>
								<h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: "600", color: "#111827" }}>{asset.name}</h3>
								<div style={{ marginBottom: 12 }}>
									<span style={{ 
										padding: "6px 12px", 
										background: "#f3f4f6", 
										color: "#374151",
										borderRadius: 20,
										fontSize: 13,
										fontWeight: "600"
									}}>
										{asset.type}
									</span>
								</div>
								{asset.tags.length > 0 && (
									<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
										{asset.tags.map((tag) => (
											<span key={tag} style={{ 
												padding: "4px 10px", 
												background: "#e0e7ff", 
												borderRadius: 12, 
												fontSize: 12, 
												color: "#3730a3",
												fontWeight: 500
											}}>
												{tag}
											</span>
										))}
									</div>
								)}
							</Link>
						</div>
					))}
				</div>
			</section>

			<section>
				<h2 style={{ margin: "0 0 16px", fontSize: 24, fontWeight: "600", color: "#111827" }}>가이드라인</h2>
				<div style={{ display: "grid", gap: 16 }}>
					{guidelines.map((guideline) => (
						<div
							key={guideline.id}
							style={{ 
								padding: 24, 
								border: "1px solid #e5e7eb", 
								borderRadius: 16,
								background: "#fff",
								boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
								transition: "all 0.2s ease",
								cursor: "pointer",
								borderLeft: "4px solid #8b5cf6"
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
								href={`/dashboard/brand/guidelines/${guideline.id}`}
								style={{ textDecoration: "none", color: "inherit", display: "block" }}
							>
								<h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: "600", color: "#111827" }}>{guideline.title}</h3>
								<div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
									{guideline.category && (
										<span style={{ 
											padding: "6px 12px", 
											background: "#f3f4f6", 
											color: "#374151",
											borderRadius: 20,
											fontSize: 13,
											fontWeight: "600"
										}}>
											{guideline.category}
										</span>
									)}
									{guideline.tags.length > 0 && guideline.tags.map((tag) => (
										<span key={tag} style={{ 
											padding: "6px 12px", 
											background: "#e0e7ff", 
											borderRadius: 20, 
											fontSize: 13, 
											color: "#3730a3",
											fontWeight: "600"
										}}>
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

