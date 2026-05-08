# Route Recommendation Contract

## 입력

```json
{
  "mood": "슬픔",
  "partySize": "혼자",
  "transport": "도보",
  "maxDistanceKm": 1,
  "budgetKRW": 10000,
  "interests": ["미술"],
  "area": "장충동",
  "recommendationMode": "ai"
}
```

## 장소 후보

```json
{
  "id": "place_jangchung_park",
  "name": "장충단공원",
  "area": "장충동",
  "category": "산책",
  "moods": ["슬픔", "우울", "차분함"],
  "estimatedCostKRW": 0,
  "durationMinutes": 60,
  "mapKeyword": "장충단공원",
  "reviewUrl": "https://example.com/reviews/place_jangchung_park"
}
```

## 출력

```json
{
  "requestSummary": "슬픈 오늘, 미술을 좋아하고 혼자 있고 싶은 너에게 도보를 이용해서 1km 안에 10000원으로 할 수 있는 루트를 추천해줄게.",
  "routes": [
    {
      "id": "route_jangchung_sad_art_walk_001",
      "title": "조용히 걷고 보는 장충 하루",
      "mode": "ai",
      "index": 1,
      "total": 5,
      "estimatedCostKRW": 9000,
      "area": "장충동",
      "stops": [
        {
          "time": "11:00",
          "placeId": "place_jangchung_park",
          "placeName": "장충단공원",
          "description": "푸른 나무에 둘러싸여 걷기",
          "mapKeyword": "장충단공원",
          "reviewUrl": "https://example.com/reviews/place_jangchung_park"
        }
      ]
    }
  ]
}
```

## 불변 조건

- `routes.length`는 1 이상 5 이하이다.
- `stops.length`는 1 이상 5 이하이다.
- 모든 `placeId`는 장소 fixture에 존재한다.
- `estimatedCostKRW`는 입력 `budgetKRW` 이하이다.
- MVP에서는 하나의 route 안의 모든 stop이 같은 `area` 또는 도보 가능 권역이어야 한다.
- AI는 fixture에 없는 장소명을 생성하지 않는다.
