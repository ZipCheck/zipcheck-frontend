# Frontend Integration Update

## 지도/카드/상세 매물 하트(찜) 표시 연동 가이드

이 문서는 **백엔드 수정 완료 이후**, 프론트엔드 AI(Gemini 등)에게 전달하기 위한 **최종 연동 스크립트**입니다.

현재 백엔드에서는 **지도/카드/아파트 상세 매물 조회 API에서도 찜 여부(isFavorite)를 정상적으로 내려주도록 수정이 완료**되었습니다.

---

## 1. 변경 요약 (Backend Changes Summary)

### ✅ 변경 완료 사항

* `MapDealResponse` DTO에 `isFavorite: boolean` 필드 추가
* `interests` 테이블을 기준으로 **로그인 사용자 찜 여부 계산**
* `LEFT JOIN interests + CASE WHEN` 방식으로 SQL 수정
* 로그인 / 비로그인 모두 안전하게 처리됨

---

## 2. 프론트에서 사용해야 할 API

### ✅ 아파트별 거래 목록 (카드/상세 페이지)

```
GET /zipcheck/map/apartment/{aptSeq}/deals
```

#### 요청 헤더 (중요)

```
Authorization: Bearer {accessToken}
```

* 로그인 사용자일 경우에만 `isFavorite = true` 가능
* 헤더가 없으면 전부 `false`

---

## 3. 응답 데이터 구조

```json
{
  "data": [
    {
      "no": 7168424,
      "aptSeq": "30140-39",
      "aptName": "삼부2",
      "aptDong": "101",
      "floor": "7",
      "dealAmount": "1억 9,300만원",
      "isFavorite": true
    }
  ],
  "currentPage": 1,
  "totalPages": 12,
  "totalCount": 234
}
```

### ⚠️ 주의 사항

* 응답은 **ApiResponse로 감싸지지 않음**
* 바로 `response.data.data` 형태로 접근

---

## 4. 하트(찜) UI 렌더링 규칙

### ✅ boolean 기준 렌더링

```js
if (deal.isFavorite) {
  // ❤️ 활성 하트
} else {
  // 🤍 비활성 하트
}
```

* 숫자(0/1), 문자열 비교 ❌
* 반드시 boolean 값으로 처리

---

## 5. Vue / React 호출 예시

### Axios 예시

```js
axios.get(`/zipcheck/map/apartment/${aptSeq}/deals`, {
  params: {
    page: 1,
    size: 20
  },
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
}).then(res => {
  const deals = res.data.data;
});
```

---

## 6. 프론트에서 반드시 지켜야 할 체크리스트

1. `/zipcheck/map/apartment/{aptSeq}/deals` API 사용
2. Authorization 헤더 포함 여부 확인
3. `isFavorite`는 boolean으로만 처리
4. 하트 상태는 백엔드 값 그대로 사용 (프론트 계산 ❌)
5. 리스트 렌더링 시 `key = deal.no`

---

## 7. 결론

> 이제 하트(찜) 정보는 **모든 매물 카드/상세 API에서 제공됩니다.**
> 프론트는 이 문서 기준으로 API를 호출하고 `isFavorite`만 그대로 반영하면 됩니다.

백엔드 수정은 완료되었으며,
프론트엔드 연동만 마무리하면 하트 표시가 정상 동작합니다.
