"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock3, PiggyBank, TimerReset } from "lucide-react";

import { formatKRW } from "@/lib/calculations";
import type { Goal } from "@/types";

type GoalCardProps = {
  goal: Goal;
  partTimeHours: number;
  comboLabel: string;
  estimateLabel: string;
  onSelect: (goal: Goal) => void;
  featured?: boolean;
};

export function GoalCard({
  goal,
  partTimeHours,
  comboLabel,
  estimateLabel,
  onSelect,
  featured = false,
}: GoalCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(goal)}
      whileTap={{ scale: 0.985 }}
      className={`w-full rounded-[30px] border border-white/70 text-left shadow-sm transition hover:-translate-y-0.5 ${
        featured
          ? "bg-card-gradient p-6 shadow-app"
          : "bg-app-card p-5 hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-white/80 px-3 py-2 text-xs font-semibold text-app-accent">
          {goal.heroLabel}
        </span>
        <ArrowRight className="h-5 w-5 text-app-muted" />
      </div>

      <h3 className="mt-4 text-[22px] font-extrabold leading-8 text-app-text">
        {goal.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-app-muted">{goal.emotionalCopy}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-[22px] bg-white/80 p-4">
          <p className="flex items-center gap-2 text-app-muted">
            <PiggyBank className="h-4 w-4" />
            목표 금액
          </p>
          <p className="mt-2 text-lg font-bold text-app-text">
            {formatKRW(goal.targetAmount)}
          </p>
        </div>
        <div className="rounded-[22px] bg-white/80 p-4">
          <p className="flex items-center gap-2 text-app-muted">
            <Clock3 className="h-4 w-4" />
            알바 기준 시간
          </p>
          <p className="mt-2 text-lg font-bold text-app-text">약 {partTimeHours}시간</p>
        </div>
      </div>

      <div className="mt-4 rounded-[22px] border border-white/80 bg-white/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-app-muted">
          추천 루틴
        </p>
        <p className="mt-2 text-sm font-semibold leading-6 text-app-text">{comboLabel}</p>
        <p className="mt-3 flex items-center gap-2 text-sm text-app-muted">
          <TimerReset className="h-4 w-4 text-app-accent" />
          예상 달성 {estimateLabel}
        </p>
      </div>

      <div className="mt-5 inline-flex min-h-[54px] w-full items-center justify-center rounded-[22px] bg-app-accent px-5 text-base font-bold text-white">
        이 목표 시작하기
      </div>
    </motion.button>
  );
}
