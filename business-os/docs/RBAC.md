# BUSINESS OS — RBAC(역할 기반 접근 제어)

## 역할
- admin: 전체 시스템 CRUD, 권한 관리
- manager: 팀/모듈 리소스 CRUD (KPI, Lead, Campaign 등)
- editor: 콘텐츠/문서 생성 및 편집
- viewer: 읽기 전용

## 권한 체크
- 정책: 라우트/핸들러별 requiredRoles 정의 → 미들웨어에서 `hasRole` 호출
- 구현 베이스: `lib/auth.ts` (Mock). 추후 NextAuth/Supabase로 대체.

## 라우트 권한 매핑(예시)
- GET `/api/kpi` → viewer+
- POST `/api/kpi` → manager+
- GET `/api/leads` → viewer+
- POST `/api/leads` → manager+
- GET `/api/docs` → viewer+
- POST `/api/docs` → editor+
- Sales:
  - GET `/api/sales/opportunities` → viewer+
  - POST/PUT/DELETE `/api/sales/opportunities` → manager+
  - GET `/api/sales/metrics` → viewer+
- Admin:
  - GET `/api/admin/audit` → admin

역할 비교 규칙(제안):
admin > manager > editor > viewer

## 향후 고도화
- 리소스 소유자(ownerId) 기반 세분화
- 조직/팀 단위 스코프(OrgId, TeamId)
- 감사 로그(Audit), 보안 이벤트, API 키

## 클라이언트 가드/네비게이션
- SessionProvider(App 레이아웃)로 세션 주입
- 클라이언트 가드 컴포넌트: `components/auth/RequireRole.tsx`
- 역할 기반 사이드바: `components/layout/Sidebar.tsx`


