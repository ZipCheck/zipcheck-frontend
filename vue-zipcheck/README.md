# 📌 ZipCheck 찜 목록 API 명세서 (마이페이지)

본 문서는 **마이페이지 > 찜한 매물** 화면 구현을 위해
프론트엔드에서 반드시 알아야 할 **API 명세 및 응답 구조**를 정리한 문서입니다.

---

## 1. 개요

* 기능명: 찜한 매물 조회 / 등록 / 삭제
* 대상 화면: 마이페이지 > 찜한 매물
* 인증 방식: 로그인 필수 (JWT 기반)
* Base URL: `/api/interests`

---

## 2. 찜한 매물 목록 조회

### 🔹 API

```
GET /api/interests
```

### 🔹 Request (Query Parameters)

| 파라미터        | 타입     | 필수 | 설명              |
| ----------- | ------ | -- | --------------- |
| `page`      | number | ❌  | 페이지 번호 (기본 1)   |
| `size`      | number | ❌  | 페이지당 개수 (기본 10) |
| `sidoName`  | string | ❌  | 시/도 필터          |
| `gugunName` | string | ❌  | 구/군 필터          |
| `dongName`  | string | ❌  | 동 필터            |
| `minArea`   | number | ❌  | 최소 전용면적         |
| `maxArea`   | number | ❌  | 최대 전용면적         |
| `minPrice`  | number | ❌  | 최소 거래금액         |
| `maxPrice`  | number | ❌  | 최대 거래금액         |

> ⚠️ 모든 필터는 선택 사항이며, 전달하지 않으면 전체 조회

---

### 🔹 Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "interestId": 12,
        "dealNo": 34567,
        "aptSeq": "30140-39",
        "aptName": "디팰리스",
        "jibun": "서울시 강남구 삼성동 123",
        "roadNm": "테헤란로",
        "buildYear": 2015,
        "latitude": 37.12345,
        "longitude": 127.12345,
        "aptDong": "101",
        "floor": "12",
        "dealYear": 2024,
        "dealMonth": 3,
        "dealDay": 12,
        "excluUseAr": 118.75,
        "dealAmount": "28억",
        "createdAt": "2025-01-02T14:22:11",
        "hasSticker": false
      }
    ],
    "totalCount": 1,
    "page": 1,
    "size": 10
  }
}
```

---

## 3. 찜한 매물 등록

### 🔹 API

```
POST /api/interests/{dealNo}
```

### 🔹 Path Variable

| 이름       | 타입     | 설명                    |
| -------- | ------ | --------------------- |
| `dealNo` | number | 거래 ID (housedeals.no) |

### 🔹 Response

```json
{
  "success": true,
  "message": "관심 매물 등록 성공"
}
```

---

## 4. 찜한 매물 삭제

### 🔹 API

```
DELETE /api/interests/{dealNo}
```

### 🔹 Response

```json
{
  "success": true,
  "message": "관심 매물 삭제 성공"
}
```

---

## 5. 프론트 구현 가이드 (중요)

### 5.1 화면 표시용 주요 필드

| UI 요소 | 필드                  |
| ----- | ------------------- |
| 매물명   | `aptName`           |
| 위치    | `roadNm` / `jibun`  |
| 가격    | `dealAmount`        |
| 면적    | `excluUseAr`        |
| 동/층   | `aptDong` / `floor` |
| 찜 등록일 | `createdAt`         |

---

### 5.2 비즈니스 로직 주의사항

* 로그인하지 않으면 401 반환
* 동일 매물 중복 찜 불가
* 사용자가 스티커를 이미 등록한 매물은 목록에서 제외됨
* 페이지네이션 필수 대응

---

## 6. 비어있는 상태 (Empty State)

```text
아직 찜한 매물이 없습니다.
```

* items 배열이 비어있을 경우 표시
* 첨부된 이미지와 동일한 UX 유지

---

## 7. 향후 확장 예정 필드

* `hasSticker = true` 인 경우

  * “이미 의견을 남긴 매물” 배지 표시
* 지도 페이지 연동 (lat / lng 사용)

---

## 8. 요약

* 본 API는 마이페이지 전용 찜 목록 API
* 필터 + 페이지네이션 + UI 확장 필드 제공
* 프론트는 `items`, `totalCount`, `page`, `size` 기준으로 렌더링

---

문의 사항 발생 시 백엔드 담당에게 해당 명세 기준으로 문의 바랍니다.
