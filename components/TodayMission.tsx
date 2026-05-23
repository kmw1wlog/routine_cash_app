import { CheckCircle2, Circle, Clock3 } from "lucide-react";

import { formatMinutes } from "@/lib/format";
import type { RoutineMission } from "@/types";

type TodayMissionProps = {
  mission: RoutineMission;
  isCompleted: boolean;
  onComplete: (missionId: string) => void;
};

export function TodayMission({
  mission,
  isCompleted,
  onComplete,
}: TodayMissionProps) {
  return (
    <section className="rounded-[28px] border border-app-line bg-app-card p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-app-muted">
            오늘 30분이면 시작할 수 있어요
          </p>
          <h3 className="mt-2 text-xl font-bold text-app-text">{mission.title}</h3>
        </div>
        <div className="rounded-2xl bg-app-accent-soft px-3 py-2 text-xs font-semibold text-app-accent">
          Day {mission.day}
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-app-muted">{mission.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-app-muted">
        <span className="inline-flex items-center gap-2 rounded-full bg-app-surface px-3 py-2">
          <Clock3 className="h-4 w-4" />
          예상 소요 {formatMinutes(mission.estimatedMinutes)}
        </span>
        <span className="rounded-full bg-app-warning-soft px-3 py-2 text-app-warning">
          완료 시 실행 진척도 +{mission.progressPoint.toFixed(1)}%
        </span>
      </div>

      <button
        type="button"
        onClick={() => onComplete(mission.id)}
        disabled={isCompleted}
        className={`mt-5 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-[20px] px-5 text-sm font-bold ${
          isCompleted
            ? "bg-emerald-100 text-emerald-800"
            : "bg-app-accent text-white"
        }`}
      >
        {isCompleted ? (
          <>
            <CheckCircle2 className="h-5 w-5" />
            오늘 미션 완료됨
          </>
        ) : (
          <>
            <Circle className="h-5 w-5" />
            오늘 미션 완료하기
          </>
        )}
      </button>
    </section>
  );
}
