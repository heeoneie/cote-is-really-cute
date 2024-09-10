## Commit 메시지 구조

```
💡 `type: subject`

타입은 태그와 제목으로 구성되고, 태그는 영어로 쓰되 첫 문자는 대문자로 한다
```

## Commit Type
```
이모지 = :코드:
```

| 타입         | 이모지   | 코드 | 설명                                                                 | 예시                                              |
| ---------- | ------- | ----| -------------------------------------------------------------------- | ------------------------------------------------- |
| **feat**   | ✨      |sparkles|새로운 기능을 추가할 때 사용합니다.                                    | `feat: ✨ 로그인 폼 유효성 검사 추가`             |
| **fix**    | 🐛      |bug| 버그를 수정할 때 사용합니다.                                          | `fix: 🐛 헤더 컴포넌트 오타 수정`                 |
| **style**  | 💄      |lipstick| 사용자 인터페이스 관련 변경 사항.                           | `style: 💄 네비게이션 바 디자인 수정`                   |
| **refactor**| 🎨     |art| 버그 수정이나 기능 추가 없이 코드 구조를 개선할 때 사용합니다.          | `refactor: 🎨 컴포넌트 상태 관리 로직 단순화`     |
| **perf**   | ⚡       |zap| 성능을 개선하는 코드 변경.                                            | `perf: ⚡️ 이미지 로딩 시간 최적화`                |
| **test**   | ✅      |white_check_mark| 테스트 코드를 추가하거나 수정할 때 사용합니다.                         | `test: ✅ 버튼 컴포넌트에 대한 단위 테스트 추가`  |
| **docs**   | 📝      |memo| 문서만 변경할 때 사용합니다.                                          | `docs: 📝 설치 단계 README에 추가`                |
| **chore**  | 🔧      |wrench| 소스나 테스트 파일을 수정하지 않는 일반적인 작업이나 업데이트.        | `chore: 🔧 종속성 패키지 업데이트`                |
| **revert** | ⏪      |rewind| 이전 커밋을 되돌릴 때 사용합니다.                                    | `revert: ⏪ "로그인 폼 유효성 검사 추가" 커밋 되돌림`|
| **init**   | 🎉      |tada| 프로젝트 초기 설정 시 사용합니다.                                     | `init: 🎉 React 프로젝트 초기 설정`               |
| **delete** | 🔥      |fire| 코드/파일 삭제.                                             | `delete: 🔥 안 쓰는 로그인 컴포넌트 삭제`           |
| **wip** | 🚧      |construction| 작업 중이거나 실험적인 변경 사항.                                             | `wip: 🚧 새로운 인증 방법을 실험 중`           |


[참고](https://velog.io/@shin6403/Git-git-%EC%BB%A4%EB%B0%8B-%EC%BB%A8%EB%B2%A4%EC%85%98-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)

[깃모지 사용법](https://treasurebear.tistory.com/70)
