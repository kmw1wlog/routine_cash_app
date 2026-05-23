"use client";

import { AnimatePresence } from "framer-motion";
import { BarChart3, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { BadgeBoard } from "@/components/BadgeBoard";
import { BottomNav } from "@/components/BottomNav";
import { CookieWallet } from "@/components/CookieWallet";
import { GoalCalculator } from "@/components/GoalCalculator";
import { GoalDetail } from "@/components/GoalDetail";
import { HomeFeed } from "@/components/HomeFeed";
import { HustleComboCard } from "@/components/HustleComboCard";
import { Onboarding } from "@/components/Onboarding";
import { ProofFeed } from "@/components/ProofFeed";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { RoutineTracker } from "@/components/RoutineTracker";
import { SafetyNotice } from "@/components/SafetyNotice";
import {
  communityPosts,
  defaultBadges,
  getDefaultCurrentSaved,
  getGoalById,
  getGoalComboEstimate,
  getGoalResources,
  getHustleById,
  getPersonalizedGoals,
  getRoutineCombo,
  getRoutineMissionsForGoal,
  goals,
  resources,
} from "@/lib/demoData";
import {
  defaultAppState,
  loadAppState,
  loadBadgeUnlockMap,
  loadProfile,
  persistAppState,
  saveBadgeUnlockMap,
  saveProfile,
} from "@/lib/storage";
import type {
  AppState,
  BadgeUnlockMap,
  Goal,
  ResourceContent,
  UserProfile,
} from "@/types";

export function AppShell() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [appState, setAppState] = useState<AppState>(defaultAppState);
  const [badgeUnlockMap, setBadgeUnlockMap] = useState<BadgeUnlockMap>({});
  const [detailGoalId, setDetailGoalId] = useState<string | null>(null);
  const [focusedGoalId, setFocusedGoalId] = useState<string | null>(null);
  const [currentSavedByGoal, setCurrentSavedByGoal] = useState<Record<string, number>>(
    {},
  );
  const [targetWeeksByGoal, setTargetWeeksByGoal] = useState<Record<string, number>>(
    {},
  );

  useEffect(() => {
    const storedProfile = loadProfile();
    const storedState = loadAppState(storedProfile);
    const storedBadges = loadBadgeUnlockMap();

    setProfile(storedProfile);
    setAppState(storedState);
    setBadgeUnlockMap(storedBadges);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || !profile) {
      return;
    }

    saveProfile(profile);
  }, [isHydrated, profile]);

  useEffect(() => {
    if (!isHydrated || !profile) {
      return;
    }

    persistAppState({ ...appState, profile });
  }, [appState, isHydrated, profile]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    saveBadgeUnlockMap(badgeUnlockMap);
  }, [badgeUnlockMap, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const nextBadgeMap = deriveBadges(appState);
    setBadgeUnlockMap((prev) => {
      const same =
        Object.keys(nextBadgeMap).every((key) => prev[key] === nextBadgeMap[key]) &&
        Object.keys(prev).every((key) => prev[key] === nextBadgeMap[key]);

      return same ? prev : nextBadgeMap;
    });
  }, [appState, isHydrated]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-6">
        <div className="phone-shadow w-full max-w-[430px] rounded-[36px] border border-white/60 bg-app-surface p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 rounded-full bg-app-line" />
            <div className="h-32 rounded-[28px] bg-app-line" />
            <div className="h-24 rounded-[24px] bg-app-line" />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <Onboarding
        onComplete={(nextProfile) => {
          setProfile(nextProfile);
          setAppState((prev) => ({ ...prev, profile: nextProfile, selectedTab: "home" }));
          saveProfile(nextProfile);
        }}
      />
    );
  }

  const personalizedGoals = getPersonalizedGoals(profile);
  const featuredGoal = personalizedGoals[0] ?? goals[0];
  const detailGoal = getGoalById(detailGoalId);
  const activeGoal = getGoalById(appState.activeGoalId);
  const focusedGoal = getGoalById(focusedGoalId);
  const calculatorGoal = detailGoal ?? focusedGoal ?? activeGoal ?? featuredGoal;
  const calculatorCurrentSaved = getCurrentSaved(calculatorGoal);
  const calculatorTargetWeeks = getTargetWeeks(calculatorGoal);
  const activeRoutineGoal = activeGoal ?? featuredGoal;
  const routineMissions = getRoutineMissionsForGoal(activeRoutineGoal);
  const todayMission =
    routineMissions.find(
      (mission) => !appState.completedMissionIds.includes(mission.id),
    ) ?? routineMissions[0];
  const previewResources = getHomePreviewResources(featuredGoal);
  const badges = defaultBadges.map((badge) => ({
    ...badge,
    unlocked: Boolean(badgeUnlockMap[badge.id]),
  }));

  function getCurrentSaved(goal: Goal) {
    return currentSavedByGoal[goal.id] ?? getDefaultCurrentSaved(goal);
  }

  function setCurrentSaved(goal: Goal, value: number) {
    setCurrentSavedByGoal((prev) => ({ ...prev, [goal.id]: Math.max(value, 0) }));
  }

  function getTargetWeeks(goal: Goal) {
    return targetWeeksByGoal[goal.id] ?? 4;
  }

  function setTargetWeeks(goal: Goal, value: number) {
    setTargetWeeksByGoal((prev) => ({ ...prev, [goal.id]: value }));
  }

  function openGoal(goal: Goal) {
    setFocusedGoalId(goal.id);
    setDetailGoalId(goal.id);
    setCurrentSavedByGoal((prev) => ({
      ...prev,
      [goal.id]: prev[goal.id] ?? getDefaultCurrentSaved(goal),
    }));
    setTargetWeeksByGoal((prev) => ({
      ...prev,
      [goal.id]: prev[goal.id] ?? 4,
    }));
  }

  function focusGoal(goal: Goal) {
    setFocusedGoalId(goal.id);
    setCurrentSavedByGoal((prev) => ({
      ...prev,
      [goal.id]: prev[goal.id] ?? getDefaultCurrentSaved(goal),
    }));
    setTargetWeeksByGoal((prev) => ({
      ...prev,
      [goal.id]: prev[goal.id] ?? 4,
    }));
  }

  function completeMission(missionId: string) {
    setAppState((prev) => {
      if (prev.completedMissionIds.includes(missionId)) {
        return prev;
      }

      return {
        ...prev,
        completedMissionIds: [...prev.completedMissionIds, missionId],
      };
    });
  }

  function unlockResource(resource: ResourceContent) {
    setAppState((prev) => {
      if (resource.access === "free" || prev.unlockedResourceIds.includes(resource.id)) {
        return prev;
      }

      if (prev.cookieBalance < resource.cookiePrice) {
        return { ...prev, selectedTab: "resources" };
      }

      return {
        ...prev,
        cookieBalance: prev.cookieBalance - resource.cookiePrice,
        unlockedResourceIds: [...prev.unlockedResourceIds, resource.id],
      };
    });
  }

  const combo = getRoutineCombo(calculatorGoal);
  const primary = getHustleById(combo.primaryHustleId);
  const support = getHustleById(combo.supportHustleId);
  const comboEstimate = getGoalComboEstimate(calculatorGoal);
  const progress = getProgressPercent(
    getRoutineMissionsForGoal(activeRoutineGoal),
    appState.completedMissionIds,
  );

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-6">
      <div className="phone-shadow relative flex min-h-screen w-full max-w-[430px] flex-col overflow-hidden rounded-[36px] border border-white/70 bg-app-surface md:min-h-[860px]">
        <div className="safe-bottom hide-scrollbar relative flex-1 overflow-y-auto px-4 pb-10 pt-4">
          <div className="rounded-[30px] border border-white/70 bg-white/60 px-4 py-3 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-app-muted">
                  루틴캐시
                </p>
                <h1 className="mt-1 text-lg font-extrabold text-app-text">
                  오늘 해야 할 일이 다시 부르는 앱
                </h1>
              </div>
              <div className="rounded-[20px] bg-app-accent-soft px-3 py-2 text-xs font-semibold text-app-accent">
                데모 MVP
              </div>
            </div>
          </div>

          <div className="mt-5">
            {appState.selectedTab === "home" ? (
              <HomeFeed
                profile={profile}
                featuredGoal={featuredGoal}
                goals={personalizedGoals}
                todayMission={todayMission}
                completedMissionIds={appState.completedMissionIds}
                previewResources={previewResources}
                posts={communityPosts}
                unlockedResourceIds={appState.unlockedResourceIds}
                cookieBalance={appState.cookieBalance}
                onOpenGoal={openGoal}
                onCompleteMission={completeMission}
                onUnlockResource={unlockResource}
                onNeedWallet={() =>
                  setAppState((prev) => ({ ...prev, selectedTab: "resources" }))
                }
                onJumpToProof={() =>
                  setAppState((prev) => ({ ...prev, selectedTab: "proof" }))
                }
              />
            ) : null}

            {appState.selectedTab === "calc" ? (
              <div className="space-y-5">
                <section className="rounded-[30px] bg-card-gradient p-6 shadow-sm">
                  <p className="text-sm font-semibold text-app-accent">계산</p>
                  <h2 className="mt-2 text-[28px] font-extrabold leading-9 text-app-text">
                    갖고 싶은 장면을 숫자로 줄이면 덜 막막합니다.
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-app-muted">
                    부족 금액, 필요한 주간 추가수익, 일반 알바 대비 시간을 같은
                    화면에서 비교해보세요.
                  </p>
                </section>

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {personalizedGoals.slice(0, 6).map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => focusGoal(goal)}
                      className={`shrink-0 rounded-full px-4 py-3 text-sm font-semibold ${
                        calculatorGoal.id === goal.id
                          ? "bg-app-accent text-white"
                          : "bg-app-card text-app-muted"
                      }`}
                    >
                      {goal.title}
                    </button>
                  ))}
                </div>

                <GoalCalculator
                  goal={calculatorGoal}
                  currentSaved={calculatorCurrentSaved}
                  targetWeeks={calculatorTargetWeeks}
                  onCurrentSavedChange={(value) => setCurrentSaved(calculatorGoal, value)}
                  onTargetWeeksChange={(value) => setTargetWeeks(calculatorGoal, value)}
                />

                {primary && support ? (
                  <HustleComboCard
                    combo={combo}
                    primary={primary}
                    support={support}
                    estimateLabel={`${comboEstimate.minWeeks}~${comboEstimate.maxWeeks}주`}
                  />
                ) : null}

                <SafetyNotice />
              </div>
            ) : null}

            {appState.selectedTab === "routine" ? (
              appState.activeGoalId ? (
                <RoutineTracker
                  goal={activeRoutineGoal}
                  progress={progress}
                  missions={routineMissions}
                  completedMissionIds={appState.completedMissionIds}
                  unlockedResourceIds={appState.unlockedResourceIds}
                  cookieBalance={appState.cookieBalance}
                  onCompleteMission={completeMission}
                  onUnlockResource={unlockResource}
                  onNeedWallet={() =>
                    setAppState((prev) => ({ ...prev, selectedTab: "resources" }))
                  }
                />
              ) : (
                <section className="rounded-[30px] border border-app-line bg-app-card p-6 shadow-sm">
                  <div className="inline-flex rounded-2xl bg-app-accent-soft p-3 text-app-accent">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-2xl font-extrabold text-app-text">
                    먼저 시작할 목표를 골라볼까요?
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-app-muted">
                    루틴 탭은 active goal이 있어야 7일 미션이 열립니다. 홈에서
                    목표 카드를 누른 뒤 루틴을 시작해보세요.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setAppState((prev) => ({ ...prev, selectedTab: "home" }))
                    }
                    className="mt-5 inline-flex min-h-[54px] items-center justify-center gap-2 rounded-[22px] bg-app-accent px-5 text-sm font-bold text-white"
                  >
                    목표 카드 보러 가기 <ChevronRight className="h-4 w-4" />
                  </button>
                </section>
              )
            ) : null}

            {appState.selectedTab === "resources" ? (
              <div className="space-y-5">
                <CookieWallet
                  cookieBalance={appState.cookieBalance}
                  onCharge={(cookies) =>
                    setAppState((prev) => ({
                      ...prev,
                      cookieBalance: prev.cookieBalance + cookies,
                    }))
                  }
                />
                <ResourceLibrary
                  resources={resources}
                  unlockedResourceIds={appState.unlockedResourceIds}
                  cookieBalance={appState.cookieBalance}
                  onUnlockResource={unlockResource}
                  onNeedWallet={() => undefined}
                />
              </div>
            ) : null}

            {appState.selectedTab === "proof" ? (
              <div className="space-y-5">
                <div className="rounded-[30px] border border-app-line bg-app-card p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-app-muted">
                        실행 하이라이트
                      </p>
                      <p className="mt-2 text-2xl font-extrabold text-app-text">
                        미션 {appState.completedMissionIds.length}개 완료
                      </p>
                    </div>
                    <div className="rounded-2xl bg-app-accent-soft p-3 text-app-accent">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-[20px] bg-app-surface p-4">
                      <p className="text-app-muted">시작 인증</p>
                      <p className="mt-2 font-bold text-app-text">
                        {badgeUnlockMap["start-badge"] ? "완료" : "진행 중"}
                      </p>
                    </div>
                    <div className="rounded-[20px] bg-app-surface p-4">
                      <p className="text-app-muted">루틴 완주</p>
                      <p className="mt-2 font-bold text-app-text">
                        {badgeUnlockMap["routine-complete"] ? "완료" : "진행 중"}
                      </p>
                    </div>
                  </div>
                </div>

                <BadgeBoard badges={badges} />
                <ProofFeed
                  posts={communityPosts}
                  demoFirstIncomeVerified={appState.demoFirstIncomeVerified}
                  demoGoalAchieved={appState.demoGoalAchieved}
                  onVerifyFirstIncome={() =>
                    setAppState((prev) => ({ ...prev, demoFirstIncomeVerified: true }))
                  }
                  onVerifyGoalAchieved={() =>
                    setAppState((prev) => ({ ...prev, demoGoalAchieved: true }))
                  }
                />
                <div className="rounded-[24px] border border-app-line bg-app-card p-5 shadow-sm">
                  <p className="flex items-center gap-2 text-sm font-semibold text-app-warning">
                    <CheckCircle2 className="h-4 w-4" />
                    실제 금액 인증이 아닌 데모 피드입니다.
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          <AnimatePresence>
            {detailGoal ? (
              <GoalDetail
                goal={detailGoal}
                currentSaved={getCurrentSaved(detailGoal)}
                targetWeeks={getTargetWeeks(detailGoal)}
                onCurrentSavedChange={(value) => setCurrentSaved(detailGoal, value)}
                onTargetWeeksChange={(value) => setTargetWeeks(detailGoal, value)}
                onBack={() => setDetailGoalId(null)}
                onStartRoutine={(goalId) => {
                  setAppState((prev) => ({
                    ...prev,
                    activeGoalId: goalId,
                    selectedTab: "routine",
                  }));
                  setFocusedGoalId(goalId);
                  setDetailGoalId(null);
                }}
              />
            ) : null}
          </AnimatePresence>
        </div>

        <BottomNav
          selectedTab={appState.selectedTab}
          onSelectTab={(tab) => setAppState((prev) => ({ ...prev, selectedTab: tab }))}
        />
      </div>
    </div>
  );
}

