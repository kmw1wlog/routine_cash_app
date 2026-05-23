"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

import {
  ageOptions,
  interestOptions,
  monthlyIncomeOptions,
  timeOptions,
  workStyleOptions,
} from "@/lib/demoData";
import type { AgeSegment, Interest, UserProfile, WorkStyle } from "@/types";

type OnboardingProps = {
  onComplete: (profile: UserProfile) => void;
};

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [ageSegment, setAgeSegment] = useState<AgeSegment>("teen_20s");
  const [interest, setInterest] = useState<Interest>("love");
  const [desiredMonthlyExtraIncome, setDesiredMonthlyExtraIncome] =
    useState<number>(300_000);
  const [availableMinutesPerDay, setAvailableMinutesPerDay] = useState<number>(60);
  const [workStyle, setWorkStyle] = useState<WorkStyle>("video");

  const steps = [
    {
      title: "나이대",
      description: "비슷한 목표 카드부터 먼저 보여드릴게요.",
      options: ageOptions.map((option) => ({
        label: option.label,
        value: option.value,
      })),
      selected: ageSegment,
      onSelect: (value: AgeSegment) => setAgeSegment(value),
    },
    {
      title: "지금 가장 신경 쓰이는 것",
      description: "지금 마음을 가장 많이 차지하는 장면을 하나 고르세요.",
      options: interestOptions.map((option) => ({
        label: option.label,
        value: option.value,
      })),
      selected: interest,
      onSelect: (value: Interest) => setInterest(value),
    },
    {
      title: "한 달에 현실적으로 필요한 추가수익",
      description: "과장 없이, 지금 필요한 크기를 먼저 잡습니다.",
      options: monthlyIncomeOptions.map((option) => ({
        label: option.label,
        value: option.value,
      })),
      selected: desiredMonthlyExtraIncome,
      onSelect: (value: number) => setDesiredMonthlyExtraIncome(value),
    },
    {
      title: "하루 투입 가능 시간",
      description: "지속 가능한 시간대가 재방문 이유가 됩니다.",
      options: timeOptions.map((option) => ({
        label: option.label,
        value: option.value,
      })),
      selected: availableMinutesPerDay,
      onSelect: (value: number) => setAvailableMinutesPerDay(value),
    },
    {
      title: "선호 방식",
      description: "처음 루틴은 내가 덜 버거운 방식에서 시작합니다.",
      options: workStyleOptions.map((option) => ({
        label: option.label,
        value: option.value,
      })),
      selected: workStyle,
      onSelect: (value: WorkStyle) => setWorkStyle(value),
    },
  ] as const;

  const currentStep = steps[step];

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="phone-shadow relative w-full max-w-[430px] overflow-hidden rounded-[36px] border border-white/60 bg-app-surface"
      >
        <div className="px-5 pb-10 pt-8">
          <div className="rounded-[30px] bg-card-gradient p-6 shadow-sm">
            <p className="text-sm font-semibold text-app-accent">루틴캐시</p>
            <h1 className="mt-3 text-[30px] font-extrabold leading-10 text-app-text">
              돈 때문에 미뤘던 장면을, 이번 달 목표로 바꾸세요.
            </h1>
            <p className="mt-3 text-sm leading-6 text-app-muted">
              가격표 앞에서 망설였던 순간을 실행 가능한 부업 루틴으로
              바꿉니다.
            </p>
          </div>

          <div className="mt-5 flex items-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  index <= step ? "bg-app-accent" : "bg-app-line"
                }`}
              />
            ))}
          </div>

          <section className="mt-6 rounded-[30px] border border-app-line bg-app-card p-5 shadow-sm">
            <p className="text-sm font-semibold text-app-accent">
              질문 {step + 1} / {steps.length}
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-app-text">
              {currentStep.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-app-muted">
              {currentStep.description}
            </p>

            <div className="mt-5 grid gap-3">
              {currentStep.options.map((option) => {
                const selected = option.value === currentStep.selected;

                return (
                  <button
                    key={`${currentStep.title}-${String(option.value)}`}
                    type="button"
                    onClick={() => currentStep.onSelect(option.value as never)}
                    className={`min-h-[58px] rounded-[22px] border px-4 py-3 text-left text-sm font-semibold transition ${
                      selected
                        ? "border-app-accent bg-app-accent text-white"
                        : "border-app-line bg-app-surface text-app-text"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex gap-3">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev - 1)}
                  className="min-h-[56px] flex-1 rounded-[22px] border border-app-line bg-app-surface px-4 text-sm font-semibold text-app-text"
                >
                  이전
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => {
                  if (step < steps.length - 1) {
                    setStep((prev) => prev + 1);
                    return;
                  }

                  onComplete({
                    ageSegment,
                    interests: [interest],
                    targetGoalType: interest,
                    desiredMonthlyExtraIncome,
                    availableMinutesPerDay,
                    workStyles: [workStyle],
                  });
                }}
                className="flex min-h-[56px] flex-1 items-center justify-center gap-2 rounded-[22px] bg-app-accent px-4 text-sm font-bold text-white"
              >
                {step < steps.length - 1 ? "다음" : "루틴캐시 시작하기"}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
