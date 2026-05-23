import { CheckCircle2, Target, WalletCards } from "lucide-react";

import type { CommunityPost } from "@/types";

type ProofFeedProps = {
  posts: CommunityPost[];
  demoFirstIncomeVerified: boolean;
  demoGoalAchieved: boolean;
  onVerifyFirstIncome: () => void;
  onVerifyGoalAchieved: () => void;
};

export function ProofFeed({
  posts,
  demoFirstIncomeVerified,
  demoGoalAchieved,
  onVerifyFirstIncome,
  onVerifyGoalAchieved,
}: ProofFeedProps) {
  return (
    <section className="space-y-5">
      <div className="rounded-[30px] bg-card-gradient p-6 shadow-sm">
        <p className="text-sm font-semibold text-app-accent">인증</p>
        <h2 className="mt-2 text-[28px] font-extrabold leading-9 text-app-text">
          실행 기록이 쌓이면 루틴은 훨씬 덜 흔들립니다.
        </h2>
        <p className="mt-3 text-sm leading-6 text-app-muted">
          실제 수익 인증이 아닌 데모 확인 흐름입니다. 목표 달성감과 실행 지속을
          위한 MVP용 장치로 넣었습니다.
        </p>
      </div>

      <div className="grid gap-3">
        <button
          type="button"
          onClick={onVerifyFirstIncome}
          className={`flex min-h-[58px] items-center justify-between rounded-[24px] px-5 text-left ${
            demoFirstIncomeVerified
              ? "bg-emerald-100 text-emerald-800"
              : "bg-app-card text-app-text"
          }`}
        >
          <span className="flex items-center gap-3 font-bold">
            <WalletCards className="h-5 w-5" />
            첫 수익 데모 인증하기
          </span>
          {demoFirstIncomeVerified ? <CheckCircle2 className="h-5 w-5" /> : null}
        </button>

        <button
          type="button"
          onClick={onVerifyGoalAchieved}
          className={`flex min-h-[58px] items-center justify-between rounded-[24px] px-5 text-left ${
            demoGoalAchieved ? "bg-emerald-100 text-emerald-800" : "bg-app-card text-app-text"
          }`}
        >
          <span className="flex items-center gap-3 font-bold">
            <Target className="h-5 w-5" />
            목표 달성 데모 인증하기
          </span>
          {demoGoalAchieved ? <CheckCircle2 className="h-5 w-5" /> : null}
        </button>
      </div>

      <div className="grid gap-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-[24px] border border-app-line bg-app-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-app-text">{post.title}</h3>
              <span className="rounded-full bg-app-warning-soft px-3 py-2 text-xs font-semibold text-app-warning">
                데모
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-app-muted">{post.summary}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-app-accent">
              {post.tag}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
