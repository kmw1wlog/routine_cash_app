"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CircleAlert, Rocket } from "lucide-react";

import { GoalCalculator } from "@/components/GoalCalculator";
import { HustleComboCard } from "@/components/HustleComboCard";
import { SafetyNotice } from "@/components/SafetyNotice";
import { getGoalComboEstimate, getHustleById, getRoutineCombo } from "@/lib/demoData";
import type { Goal } from "@/types";

type GoalDetailProps = {
  goal: Goal;
  currentSaved: number;
  targetWeeks: number;
  onCurrentSavedChange: (value: number) => void;
  onTargetWeeksChange: (value: number) => void;
  onBack: () => void;
  onStartRoutine: (goalId: string) => void;
};

export function GoalDetail({
  goal,
  currentSaved,
  targetWeeks,
  onCurrentSavedChange,
  onTargetWeeksChange,
  onBack,
  onStartRoutine,
}: GoalDetailProps) {
  const combo = getRoutineCombo(goal);
  const primary = getHustleById(combo.primaryHustleId);
  const support = getHustleById(combo.supportHustleId);
  const comboEstimate = getGoalComboEstimate(goal);

  if (!primary || !support) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 36, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 36, opacity: 0 }}
      className="absolute inset-0 z-20 overflow-y-auto rounded-[36px] bg-app-surface px-5 pb-32 pt-6"
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-app-text shadow-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        홈으로
      </button>

      <header className="mt-5 rounded-[30px] bg-card-gradient p-6 shadow-sm">
        <p className="text-sm font-semibold text-app-accent">목표 헤더</p>
        <h2 className="mt-3 text-[28px] font-extrabold leading-9 text-app-text">
          {goal.title}
        </h2>
        <p className="mt-3 text-base leading-7 text-app-muted">
          {goal.emotionalCopy}
        </p>
        <div className="mt-4 rounded-[22px] bg-white/80 p-4 text-sm leading-6 text-app-text">
          <p>{goal.painLine}</p>
          <p className="mt-2 font-semibold text-app-accent">{goal.hopefulLine}</p>
        </div>
      </header>

      <div className="mt-5 space-y-5">
        <GoalCalculator
          goal={goal}
          currentSaved={currentSaved}
          targetWeeks={targetWeeks}
          onCurrentSavedChange={onCurrentSavedChange}
          onTargetWeeksChange={onTargetWeeksChange}
        />

        <section className="rounded-[28px] border border-app-line bg-app-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-app-warning">
            <CircleAlert className="h-4 w-4" />
            알바 대비 표
          </div>
          <div className="mt-4 grid gap-3">
            {[primary, support].map((hustle) => (
              <div
                key={hustle.id}
                className="rounded-[22px] bg-app-surface p-4 text-sm leading-6"
              >
                <p className="font-bold text-app-text">{hustle.title}</p>
                <p className="mt-2 text-app-muted">
                  첫 수익까지 {hustle.firstIncomeWeeksMin}~{hustle.firstIncomeWeeksMax}
                  주 · 필요한 행동량 {hustle.requiredActionsForFirstIncome.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <HustleComboCard
          combo={combo}
          primary={primary}
          support={support}
          estimateLabel={`${comboEstimate.minWeeks}~${comboEstimate.maxWeeks}주`}
        />

        <section className="rounded-[28px] border border-app-line bg-app-card p-5 shadow-sm">
          <p className="text-sm font-semibold text-app-muted">
            첫 수익 전까지 필요한 행동량
          </p>
          <div className="mt-4 grid gap-3">
            {primary.requiredActionsForFirstIncome.map((action) => (
              <div
                key={action}
                className="rounded-[20px] border border-app-line bg-app-surface px-4 py-3 text-sm text-app-text"
              >
                {action}
              </div>
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={() => onStartRoutine(goal.id)}
          className="inline-flex min-h-[58px] w-full items-center justify-center gap-2 rounded-[24px] bg-app-accent px-5 text-base font-bold text-white shadow-sm"
        >
          <Rocket className="h-5 w-5" />이 루틴으로 시작하기
        </button>

        <SafetyNotice />
      </div>
    </motion.div>
  );
}
