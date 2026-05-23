import { ChevronRight, Sparkles } from "lucide-react";

import { GoalCard } from "@/components/GoalCard";
import { ResourceCard } from "@/components/ResourceCard";
import { TodayMission } from "@/components/TodayMission";
import { getDefaultCurrentSaved, getGoalComboEstimate, getRoutineCombo } from "@/lib/demoData";
import { calculatePartTimeHours, calculateRemainingAmount } from "@/lib/calculations";
import { formatAgeSegment } from "@/lib/format";
import type {
  CommunityPost,
  Goal,
  ResourceContent,
  RoutineMission,
  UserProfile,
} from "@/types";

type HomeFeedProps = {
  profile: UserProfile;
  featuredGoal: Goal;
  goals: Goal[];
  todayMission: RoutineMission;
  completedMissionIds: string[];
  previewResources: ResourceContent[];
  posts: CommunityPost[];
  unlockedResourceIds: string[];
  cookieBalance: number;
  onOpenGoal: (goal: Goal) => void;
  onCompleteMission: (missionId: string) => void;
  onUnlockResource: (resource: ResourceContent) => void;
  onNeedWallet: () => void;
  onJumpToProof: () => void;
};

export function HomeFeed({
  profile,
  featuredGoal,
  goals,
  todayMission,
  completedMissionIds,
  previewResources,
  posts,
  unlockedResourceIds,
  cookieBalance,
  onOpenGoal,
  onCompleteMission,
  onUnlockResource,
  onNeedWallet,
  onJumpToProof,
}: HomeFeedProps) {
  return (
    <div className="space-y-5">
      <header className="rounded-[32px] bg-card-gradient p-6 shadow-sm">
        <p className="text-sm font-semibold text-app-accent">
          돈 때문에 미뤘던 장면을, 이번 달 목표로 바꾸세요.
        </p>
        <h1 className="mt-3 text-[30px] font-extrabold leading-10 text-app-text">
          이번 달, 돈 때문에 미룬 걸 하나 줄여보세요.
        </h1>
        <p className="mt-3 text-sm leading-6 text-app-muted">
          {formatAgeSegment(profile.ageSegment)}에게 많이 선택되는 목표를 먼저
          보여드릴게요.
        </p>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-app-text">오늘의 대표 목표 카드</h2>
          <Sparkles className="h-5 w-5 text-app-accent" />
        </div>
        <GoalCard
          goal={featuredGoal}
          partTimeHours={calculatePartTimeHours(
            calculateRemainingAmount(
              featuredGoal.targetAmount,
              getDefaultCurrentSaved(featuredGoal),
            ),
          )}
          comboLabel={getComboLabel(featuredGoal)}
          estimateLabel={getEstimateLabel(featuredGoal)}
          onSelect={onOpenGoal}
          featured
        />
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-app-text">욕망 피드</h2>
          <span className="text-sm text-app-muted">마음이 먼저 움직이는 순서</span>
        </div>
        {goals.slice(1, 5).map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            partTimeHours={calculatePartTimeHours(
              calculateRemainingAmount(goal.targetAmount, getDefaultCurrentSaved(goal)),
            )}
            comboLabel={getComboLabel(goal)}
            estimateLabel={getEstimateLabel(goal)}
            onSelect={onOpenGoal}
          />
        ))}
      </section>

      <TodayMission
        mission={todayMission}
        isCompleted={completedMissionIds.includes(todayMission.id)}
        onComplete={onCompleteMission}
      />

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-app-text">막힐 때 보는 참고자료</h2>
          <span className="text-sm text-app-muted">무료 우선</span>
        </div>
        {previewResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            compact
            isUnlocked={unlockedResourceIds.includes(resource.id)}
            canAfford={cookieBalance >= resource.cookiePrice}
            onUnlock={onUnlockResource}
            onNeedWallet={onNeedWallet}
          />
        ))}
      </section>

      <section className="rounded-[28px] border border-app-line bg-app-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-app-text">인증/커뮤니티 미리보기</h2>
            <p className="mt-1 text-sm text-app-muted">
              실행 기록은 숫자보다 오래 남습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onJumpToProof}
            className="inline-flex items-center gap-1 text-sm font-semibold text-app-accent"
          >
            더 보기 <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          {posts.slice(0, 2).map((post) => (
            <div
              key={post.id}
              className="rounded-[22px] bg-app-surface p-4 text-sm leading-6"
            >
              <p className="font-bold text-app-text">{post.title}</p>
              <p className="mt-2 text-app-muted">{post.summary}</p>
              <p className="mt-2 text-xs font-semibold text-app-warning">데모 인증 예시</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function getComboLabel(goal: Goal) {
  const combo = getRoutineCombo(goal);
  const primary = goal.recommendedHustleIds[0];
  const support = goal.recommendedHustleIds[1];

  return `${labelForHustle(primary)} + ${labelForHustle(support)} · ${combo.savingsLabel}`;
}

function getEstimateLabel(goal: Goal) {
  const estimate = getGoalComboEstimate(goal);
  return `${estimate.minWeeks}~${estimate.maxWeeks}주`;
}

function labelForHustle(hustleId: string | undefined) {
  const map: Record<string, string> = {
    "shorts-editing": "쇼츠 편집",
    "blog-writing": "블로그 원고",
    "ai-image": "AI 이미지",
    "tutoring-materials": "과외 자료",
    resell: "중고 리셀",
    affiliate: "제휴 글쓰기",
    "detail-page-assist": "상세페이지 보조",
    "weekend-parttime": "주말 단기 알바",
    "offline-delivery": "오프라인 단기 부업",
    "template-selling": "템플릿 판매",
  };

  return hustleId ? map[hustleId] ?? hustleId : "보조 루틴";
}
