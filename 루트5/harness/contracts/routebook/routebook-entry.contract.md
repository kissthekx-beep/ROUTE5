# Routebook Entry Contract

## 입력

```json
{
  "routeId": "route_jangchung_sad_art_walk_001",
  "completedStopIds": ["place_jangchung_park", "place_jangchung_gallery"],
  "title": "조용히 걸었던 하루",
  "body": "오늘은 많이 움직이지 않고, 천천히 걷고 쉬었다.",
  "photoIds": ["photo_001"],
  "createdAt": "2026-05-04"
}
```

## 출력

```json
{
  "id": "routebook_001",
  "routeId": "route_jangchung_sad_art_walk_001",
  "title": "조용히 걸었던 하루",
  "body": "오늘은 많이 움직이지 않고, 천천히 걷고 쉬었다.",
  "photoIds": ["photo_001"],
  "createdAt": "2026-05-04",
  "shareable": true
}
```

## 불변 조건

- `routeId`는 선택된 추천 루트여야 한다.
- 제목은 비어 있으면 안 된다.
- 저장된 기록은 내 루트북 목록에서 조회 가능해야 한다.
- 실제 사진 저장소 연동 전에는 `photoIds`를 mock으로 대체할 수 있어야 한다.
