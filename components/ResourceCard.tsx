"use client";

import { Lock, LockOpen, Sparkles } from "lucide-react";
import { useState } from "react";

import { GentlePaywallNotice } from "@/components/GentlePaywallNotice";
import { formatResourceType } from "@/lib/format";
import type { ResourceContent } from "@/types";

type ResourceCardProps = {
  resource: ResourceContent;
  compact?: boolean;
  isUnlocked: boolean;
  canAfford: boolean;
  onUnlock: (resource: ResourceContent) => void;
  onNeedWallet: () => void;
};

export function ResourceCard({
  resource,
  compact = false,
  isUnlocked,
  canAfford,
  onUnlock,
  onNeedWallet,
}: ResourceCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const canRead = resource.access === "free" || isUnlocked;

  return (
    <article
      className={`rounded-[24px] border border-app-line bg-app-card ${
        compact ? "p-4" : "p-5"
      } shadow-sm`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-app-muted">
            {formatResourceType(resource)}
          </p>
          <h4 className="mt-2 text-lg font-bold text-app-text">{resource.title}</h4>
          <p className="mt-1 text-sm text-app-muted">{resource.subtitle}</p>
        </div>
        <div
          className={`rounded-2xl px-3 py-2 text-xs font-semibold ${
            resource.access === "free"
              ? "bg-app-accent-soft text-app-accent"
              : "bg-slate-900 text-white"
          }`}
        >
          {resource.access === "free" ? "무료" : `${resource.cookiePrice}쿠키`}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-app-muted">{resource.preview}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {canRead ? (
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full bg-app-accent px-4 py-3 text-sm font-semibold text-white"
          >
            <LockOpen className="h-4 w-4" />
            {isOpen ? "접기" : "자료 보기"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => (canAfford ? onUnlock(resource) : onNeedWallet())}
            className="inline-flex items-center gap-2 rounded-full bg-app-text px-4 py-3 text-sm font-semibold text-white"
          >
            <Lock className="h-4 w-4" />
            예시 자료 보기
          </button>
        )}

        {resource.access === "cookie" && !canRead ? (
          <span className="text-xs font-medium text-app-muted">
            {resource.cookiePrice}쿠키 필요
          </span>
        ) : null}

        {resource.access === "cookie" && !canAfford && !canRead ? (
          <button
            type="button"
            onClick={onNeedWallet}
            className="text-xs font-medium text-app-accent underline underline-offset-4"
          >
            자료실 지갑에서 데모 충전하기
          </button>
        ) : null}
      </div>

      {resource.access === "cookie" ? (
        <div className="mt-4 rounded-[20px] bg-slate-50 p-3">
          <GentlePaywallNotice />
        </div>
      ) : null}

      {canRead && isOpen ? (
        <div className="mt-4 rounded-[20px] bg-app-surface/80 p-4 text-sm leading-7 text-app-text">
          <div className="mb-3 flex items-center gap-2 text-app-accent">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em]">
              참고 내용
            </span>
          </div>
          <p className="whitespace-pre-line">{resource.body}</p>
        </div>
      ) : null}
    </article>
  );
}
