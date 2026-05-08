# packages/catalog

장소 카탈로그를 조회하고 필터링하는 패키지입니다.

역할:

- 지역, 감정, 카테고리, 예산, 이동 조건으로 장소 후보 필터링
- `data/catalog/places`의 장소 데이터를 앱이 쓰기 좋은 형태로 제공
- `packages/recommendation`이 사용할 후보 목록 생성

실제 외부 장소 API 연결은 `packages/platform`에 둡니다.
