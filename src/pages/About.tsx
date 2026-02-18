import { type Variants, motion, useInView } from "motion/react";
import { type ReactNode, useRef } from "react";
import { duration, easing } from "../styles/tokens";

/* -- Interfaces ---------------------------------------------------------- */

interface CharacterInfo {
  className: string;
  level: number;
  name: string;
  race: string;
  realm: string;
  subClassName: string;
  title: string;
}

interface JobBranch {
  colorScheme: "accent" | "brand";
  icon: string;
  label: string;
  nodes: JobNode[];
}

interface JobNode {
  fantasy: string;
  real: string;
  status: "COMPLETED" | "CURRENT" | "LOCKED";
}

interface EquipmentSlot {
  category: "ARMOR" | "TOOL" | "WEAPON";
  label: string;
  stars: number;
}

interface InventoryItem {
  label: string;
}

interface QuestEntry {
  description: string;
  period: string;
  status: "COMPLETED" | "IN PROGRESS";
  title: string;
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

/* -- Data Constants ------------------------------------------------------- */

// TODO: Replace with real character info
const CHARACTER_INFO: CharacterInfo = {
  className: "풀스택 마법사",
  level: 99,
  name: "PignuAnte",
  race: "오리너구리",
  realm: "지능 마법 & 결계술의 최전선",
  subClassName: "마도 연구생",
  title: "코드의 방랑자",
};

// TODO: Replace placeholder bio with real introduction
const CHARACTER_BIO: string =
  "AI Scream 왕국의 PignuAnte입니다.\n코드라는 마법을 다루며, 새로운 던전(프로젝트)을 탐험하고\n버그라는 몬스터를 처치하는 것이 일상입니다.\n가끔은 월드맵(세계 여행)을 떠나기도 합니다. ★";

// TODO: Replace with real academic/career progression
const JOB_TRUNK: JobNode = {
  fantasy: "수련생",
  real: "고등",
  status: "COMPLETED",
};

// TODO: Replace with real career branches and details
const JOB_BRANCHES: JobBranch[] = [
  {
    colorScheme: "brand",
    icon: "🪄",
    label: "마법사",
    nodes: [
      { fantasy: "마법학 학사", real: "학사", status: "COMPLETED" },
      { fantasy: "상급 마법사", real: "석사", status: "COMPLETED" },
      { fantasy: "풀스택 마법사", real: "실무", status: "COMPLETED" },
      { fantasy: "마도 연구생", real: "박사과정", status: "CURRENT" },
      { fantasy: "아크메이지", real: "박사", status: "LOCKED" },
    ],
  },
  {
    colorScheme: "accent",
    icon: "🛡️",
    label: "전사",
    nodes: [{ fantasy: "정식 전사", real: "학사", status: "COMPLETED" }],
  },
];

const JOB_STATUS_STYLES: Record<
  JobNode["status"],
  { border: string; color: string; opacity: number }
> = {
  COMPLETED: {
    border: "var(--color-accent-300)",
    color: "var(--color-accent-500)",
    opacity: 1,
  },
  CURRENT: {
    border: "var(--color-brand-400)",
    color: "var(--color-brand-500)",
    opacity: 1,
  },
  LOCKED: {
    border: "var(--border-default)",
    color: "var(--text-tertiary)",
    opacity: 0.5,
  },
};

// TODO: Replace with real skills and ratings
const EQUIPPED_SKILLS: EquipmentSlot[] = [
  { category: "WEAPON", label: "TypeScript", stars: 5 },
  { category: "WEAPON", label: "React", stars: 5 },
  { category: "WEAPON", label: "Next.js", stars: 4 },
  { category: "ARMOR", label: "Node.js", stars: 4 },
  { category: "ARMOR", label: "PostgreSQL", stars: 3 },
  { category: "ARMOR", label: "AWS", stars: 3 },
  { category: "TOOL", label: "Git", stars: 5 },
  { category: "TOOL", label: "Figma", stars: 3 },
  { category: "TOOL", label: "Vite", stars: 4 },
];

// TODO: Replace with real inventory items
const INVENTORY_ITEMS: InventoryItem[] = [
  { label: "Docker" },
  { label: "Tailwind CSS" },
  { label: "Python" },
  { label: "GraphQL" },
  { label: "Redis" },
  { label: "Terraform" },
];

// TODO: Replace with real career/project history
const QUEST_ENTRIES: QuestEntry[] = [
  {
    description:
      "AI Scream 왕국의 포털(포트폴리오 사이트)을 픽셀 마법으로 건설",
    period: "2024.01 - 현재",
    status: "IN PROGRESS",
    title: "왕국의 포털 건설",
  },
  {
    description: "클라우드 던전에서 서버리스 아키텍처 보스를 처치",
    period: "2023.06 - 2023.12",
    status: "COMPLETED",
    title: "클라우드 던전 정복",
  },
  {
    description: "프론트엔드 길드에 입단하여 React 마법을 수련",
    period: "2022.03 - 2023.05",
    status: "COMPLETED",
    title: "프론트엔드 길드 수련",
  },
  {
    description: "코딩이라는 마법을 처음 배우고 모험가의 길에 입문",
    period: "2020.01 - 2022.02",
    status: "COMPLETED",
    title: "모험가의 각성",
  },
];

const CATEGORY_ICONS: Record<EquipmentSlot["category"], string> = {
  ARMOR: "🛡️",
  TOOL: "🔧",
  WEAPON: "⚔️",
};

const SKILL_CATEGORIES = Object.keys(
  CATEGORY_ICONS,
) as EquipmentSlot["category"][];

const SKILLS_BY_CATEGORY: Record<EquipmentSlot["category"], EquipmentSlot[]> =
  Object.fromEntries(
    SKILL_CATEGORIES.map((cat) => [
      cat,
      EQUIPPED_SKILLS.filter((s) => s.category === cat),
    ]),
  ) as Record<EquipmentSlot["category"], EquipmentSlot[]>;

/* -- Animation Variants -------------------------------------------------- */

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    transition: { duration: duration.slow, ease: easing.snappy },
    y: 0,
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: easing.snappy },
    y: 0,
  },
};

