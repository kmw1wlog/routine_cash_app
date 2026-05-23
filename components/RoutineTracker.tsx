import { CheckCircle2, Circle, Flame, Sparkles } from "lucide-react";

import { ResourceCard } from "@/components/ResourceCard";
import { SafetyNotice } from "@/components/SafetyNotice";
import { TodayMission } from "@/components/TodayMission";
import { getResourceById } from "@/lib/demoData";
import type { Goal, ResourceContent, RoutineMission } from "@/types";

type RoutineTrackerProps = {
  goal: Goal;
  progress: number;
  missions: RoutineMission[];
  completedMissionIds: string[];
  unlockedResourceIds: string[];
  cookieBalance: number;
  onCompleteMission: (missionId: string) => void;
  onUnlockResource: (resource: ResourceContent) => void;
  onNeedWallet: () => void;
};

export function RoutineTracker({
  goal,
  progress,
  missions,
  completedMissionIds,
  unlockedResourceIds,
  cookieBalance,
  onCompleteMission,
  onUnlockResource,
  onNeedWallet,
}: RoutineTrackerProps) {
  const todayMission =
    missions.find((mission) => !completedMissionIds.includes(mission.id)) ?? missions[0];

  return (
    <div className="space-y-5">
      <section className="rounded-[30px] bg-card-gradient p-6 shadow-sm">
        <p className="text-sm font-semibold text-app-accent">현재 목표</p>
        <h2 className="mt-2 text-[28px] font-extrabold leading-9 text-app-text">
          {goal.title}
        </h2>
        <div className="mt-4 rounded-[22px] bg-white/80 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-app-muted">실행 진척도</p>
              <p className="mt-2 text-3xl font-extrabold text-app-text">
                {progress.toFixed(1)}%
              </p>
            </div>
            <div className="rounded-2xl bg-app-warning-soft px-3 py-2 text-xs font-semibold text-app-warning">
              실제 수익률이 아닌 실행 진척도
            </div>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-app-accent transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </section>

      <TodayMission
        mission={todayMission}
        isCompleted={completedMissionIds.includes(todayMission.id)}
        onComplete={onCompleteMission}
      />

      <section className="rounded-[28px] border border-app-line bg-app-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-app-text">7일 루틴 리스트</h3>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-app-accent">
            <Flame className="h-4 w-4" />
            매일 30분 기준
          </span>
        </div>

        <div className="mt-4 grid gap-3">
          {missions.map((mission) => {
            const isCompleted = completedMissionIds.includes(mission.id);
            const relatedResources = mission.relatedResourceIds
              .map((id) => getResourceById(id))
              .filter(Boolean) as ResourceContent[];
            const freeResources = relatedResources.filter(
              (resource) => resource.access === "free",
            );
            const cookieResource = relatedResources.find(
              (resource) => resource.access === "cookie",
            );

            return (
              <div
                key={mission.id}
                className="rounded-[24px] border border-app-line bg-app-surface p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-app-muted">
                      Day {mission.day}
                    </p>
                    <h4 className="mt-2 text-base font-bold text-app-text">
                      {mission.title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-app-muted">
                      {mission.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onCompleteMission(mission.id)}
                    className={`inline-flex h-11 min-w-11 items-center justify-center rounded-full ${
                      isCompleted
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-white text-app-muted"
                    }`}
                    aria-label={`${mission.title} 완료`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-app-muted">
                  <span className="rounded-full bg-white px-3 py-2">
                    예상 소요 {mission.estimatedMinutes}분
                  </span>
                  <span className="rounded-full bg-app-warning-soft px-3 py-2 text-app-warning">
                    실행 진척도 +{mission.progressPoint.toFixed(1)}%
                  </span>
                </div>

                <div className="mt-4 grid gap-3">
                  {freeResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      compact
                      isUnlocked
                      canAfford
                      onUnlock={() => undefined}
                      onNeedWallet={onNeedWallet}
                    />
                  ))}

                  {cookieResource ? (
                    <div>
                      <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-app-accent">
                        <Sparkles className="h-4 w-4" />
                        선택형 참고자료
                      </p>
                      <ResourceCard
                        resource={cookieResource}
                        compact
                        isUnlocked={unlockedResourceIds.includes(cookieResource.id)}
                        canAfford={cookieBalance >= cookieResource.cookiePrice}
                        onUnlock={onUnlockResource}
                        onNeedWallet={onNeedWallet}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <SafetyNotice />
    </div>
  );
}
