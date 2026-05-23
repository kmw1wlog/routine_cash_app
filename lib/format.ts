import type {
  AgeSegment,
  Interest,
  ResourceContent,
  WorkStyle,
} from "@/types";

const ageSegmentLabels: Record<AgeSegment, string> = {
  teen_20s: "10대 후반~20대",
  early_worker: "사회초년생",
  thirties: "30대",
  forties: "40대",
  fifties_plus: "50대 이상",
};

const interestLabels: Record<Interest, string> = {
  love: "연애",
  travel: "여행",
  device: "전자기기",
  housing: "자취/집",
  car: "차",
  investment: "투자",
  family: "가족",
  debt: "대출",
  retirement: "노후",
  self_growth: "자기계발",
};

const workStyleLabels: Record<WorkStyle, string> = {
  writing: "글쓰기",
  video: "영상",
  sales: "판매",
  offline: "오프라인",
  ai_tools: "AI도구",
  education: "교육",
};

const resourceTypeLabels: Record<ResourceContent["type"], string> = {
  free_tip: "무료 팁",
  template: "템플릿",
  checklist: "체크리스트",
  mini_guide: "미니 가이드",
  case_note: "사례 메모",
};

const difficultyLabels = {
  easy: "낮음",
  medium: "중간",
  hard: "높음",
};

export function formatAgeSegment(ageSegment: AgeSegment): string {
  return ageSegmentLabels[ageSegment];
}

export function formatInterest(interest: Interest): string {
  return interestLabels[interest];
}

export function formatWorkStyle(workStyle: WorkStyle): string {
  return workStyleLabels[workStyle];
}

export function formatMinutes(minutes: number): string {
  if (minutes >= 60 && minutes % 60 === 0) {
    return `${minutes / 60}시간`;
  }

  if (minutes > 60) {
    const hours = Math.floor(minutes / 60);
    const remain = minutes % 60;
    return `${hours}시간 ${remain}분`;
  }

  return `${minutes}분`;
}

export function formatDifficulty(
  difficulty: "easy" | "medium" | "hard",
): string {
  return difficultyLabels[difficulty];
}

export function formatResourceType(resource: ResourceContent): string {
  const accessLabel = resource.access === "free" ? "무료" : `${resource.cookiePrice}쿠키`;
  return `${resourceTypeLabels[resource.type]} · ${accessLabel}`;
}
