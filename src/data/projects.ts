import type { Locale } from "@/i18n/copy";

export interface Project {
  category: string;
  description: Record<Locale, string>;
  id: string;
  links: { github: string; homepage?: string };
  name: string;
  tags: string[];
  visual?:
    | { alt: string; src: string; type: "image" }
    | { lines: string[]; type: "text" };
}

export const PROJECTS: Project[] = [
  {
    category: "DEVELOPER TOOL",
    description: {
      en: "One scoop, endless envs. A centralized Python virtual-environment manager with shell auto-activation — pyenv-style comfort at uv speed.",
      ko: "한 스쿱이면 환경 걱정 끝. 셸 자동 활성화를 갖춘 중앙집중식 Python 가상환경 매니저 — pyenv의 편안함을 uv의 속도로.",
    },
    id: "scoop-uv",
    links: {
      github: "https://github.com/ai-screams/scoop-uv",
      homepage: "https://ai-screams.github.io/scoop-uv/",
    },
    name: "scoop-uv",
    tags: ["RUST", "CLI", "PYTHON"],
  },
  {
    category: "DEVELOPER TOOL",
    description: {
      en: "A blazing-fast statusline HUD for Claude Code. 13 metrics, adaptive layouts, zero dependencies — your session vitals at a glance.",
      ko: "Claude Code를 위한 초고속 상태줄 HUD. 13가지 메트릭, 적응형 레이아웃, 무의존성 — 세션의 활력징후를 한눈에.",
    },
    id: "howl",
    links: { github: "https://github.com/ai-screams/howl" },
    name: "howl",
    tags: ["GO", "CLI", "CLAUDE CODE"],
  },
  {
    category: "MACOS APP",
    description: {
      en: "Give your Mac windows a sense of direction. Snap, move, and throw them across displays — all from the keyboard.",
      ko: "Mac 창에 방향 감각을. 스냅하고, 옮기고, 디스플레이 사이로 던지세요 — 전부 키보드로.",
    },
    id: "azimuth",
    links: {
      github: "https://github.com/ai-screams/Azimuth",
      homepage: "https://ai-screams.github.io/Azimuth/",
    },
    name: "Azimuth",
    tags: ["SWIFT", "MACOS"],
  },
  {
    category: "LIBRARY / MCP",
    description: {
      en: "Programmatic control of Korean HWPX documents in Rust — Markdown-to-HWPX conversion, JSON round-trip editing, and an MCP server for AI agents.",
      ko: "Rust로 다루는 한글 HWPX 문서 — Markdown→HWPX 변환, JSON 왕복 편집, AI 에이전트를 위한 MCP 서버까지.",
    },
    id: "hwpforge",
    links: {
      github: "https://github.com/ai-screams/HwpForge",
      homepage: "https://ai-screams.github.io/HwpForge/",
    },
    name: "HwpForge",
    tags: ["RUST", "MCP", "HWPX"],
  },
];
