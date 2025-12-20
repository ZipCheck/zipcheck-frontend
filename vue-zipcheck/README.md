# 📌 프론트엔드 수정 요청 스크립트

## (게시글 수정 / 삭제 버튼 미노출 문제)

본 문서는 **ZipCheck 프로젝트 백엔드 구조를 기준으로**,
프론트엔드 UI/UX 생성 AI 또는 프론트엔드 개발 AI에게 **그대로 전달하여 사용 가능한 요청 스크립트**입니다.

---

## 🔍 현재 상황 요약

* 로그인 성공 시 서버는 다음 정보를 반환함:

  * `userId`
  * `nickname`
  * `role`
  * `accessToken`

* 게시글 상세 조회 API에서는 다음 정보를 반환함:

  * `nickname` (게시글 작성자 닉네임)
  * `profileImageUrl`
  * `likeCount`, `isLiked`

* 백엔드에서는 `userId` 기준으로 게시글 수정/삭제 권한 검증이 정상 동작함

* 하지만 프론트엔드에서는 **내가 작성한 게시글임에도 수정 / 삭제 버튼이 노출되지 않음**

---

## ❗ 문제의 핵심 원인

프론트엔드에서 **게시글 작성자 여부를 판단하는 조건이 올바르게 동작하지 않음**

* 게시글 상세 API 응답에는 `userId` 필드가 없음
* 프론트엔드는 반드시 다음 기준으로 권한 판단을 수행해야 함:

```text
게시글.nickname === 로그인유저.nickname
```

* 다음과 같은 비교는 항상 실패함:

```js
board.userId === loginUser.userId // ❌ (board에 userId 없음)
```

---

## ✅ 프론트엔드 수정 요청 사항 (필수)

### 1️⃣ 로그인 유저 정보 관리 방식

* 로그인 성공 시 반환된 응답(`LoginResponse`)을 전역 상태 또는 localStorage에 저장

```js
loginUser = {
  userId,
  nickname,
  role,
  profileImageUrl
}
```

* 게시글 상세 페이지 렌더링 시 반드시 해당 정보를 사용

---

### 2️⃣ 수정 / 삭제 버튼 노출 조건 (핵심)

> **로그인 상태이며, 게시글 작성자 닉네임과 로그인 유저 닉네임이 일치할 경우에만 버튼 노출**

```js
board.nickname?.trim() === loginUser.nickname?.trim()
```

* 문자열 비교 전 `trim()` 필수 적용
* 로그인 정보가 아직 로드되지 않은 초기 렌더링 상태를 고려할 것

---

### 3️⃣ 안전한 조건부 렌더링 예시

#### 🔹 Vue 기준

```vue
<button
  v-if="loginUser && loginUser.nickname && board.nickname && board.nickname.trim() === loginUser.nickname.trim()"
>
  수정
</button>

<button
  v-if="loginUser && loginUser.nickname && board.nickname && board.nickname.trim() === loginUser.nickname.trim()"
>
  삭제
</button>
```

#### 🔹 React 기준

```jsx
{loginUser?.nickname?.trim() === board?.nickname?.trim() && (
  <>
    <button>수정</button>
    <button>삭제</button>
  </>
)}
```

---

### 4️⃣ 버튼 클릭 시 API 연동 규칙

* 게시글 수정:

```http
PUT /boards/{boardId}
```

* 게시글 삭제:

```http
DELETE /boards/{boardId}
```

* Access Token은 Authorization Header에 포함
* `userId`는 요청 파라미터나 바디로 전달하지 않음

  * (백엔드에서 인증 객체 기반으로 자동 판별)

---

## 🧩 게시글 상세 API 응답 예시

```json
{
  "boardId": 1,
  "title": "게시글 제목",
  "category": "FREE",
  "content": "게시글 내용",
  "nickname": "작성자닉네임",
  "profileImageUrl": "https://...",
  "likeCount": 3,
  "isLiked": true
}
```

---

## 🎯 최종 목표

* 내가 작성한 게시글에서는 **항상 수정 / 삭제 버튼이 노출**되어야 함
* 권한 판단은 **닉네임 비교 기준으로 처리**
* **백엔드 로직 변경 없이 프론트엔드 로직만 수정**

---

## ➕ 추가 권장 사항 (선택)

* 버튼은 게시글 상단 우측에 아이콘 형태로 배치
* 삭제 시 confirm 모달 표시
* 모바일 / 데스크톱 반응형 고려

---

본 스크립트는 **프론트엔드 수정 및 UI 생성 AI에 그대로 전달하여 사용 가능**합니다.
