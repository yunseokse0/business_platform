# BUSINESS OS — 모듈 스펙

모듈: Operation, Brand, Marketing, Sales, Docs, HR, Finance, Product (총 8개)

각 모듈은 도메인 모델, 대표 화면, API, 권한을 기준으로 확장합니다.

## 공통 UI 라우팅
- 대시보드: `/dashboard`
- 모듈별 플레이스홀더: `/dashboard/[module]`

## 1) Operation
- 목적: 업무 운영 KPI, 작업 관리, 운영 이벤트
- 예시 모델: Task, Runbook, Incident, KPI
- API: `/api/operation/tasks`, `/api/operation/incidents`
- 권한: manager 이상 CRUD, viewer 읽기

## 2) Brand
- 목적: 브랜드 자산, 가이드, 캠페인 자산 관리
- 예시 모델: BrandAsset, Guideline, CampaignAsset
- API: `/api/brand/assets`, `/api/brand/guidelines`
- 권한: editor 이상 생성/편집, viewer 읽기

## 3) Marketing
- 목적: 캠페인/채널/콘텐츠 성과 관리
- 예시 모델: Campaign, Channel, Content, KPI
- API: `/api/marketing/campaigns`, `/api/marketing/kpis`
- 권한: manager 이상 캠페인 운영, editor 콘텐츠 편집

## 4) Sales
- 목적: 리드/파이프라인/거래 추적
- 모델: Lead(id, name, stage, history), Opportunity(id, title, amount, stage)
- API: `/api/leads`, `/api/sales/opportunities`, `/api/sales/metrics`
- 권한: manager 이상 파이프라인 편집, viewer 조회
 - 파이프라인(칸반): `/dashboard/sales` (서버 컴포넌트, revalidate=60)
 - 차트: `/api/sales/metrics`의 stage별 count/amount 사용
 - 시각화: Recharts 기반 바/파이 차트 (Counts/Amount)

## 5) Docs
- 목적: 문서/지식 베이스
- 모델: Document(id, title, content, tags[])
- API: `/api/docs`
- 권한: editor 이상 문서 편집, viewer 조회

## 6) HR
- 목적: 인사/채용/근태/정책
- 예시 모델: Employee, Policy, Leave, Recruitment
- API: `/api/hr/employees`, `/api/hr/policies`
- 권한: admin/manager 민감 데이터 접근

## 7) Finance
- 목적: 비용/예산/정산
- 예시 모델: Expense, Budget, Invoice, Approval(User)
- API: `/api/finance/expenses`, `/api/finance/budgets`
- 권한: manager 이상 승인/편집, viewer 조회

## 8) Product
- 목적: 요구사항/로드맵/릴리즈
- 예시 모델: Requirement, RoadmapItem, Release
- API: `/api/product/requirements`, `/api/product/releases`
- 권한: editor 이상 작성, manager 우선순위/승인

## 샘플 페이로드
```json
// Lead
{ "name": "Acme Inc", "stage": "New", "history": [{"at": "2025-01-01", "note": "Created"}] }
```


