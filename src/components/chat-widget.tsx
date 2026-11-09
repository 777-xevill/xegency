"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { contact, founder } from "@/content/site";
import { LogoMark } from "@/components/logo";
import { Arrow, cx } from "@/components/ui";

/**
 * The site-wide chat assistant. Mounted once in the root layout, so a
 * conversation survives moving between pages. Replies come from /api/chat.
 */

type Message = { role: "user" | "assistant"; content: string };

const MAX_CHARS = 1000;

const suggestions = [
  "What can you build for my business?",
  "How does pricing work?",
  "Where do we start with AI?",
];

const LINK_PATTERN =
  /(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[a-z]{2,}|(?<![\w/.])\/(?:contact|services|work|about|#ai-audit)(?:\/[\w-]+)?)/gi;

const linkClass =
  "text-bone underline decoration-bone/35 underline-offset-[3px] transition-colors hover:decoration-bone";

/** Replies are plain text: this only makes URLs, emails and site paths clickable. */
function renderReply(text: string): ReactNode[] {
  return text
    .replace(/\*\*/g, "")
    // The model likes typographic hyphens and spaces, which break link slugs.
    .replace(/[‐‑]/g, "-")
    .replace(/[  ]/g, " ")
    .split(LINK_PATTERN)
    .map((part, i) => {
      if (i % 2 === 0) return part;

      const clean = part.replace(/[.,;:!?]+$/, "");
      const trailing = part.slice(clean.length);

      if (clean.startsWith("/")) {
        return (
          <span key={i}>
            <Link href={clean} className={linkClass}>
              {clean}
            </Link>
            {trailing}
          </span>
        );
      }
      const isEmail = !clean.startsWith("http");
      return (
        <span key={i}>
          <a
            href={isEmail ? `mailto:${clean}` : clean}
            target={isEmail ? undefined : "_blank"}
            rel={isEmail ? undefined : "noopener noreferrer"}
            className={cx(linkClass, "break-all")}
          >
            {clean.replace(/^https?:\/\//, "")}
          </a>
          {trailing}
        </span>
      );
    });
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
      <path
        d="M3 3l10 10M13 3L3 13"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

function Thinking() {
  return (
    <span role="status" aria-label="Writing a reply" className="flex h-5 items-center gap-2">
      {[0, 180, 360].map((delay) => (
        <span
          key={delay}
          className="h-1.5 w-1.5 rotate-45 animate-pulse bg-stone"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus({ preventScroll: true });

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      launcherRef.current?.focus({ preventScroll: true });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, sending, error]);

  function resizeInput() {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
    el.style.overflowY = el.scrollHeight > 128 ? "auto" : "hidden";
  }

  async function send(raw: string) {
    const text = raw.trim();
    if (!text || sending) return;

    const history: Message[] = [...messages, { role: "user", content: text }];
    setMessages(history);
    setInput("");
    setError("");
    setSending(true);
    requestAnimationFrame(resizeInput);

    const controller = new AbortController();
    abortRef.current = controller;
    let received = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const payload = (await res.json().catch(() => ({}))) as {
          error?: string;
          reason?: string;
        };
        setError(
          payload.reason === "not-configured"
            ? "The assistant is offline right now."
            : (payload.error ?? "Something went wrong."),
        );
        return;
      }

      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        received += value;
        const reply = received;
        setMessages([...history, { role: "assistant", content: reply }]);
      }

      if (!received.trim()) setError("No reply came back. Please try again.");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(
        received
          ? "The reply was cut off. Please try again."
          : "Network problem. Check your connection and try again.",
      );
    } finally {
      setSending(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    send(input);
  }

  function onInputKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      send(input);
    }
  }

  const awaitingFirstToken = sending && messages.at(-1)?.role === "user";

  return (
    <>
      {/* Sits below the mobile menu (z-40) so it never covers it. */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Open chat with the Xegency assistant"
        className={cx(
          "group fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center overflow-hidden bg-bone text-ink shadow-[0_18px_50px_rgb(0_0_0/0.45)] transition-[color,opacity,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-bone md:bottom-8 md:right-8",
          open && "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 bg-ink-700 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
        />
        <LogoMark className="relative z-10 h-7 w-7 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90" />
      </button>

      <div
        role="dialog"
        aria-label="Chat with the Xegency assistant"
        inert={!open}
        className={cx(
          "grain fixed inset-0 z-[60] flex flex-col bg-ink-800 text-bone duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:inset-auto sm:bottom-8 sm:right-8 sm:h-[min(640px,calc(100dvh-4rem))] sm:w-[408px] sm:border sm:border-bone/15 sm:shadow-[0_30px_90px_rgb(0_0_0/0.6)]",
          // Visibility only animates on the way out: on the way in it must
          // flip at once, or the input can't take focus when the panel opens.
          open
            ? "visible opacity-100 transition-[opacity,translate]"
            : "invisible translate-y-6 opacity-0 transition-[opacity,translate,visibility]",
        )}
      >
        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-bone/15 py-3 pl-5 pr-3">
            <div className="flex items-center gap-3">
              <LogoMark className="h-5 w-5" />
              <p className="eyebrow text-bone">Xegency assistant</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                launcherRef.current?.focus({ preventScroll: true });
              }}
              aria-label="Close chat"
              className="flex h-10 w-10 items-center justify-center text-bone/60 transition-colors hover:text-bone"
            >
              <CloseIcon />
            </button>
          </header>

          <div
            ref={scrollerRef}
            data-lenis-prevent=""
            aria-live="polite"
            className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 py-6 [scrollbar-color:rgb(228_223_215/0.2)_transparent] [scrollbar-width:thin]"
          >
            {messages.length === 0 && (
              <div>
                <p className="eyebrow text-stone">Ask the studio</p>
                <h2 className="display balance mt-4 text-[2.5rem]">
                  What are you trying to <em className="text-stone">build?</em>
                </h2>
                <p className="pretty mt-4 text-sm leading-relaxed text-bone/65">
                  I&apos;m the studio&apos;s AI assistant. Ask about services, how
                  a project runs, or whether we&apos;re the right fit.
                </p>
                <ul className="mt-6 border-t border-bone/15">
                  {suggestions.map((suggestion) => (
                    <li key={suggestion} className="border-b border-bone/15">
                      <button
                        type="button"
                        onClick={() => send(suggestion)}
                        className="group flex w-full items-center justify-between gap-4 py-3.5 text-left text-sm text-bone/80 transition-colors hover:text-bone"
                      >
                        {suggestion}
                        <Arrow className="shrink-0 text-stone transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {messages.map((message, i) =>
              message.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <p className="max-w-[85%] whitespace-pre-wrap break-words bg-bone px-4 py-3 text-sm leading-relaxed text-ink">
                    {message.content}
                  </p>
                </div>
              ) : (
                <p
                  key={i}
                  className="whitespace-pre-wrap break-words border-l border-bone/20 pl-4 text-sm leading-relaxed text-bone/85"
                >
                  {renderReply(message.content)}
                </p>
              ),
            )}

            {awaitingFirstToken && (
              <div className="border-l border-bone/20 pl-4">
                <Thinking />
              </div>
            )}

            {error && (
              <p role="alert" className="text-sm leading-relaxed text-red-400">
                {error} You can reach {founder.name} at{" "}
                <a href={`mailto:${contact.email}`} className="underline">
                  {contact.email}
                </a>
                .
              </p>
            )}
          </div>

          <form onSubmit={onSubmit} className="border-t border-bone/15 px-5 pb-4 pt-3">
            <div className="flex items-end gap-3">
              <label htmlFor="chat-input" className="sr-only">
                Your message
              </label>
              <textarea
                id="chat-input"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={MAX_CHARS}
                data-lenis-prevent=""
                placeholder="Type your question"
                onChange={(e) => {
                  setInput(e.target.value);
                  resizeInput();
                }}
                onKeyDown={onInputKey}
                className="max-h-32 min-h-11 flex-1 resize-none overflow-hidden border-0 border-b border-bone/20 bg-transparent py-2.5 text-base leading-relaxed text-bone outline-none transition-colors placeholder:text-bone/35 focus:border-bone sm:text-sm"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center bg-bone text-ink transition-colors duration-300 hover:bg-stone disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-bone"
              >
                <Arrow />
              </button>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-bone/45">
              AI can make mistakes. Avoid sharing sensitive details.{" "}
              <a
                href={contact.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep text-bone/70"
              >
                Book a call with {founder.name}
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
