# 🖼️ 프로필 이미지 연동 가이드 (Frontend)

본 문서는 **ZipCheck 프론트엔드**에서 서버 변경 사항(S3 기반 프로필 이미지 저장 방식)을 반영하기 위한
README 용 가이드 문서입니다.

---

## 1. 변경 개요

기존 구조에서는 프로필 이미지를 다음과 같이 처리했습니다.

* 서버에서 Base64 이미지 직접 반환
* 또는 `/users/{id}/profile-image` API를 통한 이미지 조회

👉 **현재 구조에서는 위 방식이 완전히 제거되었습니다.**

### ✅ 현재 구조

* 프로필 이미지는 **AWS S3**에 업로드됨
* `users.profile_image_url` 컬럼에 **이미지 URL 문자열만 저장**
* 프론트에서는 **URL을 그대로 `<img src>`에 사용**

별도의 이미지 조회 API 호출은 **절대 필요하지 않습니다.**

---

## 2. 서버 응답 구조

### 2.1 내 정보 조회

**GET `/users/me`**

```json
{
  "userId": 1,
  "email": "test@test.com",
  "nickname": "테스트유저",
  "profileImageUrl": "https://zipcheck-profile.s3.ap-northeast-2.amazonaws.com/profile/1/uuid.png",
  "alarmAgree": true,
  "createdAt": "2025-01-01T12:00:00"
}
```

* `profileImageUrl`은 **null 가능**

---

### 2.2 게시글 목록

**GET `/boards`**

```json
[
  {
    "boardId": 1,
    "title": "게시글 제목",
    "nickname": "작성자닉네임",
    "profileImageUrl": "https://zipcheck-profile.s3.ap-northeast-2.amazonaws.com/profile/1/uuid.png",
    "likeCount": 3,
    "commentCount": 2,
    "createdAt": "2025-01-01T12:00:00"
  }
]
```

---

### 2.3 게시글 상세

**GET `/boards/{boardId}`**

```json
{
  "boardId": 1,
  "title": "게시글 제목",
  "content": "내용",
  "nickname": "작성자닉네임",
  "profileImageUrl": "https://zipcheck-profile.s3.ap-northeast-2.amazonaws.com/profile/1/uuid.png",
  "likeCount": 3,
  "isLiked": true
}
```

---

### 2.4 댓글 목록

**GET `/comments/board/{boardId}`**

```json
[
  {
    "commentId": 1,
    "content": "댓글 내용",
    "nickname": "댓글작성자",
    "profileImageUrl": "https://zipcheck-profile.s3.ap-northeast-2.amazonaws.com/profile/2/uuid.png",
    "createdAt": "2025-01-01 12:10"
  }
]
```

---

## 3. 프론트엔드 구현 규칙

### 3.1 기본 원칙

* `profileImageUrl`이 **존재하면 그대로 사용**
* `null / undefined / 빈 문자열`이면 **기본 이미지 사용**

---

### 3.2 Vue 예시 코드

```vue
<img
  :src="user.profileImageUrl || '/images/default-profile.png'"
  class="profile-img"
  alt="profile"
/>
```

---

### 3.3 게시글 리스트 예시

```vue
<div v-for="board in boards" :key="board.boardId" class="board-item">
  <img
    :src="board.profileImageUrl || '/images/default-profile.png'"
    class="profile-img-sm"
  />
  <span>{{ board.nickname }}</span>
</div>
```

---

### 3.4 댓글 예시

```vue
<div v-for="comment in comments" :key="comment.commentId">
  <img
    :src="comment.profileImageUrl || '/images/default-profile.png'"
    class="profile-img-xs"
  />
  <span>{{ comment.nickname }}</span>
  <p>{{ comment.content }}</p>
</div>
```

---

## 4. ⚠️ 주의사항

* ❌ `/users/{id}/profile-image` API 사용 금지
* ❌ Base64 이미지 처리 금지
* ❌ Blob → URL 변환 로직 사용 금지

이미지는 **항상 S3 URL 기반 렌더링**입니다.

---

## 5. 요약

* 서버는 **URL만 제공**
* 프론트는 **URL 그대로 렌더링**
* 이미지 로딩 실패 시 기본 이미지 fallback 처리

이 문서를 기준으로 프론트 전반(마이페이지 / 게시판 / 댓글)을 수정하면 됩니다.
