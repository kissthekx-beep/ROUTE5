# 아키텍처 개요

루트5는 제품 의도, 하네스, 핵심 모듈, 앱 표면을 분리합니다.

```text
product + design
  -> harness
  -> packages/core
  -> packages/catalog
  -> packages/recommendation
  -> apps/web 또는 apps/mobile
```

외부 시스템은 앱이나 코어가 직접 호출하지 않고 `packages/platform` 뒤에 둡니다.

```text
packages/platform
  -> OpenAI API
  -> 지도/길찾기
  -> 장소 API
  -> 배포/런타임 SDK
```

`harness`는 구현 바깥에서 제품을 감쌉니다.

```text
harness/scenarios   -> 사용자 여정 검증
harness/contracts   -> 추천/루트북/API/이벤트 계약
harness/fixtures    -> 재현 가능한 요청/장소/루트 상태
harness/mocks       -> AI, 지도, 장소 API 대역
harness/probes      -> 이벤트와 메트릭 관측
harness/runners     -> 로컬/CI 실행
harness/reports     -> 실행 결과
```

## 핵심 흐름

1. 사용자가 감정과 조건을 입력한다.
2. `catalog`가 장소 후보를 필터링한다.
3. `recommendation`이 후보를 최대 5개 루트로 조합한다.
4. `platform`은 필요할 때 AI 문구, 지도 링크, 장소 API를 연결한다.
5. `apps/web` 또는 `apps/mobile`이 화면 흐름을 제공한다.
6. `harness`가 추천 결과, 예산, 동선, 루트북 저장을 검증한다.
