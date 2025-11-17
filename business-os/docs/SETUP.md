# BUSINESS OS — 로컬 개발 설정

## 요구사항
- Node.js 18+
- npm 또는 pnpm
- 데이터베이스(PostgreSQL) 및 연결 문자열

## 설치
```bash
npm install
```

## 환경변수
- `.env` 파일에 `DATABASE_URL` 설정
```
DATABASE_URL="postgresql://user:pass@host:port/db"
```
상세는 `docs/ENV_VARS.md` 참고.

### 인증(NextAuth)
필수:
```
NEXTAUTH_SECRET="replace-with-strong-secret"
NEXTAUTH_URL="http://localhost:3000"
```
데모 로그인 페이지: `/login`
데모 계정: `admin@example.com`, `manager@example.com`, `editor@example.com`, `viewer@example.com` (아무 비밀번호)

## Prisma
```bash
npx prisma generate
npx prisma migrate dev --name init
```

## 시드(Optional)
```bash
npm run seed
```

## 개발 서버
```bash
npm run dev
```


