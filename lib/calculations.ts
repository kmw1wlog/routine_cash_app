import type { Hustle } from "@/types";

export function formatKRW(amount: number): string {
  return `${Math.round(amount).toLocaleString("ko-KR")}원`;
}

export function calculateRemainingAmount(
  goalAmount: number,
  currentSaved: number,
): number {
  return Math.max(goalAmount - currentSaved, 0);
}

export function calculateRequiredWeeklyIncome(
  remaining: number,
  targetWeeks: number,
): number {
  if (targetWeeks <= 0) {
    return remaining;
  }

  return Math.ceil(remaining / targetWeeks);
}

export function calculateRequiredMonthlyIncome(
  remaining: number,
  targetMonths: number,
): number {
  if (targetMonths <= 0) {
    return remaining;
  }

  return Math.ceil(remaining / targetMonths);
}

export function calculatePartTimeHours(
  amount: number,
  hourlyWage = 10_000,
): number {
  if (hourlyWage <= 0) {
    return 0;
  }

  return Math.ceil(amount / hourlyWage);
}

export function calculateMonthsRangeByHustle(
  amount: number,
  hustle: Hustle,
): { minMonths: number; maxMonths: number } {
  const minMonths = Math.max(
    1,
    Math.ceil(amount / Math.max(hustle.expectedMonthlyNetMax, 1)),
  );
  const maxMonths = Math.max(
    minMonths,
    Math.ceil(amount / Math.max(hustle.expectedMonthlyNetMin, 1)),
  );

  return { minMonths, maxMonths };
}

export function calculateWeeksRangeByHustle(
  amount: number,
  hustle: Hustle,
): { minWeeks: number; maxWeeks: number } {
  const weeklyMax = hustle.expectedMonthlyNetMax / 4;
  const weeklyMin = hustle.expectedMonthlyNetMin / 4;

  const minWeeks = Math.max(
    hustle.firstIncomeWeeksMin,
    Math.ceil(amount / Math.max(weeklyMax, 1)),
  );
  const maxWeeks = Math.max(
    minWeeks,
    Math.ceil(amount / Math.max(weeklyMin, 1)),
  );

  return { minWeeks, maxWeeks };
}
