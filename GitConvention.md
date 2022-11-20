# Git Branch 전략

## Git Flow 전략

- master : 제품으로 출시될 수 있는 브랜치
- develop : 다음 출시 버전을 개발하는 브랜치
- feature : 기능을 개발하는 브랜치
- docs : 문서 작업하는 브랜치

## Branch 규칙

- feat/파트/기능
- **ex) feat/FE/login**

## Commit 규칙

- [FEATURE] : 새로운 기능 추가
- [BUG] : 버그 수정
- [DOCS] : 문서 수정
- [STYLE] : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- [DESIGN] : CSS 수정
- [REFACTOR] : 코드 리펙토링
- [TEST] : 테스트 코드, 리펙토링 테스트 코드 추가
- [CHORE] : 빌드 업무 수정, 패키지 매니저 수정

## MR 규칙

- 브랜치 이름 쓰기

## Commit 규칙

> 파트
> 
- FE
- BE
- EM
- ETC

> 태그
> 
- ADD : 파일 처음으로 등록한 경우
- UPDATE : 로직 수정이 있을 경우
- DESIGN : CSS 변경만 있을 경우
- REFACTOR : 로직 변경 없이 리팩토링만 한 경우
- FIX : 버그 수정한 경우
- DELETE : 파일이 삭제된 경우
- DOCS : md 관련 커밋일 경우
- FEATURE : 기능 추가될 경우
- RENAME : 파일 이름 바꿨을 경우

> 예시
> 
- [파트] 태그 | 내용
    - **ex) [FE] REFACTOR | Refactor login page**
