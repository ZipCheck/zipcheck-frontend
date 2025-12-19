# 📢 ZipCheck 공지사항(Notice) API 명세서

본 문서는 **ZipCheck 백엔드 NoticeController 기준**의 공지사항 API 명세이다.

프론트엔드(Vue)는 **이미 완성된 공지사항 UI/UX를 유지**한 채,
본 문서를 기준으로 **API 요청/응답 로직만 구현**해야 한다.

---

## 1. 공통 규칙

### Base URL

```text
http://localhost:8080
```

### 공통 Response 형식 (ApiResponse)

```json
{
  "success": true,
  "message": "OK",
  "data": {}
}
```

### 인증 방식

* JWT Access Token 사용
* 관리자 권한이 필요한 API는 반드시 Header 포함

```http
Authorization: Bearer {ACCESS_TOKEN}
Content-Type: application/json
```

---

## 2. 공지사항 카테고리 규칙

공지사항은 아래 카테고리 중 하나를 가진다.

| 코드값       | 의미   |
| --------- | ---- |
| IMPORTANT | 중요   |
| NORMAL    | 일반   |
| UPDATE    | 업데이트 |

> 프론트에서는 코드값을 그대로 사용하고,
> 화면에 표시할 라벨은 프론트에서 매핑한다.

---

## 3. 공지사항 목록 조회 (전체 / 카테고리별)

### URL

```http
GET /notices
```

### Query Parameter (선택)

| 이름       | 설명        | 예시                          |
| -------- | --------- | --------------------------- |
| category | 공지사항 카테고리 | IMPORTANT / NORMAL / UPDATE |

### 요청 예시

```http
GET /notices
GET /notices?category=IMPORTANT
```

> 로그인하지 않아도 조회 가능

### Response (200)

```json
{
  "success": true,
  "data": [
    {
      "noticeId": 1,
      "title": "서비스 점검 안내",
      "category": "IMPORTANT",
      "nickname": "관리자",
      "hit": 42,
      "createdAt": "2025-01-18T10:00:00"
    }
  ]
}
```

---

## 4. 공지사항 상세 조회

### URL

```http
GET /notices/{noticeId}
```

### Response (200)

```json
{
  "success": true,
  "data": {
    "noticeId": 1,
    "title": "서비스 점검 안내",
    "category": "IMPORTANT",
    "content": "1월 20일 02:00 ~ 04:00 서버 점검 예정",
    "nickname": "관리자",
    "hit": 43,
    "createdAt": "2025-01-18T10:00:00"
  }
}
```

> 상세 조회 시 조회수(hit)가 자동 증가한다.

---

## 5. 공지사항 등록 (관리자)

### URL

```http
POST /notices
```

### Request Header

```http
Authorization: Bearer {ACCESS_TOKEN}
Content-Type: application/json
```

### Request JSON

```json
{
  "title": "업데이트 안내",
  "category": "UPDATE",
  "content": "신규 기능이 추가되었습니다."
}
```

### Response (200)

```json
{
  "success": true,
  "message": "공지사항 등록 완료",
  "data": null
}
```

---

## 6. 공지사항 수정 (관리자)

### URL

```http
PUT /notices/{noticeId}
```

### Request Header

```http
Authorization: Bearer {ACCESS_TOKEN}
Content-Type: application/json
```

### Request JSON

```json
{
  "title": "업데이트 안내 (수정)",
  "category": "UPDATE",
  "content": "업데이트 내용이 변경되었습니다."
}
```

### Response (200)

```json
{
  "success": true,
  "message": "공지사항 수정 완료",
  "data": null
}
```

---

## 7. 공지사항 삭제 (관리자)

### URL

```http
DELETE /notices/{noticeId}
```

### Request Header

```http
Authorization: Bearer {ACCESS_TOKEN}
```

### Response (200)

```json
{
  "success": true,
  "message": "공지사항 삭제 완료",
  "data": null
}
```

---

## 8. 에러 응답 예시

### 인증 실패 (401)

```json
{
  "success": false,
  "message": "로그인이 필요합니다.",
  "data": null
}
```

### 권한 없음 / 잘못된 요청 (400)

```json
{
  "success": false,
  "message": "공지사항 수정 실패",
  "data": null
}
```

---

## 9. AI 프론트엔드 구현 지침

AI는 아래 조건을 반드시 준수해야 한다.

* 기존 공지사항 UI/UX는 절대 수정하지 말 것
* Vue 3 + Composition API 사용
* Axios 단일 인스턴스 사용
* 카테고리 탭(중요/일반/업데이트)과 API 연동
* 목록 ↔ 상세 전환 시 새로고침 금지

---

## 10. AI에게 전달할 최종 요청 문장

```text
너는 ZipCheck 프로젝트의 프론트엔드 개발자다.

아래 공지사항(Notice) API 명세를 기준으로,
이미 완성된 공지사항 UI를 유지한 채
API 요청/응답 로직만 구현하라.

조건:
- Vue 3 + Composition API
- Axios 단일 인스턴스
- JWT 인증 헤더 처리
- 관리자 기능 분기 처리

아래 문서를 기준으로 구현하라.
```

---

> 본 문서는 ZipCheck 공지사항 기능의 **공식 API 계약서**이다.
