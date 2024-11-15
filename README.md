# notion_cloning

## 📌 프로젝트 개요
>  **프로젝트 기간**: 2024년 11월 11일 17:00 ~ 11월 14일 18:00
- **주요 요구사항**:
  - 바닐라 JavaScript로 노션과 유사한 애플리케이션 구현
  - History API를 활용한 SPA(단일 페이지 애플리케이션) 기능 구현
  - 외부 API 연동을 통해 Document CRUD 기능 제공

## ⚙️ 기술 스택
- **언어**: HTML, CSS, JavaScript (Vanilla JS)
- **기술**: History API, Fetch API
- **외부 API**: 데브코스에서 제공한 API 사용

## 📂 파일 구조
```plaintext
/isix-team
|
|── /images               # 이미지 파일 저장 (favicon 등)
|
|── /assets               # 추가 자산 폴더 (SVG 아이콘, PNG 등)
|
|── /src                  # JavaScript 및 CSS 파일 폴더
|        |─── /css          # 스타일링 파일 (CSS)
|       └── /js           # JavaScript 파일 폴더
|                |─── /sidebar    # 사이드바 관련 기능 파일
|                |─── /spa        # 싱글 페이지 애플리케이션 관련 파일
|                |─── /api        # API 요청 관리 파일
|               └── /editor     # 에디터 관련 유틸리티 및 컴포넌트 파일
