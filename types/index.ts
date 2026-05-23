export type AgeSegment =
  | "teen_20s"
  | "early_worker"
  | "thirties"
  | "forties"
  | "fifties_plus";

export type Interest =
  | "love"
  | "travel"
  | "device"
  | "housing"
  | "car"
  | "investment"
  | "family"
  | "debt"
  | "retirement"
  | "self_growth";

export type WorkStyle =
  | "writing"
  | "video"
  | "sales"
  | "offline"
  | "ai_tools"
  | "education";

export type Goal = {
  id: string;
  title: string;
  emotionalCopy: string;
  targetAmount: number;
  ageSegments: AgeSegment[];
  interests: Interest[];
  heroLabel: string;
  painLine: string;
  hopefulLine: string;
  recommendedHustleIds: string[];
  resourceIds: string[];
};

export type Hustle = {
  id: string;
  title: string;
  shortDescription: string;
  expectedMonthlyNetMin: number;
  expectedMonthlyNetMax: number;
  firstIncomeWeeksMin: number;
  firstIncomeWeeksMax: number;
  dailyMinutesMin: number;
  dailyMinutesMax: number;
  startCostMin: number;
  startCostMax: number;
  difficulty: "easy" | "medium" | "hard";
  riskNotes: string[];
  firstActions: string[];
  requiredActionsForFirstIncome: string[];
};

export type RoutineMission = {
  id: string;
  day: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  progressPoint: number;
  relatedResourceIds: string[];
};

export type ResourceContent = {
  id: string;
  title: string;
  subtitle: string;
  type: "free_tip" | "template" | "checklist" | "mini_guide" | "case_note";
  access: "free" | "cookie";
  cookiePrice: number;
  relatedHustleIds: string[];
  preview: string;
  body: string;
  isEssential: boolean;
};

export type Badge = {
  id: string;
  title: string;
  description: string;
  condition: string;
  unlocked: boolean;
};

export type UserProfile = {
  ageSegment: AgeSegment;
  interests: Interest[];
  targetGoalType: string;
  desiredMonthlyExtraIncome: number;
  availableMinutesPerDay: number;
  workStyles: WorkStyle[];
};

export type AppState = {
  profile: UserProfile | null;
  activeGoalId: string | null;
  selectedTab: "home" | "calc" | "routine" | "resources" | "proof";
  completedMissionIds: string[];
  cookieBalance: number;
  unlockedResourceIds: string[];
  demoFirstIncomeVerified: boolean;
  demoGoalAchieved: boolean;
};

export type TabKey = AppState["selectedTab"];

export type BadgeUnlockMap = Record<string, boolean>;

export type CommunityPost = {
  id: string;
  title: string;
  summary: string;
  tag: string;
  isDemo: boolean;
};

export type CookiePack = {
  id: string;
  cookies: number;
  priceLabel: string;
};

export type RoutineCombo = {
  primaryHustleId: string;
  supportHustleId: string;
  savingsLabel: string;
  weeklySavings: number;
};
