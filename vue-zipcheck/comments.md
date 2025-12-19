# 💬 ZipCheck 댓글(Comment) API 명세서

본 문서는 **ZipCheck 백엔드 CommentController 기준**의 댓글 API 명세이다.

프론트엔드(Vue)는 **이미 완성된 게시글 상세 UI를 유지**한 채,
본 문서를 기준으로 **댓글 관련 API 요청/응답 로직만 구현**해야 한다.

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
* 인증이 필요한 API는 반드시 Header 포함

```http
Authorization: Bearer {ACCESS_TOKEN}
Content-Type: application/json
```

---

## 2. 댓글 등록

### URL

```http
POST /comments
```

### Request Header

```http
Authorization: Bearer {ACCESS_TOKEN}
Content-Type: application/json
```

### Request JSON

```json
{
  "boardId": 1,
  "content": "댓글 내용입니다"
}
```

> `userId`는 서버에서 인증 정보로 주입되며
> 프론트에서는 전달하지 않는다.

### Response (200)

```json
{
  "success": true,
  "message": "댓글 등록 완료",
  "data": null
}
```

---

## 3. 특정 게시글의 댓글 목록 조회

### URL

```http
GET /comments/board/{boardId}
```

### Request Header

* 필요 없음 (비로그인 가능)

### Response (200)

```json
{
  "success": true,
  "data": [
    {
      "commentId": 10,
      "content": "댓글 내용입니다",
      "nickname": "zipuser",
      "createdAt": "2025-01-18T13:00:00"
    }
  ]
}
```

> 댓글은 게시글 상세 페이지 진입 시 함께 조회한다.

---

## 4. 댓글 삭제

### URL

```http
DELETE /comments/{commentId}
```

### Request Header

```http
Authorization: Bearer {ACCESS_TOKEN}
```

### Response (200)

```json
{
  "success": true,
  "message": "댓글 삭제 완료",
  "data": null
}
```

> 본인이 작성한 댓글만 삭제 가능

---

## 5. 에러 응답 예시

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
  "message": "댓글 삭제 권한이 없습니다.",
  "data": null
}
```

---

## 6. AI 프론트엔드 구현 지침

AI는 아래 조건을 반드시 준수해야 한다.

* 기존 댓글 UI/UX는 절대 수정하지 말 것
* Vue 3 + Composition API 사용
* Axios 단일 인스턴스 사용
* 댓글 등록/삭제는 새로고침 없이 비동기 처리
* 댓글 삭제 버튼은 본인 댓글에만 노출

---

## 7. AI에게 전달할 최종 요청 문장

```text
너는 ZipCheck 프로젝트의 프론트엔드 개발자다.

아래 댓글(Comment) API 명세를 기준으로,
이미 완성된 게시글 상세 UI를 유지한 채
댓글 등록/조회/삭제 API 연동 로직만 구현하라.

조건:
- Vue 3 + Composition API
- Axios 단일 인스턴스
- JWT 인증 헤더 처리
- 비동기 처리 (페이지 새로고침 금지)

아래 문서를 기준으로 구현하라.
```

---

> 본 문서는 ZipCheck 댓글 기능의 **공식 API 계약서**이다.
