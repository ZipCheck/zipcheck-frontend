# 📝 ZipCheck 게시글(Board) API 명세서

본 문서는 **ZipCheck 백엔드 BoardController 기준**의 게시글 API 명세이다.

프론트엔드(Vue)는 **이미 완성된 UI/UX를 유지**하고,
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
* 인증이 필요한 API는 반드시 Header 포함

```http
Authorization: Bearer {ACCESS_TOKEN}
Content-Type: application/json
```

---

## 2. 게시글 카테고리 규칙

게시글은 아래 카테고리 중 하나를 가진다.

| 코드값      | 의미 |
| -------- | -- |
| FREE     | 자유 |
| QUESTION | 질문 |
| REVIEW   | 후기 |
| INFO     | 정보 |

> 프론트에서는 코드값을 그대로 사용하고,
> 화면에 표시할 한글 라벨은 프론트에서 매핑한다.

---

## 3. 게시글 등록

### URL

```http
POST /boards
```

### Request Header

```http
Authorization: Bearer {ACCESS_TOKEN}
Content-Type: application/json
```

### Request JSON

```json
{
  "title": "동네 질문 있습니다",
  "category": "QUESTION",
  "content": "이 동네 살기 어떤가요?"
}
```

### Response (201)

```json
{
  "success": true,
  "message": "게시글 등록 완료",
  "data": null
}
```

---

## 4. 게시글 목록 조회

### URL

```http
GET /boards
```

### Query Parameter

| 이름    | 설명    | 기본값    |
| ----- | ----- | ------ |
| order | 정렬 기준 | latest |

* `latest` : 최신순
* `likes` : 좋아요순

### Request Header (선택)

```http
Authorization: Bearer {ACCESS_TOKEN}
```

> 로그인하지 않은 경우 `isLiked`는 항상 `false`

### Response (200)

```json
{
  "success": true,
  "data": [
    {
      "boardId": 1,
      "title": "동네 질문 있습니다",
      "category": "QUESTION",
      "hit": 12,
      "createdAt": "2025-01-18T12:00:00",
      "nickname": "zipuser",
      "likeCount": 5,
      "isLiked": true
    }
  ]
}
```

---

## 5. 게시글 상세 조회

### URL

```http
GET /boards/{boardId}
```

### Request Header (선택)

```http
Authorization: Bearer {ACCESS_TOKEN}
```

### Response (200)

```json
{
  "success": true,
  "data": {
    "boardId": 1,
    "title": "동네 질문 있습니다",
    "category": "QUESTION",
    "content": "이 동네 살기 어떤가요?",
    "hit": 13,
    "createdAt": "2025-01-18T12:00:00",
    "updatedAt": "2025-01-18T13:00:00",
    "nickname": "zipuser",
    "likeCount": 5,
    "isLiked": true
    }
}
```

> 상세 조회 시 조회수(hit)가 자동 증가한다.

---

## 6. 게시글 수정

### URL

```http
PUT /boards/{boardId}
```

### Request Header

```http
Authorization: Bearer {ACCESS_TOKEN}
```

### Request JSON

```json
{
  "title": "제목 수정",
  "category": "INFO",
  "content": "내용 수정"
}
```

### Response (200)

```json
{
  "success": true,
  "message": "게시글 수정 완료",
  "data": null
}
```

> 본인이 작성한 게시글만 수정 가능

---

## 7. 게시글 삭제

### URL

```http
DELETE /boards/{boardId}
```

### Request Header

```http
Authorization: Bearer {ACCESS_TOKEN}
```

### Response (200)

```json
{
  "success": true,
  "message": "삭제 완료",
  "data": null
}
```

> 본인이 작성한 게시글만 삭제 가능

---

## 8. 게시글 좋아요 토글

### URL

```http
POST /boards/{boardId}/like
```

### Request Header

```http
Authorization: Bearer {ACCESS_TOKEN}
```

### Response (200)

```json
{
  "success": true,
  "data": true
}
```

| 반환값   | 의미     |
| ----- | ------ |
| true  | 좋아요 적용 |
| false | 좋아요 취소 |

> 새로고침 없이 비동기 처리해야 한다.

---

## 9. 에러 응답 예시

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
  "message": "본인이 작성한 게시글만 수정할 수 있습니다.",
  "data": null
}
```

---

## 10. AI 프론트엔드 구현 지침

AI는 아래 조건을 반드시 준수해야 한다.

* 기존 게시글 UI/UX는 절대 수정하지 말 것
* Vue 3 + Composition API 사용
* Axios 단일 인스턴스 사용
* 좋아요/목록/상세는 새로고침 없이 비동기 처리
* 로그인 상태에 따라 isLiked 분기 처리

---

## 11. AI에게 전달할 최종 요청 문장

```text
너는 ZipCheck 프로젝트의 프론트엔드 개발자다.

아래 게시글(Board) API 명세를 기준으로,
이미 완성된 게시글 UI를 유지한 채
API 요청/응답 로직만 구현하라.

조건:
- Vue 3 + Composition API
- Axios 단일 인스턴스
- JWT 인증 헤더 처리
- 좋아요는 비동기 토글 처리

아래 문서를 기준으로 구현하라.
```

---

> 본 문서는 ZipCheck 게시글 기능의 **공식 API 계약서**이다.
