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
      homepage: "https://ai-scream.ai/scoop-uv/",
    },
    name: "scoop-uv",
    tags: ["RUST", "CLI", "PYTHON"],
    visual: {
      alt: "scoop-uv mascot — a smiling ice cream cone",
      src: "/projects/scoop-uv.png",
      type: "image",
    },
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
      homepage: "https://ai-scream.ai/Azimuth/",
    },
    name: "Azimuth",
    tags: ["SWIFT", "MACOS"],
    visual: {
      alt: "Azimuth app icon — a compass needle over a window grid",
      src: "/projects/azimuth.png",
      type: "image",
    },
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
      homepage: "https://ai-scream.ai/HwpForge/",
    },
    name: "HwpForge",
    tags: ["RUST", "MCP", "HWPX"],
    visual: {
      alt: "HwpForge mascot — a blacksmith duck wizard",
      src: "/projects/hwpforge.png",
      type: "image",
    },
  },
  {
    category: "MACOS APP",
    description: {
      en: "In folklore, a mara sits on a sleeper's chest and steals their rest. This one keeps your Mac from ever drifting off — timers, automatic triggers, and zero permission prompts.",
      ko: "설화 속 마라는 잠든 이의 가슴에 앉아 잠을 앗아갑니다. 이 마라는 당신의 Mac이 잠들지 못하게 지킵니다 — 타이머와 자동 트리거, 그리고 권한 요청 0건.",
    },
    id: "mara",
    links: {
      github: "https://github.com/ai-screams/mara",
      homepage: "https://ai-scream.ai/mara/",
    },
    name: "Mara",
    tags: ["SWIFT", "MACOS", "MENU BAR"],
    visual: {
      alt: "Mara app icon — an orange eye on a dark rounded square",
      src: "/projects/mara.png",
      type: "image",
    },
  },
];
