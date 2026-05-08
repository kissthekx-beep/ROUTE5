# harness

루트5의 검증 하네스입니다.

하네스는 제품 의도를 실행 가능한 안전 장치로 바꿉니다. 감정 기반 추천, 예산 제한, 실제 장소 데이터, 루트북 저장 같은 핵심 약속이 구현 중에도 깨지지 않도록 감쌉니다.

## 구성

- `scenarios/onboarding`: 감정 선택과 조건 입력 흐름
- `scenarios/recommendation`: AI 추천과 슈퍼루터 추천 흐름
- `scenarios/routebook`: 루트 실행, 저장, 공유 흐름
- `contracts/recommendation`: 추천 요청/응답 계약
- `contracts/routebook`: 루트북 저장 계약
- `fixtures/requests`: 사용자 입력 요청 fixture
- `fixtures/places`: 장소 fixture
- `fixtures/routes`: 추천 결과 fixture
- `mocks/ai`: OpenAI 응답 대역
- `mocks/maps`: 지도/길찾기 대역
- `mocks/places`: 장소 API 대역
- `probes/events`: 제품 이벤트 관측 정의
- `probes/metrics`: 성공 지표 관측 정의
- `runners/local`: 로컬 하네스 실행기
- `runners/ci`: CI 하네스 실행기
- `reports`: 실행 결과

## 작성 순서

1. 제품 요구사항을 `product/requirements`에서 확인합니다.
2. 화면 흐름을 `design/flows`에서 확인합니다.
3. 사용자 목표를 `scenarios`에 적습니다.
4. 입출력 경계를 `contracts`에 정의합니다.
5. 요청, 장소, 루트 상태를 `fixtures`에 고정합니다.
6. 외부 의존성은 `mocks`로 격리합니다.
7. 실행 결과는 `probes`와 `reports`로 확인합니다.
