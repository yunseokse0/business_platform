# BUSINESS OS — API 레퍼런스

기본 경로: `/api/*`

## 인증
- 현재: Mock 사용 (향후 NextAuth/Supabase 연동)
- 권한: RBAC 문서 참고

## KPI (DB-backed)
### GET /api/kpi
- 응답 200
```json
[{"id":"ckpi","title":"Revenue","value":120,"target":100,"ownerId":null,"createdAt":"..."}]
```
### POST /api/kpi
- 권한: manager+
- 요청
```json
{"title":"Revenue","value":0,"target":100}
```
- 응답 201
```json
{"id":"ckpi","title":"Revenue","value":0,"target":100,"ownerId":null,"createdAt":"..."}
```
### PUT /api/kpi?id=:id
- 권한: manager+
- 요청
```json
{"title":"Revenue MTD","target":150}
```
- 응답 200
```json
{"id":"ckpi","title":"Revenue MTD","value":0,"target":150,"ownerId":null,"createdAt":"..."}
```
### DELETE /api/kpi?id=:id
- 권한: manager+
- 응답 204

## Leads (DB-backed)
### GET /api/leads
- 응답 200
```json
[{"id":"clead","name":"Acme Inc","stage":"New","createdAt":"...","history":null}]
```
### POST /api/leads
- 권한: manager+
- 요청
```json
{"name":"Globex","stage":"Qualified"}
```
- 응답 201
```json
{"id":"clead","name":"Globex","stage":"Qualified","createdAt":"...","history":null}
```
### PUT /api/leads?id=:id
- 권한: manager+
- 요청
```json
{"stage":"Won"}
```
- 응답 200
```json
{"id":"clead","name":"Globex","stage":"Won","createdAt":"...","history":null}
```
### DELETE /api/leads?id=:id
- 권한: manager+
- 응답 204

## Docs (DB-backed)

## Sales
### GET /api/sales/opportunities
- 권한: viewer+
- 쿼리
  - stage: 필터 (예: stage=Qualified)
  - q: 제목 검색 (부분일치)
  - sort: createdAt|amount|title|stage (기본 createdAt)
  - order: asc|desc (기본 desc)
- 응답 200
```json
[{"id":"o1","title":"ACV Expansion","amount":5000,"stage":"Qualified","createdAt":"...","updatedAt":"..."}]
```
### GET /api/sales/opportunities?id=:id
- 권한: viewer+
- 응답 200
```json
{"id":"o1","title":"ACV Expansion","amount":5000,"stage":"Qualified","createdAt":"...","updatedAt":"..."}
```
### POST /api/sales/opportunities
- 권한: manager+
- 요청
```json
{"title":"New Deal","amount":10000,"stage":"New"}
```
- 응답 201
```json
{"id":"o2","title":"New Deal","amount":10000,"stage":"New","createdAt":"...","updatedAt":"..."}
```
### PUT /api/sales/opportunities?id=:id
- 권한: manager+
- 요청
```json
{"stage":"Negotiation"}
```
- 응답 200
```json
{"id":"o2","title":"New Deal","amount":10000,"stage":"Negotiation","createdAt":"...","updatedAt":"..."}
```
### DELETE /api/sales/opportunities?id=:id
- 권한: manager+
- 응답 204

### GET /api/sales/metrics
- 권한: viewer+
- 응답 200
```json
{"stages":{"New":{"count":3,"amount":20000},"Qualified":{"count":2,"amount":15000}}}
```
### GET /api/docs
- 응답 200
```json
[{"id":"cdoc","title":"Company Handbook","tags":["hr","policy"],"content":"...","createdAt":"..."}]
```
### POST /api/docs
- 권한: editor+
- 요청
```json
{"title":"Policy","content":"...","tags":["hr"]}
```
- 응답 201
```json
{"id":"cdoc","title":"Policy","content":"...","tags":["hr"],"createdAt":"..."}
```
### PUT /api/docs?id=:id
- 권한: editor+
- 요청
```json
{"title":"Policy v2"}
```
- 응답 200
```json
{"id":"cdoc","title":"Policy v2","content":"...","tags":["hr"],"createdAt":"..."}
```
### DELETE /api/docs?id=:id
- 권한: manager+
- 응답 204

## 검증
- 모든 POST/PUT은 Zod 스키마 기반 검증을 통과해야 합니다.

## 오류 형식(예시)
```json
{ "error": "Method Not Allowed" }
```
기타 상태 코드
- 400: 유효성 검증 실패
- 401: 인증 실패(향후)
- 403: 권한 없음
- 405: 허용되지 않은 메서드
- 429: 과도한 요청
- 500: 서버 오류

## 확장 가이드
- POST/PUT/DELETE 추가 시 입력 스키마를 명시하고, 400/401/403/404/409/422를 구분 처리
- 서버 입력 검증(Zod/Yup), 속도 제한(Rate limit), 감사 로그 권장


