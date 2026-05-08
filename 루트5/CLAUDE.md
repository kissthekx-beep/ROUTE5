# ROUTE5 Claude 지침

## 프로젝트 정체성

ROUTE5는 사용자의 기분, 예산, 이동수단을 바탕으로 서울에서 실제로 실행 가능한 하루 루트 5곳을 추천하는 감정 기반 라이프스타일 앱이다. 기능 구현과 검증 하네스는 같은 변경 단위로 다룬다.

참고자료에서 쓰인 `ROUTIE`는 앱 안의 사용자/추천자/루트 작성자 개념으로 유지한다. 프로젝트명은 `ROUTE5`, 루트 작성자와 커뮤니티 맥락은 `ROUTIE`, 검증된 큐레이션은 `SUPERROUTIE`로 구분한다.

## 우선순위

P0. Claude 운영 계층: `CLAUDE.md`, `.claude/settings.json`, `.claude/hooks`, `.claude/rules`, `.claude/skills`

P1. 제품 진실의 원천: `product`, `design`, `docs/decisions`

P2. 하네스 계층: `harness/scenarios`, `harness/contracts`, `harness/fixtures`, `harness/mocks`, `harness/probes`, `harness/runners`, `harness/reports`

P3. 제품 핵심과 데이터: `packages/core`, `packages/catalog`, `packages/recommendation`, `data`

P4. 제품 표면과 외부 어댑터: `apps/web`, `apps/mobile`, `packages/ui`, `packages/platform`

P5. 테스트: `tests/unit`, `tests/integration`, `tests/contract`, `tests/harness`, `tests/e2e`, `tests/visual`

P6. 운영과 참고자료: `ops`, `tools`, `references`

상위 우선순위와 충돌하는 변경은 하위 폴더의 편의보다 상위 규칙을 우선한다.

## 작업 규칙

- 기능을 추가하거나 수정할 때는 관련 제품 요구사항, 화면 흐름, 하네스 시나리오, 계약, 픽스처, mock, probe의 갱신 필요성을 함께 판단한다.
- 도메인 규칙은 `packages/core`에 순수하게 둔다.
- 장소 데이터 조회와 필터링은 `packages/catalog`에 둔다.
- 루트 조합, 스코어링, 후보 5개 생성은 `packages/recommendation`에 둔다.
- 외부 API, 저장소, 런타임 의존성은 `packages/platform` 뒤에 둔다.
- 웹 MVP는 `apps/web`, Expo 앱은 `apps/mobile`에서 조립한다.
- 폴더 안에서 작업할 때는 가까운 `.claude/skills/*/SKILL.md`와 `.claude/rules/*.md`를 우선 참고한다.
- 실행 가능한 스택이나 테스트 명령이 아직 없으면, 검증 불가 사유를 명확히 남긴다.

## Claude 운영

- `.claude/settings.json`은 프로젝트 공유 hook과 Claude Code 설정의 등록부다.
- `.claude/hooks`는 위험 명령 차단, 루트 밖 쓰기 차단, 하네스 갱신 알림을 담당한다.
- `.claude/rules`는 경로별 규칙을 담는다.
- `.claude/skills`와 각 폴더의 중첩 `.claude/skills`는 작업별 플레이북이다.
- P0 파일을 바꿀 때는 JSON 유효성, hook 실행 가능성, 중복 규칙 여부를 확인한다.