function getHomePreviewResources(goal: Goal) {
  const goalResources = getGoalResources(goal);
  const freeResources = goalResources.filter((resource) => resource.access === "free");
  const cookieResource = goalResources.find((resource) => resource.access === "cookie");
  const fallbackFree = resources.filter(
    (resource) =>
      resource.access === "free" &&
      !freeResources.some((goalResource) => goalResource.id === resource.id),
  );

  const combinedFree = [...freeResources, ...fallbackFree].slice(0, 2);

  return [...combinedFree, ...(cookieResource ? [cookieResource] : [])];
}

function getProgressPercent(missions: { id: string; progressPoint: number }[], completed: string[]) {
  return missions.reduce((total, mission) => {
    if (!completed.includes(mission.id)) {
      return total;
    }

    return total + mission.progressPoint;
  }, 0);
}

function deriveBadges(state: AppState): BadgeUnlockMap {
  const completedCount = state.completedMissionIds.length;

  return {
    "start-badge": completedCount >= 3,
    "routine-complete": completedCount >= 7,
    "proposal-badge": state.completedMissionIds.some((missionId) =>
      missionId.includes("day-5"),
    ),
    "first-income": state.demoFirstIncomeVerified,
    "goal-achieved": state.demoGoalAchieved,
    "monthly-30": false,
    "mentor-candidate": false,
    "creator-ready": false,
  };
}
