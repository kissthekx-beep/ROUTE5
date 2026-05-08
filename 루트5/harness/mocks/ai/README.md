# AI mocks

OpenAI API를 붙이기 전후로 추천 문구와 루트 설명을 재현하기 위한 mock입니다.

원칙:

- fixture에 없는 장소를 생성하지 않는다.
- 입력 조건을 요약한다.
- 추천 응답은 `harness/contracts/recommendation` 계약을 따른다.
