"use client";

import { useRouter } from "next/navigation";
import { mockReleases } from "@/lib/mockData";
import Link from "next/link";

export default function ReleaseDetailPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { id } = params;
	const release = mockReleases.find((r) => r.id === id);

	if (!release) {
		return (
			<div style={{ padding: 32 }}>
				<h1>릴리즈를 찾을 수 없습니다</h1>
				<Link href="/dashboard/product" style={{ color: "#3b82f6", textDecoration: "none" }}>
					← 목록으로 돌아가기
				</Link>
			</div>
		);
	}

	return (
		<div style={{ padding: 32, maxWidth: 800, background: "#f9fafb", minHeight: "100vh" }}>
			<div style={{ marginBottom: 24 }}>
				<Link 
					href="/dashboard/product" 
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
				<h1 style={{ margin: "16px 0 8px", fontSize: 32, fontWeight: "bold", color: "#111827" }}>{release.name} v{release.version}</h1>
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
						버전
					</label>
					<div style={{ 
						padding: 12, 
						background: "#f9fafb", 
						borderRadius: 8,
						fontSize: 16,
						color: "#111827"
					}}>
						{release.version}
					</div>
				</div>

				<div>
					<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
						상태
					</label>
					<div style={{ 
						padding: 12, 
						background: release.status === "Released" ? "#f0fdf4" : release.status === "Development" ? "#fffbeb" : "#f3f4f6", 
						borderRadius: 8,
						fontSize: 16,
						color: release.status === "Released" ? "#16a34a" : release.status === "Development" ? "#d97706" : "#6b7280",
						fontWeight: "600"
					}}>
						{release.status}
					</div>
				</div>

				{release.releaseDate && (
					<div>
						<label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#374151" }}>
							릴리즈 날짜
						</label>
						<div style={{ 
							padding: 12, 
							background: "#f9fafb", 
							borderRadius: 8,
							fontSize: 16,
							color: "#111827"
						}}>
							{new Date(release.releaseDate).toLocaleDateString("ko-KR")}
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

