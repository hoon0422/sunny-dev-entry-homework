# Sunny Dev Entry Homework

구글 스프레드시트 CSV 데이터를 가져와 화면에 표시하고, Refresh 버튼으로 재조회할 수 있는 간단한 Expo 앱입니다.

## 데모 GIF

![Demo](./demo.gif)

## 주요 기능

1. 앱 진입 시 스프레드시트 CSV 데이터를 자동 조회합니다.
2. 조회 결과를 리스트로 렌더링합니다.
3. `Refresh` 버튼으로 수동 재조회가 가능합니다.
4. 조회 실패 시 에러 메시지를 화면에 표시합니다.
5. 재조회 중 버튼을 비활성화해 중복 요청을 방지합니다.

## 데이터 소스

- Google Sheets CSV Export URL을 `fetch`로 호출합니다.
- 현재 코드는 `B2:B4` 범위를 CSV로 받아옵니다.
- 파싱은 줄바꿈(`\n`) 기준 split으로 단순 처리합니다.

`fetchSheetData`는 CSV를 고급 파싱하지 않고 줄 단위 문자열 배열로 변환합니다.

## 실행 방법

### 1) 의존성 설치

```bash
npm install
```

### 2) 개발 서버 시작

```bash
npm run start
```

### 3) 플랫폼별 실행

```bash
npm run android
npm run ios
npm run web
```

## 주요 스크립트

- `npm run start`: Expo 개발 서버 실행
- `npm run android`: Android에서 앱 실행
- `npm run ios`: iOS 시뮬레이터에서 앱 실행
- `npm run web`: 웹에서 앱 실행
- `npm run emulator`: Android Emulator 실행 스크립트 (`scripts/start-emulator.sh`)
- `npm run lint`: ESLint 실행
- `npm run reset-project`: Expo 기본 리셋 스크립트 실행

## 프로젝트 구조

```text
app/
  _layout.tsx
  index.tsx
scripts/
  reset-project.js
  start-emulator.sh
```

## 구현 포인트

1. `useSheetData` 커스텀 훅으로 데이터 조회 상태(`isLoading`, `isFetching`, `error`)를 분리했습니다.
2. `refetch`를 `useCallback`으로 관리해 재사용 가능한 갱신 함수를 제공합니다.
3. 초기 로딩과 수동 갱신 흐름을 동일한 로직으로 처리합니다.

## 참고 파일

- 화면/로직: `app/index.tsx`
- 라우트 레이아웃: `app/_layout.tsx`
- 에뮬레이터 스크립트: `scripts/start-emulator.sh`
