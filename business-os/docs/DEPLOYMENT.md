# BUSINESS OS — 배포/CI 가이드

## 배포 타깃
- 웹: Vercel
- DB: 매니지드 PostgreSQL(Supabase/Neon/RDS)

## 환경변수
- `DATABASE_URL` (필수)
- 인증 공급자 키(도입 시)

## 빌드/런타임
```bash
npm run build
npm start
```

## 데이터베이스 마이그레이션
배포 파이프라인에서:
```bash
npx prisma migrate deploy
```

## GitHub Actions(예시 워크플로 개요)
- 트리거: push(main), PR
- 작업:
  1. Node 설치, 의존성 설치
  2. 빌드 및 타입체크/테스트
  3. Prisma generate
  4. Vercel 배포(Preview/Production)
  5. Production 배포 시 `prisma migrate deploy`

### 포함된 CI 예시
레포에 `.github/workflows/ci.yml`이 포함되어 있습니다.
- business-os 디렉터리에서 npm ci → prisma generate → build를 수행합니다.

## 모니터링/로그
- Vercel Analytics, Sentry
- DB 성능/쿼리 로깅


