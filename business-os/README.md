Business OS — Quick Start

What this is
- Fully runnable Next.js + TypeScript scaffold with Prisma
- Minimal API samples for KPI, Leads, Docs
- Creates a distributable ZIP via create_zip.sh

Documentation
- 자세 문서는 docs/ 디렉터리에 있습니다:
  - docs/ARCHITECTURE.md — 전체 시스템 구조, 데이터 모델, 플로우
  - docs/MODULES.md — 8개 모듈별 도메인/화면/엔드포인트
  - docs/RBAC.md — 권한 설계 및 라우트 매핑
  - docs/API_REFERENCE.md — REST API 스펙과 예시
  - docs/SETUP.md — 로컬 개발/설정/시드
  - docs/DEPLOYMENT.md — 배포 및 CI 파이프라인 가이드

Requirements
- Node.js 18+
- npm or pnpm
- Optional: bash and zip (for create_zip.sh). On Windows, use WSL or Git Bash.

Setup
1) Install deps:
   npm install

2) Configure database:
   - Set DATABASE_URL in .env
   - Run:
     npx prisma generate
     npx prisma migrate dev --name init
     npm run build

3) Seed (optional):
   ts-node scripts/seed.ts
   or:
   node --loader ts-node/esm scripts/seed.ts

Run
- Dev: npm run dev
- Build: npm run build
- Start: npm start

ZIP
- Make the distributable zip by running:
  chmod +x create_zip.sh
  ./create_zip.sh

This creates business-os.zip at the same level as this folder.


