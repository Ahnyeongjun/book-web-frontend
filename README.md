# Happy Books Day
![image](https://github.com/user-attachments/assets/9fb8e7e8-c118-4a87-93be-ed2be62aaf46)

## 구현
- [Next.js](https://nextjs.org/) 15v 앱라우터로 구현됬습니다
- ssr,isr로 페이지단위 캐싱(vercel data cache와 함께)을 수행해 최적화합니다
- 현재 단계에서는 모바일 우선으로 구현되었으며 하이브리드 웹 앱으로 구현되었습니다
- Vercel에서 배포됩니다
- 상태관리는 context API, Zustand로 관리됩니다

### 사용법
```
npm install
npm run dev
```

## 컴포넌트 전략: 모듈화
- 모듈화된 컴포넌트: 각 컴포넌트는 독립적으로 설계되며, 도메인에 의존적이지 않고 재사용하도록 구현합니다.
```
components/
 ├──bookDetail/
 │   ├── BookDetail.tsx
 │   ├── BookTitleSection.tsx
 │   ├── BookDetailSection.tsx
 │   └── BookImageSection.tsx
 ├──commons/
 │   ├── CommonLable.tsx
 │   └── CommonInputField.tsx
```
- 예시1) bookDetail은 book/[isbn] 과 birth-day/[isbn]에서 공통으로 사용됩니다
- 예시2) commons은 모든 요소에서 사용할 수 있는 경우에 위치합니다

## 상태관리 전략
### context API: 도메인 의존적인 상태
```
app/
  ├── publisher/
  │   ├── page.tsx
  │   └── PublisherPageDataProvider.tsx
```
- 예시) publisher에 의존적인 전역상태를 관리하는 PublisherPageDataProvider는 publisher 라우터 내부에 정의합니다
### Zustand: 전역 공유가능 상태
```
context/
  └── PopupStore.ts
```
- 예시) 여러 도메인이나 컴포넌트 간에 공유되는 전역 상태 관리를 위해 사용됩니다(특히 헤더UI, 모달UI같은 공용UI 제어)

### 베스트 프랙티스
- 캡슐화: 도메인에 의존적인 상태는 Context API를 사용해 격리하며, 공용 상태는 Zustand를 활용하여 전역적으로 관리합니다.
- 재사용성: 컴포넌트는 모듈화된 방식으로 작성되어 최대한 다양한 도메인에서 재사용할 수 있도록 설계됩니다.
- 확장성: 새로운 기능이나 도메인이 추가될 때 기존 구조를 변경하지 않고 독립적으로 작업할 수 있습니다.
