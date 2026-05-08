# packages/recommendation

루트5의 추천 엔진 패키지입니다.

역할:

- 장소 후보를 하루 루트로 조합
- 최대 5개의 후보 루트 생성
- 각 루트의 장소 수를 최대 5개로 제한
- 예산, 감정, 이동수단, 지역 조건을 스코어링
- AI 추천과 슈퍼루터 추천의 공통 출력 계약 유지

추천 결과는 `harness/contracts/recommendation`의 계약을 따라야 합니다.
