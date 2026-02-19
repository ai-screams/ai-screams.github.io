import { getProjectSummaryBySlug } from "./summary-data";
import {
  type Project,
  type ProjectHighlight,
  type ProjectSection,
  type ProjectSlug,
} from "./types";

const PROJECT_SECTIONS_BY_SLUG: Readonly<
  Record<ProjectSlug, readonly ProjectSection[]>
> = {
  "campfire-retrospective-log": [
    {
      body: "팀 회고를 게임 일지처럼 남기는 사내 실험 도구입니다. 회의 후 핵심 결론을 짧고 구조화된 형식으로 정리하도록 유도했습니다.",
      heading: "개요",
      id: "overview",
    },
    {
      body: "기존 회고 문서는 서술 길이가 제각각이고 검색 태그가 없어 과거 결정을 찾기 어려웠습니다. 결과적으로 같은 논의를 반복하는 비효율이 누적됐습니다.",
      heading: "문제",
      id: "problem",
    },
    {
      body: "입력 폼을 고정된 섹션 구조로 제한하고 자동 태그 추천 규칙을 추가했습니다. 월 단위 뷰와 키워드 필터를 제공해 기록 탐색 비용을 낮췄습니다.",
      heading: "해결",
      id: "solution",
    },
    {
      body: "회고 작성 시간이 줄고 동일 주제 재논의 횟수가 감소했습니다. 태그 기반 탐색 도입으로 신규 팀원이 맥락을 익히는 속도도 개선됐습니다.",
      heading: "결과",
      id: "result",
    },
  ],
  "dungeon-party-planner": [
    {
      body: "파티 기반 레이드 일정을 관리하는 협업 도구의 API와 데이터 모델을 설계한 프로젝트입니다. 역할 기반 권한과 반복 일정 시나리오를 우선 지원했습니다.",
      heading: "개요",
      id: "overview",
    },
    {
      body: "운영자가 수동으로 파티 편성과 일정을 맞추다 보니 중복 예약과 누락 알림이 자주 발생했습니다. 변경 이력을 추적하기 어려워 분쟁 대응에도 시간이 소모됐습니다.",
      heading: "문제",
      id: "problem",
    },
    {
      body: "도메인 이벤트 중심으로 스키마를 분리하고 트랜잭션 경계를 명확히 정의했습니다. 예약 충돌 검증 로직과 알림 큐 재시도 정책을 도입해 안정성을 높였습니다.",
      heading: "해결",
      id: "solution",
    },
    {
      body: "테스트 환경에서 일정 충돌 케이스를 자동 차단하고 알림 누락 비율을 크게 줄였습니다. 운영 로그가 남아 이슈 재현과 원인 분석 속도도 개선됐습니다.",
      heading: "결과",
      id: "result",
    },
  ],
  "pixel-kingdom-portal": [
    {
      body: "개인 브랜딩 사이트를 RPG 세계관으로 재설계한 정적 SPA 프로젝트입니다. 포트폴리오 정보가 스토리처럼 읽히도록 페이지 구조를 재정의했습니다.",
      heading: "개요",
      id: "overview",
    },
    {
      body: "기존 화면은 정보는 많지만 핵심 메시지와 동선이 분산되어 첫 방문자가 방향을 잃기 쉬웠습니다. 테마 전환, 콘텐츠 탐색, 모바일 접근성을 동시에 강화해야 했습니다.",
      heading: "문제",
      id: "problem",
    },
    {
      body: "디자인 토큰 계층을 정비하고 라우트 단위 코드 스플리팅을 적용해 초기 로딩 부담을 줄였습니다. 픽셀 컴포넌트 규칙을 공통화하여 기능 추가 시 시각 톤을 안정적으로 유지했습니다.",
      heading: "해결",
      id: "solution",
    },
    {
      body: "첫 화면 이탈률이 감소하고 페이지당 체류 시간이 늘어났다는 내부 분석 결과를 확보했습니다. 이후 다른 페이지도 동일한 토큰 기반 UI 규칙으로 확장할 수 있게 되었습니다.",
      heading: "결과",
      id: "result",
    },
  ],
  "route-quest-board": [
    {
      body: "지하철 이동 동선을 퀘스트 보드 형태로 시각화한 웹 앱입니다. 통근자의 실제 루틴을 빠르게 기록하고 비교할 수 있도록 설계했습니다.",
      heading: "개요",
      id: "overview",
    },
    {
      body: "사용자 인터뷰에서 기존 지도 앱은 경로 저장은 가능하지만 비교와 회고가 어렵다는 피드백이 반복되었습니다. 특히 모바일에서 입력 단계가 길어 중도 이탈이 많았습니다.",
      heading: "문제",
      id: "problem",
    },
    {
      body: "입력 단계를 3단계로 축약하고 핵심 선택지를 버튼 중심으로 재배치했습니다. 기록 카드에 상태 태그를 부여해 사용자 스스로 패턴을 읽을 수 있게 구성했습니다.",
      heading: "해결",
      id: "solution",
    },
    {
      body: "프로토타입 테스트에서 경로 등록 완료율이 상승하고 재방문 사용자가 증가했습니다. 카드 기반 기록 구조 덕분에 루틴 비교 속도도 체감적으로 빨라졌습니다.",
      heading: "결과",
      id: "result",
    },
  ],
};

const PROJECT_HIGHLIGHTS_BY_SLUG: Readonly<
  Record<ProjectSlug, readonly ProjectHighlight[]>
> = {
  "campfire-retrospective-log": [
    {
      description: "고정 템플릿 + 태그 추천 이후",
      id: "retrospective-time",
      label: "회고 작성 시간",
      value: "-32%",
    },
    {
      description: "키워드/태그 탐색 기준",
      id: "decision-log-rediscovery",
      label: "결정 로그 재탐색",
      value: "2.1x",
    },
  ],
  "dungeon-party-planner": [
    {
      description: "테스트 시나리오 기준",
      id: "schedule-conflict-block",
      label: "일정 충돌 자동 차단",
      value: "96%",
    },
    {
      description: "큐 재시도 정책 적용 이후",
      id: "notification-miss-rate",
      label: "알림 누락 비율",
      value: "-41%",
    },
  ],
  "pixel-kingdom-portal": [
    {
      description: "내부 GA 비교 (리빌드 전/후)",
      id: "first-screen-bounce",
      label: "첫 화면 이탈률",
      value: "-23%",
    },
    {
      description: "페이지별 평균 체류",
      id: "session-dwell-time",
      label: "세션 체류 시간",
      value: "+38초",
    },
  ],
  "route-quest-board": [
    {
      description: "모바일 프로토타입 테스트",
      id: "route-completion-rate",
      label: "경로 등록 완료율",
      value: "+19%",
    },
    {
      description: "2주 리텐션 기준",
      id: "returning-users",
      label: "재방문 사용자",
      value: "+14%",
    },
  ],
};

export function getProjectBySlug(slug: ProjectSlug): Project | undefined {
  const projectSummary = getProjectSummaryBySlug(slug);

  if (!projectSummary) {
    return undefined;
  }

  return {
    ...projectSummary,
    highlights: PROJECT_HIGHLIGHTS_BY_SLUG[slug],
    sections: PROJECT_SECTIONS_BY_SLUG[slug],
  };
}
