# 🙋 ZipCheck 마이페이지(User / MyPage) API 명세서

본 문서는 **ZipCheck 백엔드 UserController 기준**의 마이페이지 관련 API 명세이다.

프론트엔드(Vue)는 **이미 완성된 마이페이지 UI/UX를 유지**한 채,
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
* 모든 API는 인증 필수

```http
Authorization: Bearer {ACCESS_TOKEN}
Content-Type: application/json
```

---

## 2. 내 정보 조회

### URL

```http
GET /users/me
```

### Response (200)

```json
{
  "success": true,
  "data": {
    "userId": 1,
    "email": "user@email.com",
    "nickname": "zipuser",
    "profileImage": "BASE64_STRING",
    "alarmAgree": true,
    "createdAt": "2025-01-10T09:30:00"
  }
}
```

---

## 3. 프로필 수정

### URL

```http
PATCH /users/me
```

### Request JSON

```json
{
  "nickname": "newNickname",
  "profileImage": "BASE64_STRING (optional)"
}
```

### Response (200)

```json
{
  "success": true,
  "message": "프로필 수정 완료",
  "data": null
}
```

---

## 4. 비밀번호 변경

### URL

```http
PATCH /users/me/password
```

### Request JSON

```json
{
  "currentPassword": "oldPassword",
  "newPassword": "newPassword"
}
```

### Response (200)

```json
{
  "success": true,
  "message": "비밀번호 수정 완료",
  "data": null
}
```

---

## 5. 알림 설정 변경

### URL

```http
PATCH /users/me/alarm
```

### Request JSON

```json
{
  "agree": true
}
```

### Response (200)

```json
{
  "success": true,
  "message": "알림 설정 수정 완료",
  "data": null
}
```

---

## 6. 회원 탈퇴

### URL

```http
DELETE /users/me
```

### Response (200)

```json
{
  "success": true,
  "message": "회원 탈퇴 완료",
  "data": null
}
```

> 회원 탈퇴 시 서버의 Refresh Token이 삭제되고
> 클라이언트의 refresh 쿠키도 함께 제거된다.

---

## 7. 에러 응답 예시

### 인증 실패 (401)

```json
{
  "success": false,
  "message": "인증 정보가 없습니다.",
  "data": null
}
```

### 잘못된 요청 (400)

```json
{
  "success": false,
  "message": "프로필 수정 요청이 올바르지 않습니다.",
  "data": null
}
```

---

## 8. AI 프론트엔드 구현 지침

AI는 아래 조건을 반드시 준수해야 한다.

* 기존 마이페이지 UI/UX는 절대 수정하지 말 것
* Vue 3 + Composition API 사용
* Axios 단일 인스턴스 사용
* 모든 요청에 Access Token 포함
* 성공 시 화면 상태 즉시 갱신

---

## 9. AI에게 전달할 최종 요청 문장

```text
너는 ZipCheck 프로젝트의 프론트엔드 개발자다.

아래 마이페이지(User) API 명세를 기준으로,
이미 완성된 마이페이지 UI를 유지한 채
API 요청/응답 로직만 구현하라.

조건:
- Vue 3 + Composition API
- Axios 단일 인스턴스
- JWT 인증 헤더 처리

아래 문서를 기준으로 구현하라.
```

---

> 본 문서는 ZipCheck 마이페이지 기능의 **공식 API 계약서**이다.
