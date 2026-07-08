# CLAUDE.md

Ai-Scream 브랜드 홈페이지 — Swiss-editorial 원페이지, GitHub Pages 배포, 커스텀 도메인 https://ai-scream.ai (EN 기본 `/`, 한글 `/ko/`).
(2026-07 구 픽셀 포트폴리오에서 전면 재구축됨.)

## Commands

```bash
npm run dev          # Vite dev 서버 (?lang=ko 로 한글 미리보기)
npm run build        # tsc -b → client build → SSR build → prerender → verify (자체 게이트)
npm run test         # Vitest (순수 로직 유닛 테스트)
npm run preview      # 빌드 결과 서빙 (/ 와 /ko/ 육안 QA)
npm run lint         # ESLint  ·  npm run format:check  # Prettier
```

Husky + lint-staged pre-commit: `eslint --fix` + `prettier --write` 자동. 셸은 **zsh** (`mapfile` 없음). 커밋이 `.git/index.lock: File exists`로 막히면 `rm -f .git/index.lock` 후 재시도.

## Architecture

- **React 19 + TS + Vite 6 + Tailwind v4** (`@theme` in `src/styles/tokens.css`, no config). **라우터·Motion·PixiJS 없음** (제거됨).
- **빌드 타임 프리렌더**: `src/entry-server.tsx`의 `render(locale)` → `scripts/prerender.mjs`가 `<!--app-head-->`/`<!--app-html-->` 치환 → `dist/index.html`(en) + `dist/ko/index.html`(ko) + `dist/sitemap.xml`(lastmod 자동). 클라이언트는 `main.tsx`에서 hydrate.
- **`scripts/verify-prerender.mjs`가 빌드 게이트** — 산출 HTML을 **정확한 문자열로 grep**. 카피·도메인·메타 변경 시 이 스크립트와 `src/seo/head.test.ts`도 함께 고쳐야 빌드 통과.
- **SSR 안전 필수**: 브라우저 API(matchMedia/IntersectionObserver/document)는 전부 `useEffect` 내부. 렌더 본문·모듈 스코프에서 금지 (renderToString이 Node에서 실행). `Date.now()`/`Math.random()` 렌더 중 금지.

## Key Patterns

- **데이터 주도 콘텐츠**: `src/data/{projects,members,site}.ts` + `src/i18n/copy.ts`. 프로젝트/멤버 추가 = 데이터 한 줄, 컴포넌트 수정 없음. 단일 `ProjectRow`가 모든 프로젝트 렌더. 프로젝트별 전용 컴포넌트 없음.
- **i18n**: `Copy` 타입이 EN/KO 패리티 강제. `useCopy()`/`useLocale()` (React 19 `use()` + `<LocaleContext value>`). 멤버 0명이면 Team 섹션+내비 자동 숨김.
- **SEO**: `src/seo/head.ts`의 `buildHead(locale)`이 canonical/hreflang/OG(이미지 포함)/twitter/JSON-LD 전부 생성. `SITE.url` = `https://ai-scream.ai` (단일 출처).
- **버전**: `__APP_VERSION__` (vite `define`가 package.json에서 주입) → 푸터 표시. 눈에 보이는 배포마다 `npm version` 범프 + 태그 (푸터 버전 = 배포 태그 유지).

## Conventions

- **oklch만** (CSS hex/rgb 금지). 토큰: paper/ink/scream(핑크)/mist. **하드 엣지, 라운드 코너 없음** (아바타 예외). 단일 라이트 테마(다크모드 없음).
- 브랜드명 **"Ai-Scream"** (로고 워드마크 `AI-SCREAM.ai`). EN 헤드라인 + 한글 본문. Path alias `@/*` → `./src/*`.
- 폰트: **Clash Display 셀프호스팅**(`public/fonts/`, LCP preload), Pretendard는 jsdelivr CDN.
- ⚠️ `SiteFooter.tsx`의 `ai-screams.github.io`는 **GitHub 저장소 이름**(도메인 아님) — 도메인 일괄치환 시 제외.

## Domain & Deploy

- 커스텀 도메인 `ai-scream.ai` (`public/CNAME`, HTTPS 강제). `SITE.github`는 `github.com/ai-screams` (org, 불변).
- `deploy.yml`(main push → Pages). deploy 스텝은 실패 시 20초 후 **1회 자동 재시도**(GitHub의 "Deployment failed, try again later" 일시 오류 대응; 빌드는 항상 성공). 그래도 실패면 `gh run rerun <id> --failed`.
- 사이트맵: robots.txt로 passive 등록(자동 발견) + IndexNow 능동 제출(Bing/Yandex/Naver). Google 능동 제출은 Search Console 필요.
- Cloudflare Web Analytics beacon은 `scripts/prerender.mjs`가 **prod 빌드에만** 주입(`SITE.cfBeaconToken`, 공개 토큰) — dev/preview 미포함.

## Lint Rules

ESLint v9 flat + `eslint-plugin-perfectionist`: sort-imports(natural asc, `newlinesBetween: 0`), sort-jsx-props(alpha), sort-objects(alpha). `eslint-config-prettier` 마지막. Prettier + `prettier-plugin-tailwindcss`. Context 훅은 `allowExportNames`에 추가 (현재 `useCopy`, `useLocale`).

## CI/CD

- `ci.yml` (PR): lint, typecheck(+`npm run test`), build, format-check, security, **lighthouse**(`/`·`/ko/` 예산: SEO·a11y ≥0.9 error / 성능·best-practices warn, `lighthouserc.json`) 병렬. SHA 고정. 워크플로 변경은 **PR로 검증**(ci.yml은 PR에서만 실행).
- Dependabot: npm 주간(월, minor/patch 그룹), Actions 월간. 커밋 prefix `chore(deps):`/`chore(ci):`.
