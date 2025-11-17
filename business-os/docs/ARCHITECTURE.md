# BUSINESS OS — 아키텍처 개요

이 문서는 BUSINESS OS의 전반적인 구조, 데이터 모델, 핵심 플로우와 확장 포인트를 설명합니다.

## 1. 시스템 개요
- 프론트엔드: Next.js(App Router) + React 18 + TypeScript
- 서버(API): Next.js API Routes (필요 시 Microservice로 확장 가능)
- 데이터베이스: PostgreSQL (Supabase/Neon/PlanetScale(Postgres) 등)
- ORM: Prisma
- 인증: 추후 NextAuth/Supabase Auth 연동 (현재는 `lib/auth.ts`의 Mock)
- 파일 스토리지: S3 호환 스토리지 권장
- 배포: Vercel(웹) + DB 매니지드 서비스
- CI/CD: GitHub Actions → Vercel/DB 마이그레이션 자동화

## 2. 폴더 구조 (요약)
```
app/               # Next.js App Router 페이지
components/        # UI 컴포넌트
lib/               # 공용 라이브러리 (prisma, auth 등)
pages/api/         # REST API 라우트
prisma/            # Prisma 스키마
scripts/           # Seed 등 스크립트
docs/              # 문서
```

## 3. 데이터 모델 (현재 버전)
- KPI(id, title, value, target, ownerId, createdAt)
- Lead(id, name, stage, history, createdAt)
- Document(id, title, content, tags[], createdAt)
- Opportunity(id, title, amount, stage, createdAt, updatedAt)
- AuditLog(id, action, entity, entityId, userId, meta, createdAt)

참고: 전체 스키마는 `prisma/schema.prisma` 참조.

## 4. 권한 모델 (RBAC)
- 기본 롤: admin, manager, editor, viewer
- 기본 정책: API 라우트/도메인별 requiredRoles를 정의하고 미들웨어에서 체크
- 현재: `lib/auth.ts`에 Mock 사용자/역할, `hasRole` 유틸 제공

## 5. 요청 플로우
1) 사용자가 페이지 접근 (Next.js App Router)
2) 필요한 데이터는 서버 컴포넌트 fetch 또는 클라이언트 fetch로 API 호출
3) API 라우트에서 인증/권한 확인 → Prisma로 DB 액세스 → 응답

## 6. 확장/모듈화 전략
- 모듈별 디렉터리 구조 분리(예: app/(modules)/sales, pages/api/sales 등)
- 외부 연동(예: Slack, Google Calendar, Zapier)은 모듈 단위 플러그인으로 추가
- 이벤트/로그 수집 → DWH(BigQuery/Redshift/Snowflake)로 확장 가능

## 7. 성능/보안
- 성능: React Server Components, 적절한 캐싱/ISR 도입
- API 캐시: GET 응답에 `Cache-Control: s-maxage, stale-while-revalidate` 적용
- 보안: 인증/권한 필수화, 입력 검증, 환경변수/시크릿 안전 관리, 감사 로그

## 8. 배포/운영
- 배포: Vercel (Preview/Production), GitHub Actions로 CI 구성
- 마이그레이션: `npx prisma migrate deploy`로 CD 단계에서 배포
- 모니터링: Vercel Analytics, Sentry, DB 모니터링


