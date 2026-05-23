import type { AppState, BadgeUnlockMap, UserProfile } from "@/types";

type StorageKey =
  | "routine-cash-profile"
  | "routine-cash-active-goal"
  | "routine-cash-completed-missions"
  | "routine-cash-cookie-balance"
  | "routine-cash-unlocked-resources"
  | "routine-cash-selected-tab"
  | "routine-cash-first-income"
  | "routine-cash-goal-achieved"
  | "routine-cash-badges";

const storageKeys = {
  profile: "routine-cash-profile" as StorageKey,
  activeGoalId: "routine-cash-active-goal" as StorageKey,
  completedMissionIds: "routine-cash-completed-missions" as StorageKey,
  cookieBalance: "routine-cash-cookie-balance" as StorageKey,
  unlockedResourceIds: "routine-cash-unlocked-resources" as StorageKey,
  selectedTab: "routine-cash-selected-tab" as StorageKey,
  demoFirstIncomeVerified: "routine-cash-first-income" as StorageKey,
  demoGoalAchieved: "routine-cash-goal-achieved" as StorageKey,
  badges: "routine-cash-badges" as StorageKey,
};

function canUseStorage(): boolean {
  return typeof window !== "undefined";
}

function readValue<T>(key: StorageKey, fallback: T): T {
  if (!canUseStorage()) {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveValue<T>(key: StorageKey, value: T) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export const defaultAppState: AppState = {
  profile: null,
  activeGoalId: null,
  selectedTab: "home",
  completedMissionIds: [],
  cookieBalance: 12,
  unlockedResourceIds: [],
  demoFirstIncomeVerified: false,
  demoGoalAchieved: false,
};

export function loadProfile(): UserProfile | null {
  return readValue<UserProfile | null>(storageKeys.profile, null);
}

export function saveProfile(profile: UserProfile | null) {
  saveValue(storageKeys.profile, profile);
}

export function loadAppState(profile: UserProfile | null): AppState {
  return {
    profile,
    activeGoalId: readValue<string | null>(storageKeys.activeGoalId, null),
    selectedTab: readValue<AppState["selectedTab"]>(
      storageKeys.selectedTab,
      "home",
    ),
    completedMissionIds: readValue<string[]>(
      storageKeys.completedMissionIds,
      [],
    ),
    cookieBalance: readValue<number>(storageKeys.cookieBalance, 12),
    unlockedResourceIds: readValue<string[]>(
      storageKeys.unlockedResourceIds,
      [],
    ),
    demoFirstIncomeVerified: readValue<boolean>(
      storageKeys.demoFirstIncomeVerified,
      false,
    ),
    demoGoalAchieved: readValue<boolean>(
      storageKeys.demoGoalAchieved,
      false,
    ),
  };
}

export function persistAppState(state: AppState) {
  saveValue(storageKeys.activeGoalId, state.activeGoalId);
  saveValue(storageKeys.selectedTab, state.selectedTab);
  saveValue(storageKeys.completedMissionIds, state.completedMissionIds);
  saveValue(storageKeys.cookieBalance, state.cookieBalance);
  saveValue(storageKeys.unlockedResourceIds, state.unlockedResourceIds);
  saveValue(storageKeys.demoFirstIncomeVerified, state.demoFirstIncomeVerified);
  saveValue(storageKeys.demoGoalAchieved, state.demoGoalAchieved);
}

export function loadBadgeUnlockMap(): BadgeUnlockMap {
  return readValue<BadgeUnlockMap>(storageKeys.badges, {});
}

export function saveBadgeUnlockMap(map: BadgeUnlockMap) {
  saveValue(storageKeys.badges, map);
}
