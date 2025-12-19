# 🔐 ZipCheck Auth API 명세서 (AI 프론트 생성용)

본 문서는 **ZipCheck 백엔드 AuthController 기준**의 인증·인가 API 명세이다.

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

---

## 2. 회원가입

### URL

```http
POST /auth/signup
```

### Request Header

```http
Content-Type: application/json
```

### Request JSON

```json
{
  "email": "user@email.com",
  "password": "password123",
  "nickname": "zipuser",
  "profileImage": "BASE64_STRING (optional)"
}
```

> ⚠ profileImage
>
> * Base64 문자열
> * 최대 5MB 이하
> * 선택값

### Response (200)

```json
{
  "success": true,
  "message": "회원가입 완료",
  "data": null
}
```

---

## 3. 로그인

### URL

```http
POST /auth/login
```

### Request JSON

```json
{
  "email": "user@email.com",
  "password": "password123"
}
```

### Response Header

```http
Authorization: Bearer {ACCESS_TOKEN}
Set-Cookie: refresh={REFRESH_TOKEN}; HttpOnly; Path=/
```

### Response Body

```json
{
  "success": true,
  "data": {
    "userId": 1,
    "email": "user@email.com",
    "nickname": "zipuser",
    "role": "ROLE_USER",
    "accessToken": "JWT_ACCESS_TOKEN",
    "profileImage": "BASE64_STRING"
  }
}
```

---

## 4. 토큰 재발급 (Access Token 만료 시)

### URL

```http
POST /auth/reissue
```

### Request Header

```http
Cookie: refresh={REFRESH_TOKEN}
```

> ❗ accessToken은 보내지 않는다.

### Response Header

```http
Authorization: Bearer {NEW_ACCESS_TOKEN}
Set-Cookie: refresh={NEW_REFRESH_TOKEN}; HttpOnly; Path=/
```

### Response Body

```json
{
  "success": true,
  "message": "토큰이 재발급되었습니다.",
  "data": null
}
```

---

## 5. 로그아웃

### URL

```http
POST /auth/logout
```

### Request Header

```http
Authorization: Bearer {ACCESS_TOKEN}
```

### Response

```json
{
  "success": true,
  "message": "로그아웃 완료",
  "data": null
}
```

> 로그아웃 시 서버에 저장된 Refresh Token이 삭제되며
> 클라이언트 쿠키의 refresh 토큰도 제거된다.

---

## 6. 비밀번호 초기화 (이메일 인증 코드 요청)

### URL

```http
POST /auth/password/reset
```

### Request JSON

```json
{
  "email": "user@email.com"
}
```

### Response

```json
{
  "success": true,
  "message": "이메일로 인증 코드가 발송되었습니다.",
  "data": null
}
```

---

## 7. 비밀번호 초기화 확인 (임시 비밀번호 발급)

### URL

```http
POST /auth/password/reset-confirm
```

### Request JSON

```json
{
  "email": "user@email.com",
  "code": "123456"
}
```

### Response

```json
{
  "success": true,
  "message": "임시 비밀번호가 이메일로 전송되었습니다.",
  "data": null
}
```

---

## 8. 에러 응답 예시

### 잘못된 요청 (400)

```json
{
  "success": false,
  "message": "이메일 또는 비밀번호가 올바르지 않습니다.",
  "data": null
}
```

### 인증 실패 (401)

```json
{
  "success": false,
  "message": "리프레시 토큰이 없습니다.",
  "data": null
}
```

---

## 9. AI 프론트엔드 구현 지침

AI는 아래 조건을 반드시 준수해야 한다.

* UI/UX는 절대 수정하지 말 것
* Axios 단일 인스턴스 사용
* Access Token은 메모리 또는 상태 저장
* Refresh Token은 HttpOnly Cookie로 자동 전송됨
* 401 응답 시 `/auth/reissue` 호출 후 요청 재시도

---

## 10. AI에게 전달할 최종 요청 문장

```text
너는 ZipCheck 프로젝트의 프론트엔드 개발자다.

아래 Auth API 명세를 기준으로,
이미 완성된 로그인/회원가입/비밀번호 초기화 UI를 유지한 채
API 요청·응답 로직만 구현하라.

조건:
- Vue 3 + Composition API
- Axios 단일 인스턴스
- JWT Access/Refresh Token 흐름 구현
- Access Token 만료 시 자동 재발급 처리

아래 문서를 기준으로 구현하라.
```

---

> 본 문서는 ZipCheck 인증 시스템의 **공식 API 계약서**이다.
