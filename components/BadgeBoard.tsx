import { Lock, Trophy } from "lucide-react";

import type { Badge } from "@/types";

type BadgeBoardProps = {
  badges: Badge[];
};

export function BadgeBoard({ badges }: BadgeBoardProps) {
  return (
    <section className="rounded-[28px] border border-app-line bg-app-card p-5 shadow-sm">
      <h3 className="text-lg font-bold text-app-text">뱃지 보드</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`rounded-[22px] border p-4 ${
              badge.unlocked
                ? "border-emerald-200 bg-emerald-50"
                : "border-app-line bg-app-surface"
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`rounded-full p-2 ${
                  badge.unlocked ? "bg-emerald-100 text-emerald-700" : "bg-white text-app-muted"
                }`}
              >
                {badge.unlocked ? (
                  <Trophy className="h-5 w-5" />
                ) : (
                  <Lock className="h-5 w-5" />
                )}
              </div>
              <span className="text-xs font-semibold text-app-muted">
                {badge.unlocked ? "해제됨" : "잠금"}
              </span>
            </div>
            <p className="mt-3 text-base font-bold text-app-text">{badge.title}</p>
            <p className="mt-2 text-sm leading-6 text-app-muted">{badge.description}</p>
            <p className="mt-3 text-xs font-medium text-app-warning">{badge.condition}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
