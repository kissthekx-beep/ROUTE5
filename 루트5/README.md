# 루트5

루트5는 오늘의 감정, 예산, 이동수단에 맞춰 서울에서 실제로 실행 가능한 하루 루트 5곳을 추천하는 감정 기반 라이프스타일 앱입니다.

이 프로젝트는 하네스 엔지니어링 방식으로 제품화합니다. 제품 의도는 `product`와 `design`에 고정하고, 그 의도가 `harness`의 시나리오, 계약, 픽스처, mock, probe, runner로 검증되며, 구현은 그 하네스를 통과하는 방향으로 성장합니다.

## 제품화 폴더 구조

```text
루트5/
  CLAUDE.md
  .claude/                  # Claude Code 운영 계층

  product/                  # 제품 진실의 원천
    brief/                  # 제품 정의와 포지셔닝
    requirements/           # MVP/기능 요구사항
    roadmap/                # 개발 순서
    research/               # 경쟁 서비스와 사용자 리서치
    metrics/                # 성공 지표
    backlog/                # 구현 후보와 우선순위

  design/                   # 사용자 경험과 시각 설계
    assets/                 # 이미지, 원본 드로잉, 디자인 자산
    flows/                  # 화면 흐름

  harness/                  # 실행 가능한 검증 장치
    scenarios/              # 사용자 여정별 시나리오
    contracts/              # 추천/루트북/API/이벤트 계약
    fixtures/               # 요청, 장소, 루트 fixture
    mocks/                  # AI, 지도, 장소 API 대역
    probes/                 # 이벤트와 메트릭 관측 정의
    runners/                # 로컬/CI 실행기
    reports/                # 하네스 실행 결과

  packages/                 # 제품 핵심 모듈
    core/                   # 순수 도메인 규칙
    catalog/                # 장소 카탈로그 필터링/조회
    recommendation/         # 루트 조합과 스코어링
    platform/               # OpenAI, 지도, 배포 등 외부 어댑터
    ui/                     # 재사용 UI 컴포넌트

  apps/                     # 실제 제품 표면
    web/                    # HTML/CSS/JS, Netlify MVP
    mobile/                 # Expo / React Native 전환 대상

  data/                     # 제품 데이터 파이프라인
    catalog/places/         # 실제 장소 데이터
    schemas/                # 데이터 스키마
    seeds/                  # 초기 seed
    fixtures/               # 개발용 데이터
    snapshots/              # 기준 스냅샷

  tests/                    # 테스트 계층
    unit/
    integration/
    contract/
    harness/
    e2e/
    visual/

  docs/                     # 기술 문서와 ADR
    decisions/

  ops/                      # 운영, 배포, 관측
    ci/
    deploy/
    observability/
    runbooks/
    scripts/
    secrets/local/          # 로컬 비밀값, gitignore

  tools/                    # 생성기와 품질 게이트
    generators/
    validators/
    data-importers/
    quality-gates/

  references/               # 원천자료와 이전 프로토타입 보관
    source-materials/
    prototypes/
```

## 우선순위

1. P0: `CLAUDE.md`, `.claude`
2. P1: `product`, `design`, `docs/decisions`
3. P2: `harness`
4. P3: `packages/core`, `packages/catalog`, `packages/recommendation`, `data`
5. P4: `apps`, `packages/ui`, `packages/platform`
6. P5: `tests`
7. P6: `ops`, `tools`, `references`

## 하네스 엔지니어링 원칙

1. 제품 요구사항은 먼저 `product`에 남긴다.
2. 화면 흐름은 `design/flows`에 고정한다.
3. 주요 사용자 여정은 `harness/scenarios`에 실행 가능한 형태로 쪼갠다.
4. 추천 결과의 입출력은 `harness/contracts`로 고정한다.
5. 장소와 요청 데이터는 `data`와 `harness/fixtures`로 재현 가능하게 만든다.
6. AI와 지도 같은 외부 의존성은 `harness/mocks`로 대체 가능해야 한다.
7. 구현은 `packages/core`, `catalog`, `recommendation`에서 작게 통과시킨 뒤 앱에 연결한다.

## 다음 단계

1. `data/catalog/places`에 서울 장소 seed를 채웁니다.
2. `harness/runners/local`에 추천 계약 검증 러너를 만듭니다.
3. `apps/web`에서 Netlify 배포 가능한 웹 MVP를 만듭니다.
4. 웹 MVP 검증 후 `apps/mobile`로 Expo 전환을 시작합니다.
