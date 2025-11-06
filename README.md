# ✈️ 여행 개인화 앱

[![CI](https://github.com/jasoness/solideo_Day2_10_01_practice2/actions/workflows/ci.yml/badge.svg)](https://github.com/jasoness/solideo_Day2_10_01_practice2/actions/workflows/ci.yml)
[![Deploy](https://github.com/jasoness/solideo_Day2_10_01_practice2/actions/workflows/static.yml/badge.svg)](https://github.com/jasoness/solideo_Day2_10_01_practice2/actions/workflows/static.yml)

대중교통을 연계하여 맞춤형 여행 계획을 세울 수 있는 웹 애플리케이션입니다.

## 🌐 라이브 데모

GitHub Pages에서 앱을 직접 사용해보세요: [https://jasoness.github.io/solideo_Day2_10_01_practice2/](https://jasoness.github.io/solideo_Day2_10_01_practice2/)

## 🌟 주요 기능

### 1. 여행 정보 입력
- 출발 건물/역 입력
- 도착 건물/역 입력
- 출발 시간 선택
- 여행 기간 설정 (일 단위)

### 2. 대중교통 실시간 연계
- 🚌 버스
- 🚄 기차 (KTX, SRT)
- ✈️ 비행기

각 교통수단의 다음 정보를 제공:
- 출발/도착 시간
- 소요 시간
- 가격
- 운영 회사

### 3. 취향 기반 추천
사용자의 취향에 따라 다음을 추천:
- 🏛️ **관광지**: 자연, 문화, 역사, 쇼핑 등
- 🍴 **맛집**: 한식, 중식, 일식, 양식, 현지음식 등
- 💰 **예산**: 저렴, 보통, 고급

### 4. 오픈소스 지도 경로 시각화 (API 키 불필요!)
- OpenStreetMap + Leaflet 사용
- 출발지에서 목적지까지의 경로 시각화
- 선택한 관광지와 맛집을 경유지로 표시
- 마커와 폴리라인을 통한 경로 표시
- **API 키 없이 무료로 사용 가능**

## 🚀 시작하기

### 필수 요구사항
- Node.js 16 이상
- npm 또는 yarn

### 설치

1. 저장소 클론
```bash
git clone <repository-url>
cd solideo_Day2_10_01_practice2
```

2. 의존성 설치
```bash
npm install
```

**참고**: 이 앱은 OpenStreetMap과 Leaflet을 사용하므로 **API 키가 전혀 필요하지 않습니다!**
바로 다음 단계로 진행하세요.

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`을 열어 앱을 확인하세요.

### 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 📱 사용 방법

### 1단계: 여행 정보 입력
<img src="docs/step1.png" alt="여행 정보 입력" width="600">

- 출발지와 목적지 입력
- 출발 시간과 여행 기간 설정
- "검색하기" 버튼 클릭

### 2단계: 취향 선택
<img src="docs/step2.png" alt="취향 선택" width="600">

- 관심 있는 여행 스타일 선택
- 선호하는 음식 종류 선택
- 예산 범위 선택
- "추천 받기" 버튼 클릭

### 3단계: 결과 확인
<img src="docs/step3.png" alt="결과 확인" width="600">

- 왼쪽: 대중교통 옵션과 추천 장소
- 오른쪽: 카카오맵 경로 시각화
- 장소를 클릭하여 여행 경로에 추가

## 🏗️ 프로젝트 구조

```
solideo_Day2_10_01_practice2/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── TravelInputForm.tsx
│   │   ├── TransportationSearch.tsx
│   │   ├── LeafletMapView.tsx
│   │   ├── RecommendationsPanel.tsx
│   │   └── PreferencesForm.tsx
│   ├── services/            # API 서비스
│   │   └── api.ts
│   ├── types/               # TypeScript 타입 정의
│   │   └── index.ts
│   ├── App.tsx              # 메인 앱 컴포넌트
│   ├── App.css              # 스타일
│   ├── main.tsx             # 앱 엔트리 포인트
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Maps**: Leaflet + OpenStreetMap (API 키 불필요!)
- **UI**: Custom CSS with Gradient Design
- **State Management**: React Hooks (useState, useEffect)

## 🌐 API 통합

현재 버전은 Mock 데이터를 사용합니다. 실제 환경에서는 다음 API와 통합할 수 있습니다:

### 교통 API
- **버스**: 공공데이터포털 버스 API
- **기차**: 코레일 API, SRT API
- **비행기**: 항공사 API 또는 항공권 검색 API

### 추천 API
- **관광지**: 한국관광공사 Tour API
- **맛집**: 카카오 로컬 API, 네이버 플레이스 API

### 지도 API
- **OpenStreetMap**: 오픈소스 지도 데이터 (API 키 불필요)
- **Leaflet**: 인터랙티브 지도 라이브러리

## 🚀 GitHub Actions CI/CD

이 프로젝트는 GitHub Actions를 사용하여 자동 빌드 및 배포를 수행합니다.

### Workflows

#### 1. CI (Continuous Integration)
- **파일**: `.github/workflows/ci.yml`
- **트리거**: 모든 push 및 pull request
- **작업**:
  - Node.js 18.x, 20.x 환경에서 테스트
  - 의존성 설치 (`npm ci`)
  - 프로젝트 빌드 (`npm run build`)
  - 빌드 결과 검증

#### 2. Deploy (Continuous Deployment)
- **파일**: `.github/workflows/static.yml`
- **트리거**: main, master, 또는 현재 브랜치에 push
- **작업**:
  - 프로젝트 빌드
  - GitHub Pages에 자동 배포

### GitHub Pages 설정

1. **Repository Settings** → **Pages** 이동
2. **Source**: GitHub Actions 선택
3. 코드를 push하면 자동으로 배포됩니다!

### 배포 URL

앱은 다음 주소에서 접근 가능합니다:
```
https://jasoness.github.io/solideo_Day2_10_01_practice2/
```

## 📝 향후 개선 사항

- [ ] 실제 교통 API 연동
- [ ] 실시간 교통 정보 업데이트
- [ ] 사용자 계정 및 여행 계획 저장
- [ ] 모바일 앱 버전
- [ ] 다국어 지원
- [ ] 날씨 정보 통합
- [ ] 소셜 공유 기능
- [ ] 여행 경비 계산기
- [ ] 여행 일정 최적화 알고리즘

## 🤝 기여하기

풀 리퀘스트는 언제나 환영합니다! 큰 변경사항의 경우 먼저 이슈를 열어 논의해 주세요.

## 📄 라이선스

MIT License

## 👨‍💻 개발자

프로젝트에 대한 문의나 제안사항이 있으시면 이슈를 등록해 주세요.

---

**Made with ❤️ for travelers**
