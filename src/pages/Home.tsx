import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { duration, easing } from "../styles/tokens";

interface MenuItem {
  desc: string;
  label: string;
  path: string;
}

const MENU_ITEMS: MenuItem[] = [
  { desc: "모험가 소개", label: "NEW GAME", path: "/about" },
  { desc: "프로젝트 목록", label: "QUEST LOG", path: "/projects" },
  { desc: "여행 지도", label: "WORLD MAP", path: "/travel" },
];

const INTRO_TEXT =
  "안녕하세요! AI Scream의 픽셀 세계에 오신 것을 환영합니다.\n이곳은 개발자이자 여행자의 디지털 공간입니다.\n프로젝트와 여행 기록, 그리고 다양한 이야기들이\n여러분을 기다리고 있습니다. ★";

const menuVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.15, staggerChildren: 0.1 } },
};

const menuItemVariants = {
  hidden: { y: 8 },
  visible: {
    transition: { duration: duration.normal, ease: easing.snappy },
    y: 0,
  },
};

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [typingDone, setTypingDone] = useState<boolean>(false);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);

  const toggleDialog = useCallback(() => {
    setDialogOpen((prev) => {
      if (!prev) {
        setDisplayedText("");
        setTypingDone(false);
      }
      return !prev;
    });
  }, []);

  useEffect(() => {
    if (!dialogOpen) return;
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayedText(INTRO_TEXT.slice(0, index));
      if (index >= INTRO_TEXT.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [dialogOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % MENU_ITEMS.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + MENU_ITEMS.length) % MENU_ITEMS.length,
        );
      } else if (
        e.key === " " &&
        document.activeElement === dialogRef.current
      ) {
        e.preventDefault();
        toggleDialog();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleDialog]);

  useEffect(() => {
    linkRefs.current[selectedIndex]?.focus();
  }, [selectedIndex]);

  return (
    <section className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center gap-8 pixel-dot-bg px-6 py-12">
      <motion.h1
        animate={{ y: 0 }}
        className="font-pixel text-lg leading-tight tracking-tight sm:text-2xl md:text-4xl"
        initial={{ y: -12 }}
        style={{
          color: "var(--text-brand)",
          textShadow: "var(--shadow-glow)",
        }}
        transition={{ duration: duration.slow, ease: easing.snappy }}
      >
        ★ AI SCREAM ★
      </motion.h1>

      <motion.p
        animate={{ y: 0 }}
        className="font-pixel-body text-base sm:text-lg"
        initial={{ y: -8 }}
        style={{ color: "var(--text-secondary)" }}
        transition={{
          delay: 0.1,
          duration: duration.slow,
          ease: easing.snappy,
        }}
      >
        Developer. Traveler. Creator.
      </motion.p>

      <motion.ul
        animate="visible"
        className="flex flex-col items-center gap-2"
        initial="hidden"
        role="menu"
        variants={menuVariants}
      >
        {MENU_ITEMS.map((item, i) => (
          <motion.li
            key={item.path}
            role="menuitem"
            variants={menuItemVariants}
          >
            <Link
              aria-label={`${item.label} — ${item.desc}`}
              className="group flex min-h-[44px] flex-col items-center justify-center gap-0.5 px-4 py-2 transition-transform focus:outline-none"
              onClick={() => setSelectedIndex(i)}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              to={item.path}
            >
              <span
                className="font-pixel text-xs sm:text-sm"
                style={{
                  alignItems: "center",
                  color:
                    selectedIndex === i
                      ? "var(--text-brand)"
                      : "var(--text-primary)",
                  display: "flex",
                  gap: "0.5rem",
                  transition: "color 0.15s",
                }}
              >
                <span
                  style={{
                    opacity: selectedIndex === i ? 1 : 0,
                    transition: "opacity 0.15s",
                  }}
                >
                  ▸
                </span>
                {item.label}
              </span>
              <span
                className="font-pixel-body text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.desc}
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        animate={{ y: 0 }}
        className="w-full max-w-lg"
        initial={{ y: 8 }}
        transition={{
          delay: 0.4,
          duration: duration.slow,
          ease: easing.snappy,
        }}
      >
        <div
          aria-expanded={dialogOpen}
          aria-label="소개 대화창"
          className="cursor-pointer pixel-dialog"
          onClick={toggleDialog}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              toggleDialog();
            }
          }}
          ref={dialogRef}
          role="button"
          tabIndex={0}
        >
          <div
            className="mb-3 font-pixel text-xs"
            style={{ color: "var(--text-brand)" }}
          >
            ♦ AI Scream
          </div>

          <AnimatePresence mode="wait">
            {dialogOpen ? (
              <motion.div
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                initial={{ height: 0, opacity: 0 }}
                key="open"
                style={{ overflow: "hidden" }}
                transition={{ duration: duration.normal, ease: easing.smooth }}
              >
                <p
                  className="font-pixel-body text-sm leading-relaxed whitespace-pre-line"
                  style={{ color: "var(--text-primary)" }}
                >
                  {displayedText}
                  {!typingDone && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      ▌
                    </motion.span>
                  )}
                </p>
              </motion.div>
            ) : (
              <motion.p
                animate={{ opacity: 1 }}
                className="font-pixel-body text-sm"
                initial={{ opacity: 0 }}
                key="closed"
                style={{ color: "var(--text-secondary)" }}
                transition={{ duration: duration.fast }}
              >
                ▶ 대화를 시작하려면 클릭하세요
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  ...
                </motion.span>
              </motion.p>
            )}
          </AnimatePresence>

          {dialogOpen && typingDone && (
            <div className="mt-4 flex justify-end">
              <button
                className="pixel-btn font-pixel-body text-xs hover:pixel-btn-hover active:pixel-btn-active"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDialog();
                }}
                style={{ color: "var(--text-primary)" }}
                type="button"
              >
                ▶ 시작
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
