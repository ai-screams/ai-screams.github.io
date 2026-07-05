export type Locale = "en" | "ko";

export interface Copy {
  a11y: { skip: string };
  contact: { line: string };
  hero: { subBold: string; subRest: string };
  meta: { description: string; title: string };
  team: { note: string };
  work: { note: string };
}

export const COPY: Record<Locale, Copy> = {
  en: {
    a11y: { skip: "Skip to content" },
    contact: {
      line: "A new project, a collaboration, or just ice cream talk.",
    },
    hero: {
      subBold: "The good kind of scream.",
      subRest:
        "We're Ai-Scream, a developer collective building useful things with AI. Great software? You know it at first bite.",
    },
    meta: {
      description:
        "Ai-Scream is a developer collective building useful things with AI — developer tools, macOS apps, and libraries that make you scream (the good kind).",
      title: "Ai-Scream — AI Developer Collective",
    },
    team: { note: "the people" },
    work: { note: "selected projects" },
  },
  ko: {
    a11y: { skip: "본문으로 건너뛰기" },
    contact: { line: "새 프로젝트, 협업, 혹은 그냥 아이스크림 얘기라도." },
    hero: {
      subBold: "기분 좋은 비명입니다.",
      subRest:
        "Ai-Scream은 AI로 쓸모 있는 것들을 만드는 개발자 콜렉티브예요. 잘 만든 소프트웨어는 한 입 먹어보면 압니다.",
    },
    meta: {
      description:
        "Ai-Scream은 AI로 쓸모 있는 것들을 만드는 개발자 콜렉티브입니다 — 기분 좋은 비명이 나오는 개발자 도구, macOS 앱, 라이브러리.",
      title: "Ai-Scream — AI 개발자 콜렉티브",
    },
    team: { note: "만드는 사람들" },
    work: { note: "선별된 프로젝트" },
  },
};
