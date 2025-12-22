# ZipCheck 프론트엔드 AI 요청 스크립트 – 마이페이지 찜한 매물 조회 구현

> 본 문서는 **마이페이지에서 로그인한 사용자의 찜(관심) 매물을 정상적으로 조회·표시**하기 위해
> 프론트엔드에서 구현해야 할 로직을 정리한 **AI 요청용 스크립트**입니다.

---

## 1. 기능 목표

* 마이페이지 진입 시
* 로그인한 사용자가 찜한 매물 목록을 불러와
* 카드/리스트 형태로 화면에 표시

---

## 2. 사용 API 명세 (백엔드 이미 구현 완료)

### 📌 찜 목록 조회

```http
GET /api/interests
```

#### Query Parameters

| 이름        | 타입     | 설명              | 기본값      |
| --------- | ------ | --------------- | -------- |
| page      | number | 페이지 번호 (1부터 시작) | 1        |
| size      | number | 페이지 당 항목 수      | 10       |
| sidoName  | string | 시/도 필터          | optional |
| gugunName | string | 구/군 필터          | optional |
| dongName  | string | 동 필터            | optional |

---

### 📌 응답 구조

```json
{
  "status": "OK",
  "data": {
    "items": [
      {
        "interestId": 12,
        "dealNo": 39,
        "aptName": "OO아파트",
        "aptDong": "101",
        "floor": "7",
        "dealAmount": "4억 2,000",
        "excluUseAr": 84.3,
        "latitude": 37.123,
        "longitude": 127.456,
        "createdAt": "2024-12-01T12:30:00"
      }
    ],
    "totalCount": 5,
    "page": 1,
    "size": 10
  }
}
```

---

## 3. 프론트엔드 구현 요구사항

### 3.1 마이페이지 진입 시 처리 흐름

1. 로그인 여부 확인
2. `/api/interests` 호출
3. 응답의 `data.items`를 리스트로 렌더링
4. `totalCount` 기반 페이징 처리

---

### 3.2 Vue 3 기준 예시 코드

```js
const favorites = ref([]);
const page = ref(1);
const size = 10;
const totalCount = ref(0);

const fetchFavorites = async () => {
  const res = await api.get('/api/interests', {
    params: {
      page: page.value,
      size
    }
  });

  favorites.value = res.data.data.items;
  totalCount.value = res.data.data.totalCount;
};

onMounted(fetchFavorites);
```

---

### 3.3 리스트 렌더링 예시

```vue
<div v-for="item in favorites" :key="item.dealNo">
  <h3>{{ item.aptName }}</h3>
  <p>{{ item.aptDong }}동 / {{ item.floor }}층</p>
  <p>{{ item.dealAmount }}</p>
</div>
```

---

### 3.4 찜 해제 기능 (선택)

```js
const removeFavorite = async (dealNo) => {
  await api.delete(`/api/interests/${dealNo}`);
  fetchFavorites();
};
```

---

## 4. 주의사항 (중요)

* ❌ 마이페이지에서는 `/api/listings` 사용 금지
* ❌ 찜 여부 계산을 프론트에서 하지 말 것
* ✅ 반드시 `/api/interests` 응답만 사용

---

## 5. 디버깅 체크리스트

* [ ] Authorization 헤더 포함 여부
* [ ] 응답에서 `data.items`를 사용하고 있는지
* [ ] `ApiResponse` 래퍼 구조를 올바르게 파싱하는지
* [ ] page 값이 1부터 시작하는지

---

## 6. 최종 목표

* 마이페이지 진입 시
* 로그인 사용자의 찜 매물이
* 누락 없이 안정적으로 표시될 것

---

**위 요구사항을 기준으로 마이페이지 찜 목록 UI를 구현해 주세요.**
