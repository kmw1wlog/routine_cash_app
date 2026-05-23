import { ArrowRightLeft, Coins, Sparkles } from "lucide-react";

import { formatKRW } from "@/lib/calculations";
import { formatMinutes } from "@/lib/format";
import type { Hustle, RoutineCombo } from "@/types";

type HustleComboCardProps = {
  combo: RoutineCombo;
  primary: Hustle;
  support: Hustle;
  estimateLabel: string;
};

export function HustleComboCard({
  combo,
  primary,
  support,
  estimateLabel,
}: HustleComboCardProps) {
  return (
    <section className="rounded-[28px] border border-app-line bg-app-card p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-app-accent">
        <Sparkles className="h-4 w-4" />
        현실적인 조합 추천
      </div>

      <div className="mt-4 grid gap-3">
        <div className="rounded-[22px] bg-app-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-app-muted">
            핵심 부업
          </p>
          <p className="mt-2 text-lg font-bold text-app-text">{primary.title}</p>
          <p className="mt-2 text-sm leading-6 text-app-muted">
            예상 월 순수익 {formatKRW(primary.expectedMonthlyNetMin)}~
            {formatKRW(primary.expectedMonthlyNetMax)} · 하루{" "}
            {formatMinutes(primary.dailyMinutesMin)}~
            {formatMinutes(primary.dailyMinutesMax)}
          </p>
        </div>

        <div className="rounded-[22px] bg-app-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-app-muted">
            보조 부업
          </p>
          <p className="mt-2 text-lg font-bold text-app-text">{support.title}</p>
          <p className="mt-2 text-sm leading-6 text-app-muted">
            예상 월 순수익 {formatKRW(support.expectedMonthlyNetMin)}~
            {formatKRW(support.expectedMonthlyNetMax)} · 하루{" "}
            {formatMinutes(support.dailyMinutesMin)}~
            {formatMinutes(support.dailyMinutesMax)}
          </p>
        </div>

        <div className="rounded-[22px] border border-dashed border-app-line p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-app-muted">
            자산/저축 루틴
          </p>
          <p className="mt-2 flex items-center gap-2 text-base font-bold text-app-text">
            <Coins className="h-4 w-4 text-app-warning" />
            {combo.savingsLabel}
          </p>
          <p className="mt-3 flex items-center gap-2 text-sm text-app-muted">
            <ArrowRightLeft className="h-4 w-4 text-app-accent-secondary" />
            예상 달성 기간 {estimateLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
