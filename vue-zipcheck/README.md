# 프로필 이미지 삭제 기능 DB 미반영 이슈 수정 요청

본 문서는 **ZipCheck 마이페이지 – 프로필 이미지 삭제 시 DB에 URL이 남아있는 문제**를 해결하기 위한 프론트엔드 수정 요청서입니다.
백엔드 로직은 이미 수정 완료되었으며, 현재 문제의 원인은 **프론트엔드 삭제 요청 방식**에 있습니다.

---

## 1. 현재 문제 상황 (확정된 증상)

* 마이페이지에서 "프로필 이미지 삭제" 버튼 클릭 시

  * 화면에서는 기본 이미지로 바뀌는 것처럼 보임
  * 하지만 DB(`users.profile_image_url`)에는 기존 S3 URL이 그대로 남아 있음

실제 DB 값 예시:

```
https://zipcheck-profile.s3.ap-northeast-2.amazonaws.com/profile/1/7c706e4e-9eb5-47fb-acd6-42ff3cf1b561.png
```

이는 다음 SQL이 **실행되지 않았다는 의미**입니다.

```sql
UPDATE users
SET profile_image_url = NULL
WHERE user_id = ?;
```

---

## 2. 백엔드 삭제 API 정보 (이미 구현 완료)

### 프로필 이미지 업로드 / 삭제 API

* Method: PATCH
* URL: `/users/me/profile-image`
* Content-Type: multipart/form-data
* 인증: Authorization: Bearer {accessToken} 필수

동작 규칙:

* `image` 파트가 있으면 → 업로드
* `image` 파트가 없으면 → **삭제**

```java
@PatchMapping(
    value = "/me/profile-image",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE
)
public ResponseEntity<ApiResponse<?>> updateProfileImage(
        @RequestPart(value = "image", required = false) MultipartFile image
) {
    // image == null → 삭제 처리
}
```

---

## 3. 문제 원인 (확정)

현재 프론트엔드에서 삭제 버튼 클릭 시 다음 중 하나의 잘못된 요청을 보내고 있습니다.

* `/users/me` (닉네임 수정 API) 호출
* `/users/me/profile-image` 호출 시 body 없이 PATCH 요청
* JSON 요청(`application/json`)으로 호출

위 방식들은 모두 **컨트롤러가 매핑되지 않거나 삭제 로직이 실행되지 않습니다.**

---

## 4. 반드시 구현해야 할 삭제 요청 방식 (정답)

### 프론트엔드 삭제 버튼 로직

```js
const deleteProfileImage = async () => {
  const formData = new FormData()

  await api.patch(
    '/users/me/profile-image',
    formData
  )

  // 서버 반영 후 상태 갱신
  profileImageUrl.value = null
}
```

필수 조건:

* 반드시 `FormData` 객체를 전송할 것
* `image` 필드는 추가하지 않음
* Content-Type을 수동으로 지정하지 말 것
* 공통 axios 인스턴스(api)를 사용할 것

---

## 5. UI 렌더링 필수 조건

프로필 이미지 렌더링 시, 기본 이미지 fallback 처리를 반드시 적용해야 합니다.

```html
<img
  :src="profileImageUrl || '/default-profile.png'"
  alt="프로필 이미지"
/>
```

삭제 후 `profileImageUrl`이 `null`일 경우에도 기존 이미지가 남지 않도록 해야 합니다.

---

## 6. 확인 방법 (필수)

수정 후 아래 사항을 반드시 확인해야 합니다.

1. Network 탭

   * Request URL: `PATCH /users/me/profile-image`
   * Request Headers에 `Content-Type: multipart/form-data; boundary=...`
   * Authorization 헤더 포함 여부 확인

2. 서버 로그

   * 프로필 이미지 삭제 API 컨트롤러 진입 로그 확인

3. DB 확인

   ```sql
   SELECT profile_image_url FROM users WHERE user_id = ?;
   ```

   * 결과가 `NULL`이면 정상

---

## 7. 금지 사항

* body 없는 PATCH 요청
* JSON 요청으로 프로필 이미지 삭제 시도
* `/users/me` API로 사진 삭제 처리
* UI 상태만 변경하고 서버 요청을 생략하는 방식

---

## 8. 목표 결과

* 삭제 버튼 클릭 시 서버의 삭제 로직이 실제로 실행됨
* DB의 `profile_image_url` 컬럼이 `NULL`로 변경됨
* 화면과 DB 상태가 일치

본 문서를 기준으로 **프로필 이미지 삭제 로직을 수정해 주세요.**
UI 디자인은 유지하고, **요청 방식 및 상태 갱신 로직만 수정**하면 됩니다.
