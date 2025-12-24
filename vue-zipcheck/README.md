# 🏠 매물 상세 – 거주민 스티커 & 반응 기능

본 문서는 **ZipCheck** 프로젝트의 매물 상세 페이지에서 사용되는
**거주민 스티커(이모티콘) 및 간단 리뷰 기능**에 대한 설명을 담고 있습니다.

해당 기능은 **하드코딩 없이 백엔드 API 연동을 통해 동적으로 렌더링**되며,
실제 거주민의 반응을 시각적으로 보여주는 것을 목표로 합니다.

---

## 📌 기능 개요

* 특정 아파트(aptId)에 대해

  * 거주민이 남긴 **이모티콘 스티커** 수집
  * 스티커 비율 기반 **반응 요약 UI** 제공
  * 스티커에 포함된 **간단 리뷰 리스트** 표시

---

## 🔗 사용 API

### 1️⃣ 스티커 목록 조회

```http
GET /api/stickers?aptId={aptId}
```

### 응답 예시

```json
{
  "success": true,
  "data": [
    {
      "stickerId": 12,
      "userId": 3,
      "userNickname": "반포토박이",
      "stickerTypeId": 1,
      "stickerTypeName": "LIKE",
      "description": "한강공원 접근성이 너무 좋고 커뮤니티 시설이 최고입니다.",
      "createdAt": "2025-01-24T10:30:00"
    },
    {
      "stickerId": 11,
      "userId": 8,
      "userNickname": "새집증후군",
      "stickerTypeName": "NORMAL",
      "description": "학교 때문에 이사왔는데 주변 상가 공실이 좀 있어요.",
      "createdAt": "2025-01-24T08:10:00"
    }
  ]
}
```

---

## 😊 이모티콘 타입 정의

| 타입      | 의미 | UI 이모티콘 |
| ------- | -- | ------- |
| LIKE    | 만족 | 😊      |
| NORMAL  | 보통 | 😐      |
| DISLIKE | 불만 | 😫      |

---

## 📊 반응 요약 계산 방식

* 전체 스티커 개수를 기준으로 퍼센트 계산

```text
퍼센트 = (해당 타입 개수 / 전체 스티커 수) × 100
```

### UI 컬러 규칙

* LIKE → 연한 초록
* NORMAL → 연한 회색
* DISLIKE → 연한 빨강

---

## 💬 거주민 간단 리뷰

### 표시 조건

* `description` 값이 존재하는 스티커만 리뷰로 표시
* 최신순 (`createdAt DESC`)

### 표시 항목

* 유저 닉네임 (`userNickname`)
* 이모티콘 (타입 기반)
* 리뷰 내용 (`description`)
* 작성 시점

  * n시간 전 / 어제 / YYYY.MM.DD

### 리뷰 없음

```text
아직 등록된 거주민 후기가 없습니다.
```

---

## 🧩 프론트엔드 구성 (권장)

```text
components/
 └─ sticker/
     ├─ StickerSummary.vue      // 이모티콘 비율 요약
     ├─ StickerReviewItem.vue   // 단일 리뷰
     └─ StickerSection.vue      // 전체 섹션
```

---

## ⚙️ 기술 스택

* Vue 3 (Composition API)
* Vite
* Tailwind CSS
* axios 또는 fetch

---

## 🚨 상태 처리

| 상태     | 처리 방식                 |
| ------ | --------------------- |
| 로딩 중   | Skeleton UI 또는 로딩 문구  |
| 에러     | "거주민 반응을 불러오지 못했습니다." |
| 데이터 없음 | Empty State UI        |

---

## ✅ 정리

* 모든 데이터는 **서버 API 기반**
* 하드코딩 금지
* 매물 상세 페이지 하단 "실제 거주민 반응" 영역에 적용
* 반응 요약 + 리뷰 리스트를 동시에 제공하여 **신뢰도 높은 매물 정보 제공**