/* -- ScrollReveal Component ---------------------------------------------- */

function ScrollReveal({
  children,
  className,
  variants = revealVariants,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-80px", once: true });

  return (
    <motion.div
      animate={isInView ? "visible" : "hidden"}
      className={className}
      initial="hidden"
      ref={ref}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/* -- Job Tree Card Helper ------------------------------------------------ */

function JobTreeCard({
  node,
  styles,
}: {
  node: JobNode;
  styles: { border: string; color: string; opacity: number };
}) {
  return (
    <div
      className="flex min-w-[5rem] flex-col items-center gap-1 pixel-card px-2 py-2 sm:min-w-[6rem] sm:px-3"
      style={{
        borderColor: styles.border,
        opacity: styles.opacity,
      }}
    >
      <span
        className="font-pixel-body text-[10px] sm:text-xs"
        style={{ color: styles.color }}
      >
        {node.fantasy}
      </span>
      <span
        className="font-pixel text-[6px] sm:text-[8px]"
        style={{ color: "var(--text-tertiary)" }}
      >
        {node.real}
      </span>
      {node.status === "CURRENT" ? (
        <span
          className="font-pixel text-[6px]"
          style={{ color: "var(--color-brand-500)" }}
        >
          ▶ NOW
        </span>
      ) : null}
      {node.status === "LOCKED" ? (
        <span
          className="font-pixel text-[8px]"
          style={{ color: "var(--text-tertiary)" }}
        >
          🔒
        </span>
      ) : null}
    </div>
  );
}

/* -- Star Rating Helper -------------------------------------------------- */

function StarRating({ label, stars }: { label: string; stars: number }) {
  const filled: string = "★".repeat(stars);
  const empty: string = "☆".repeat(5 - stars);
  return (
    <span
      aria-label={`${label} 숙련도 ${stars}점 / 5점`}
      className="font-pixel text-[10px]"
    >
      <span style={{ color: "var(--color-brand-400)" }}>{filled}</span>
      <span style={{ color: "var(--text-tertiary)", opacity: 0.4 }}>
        {empty}
      </span>
    </span>
  );
}

/* -- Main Component ------------------------------------------------------ */

export default function About() {
  return (
    <section className="mx-auto max-w-5xl pixel-dot-bg px-6 py-24">
      {/* 1. Page Header */}
      <ScrollReveal>
        <h1
          className="pixel-glow-pulse font-pixel text-base sm:text-lg md:text-2xl"
          style={{ color: "var(--text-brand)" }}
        >
          ★ ABOUT
        </h1>
        <p
          className="mt-3 font-pixel-body text-sm sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          모험가의 기록
        </p>
      </ScrollReveal>

      {/* 2. Decorative Divider */}
      <ScrollReveal className="mt-6 flex items-center gap-3">
        <hr className="flex-1 pixel-divider" />
        <span
          aria-hidden="true"
          className="font-pixel text-xs"
          style={{ color: "var(--color-brand-300)" }}
        >
          ✦
        </span>
        <hr className="flex-1 pixel-divider" />
      </ScrollReveal>

      {/* ══ SECTION 1: Character Info ══ */}
      <ScrollReveal className="mt-10">
        <div className="pixel-dialog">
          {/* Speaker badge */}
          <div className="mb-4 flex items-center gap-2">
            <span
              className="inline-flex h-6 w-6 items-center justify-center font-pixel text-[10px]"
              style={{
                backgroundColor: "var(--color-brand-500)",
                borderRadius: "var(--pixel-border-radius)",
                color: "var(--surface)",
              }}
            >
              ♦
            </span>
            <span
              className="font-pixel text-xs"
              style={{ color: "var(--text-brand)" }}
            >
              CHARACTER
            </span>
          </div>

          {/* Portrait + Name/Stats */}
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Character portrait with decorative frame */}
            <div className="relative flex-shrink-0">
              <div
                className="pixel-card p-1"
                style={{
                  backgroundColor: "var(--surface-elevated)",
                  boxShadow:
                    "var(--pixel-shadow-md), inset 0 0 0 2px var(--color-brand-200)",
                }}
              >
                <div
                  style={{
                    border: "2px solid var(--color-brand-300)",
                    borderRadius: "var(--pixel-border-radius)",
                  }}
                >
                  <img
                    alt={`${CHARACTER_INFO.name} 캐릭터 초상화`}
                    className="h-28 w-28 object-contain sm:h-36 sm:w-36"
                    src="/images/main-character.png"
                  />
                </div>
              </div>
              {/* LVL badge */}
              <span
                className="absolute -right-2 -bottom-2 font-pixel text-[8px]"
                style={{
                  backgroundColor: "var(--color-brand-500)",
                  borderRadius: "var(--pixel-border-radius)",
                  boxShadow: "var(--pixel-shadow-sm)",
                  color: "var(--surface)",
                  padding: "2px 6px",
                }}
              >
                LV.{CHARACTER_INFO.level}
              </span>
            </div>

            {/* Name + Stats */}
            <div className="flex-1">
              <h2
                className="font-pixel text-sm sm:text-base"
                style={{ color: "var(--text-primary)" }}
              >
                {CHARACTER_INFO.name}
              </h2>

              {/* Stats grid: label on top, value below */}
              <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                <div
                  className="rounded-sm p-2"
                  style={{ backgroundColor: "var(--surface-elevated)" }}
                >
                  <dt
                    className="font-pixel text-[8px]"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    RACE
                  </dt>
                  <dd
                    className="mt-1 font-pixel-body text-xs sm:text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {CHARACTER_INFO.race}
                  </dd>
                </div>
                <div
                  className="rounded-sm p-2"
                  style={{ backgroundColor: "var(--surface-elevated)" }}
                >
                  <dt
                    className="font-pixel text-[8px]"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    CLASS
                  </dt>
                  <dd
                    className="mt-1 font-pixel-body text-xs sm:text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {CHARACTER_INFO.className}
                  </dd>
                </div>
                <div
                  className="rounded-sm p-2"
                  style={{ backgroundColor: "var(--surface-elevated)" }}
                >
                  <dt
                    className="font-pixel text-[8px]"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    SUB
                  </dt>
                  <dd
                    className="mt-1 font-pixel-body text-xs sm:text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {CHARACTER_INFO.subClassName}
                  </dd>
                </div>
                <div
                  className="rounded-sm p-2"
                  style={{ backgroundColor: "var(--surface-elevated)" }}
                >
                  <dt
                    className="font-pixel text-[8px]"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    LVL
                  </dt>
                  <dd
                    className="mt-1 font-pixel text-xs sm:text-sm"
                    style={{ color: "var(--color-brand-500)" }}
                  >
                    {CHARACTER_INFO.level}
                  </dd>
                </div>
                <div
                  className="rounded-sm p-2"
                  style={{ backgroundColor: "var(--surface-elevated)" }}
                >
                  <dt
                    className="font-pixel text-[8px]"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    TITLE
                  </dt>
                  <dd
                    className="mt-1 font-pixel-body text-xs sm:text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {CHARACTER_INFO.title}
                  </dd>
                </div>
                <div
                  className="rounded-sm p-2"
                  style={{ backgroundColor: "var(--surface-elevated)" }}
                >
                  <dt
                    className="font-pixel text-[8px]"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    REALM
                  </dt>
                  <dd
                    className="mt-1 font-pixel-body text-xs sm:text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {CHARACTER_INFO.realm}
                  </dd>
                </div>
              </dl>

              {/* Bio */}
              <p
                className="mt-4 font-pixel-body text-xs leading-relaxed whitespace-pre-line sm:text-sm"
                style={{ color: "var(--text-primary)" }}
              >
                {CHARACTER_BIO}
              </p>
            </div>
          </div>

          {/* Job Tree (전직 경로) — Grid Layout */}
          <div className="mt-6">
            <h3
              className="mb-4 font-pixel text-[8px] sm:text-[10px]"
              style={{ color: "var(--text-secondary)" }}
            >
              ⚡ JOB TREE
            </h3>

            {/* Mobile: Vertical Stack (<md) */}
            <div className="flex flex-col items-center gap-3 md:hidden">
              {/* Trunk card */}
              <JobTreeCard
                node={JOB_TRUNK}
                styles={JOB_STATUS_STYLES[JOB_TRUNK.status]}
              />

              {/* Trunk-to-branch connector */}
              <div
                className="h-4 w-[3px]"
                style={{ backgroundColor: "var(--color-brand-200)" }}
              />

              {/* Branches */}
              <div className="flex flex-col gap-4">
                {JOB_BRANCHES.map((branch, bi) => {
                  const isBrand: boolean = branch.colorScheme === "brand";
                  return (
                    <div
                      className="flex flex-col items-center gap-2"
                      key={branch.label}
                    >
                      {/* Inter-branch connector */}
                      {bi > 0 ? (
                        <div
                          className="mb-1 h-4 w-[3px]"
                          style={{ backgroundColor: "var(--color-accent-200)" }}
                        />
                      ) : null}

                      {/* Branch header */}
                      <div className="flex items-center gap-2">
                        <span aria-hidden="true" className="text-base">
                          {branch.icon}
                        </span>
                        <span
                          className="font-pixel text-[10px]"
                          style={{
                            color: isBrand
                              ? "var(--color-brand-400)"
                              : "var(--color-accent-400)",
                          }}
                        >
                          {branch.label}
                        </span>
                      </div>

                      {/* Vertical node chain */}
                      <div className="flex flex-col items-center gap-1">
                        {branch.nodes.map((node, ni) => {
                          const styles = JOB_STATUS_STYLES[node.status];
                          return (
                            <div
                              className="flex flex-col items-center"
                              key={node.fantasy}
                            >
                              {ni > 0 ? (
                                <span
                                  className="font-pixel text-[10px]"
                                  style={{ color: "var(--text-tertiary)" }}
                                >
                                  ↓
                                </span>
                              ) : null}
                              <JobTreeCard node={node} styles={styles} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop: Grid Layout (md+) */}
            <div
              className="hidden items-center gap-x-0 gap-y-3 pb-2 md:grid"
              style={{
                gridTemplateColumns: "auto auto 1fr",
                gridTemplateRows: `repeat(${JOB_BRANCHES.length}, auto)`,
              }}
            >
              {/* Trunk node — spans all branch rows, vertically centered */}
              <div
                style={{
                  gridColumn: "1",
                  gridRow: `1 / ${JOB_BRANCHES.length + 1}`,
                }}
              >
                <JobTreeCard
                  node={JOB_TRUNK}
                  styles={JOB_STATUS_STYLES[JOB_TRUNK.status]}
                />
              </div>

              {/* Branches — connector + label + nodes per row */}
              {JOB_BRANCHES.map((branch, bi) => {
                const isBrand: boolean = branch.colorScheme === "brand";
                return (
                  <div className="contents" key={branch.label}>
                    {/* Diagonal connector */}
                    <span
                      className="px-1 font-pixel text-sm leading-none sm:px-2"
                      style={{
                        color: isBrand
                          ? "var(--color-brand-300)"
                          : "var(--color-accent-300)",
                        gridColumn: "2",
                        gridRow: `${bi + 1}`,
                      }}
                    >
                      {isBrand ? "╱" : "╲"}
                    </span>

                    {/* Branch label + node chain */}
                    <div
                      className="flex items-center gap-1 sm:gap-2"
                      style={{
                        gridColumn: "3",
                        gridRow: `${bi + 1}`,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="mr-1 flex-shrink-0 text-sm"
                      >
                        {branch.icon}
                      </span>
                      {branch.nodes.map((node, ni) => {
                        const styles = JOB_STATUS_STYLES[node.status];
                        return (
                          <div
                            className="flex items-center gap-1 sm:gap-2"
                            key={node.fantasy}
                          >
                            {ni > 0 ? (
                              <span
                                className="flex-shrink-0 font-pixel text-[10px]"
                                style={{ color: "var(--text-tertiary)" }}
                              >
                                →
                              </span>
                            ) : null}
                            <JobTreeCard node={node} styles={styles} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Decorative Divider */}
      <ScrollReveal className="mt-12 flex items-center gap-3">
        <hr className="flex-1 pixel-divider" />
        <span
          aria-hidden="true"
          className="font-pixel text-xs"
          style={{ color: "var(--color-brand-300)" }}
        >
          ✦
        </span>
        <hr className="flex-1 pixel-divider" />
      </ScrollReveal>

      {/* ══ SECTION 2: Equipment & Inventory ══ */}
      <ScrollReveal className="mt-12">
        <h2
          className="mb-6 font-pixel text-xs sm:text-sm"
          style={{ color: "var(--text-brand)" }}
        >
          ▶ EQUIPMENT & INVENTORY
        </h2>
      </ScrollReveal>

      {/* Equipment by category */}
      {SKILL_CATEGORIES.map((cat) => (
        <ScrollReveal className="mt-6" key={cat} variants={staggerContainer}>
          <h3
            className="mb-3 font-pixel text-[8px] sm:text-[10px]"
            style={{ color: "var(--text-secondary)" }}
          >
            {CATEGORY_ICONS[cat]} {cat}
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS_BY_CATEGORY[cat].map((skill) => (
              <motion.div
                className="pixel-card p-3 transition-transform duration-150 hover:-translate-y-0.5"
                key={skill.label}
                variants={staggerItem}
              >
                <p
                  className="font-pixel-body text-xs sm:text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  {skill.label}
                </p>
                <div className="mt-1">
                  <StarRating label={skill.label} stars={skill.stars} />
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      ))}

      {/* Inventory */}
      <ScrollReveal className="mt-8" variants={staggerContainer}>
        <h3
          className="mb-3 font-pixel text-[8px] sm:text-[10px]"
          style={{ color: "var(--text-secondary)" }}
        >
          🎒 INVENTORY
        </h3>
        <div className="flex flex-wrap gap-2">
          {INVENTORY_ITEMS.map((item) => (
            <motion.span
              className="inline-flex items-center pixel-card px-3 py-1.5 font-pixel-body text-xs transition-colors duration-150 hover:border-[var(--color-brand-300)]"
              key={item.label}
              style={{ color: "var(--text-primary)" }}
              variants={staggerItem}
            >
              + {item.label}
            </motion.span>
          ))}
        </div>
      </ScrollReveal>

      {/* Decorative Divider */}
      <ScrollReveal className="mt-12 flex items-center gap-3">
        <hr className="flex-1 pixel-divider" />
        <span
          aria-hidden="true"
          className="font-pixel text-xs"
          style={{ color: "var(--color-brand-300)" }}
        >
          ✦
        </span>
        <hr className="flex-1 pixel-divider" />
      </ScrollReveal>

      {/* ══ SECTION 3: Quest Log ══ */}
      <ScrollReveal className="mt-12">
        <h2
          className="mb-8 font-pixel text-xs sm:text-sm"
          style={{ color: "var(--text-brand)" }}
        >
          ▶ QUEST LOG
        </h2>
      </ScrollReveal>

      {/* Timeline */}
      <ScrollReveal variants={staggerContainer}>
        <div className="relative">
          {/* Vertical line */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[5px] w-[3px] sm:left-[9px]"
            style={{ backgroundColor: "var(--color-brand-200)" }}
          />

          <div className="space-y-6">
            {QUEST_ENTRIES.map((entry) => {
              const isInProgress: boolean = entry.status === "IN PROGRESS";
              return (
                <motion.div
                  className="relative pl-10 sm:pl-12"
                  key={entry.title}
                  variants={staggerItem}
                >
                  {/* Timeline dot */}
                  <div
                    aria-hidden="true"
                    className="absolute top-4 left-[-1px] h-3 w-3 sm:left-[3px]"
                    style={{
                      backgroundColor: isInProgress
                        ? "var(--color-brand-500)"
                        : "var(--color-accent-500)",
                      border: "2px solid var(--surface-elevated)",
                      boxShadow: `0 0 0 2px ${isInProgress ? "var(--color-brand-300)" : "var(--color-accent-300)"}`,
                    }}
                  />

                  {/* Quest card */}
                  <div className="pixel-card p-4 transition-transform duration-150 hover:-translate-y-0.5">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span
                        className="font-pixel text-[8px] sm:text-[10px]"
                        style={{
                          color: isInProgress
                            ? "var(--color-brand-500)"
                            : "var(--color-accent-500)",
                        }}
                      >
                        [{entry.status}]
                      </span>
                      <span
                        className="font-pixel-body text-xs"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {entry.period}
                      </span>
                    </div>
                    <h3
                      className="mb-1 font-pixel text-[10px] sm:text-xs"
                      style={{ color: "var(--text-primary)" }}
                    >
                      ✦ {entry.title}
                    </h3>
                    <p
                      className="font-pixel-body text-xs leading-relaxed sm:text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {entry.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
