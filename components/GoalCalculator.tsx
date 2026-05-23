import {
  calculateMonthsRangeByHustle,
  calculatePartTimeHours,
  calculateRemainingAmount,
  calculateRequiredMonthlyIncome,
  calculateRequiredWeeklyIncome,
  calculateWeeksRangeByHustle,
  formatKRW,
} from "@/lib/calculations";
import { getHustleById } from "@/lib/demoData";
import type { Goal } from "@/types";

type GoalCalculatorProps = {
  goal: Goal;
  currentSaved: number;
  targetWeeks: number;
  onCurrentSavedChange: (value: number) => void;
  onTargetWeeksChange: (value: number) => void;
};

const targetWeekOptions = [4, 8, 12, 24];

export function GoalCalculator({
  goal,
  currentSaved,
  targetWeeks,
  onCurrentSavedChange,
  onTargetWeeksChange,
}: GoalCalculatorProps) {
  const remaining = calculateRemainingAmount(goal.targetAmount, currentSaved);
  const requiredWeekly = calculateRequiredWeeklyIncome(remaining, targetWeeks);
  const requiredMonthly = calculateRequiredMonthlyIncome(
    remaining,
    targetWeeks / 4,
  );
  const partTimeHours = calculatePartTimeHours(remaining);

  const recommendedHustles = goal.recommendedHustleIds
    .map((id) => getHustleById(id))
    .filter((hustle): hustle is NonNullable<typeof hustle> => Boolean(hustle));

  return (
    <section className="rounded-[28px] border border-app-line bg-app-card p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-app-muted">목표 계산기</p>
          <h3 className="mt-2 text-xl font-bold text-app-text">{goal.title}</h3>
        </div>
        <span className="rounded-full bg-app-warning-soft px-3 py-2 text-xs font-semibold text-app-warning">
          데모 가정 시급 10,000원 기준
        </span>
      </div>

      <div className="mt-5 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-app-text">현재 준비 금액</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={currentSaved}
            onChange={(event) =>
              onCurrentSavedChange(Number(event.target.value) || 0)
            }
            className="min-h-[54px] rounded-[18px] border border-app-line bg-app-surface px-4 text-base font-semibold text-app-text outline-none focus:border-app-accent"
          />
        </label>

        <div>
          <p className="text-sm font-semibold text-app-text">목표 기간</p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {targetWeekOptions.map((week) => (
              <button
                key={week}
                type="button"
                onClick={() => onTargetWeeksChange(week)}
                className={`min-h-[52px] rounded-[18px] border px-3 text-sm font-bold ${
                  targetWeeks === week
                    ? "border-app-accent bg-app-accent text-white"
                    : "border-app-line bg-app-surface text-app-muted"
                }`}
              >
                {week}주
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <StatCard label="목표 금액" value={formatKRW(goal.targetAmount)} />
        <StatCard label="부족 금액" value={formatKRW(remaining)} />
        <StatCard
          label="필요한 주간 추가수익"
          value={formatKRW(requiredWeekly)}
        />
        <StatCard
          label="필요한 월간 추가수익"
          value={formatKRW(requiredMonthly)}
        />
        <StatCard
          label="일반 알바 기준 필요 시간"
          value={`약 ${partTimeHours}시간`}
          wide
        />
      </div>

      <div className="mt-5 rounded-[24px] bg-app-surface p-4">
        <p className="text-sm font-semibold text-app-text">추천 부업별 예상 달성</p>
        <div className="mt-3 grid gap-3">
          {recommendedHustles.map((hustle) => {
            const weekRange = calculateWeeksRangeByHustle(remaining, hustle);
            const monthRange = calculateMonthsRangeByHustle(remaining, hustle);

            return (
              <div
                key={hustle.id}
                className="rounded-[20px] border border-app-line bg-white p-4"
              >
                <p className="text-base font-bold text-app-text">{hustle.title}</p>
                <p className="mt-2 text-sm text-app-muted">
                  예상 달성 {weekRange.minWeeks}~{weekRange.maxWeeks}주 ·{" "}
                  {monthRange.minMonths}~{monthRange.maxMonths}개월
                </p>
                <p className="mt-2 text-sm text-app-muted">
                  첫 수익 {hustle.firstIncomeWeeksMin}~{hustle.firstIncomeWeeksMax}주
                  예상
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-app-muted">
        예상 기간은 보수적 데모 추정입니다. 실제 수익은 투입 시간, 숙련도, 고객
        확보 여부에 따라 달라질 수 있습니다.
      </p>
    </section>
  );
}

function StatCard({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-[20px] border border-app-line bg-white p-4 ${
        wide ? "col-span-2" : ""
      }`}
    >
      <p className="text-sm text-app-muted">{label}</p>
      <p className="mt-2 text-lg font-bold leading-7 text-app-text">{value}</p>
    </div>
  );
}
