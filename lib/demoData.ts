import {
  calculateRemainingAmount,
  calculateWeeksRangeByHustle,
} from "@/lib/calculations";
import type {
  AgeSegment,
  Badge,
  CommunityPost,
  CookiePack,
  Goal,
  Hustle,
  ResourceContent,
  RoutineCombo,
  RoutineMission,
  UserProfile,
  WorkStyle,
} from "@/types";

export const ageOptions: { value: AgeSegment; label: string }[] = [
  { value: "teen_20s", label: "10대 후반~20대" },
  { value: "early_worker", label: "사회초년생" },
  { value: "thirties", label: "30대" },
  { value: "forties", label: "40대" },
  { value: "fifties_plus", label: "50대 이상" },
];

export const interestOptions = [
  { value: "love", label: "연애" },
  { value: "travel", label: "여행" },
  { value: "device", label: "전자기기" },
  { value: "housing", label: "자취/집" },
  { value: "car", label: "차" },
  { value: "investment", label: "투자" },
  { value: "family", label: "가족" },
  { value: "debt", label: "대출" },
  { value: "retirement", label: "노후" },
] as const;

export const monthlyIncomeOptions = [
  { value: 100_000, label: "10만 원" },
  { value: 300_000, label: "30만 원" },
  { value: 500_000, label: "50만 원" },
  { value: 1_000_000, label: "100만 원" },
  { value: 2_000_000, label: "200만 원 이상" },
] as const;

export const timeOptions = [
  { value: 30, label: "30분" },
  { value: 60, label: "1시간" },
  { value: 120, label: "2시간" },
  { value: 180, label: "주말만" },
] as const;

export const workStyleOptions: { value: WorkStyle; label: string }[] = [
  { value: "writing", label: "글쓰기" },
  { value: "video", label: "영상" },
  { value: "sales", label: "판매" },
  { value: "offline", label: "오프라인" },
  { value: "ai_tools", label: "AI도구" },
  { value: "education", label: "교육" },
];

export const hustles: Hustle[] = [
  {
    id: "shorts-editing",
    title: "쇼츠 편집",
    shortDescription: "캡컷과 프리미어로 짧은 영상 편집물을 만들어 의뢰를 받는 부업",
    expectedMonthlyNetMin: 200_000,
    expectedMonthlyNetMax: 600_000,
    firstIncomeWeeksMin: 2,
    firstIncomeWeeksMax: 8,
    dailyMinutesMin: 40,
    dailyMinutesMax: 90,
    startCostMin: 0,
    startCostMax: 50_000,
    difficulty: "medium",
    riskNotes: [
      "초기에는 단가가 낮을 수 있음",
      "첫 후기 확보 전까지 제안 메시지가 많이 필요함",
      "수정 요청이 몰리면 피로가 커질 수 있음",
    ],
    firstActions: [
      "캡컷 설치하기",
      "따라 만들 숏폼 3개 저장하기",
      "샘플 영상 1개 제작하기",
    ],
    requiredActionsForFirstIncome: [
      "샘플 3개 제작",
      "제안 메시지 30개 발송",
      "플랫폼 2곳 등록",
      "후기 1개 확보",
    ],
  },
  {
    id: "blog-writing",
    title: "블로그 원고 작성",
    shortDescription: "브랜드 블로그, 정보성 콘텐츠, 리뷰 초안을 대필하는 글쓰기 부업",
    expectedMonthlyNetMin: 160_000,
    expectedMonthlyNetMax: 400_000,
    firstIncomeWeeksMin: 2,
    firstIncomeWeeksMax: 10,
    dailyMinutesMin: 35,
    dailyMinutesMax: 80,
    startCostMin: 0,
    startCostMax: 20_000,
    difficulty: "easy",
    riskNotes: [
      "초기엔 샘플이 없으면 응답률이 낮을 수 있음",
      "주제 조사 시간이 길어질 수 있음",
      "건별 단가 차이가 커서 일정 관리가 중요함",
    ],
    firstActions: [
      "샘플 글 2개 작성하기",
      "관심 분야 키워드 10개 정리하기",
      "제안용 소개 문구 초안 만들기",
    ],
    requiredActionsForFirstIncome: [
      "샘플 원고 2개 준비",
      "지원 메시지 20개 발송",
      "단가표 초안 작성",
      "간단한 피드백 반영 1회",
    ],
  },
  {
    id: "ai-image",
    title: "AI 이미지 제작",
    shortDescription: "소형 썸네일, 카드뉴스, SNS용 이미지를 AI 도구로 제작하는 부업",
    expectedMonthlyNetMin: 150_000,
    expectedMonthlyNetMax: 450_000,
    firstIncomeWeeksMin: 2,
    firstIncomeWeeksMax: 8,
    dailyMinutesMin: 30,
    dailyMinutesMax: 70,
    startCostMin: 0,
    startCostMax: 40_000,
    difficulty: "medium",
    riskNotes: [
      "저작권과 상업 이용 범위를 확인해야 함",
      "프롬프트 품질에 따라 결과 편차가 큼",
      "수정 요청에 대비한 원본 관리가 필요함",
    ],
    firstActions: [
      "무료 AI 이미지 도구 2개 비교하기",
      "업종별 샘플 4장 만들기",
      "포트폴리오 카드 1장 정리하기",
    ],
    requiredActionsForFirstIncome: [
      "샘플 세트 2종 완성",
      "제안 메시지 15개 발송",
      "수정 범위 기준 정리",
      "저작권 체크리스트 확인",
    ],
  },
  {
    id: "tutoring-materials",
    title: "과외 자료 제작",
    shortDescription: "학습지, 문제지, 수업 보조자료를 제작해 판매하거나 납품하는 부업",
    expectedMonthlyNetMin: 180_000,
    expectedMonthlyNetMax: 500_000,
    firstIncomeWeeksMin: 3,
    firstIncomeWeeksMax: 9,
    dailyMinutesMin: 45,
    dailyMinutesMax: 90,
    startCostMin: 0,
    startCostMax: 30_000,
    difficulty: "medium",
    riskNotes: [
      "교육 대상에 맞춘 난이도 조절이 필요함",
      "학기 시즌에 따라 수요 편차가 있음",
      "자료 퀄리티 기준이 생각보다 높을 수 있음",
    ],
    firstActions: [
      "샘플 학습지 1세트 만들기",
      "과목별 고객 유형 정리하기",
      "출력용 PDF 형식 점검하기",
    ],
    requiredActionsForFirstIncome: [
      "샘플 자료 3종 준비",
      "학부모/교사 타깃 제안 10개",
      "수정 템플릿 마련",
      "간단한 후기 1개 수집",
    ],
  },
  {
    id: "resell",
    title: "중고 리셀",
    shortDescription: "수요 있는 중고 물건을 선별해 정리 후 재판매하는 부업",
    expectedMonthlyNetMin: 120_000,
    expectedMonthlyNetMax: 500_000,
    firstIncomeWeeksMin: 1,
    firstIncomeWeeksMax: 6,
    dailyMinutesMin: 25,
    dailyMinutesMax: 70,
    startCostMin: 10_000,
    startCostMax: 150_000,
    difficulty: "medium",
    riskNotes: [
      "재고가 오래 묶일 수 있음",
      "사입 기준이 흔들리면 손실이 날 수 있음",
      "직거래 일정 조율이 번거로울 수 있음",
    ],
    firstActions: [
      "거래 빠른 카테고리 3개 조사하기",
      "판매 글 사진 구도 저장하기",
      "첫 테스트 상품 1개 올리기",
    ],
    requiredActionsForFirstIncome: [
      "시세표 1장 만들기",
      "판매 글 5개 등록",
      "문의 응답 템플릿 준비",
      "포장 재료 최소 세팅",
    ],
  },
  {
    id: "affiliate",
    title: "쿠팡파트너스/제휴마케팅",
    shortDescription: "후기형 글과 링크를 통해 소액 제휴 수익을 만드는 부업",
    expectedMonthlyNetMin: 80_000,
    expectedMonthlyNetMax: 300_000,
    firstIncomeWeeksMin: 3,
    firstIncomeWeeksMax: 12,
    dailyMinutesMin: 25,
    dailyMinutesMax: 60,
    startCostMin: 0,
    startCostMax: 20_000,
    difficulty: "medium",
    riskNotes: [
      "플랫폼 정책 준수가 중요함",
      "처음엔 조회 수가 적어 성과가 느릴 수 있음",
      "상품 선택이 빗나가면 전환이 거의 없을 수 있음",
    ],
    firstActions: [
      "후기형 글 구조 익히기",
      "카테고리 1개 정하기",
      "리뷰 초안 1개 작성하기",
    ],
    requiredActionsForFirstIncome: [
      "후기 글 5개 작성",
      "썸네일 3개 제작",
      "노출 키워드 20개 조사",
      "정책 위반 요소 점검",
    ],
  },
  {
    id: "detail-page-assist",
    title: "상세페이지 보조 제작",
    shortDescription: "쇼핑몰 상세페이지의 구성, 문구, 간단한 시안을 보조 제작하는 부업",
    expectedMonthlyNetMin: 180_000,
    expectedMonthlyNetMax: 550_000,
    firstIncomeWeeksMin: 3,
    firstIncomeWeeksMax: 9,
    dailyMinutesMin: 45,
    dailyMinutesMax: 100,
    startCostMin: 0,
    startCostMax: 60_000,
    difficulty: "hard",
    riskNotes: [
      "수정 횟수 통제가 안 되면 시간이 길어질 수 있음",
      "판매 데이터 없이 성과를 단정하면 안 됨",
      "카피와 디자인 밸런스 감각이 필요함",
    ],
    firstActions: [
      "잘 팔리는 상세페이지 5개 저장",
      "한 장짜리 시안 1개 만들기",
      "후기 문구 예시 모으기",
    ],
    requiredActionsForFirstIncome: [
      "시안 2종 제작",
      "제안처 15곳 정리",
      "수정 범위 안내문 작성",
      "납기 일정 템플릿 준비",
    ],
  },
  {
    id: "weekend-parttime",
    title: "주말 단기 알바",
    shortDescription: "행사, 카페, 매장 보조 등 주말 고정 시간을 확보하는 오프라인 부업",
    expectedMonthlyNetMin: 200_000,
    expectedMonthlyNetMax: 500_000,
    firstIncomeWeeksMin: 1,
    firstIncomeWeeksMax: 4,
    dailyMinutesMin: 180,
    dailyMinutesMax: 420,
    startCostMin: 0,
    startCostMax: 30_000,
    difficulty: "easy",
    riskNotes: [
      "체력 소모가 큼",
      "주말 일정이 고정돼 여가가 줄 수 있음",
      "이동 거리까지 포함해 계산해야 함",
    ],
    firstActions: [
      "가능한 시간표 정리하기",
      "근거리 채용 5개 저장하기",
      "지원 문구 1개 정리하기",
    ],
    requiredActionsForFirstIncome: [
      "지원 5건",
      "근무 가능 요일 확정",
      "교통비 포함 실수령 계산",
      "첫 2주 일정 확보",
    ],
  },
  {
    id: "offline-delivery",
    title: "배달/오프라인 단기 부업",
    shortDescription: "배달, 대행, 단기 현장 보조처럼 빠른 현금흐름을 노리는 오프라인 부업",
    expectedMonthlyNetMin: 250_000,
    expectedMonthlyNetMax: 700_000,
    firstIncomeWeeksMin: 1,
    firstIncomeWeeksMax: 3,
    dailyMinutesMin: 60,
    dailyMinutesMax: 180,
    startCostMin: 0,
    startCostMax: 100_000,
    difficulty: "medium",
    riskNotes: [
      "날씨와 컨디션 영향을 많이 받음",
      "장비나 보험 조건을 확인해야 함",
      "장시간 이동 시 체력 소모가 큼",
    ],
    firstActions: [
      "가능 지역과 시간대 확인하기",
      "기본 장비 준비 점검하기",
      "실수령 계산표 만들기",
    ],
    requiredActionsForFirstIncome: [
      "플랫폼 1곳 등록",
      "운행 가능 시간표 작성",
      "목표 건수 정하기",
      "안전 수칙 체크",
    ],
  },
  {
    id: "template-selling",
    title: "노션/엑셀 템플릿 판매",
    shortDescription: "반복 수요가 있는 템플릿을 만들어 소액 판매하는 디지털 상품 부업",
    expectedMonthlyNetMin: 100_000,
    expectedMonthlyNetMax: 350_000,
    firstIncomeWeeksMin: 3,
    firstIncomeWeeksMax: 12,
    dailyMinutesMin: 30,
    dailyMinutesMax: 75,
    startCostMin: 0,
    startCostMax: 30_000,
    difficulty: "medium",
    riskNotes: [
      "처음엔 유입이 거의 없을 수 있음",
      "설명 문구가 부족하면 전환이 낮음",
      "업데이트 관리가 필요할 수 있음",
    ],
    firstActions: [
      "문제 해결형 템플릿 1개 정하기",
      "샘플 화면 3장 만들기",
      "소개 문구 초안 작성하기",
    ],
    requiredActionsForFirstIncome: [
      "템플릿 1종 완성",
      "상세 소개 1장 작성",
      "배포 채널 2곳 등록",
      "후기 요청 문구 준비",
    ],
  },
];

export const goals: Goal[] = [
  {
    id: "gift-lover-500k",
    title: "연인 생일 선물 50만 원",
    emotionalCopy: "가격표 때문에 망설이는 선물, 이번엔 계획으로 바꿔보세요.",
    targetAmount: 500_000,
    ageSegments: ["teen_20s"],
    interests: ["love"],
    heroLabel: "선물 가능 루틴",
    painLine: "좋은 걸 해주고 싶은데 통장 잔고가 먼저 보이는 순간이 있다면.",
    hopefulLine: "이번엔 마음만이 아니라 계획까지 준비해보세요.",
    recommendedHustleIds: ["shorts-editing", "blog-writing", "ai-image"],
    resourceIds: [
      "avoid-scam-checklist",
      "shorts-free-tools",
      "dm-template",
      "shorts-sample-flow",
    ],
  },
  {
    id: "date-budget-400k",
    title: "한 달 데이트비 40만 원",
    emotionalCopy: "즐거운 약속 앞에서 계산기부터 켜는 마음을 조금 덜어내보세요.",
    targetAmount: 400_000,
    ageSegments: ["teen_20s"],
    interests: ["love"],
    heroLabel: "데이트 여유 루틴",
    painLine: "만나고 싶은데 비용 때문에 먼저 주저하게 된다면.",
    hopefulLine: "이번 달 데이트비를 미리 준비하는 루틴으로 바꿔보세요.",
    recommendedHustleIds: ["blog-writing", "shorts-editing", "template-selling"],
    resourceIds: ["proposal-checklist", "dm-template", "goal-splitting-guide"],
  },
  {
    id: "jeju-trip-700k",
    title: "제주도 2박 3일 여행비 70만 원",
    emotionalCopy: "저장만 해둔 여행 사진, 이번엔 실제 일정으로 이어가보세요.",
    targetAmount: 700_000,
    ageSegments: ["teen_20s"],
    interests: ["travel"],
    heroLabel: "여행 출발 루틴",
    painLine: "가고 싶지만 늘 항공권 가격 앞에서 뒤로 물러났다면.",
    hopefulLine: "짧게라도 떠날 수 있는 자금을 루틴으로 쌓아보세요.",
    recommendedHustleIds: ["shorts-editing", "affiliate", "weekend-parttime"],
    resourceIds: ["side-time-table", "shorts-free-tools", "avoid-scam-checklist"],
  },
  {
    id: "ipad-1m",
    title: "아이패드 100만 원",
    emotionalCopy: "갖고 싶지만 늘 장바구니에서만 끝났던 기기를 목표로 바꿔보세요.",
    targetAmount: 1_000_000,
    ageSegments: ["teen_20s"],
    interests: ["device"],
    heroLabel: "기기 업그레이드 루틴",
    painLine: "공부나 작업에 필요해 보여도 결제 버튼이 무겁다면.",
    hopefulLine: "이번엔 소비 충동이 아니라 실행 계획으로 접근해보세요.",
    recommendedHustleIds: ["shorts-editing", "template-selling", "ai-image"],
    resourceIds: ["portfolio-order", "shorts-sample-flow", "pricing-caution"],
  },
  {
    id: "deposit-3m",
    title: "자취 보증금 일부 300만 원",
    emotionalCopy: "독립하고 싶은 마음 앞에서 숫자가 막막했다면, 나눠서 준비해보세요.",
    targetAmount: 3_000_000,
    ageSegments: ["teen_20s", "early_worker"],
    interests: ["housing"],
    heroLabel: "독립 준비 루틴",
    painLine: "나가고 싶은데 보증금이 너무 크게 느껴진다면.",
    hopefulLine: "목표를 주 단위 행동으로 쪼개면 생각보다 선명해집니다.",
    recommendedHustleIds: ["weekend-parttime", "shorts-editing", "resell"],
    resourceIds: ["goal-splitting-guide", "side-time-table", "avoid-scam-checklist"],
  },
  {
    id: "parents-pocket-300k",
    title: "부모님 용돈 30만 원",
    emotionalCopy: "받기만 했던 마음을 이번엔 작은 보탬으로 바꿔보세요.",
    targetAmount: 300_000,
    ageSegments: ["teen_20s", "early_worker"],
    interests: ["family"],
    heroLabel: "가족 보탬 루틴",
    painLine: "챙겨드리고 싶은데 늘 다음으로 미루고 있었다면.",
    hopefulLine: "작더라도 내가 만든 수입으로 전해보는 경험을 만들어보세요.",
    recommendedHustleIds: ["blog-writing", "offline-delivery", "template-selling"],
    resourceIds: ["proposal-checklist", "goal-splitting-guide", "pricing-caution"],
  },
  {
    id: "perfume-set-500k",
    title: "향수/화장품 세트 50만 원",
    emotionalCopy: "늘 눈여겨보던 취향 소비도 준비된 목표가 되면 덜 불안합니다.",
    targetAmount: 500_000,
    ageSegments: ["teen_20s"],
    interests: ["self_growth", "love"],
    heroLabel: "취향 소비 루틴",
    painLine: "갖고 싶은데 매번 사치 같아 보여 멈칫했다면.",
    hopefulLine: "무리한 소비 대신 작은 부업 루틴으로 준비해보세요.",
    recommendedHustleIds: ["ai-image", "blog-writing", "affiliate"],
    resourceIds: ["blog-structure-sample", "dm-template", "pricing-caution"],
  },
  {
    id: "laptop-upgrade-1_5m",
    title: "노트북 업그레이드 150만 원",
    emotionalCopy: "버벅이는 작업 환경을 참는 대신, 교체 자금을 나눠서 쌓아보세요.",
    targetAmount: 1_500_000,
    ageSegments: ["teen_20s", "early_worker"],
    interests: ["device", "self_growth"],
    heroLabel: "작업 환경 개선 루틴",
    painLine: "필요한 건 알지만 큰 금액 앞에서 자꾸 미루게 된다면.",
    hopefulLine: "교체 자금을 부업과 저축 루틴으로 분산해 준비해보세요.",
    recommendedHustleIds: ["shorts-editing", "detail-page-assist", "template-selling"],
    resourceIds: ["portfolio-order", "shorts-sample-flow", "proposal-checklist"],
  },
  {
    id: "summer-overseas-3m",
    title: "여름방학 해외여행 300만 원",
    emotionalCopy: "매년 말로만 했던 해외여행, 이번엔 금액부터 현실화해보세요.",
    targetAmount: 3_000_000,
    ageSegments: ["teen_20s"],
    interests: ["travel"],
    heroLabel: "해외여행 루틴",
    painLine: "검색은 많이 했지만 결국 예산에서 막혔다면.",
    hopefulLine: "부업 조합과 자동저축으로 여행 자금을 쌓아보세요.",
    recommendedHustleIds: ["weekend-parttime", "affiliate", "shorts-editing"],
    resourceIds: ["side-time-table", "goal-splitting-guide", "avoid-scam-checklist"],
  },
  {
    id: "investment-seed-300k",
    title: "월 30만 원 투자금 만들기",
    emotionalCopy: "투자 의지는 있는데 남는 돈이 없던 흐름을 바꿔보세요.",
    targetAmount: 300_000,
    ageSegments: ["teen_20s", "early_worker"],
    interests: ["investment"],
    heroLabel: "투자 씨앗 루틴",
    painLine: "투자 공부만 하고 실제 자금은 늘 부족했다면.",
    hopefulLine: "작은 추가수익과 분리 저축으로 투자금을 먼저 만들어보세요.",
    recommendedHustleIds: ["template-selling", "blog-writing", "affiliate"],
    resourceIds: ["goal-splitting-guide", "side-time-table", "pricing-caution"],
  },
  {
    id: "used-car-downpayment-5m",
    title: "중고차 계약금 500만 원",
    emotionalCopy: "이동의 자유가 필요하지만 숫자 앞에서 멈췄다면 계획으로 바꿔보세요.",
    targetAmount: 5_000_000,
    ageSegments: ["teen_20s", "early_worker", "thirties"],
    interests: ["car"],
    heroLabel: "이동 자금 루틴",
    painLine: "차가 있으면 편하겠지만 계약금이 너무 크게 느껴진다면.",
    hopefulLine: "짧은 현금흐름과 장기 루틴을 함께 섞어 접근해보세요.",
    recommendedHustleIds: ["offline-delivery", "weekend-parttime", "resell"],
    resourceIds: ["resell-item-criteria", "goal-splitting-guide", "avoid-scam-checklist"],
  },
  {
    id: "graduation-seed-10m",
    title: "졸업 전 종잣돈 1,000만 원",
    emotionalCopy: "졸업만 하고 싶진 않고, 시작할 자금도 갖고 싶다면 쪼개서 준비해보세요.",
    targetAmount: 10_000_000,
    ageSegments: ["teen_20s", "early_worker"],
    interests: ["investment", "self_growth"],
    heroLabel: "종잣돈 루틴",
    painLine: "사회에 나가기 전 최소한의 안전판이 필요하다고 느낀다면.",
    hopefulLine: "한 번에 벌기보다 현실적인 루틴 조합으로 시간을 사보세요.",
    recommendedHustleIds: ["weekend-parttime", "shorts-editing", "template-selling"],
    resourceIds: ["side-time-table", "goal-splitting-guide", "avoid-scam-checklist"],
  },
  {
    id: "wedding-fund-10m",
    title: "결혼자금 1,000만 원",
    emotionalCopy: "기쁜 계획 앞에서도 현실적인 비용이 마음을 무겁게 할 때가 있습니다.",
    targetAmount: 10_000_000,
    ageSegments: ["thirties", "forties"],
    interests: ["love", "family"],
    heroLabel: "결혼 준비 루틴",
    painLine: "준비하고 싶은데 생각보다 빨리 커지는 비용이 부담스럽다면.",
    hopefulLine: "생활을 깨지 않는 추가수익 루틴으로 준비 속도를 만들어보세요.",
    recommendedHustleIds: ["detail-page-assist", "blog-writing", "weekend-parttime"],
    resourceIds: ["proposal-checklist", "pricing-caution", "goal-splitting-guide"],
  },
  {
    id: "jeonse-deposit-30m",
    title: "전세보증금 3,000만 원",
    emotionalCopy: "월세에서 벗어나고 싶지만 보증금 규모가 벽처럼 느껴질 때가 있습니다.",
    targetAmount: 30_000_000,
    ageSegments: ["thirties", "forties"],
    interests: ["housing", "family"],
    heroLabel: "주거 안정 루틴",
    painLine: "주거 안정이 필요한데 초기 자금이 너무 멀게 느껴진다면.",
    hopefulLine: "긴 호흡의 루틴이라도 숫자로 나누면 전략이 생깁니다.",
    recommendedHustleIds: ["weekend-parttime", "offline-delivery", "detail-page-assist"],
    resourceIds: ["side-time-table", "goal-splitting-guide", "avoid-scam-checklist"],
  },
  {
    id: "loan-payback-1m",
    title: "대출 원금 추가상환 100만 원",
    emotionalCopy: "이자보다 원금을 줄이고 싶은 마음을 작게라도 실행으로 옮겨보세요.",
    targetAmount: 1_000_000,
    ageSegments: ["early_worker", "thirties", "forties"],
    interests: ["debt"],
    heroLabel: "원금 줄이기 루틴",
    painLine: "갚아도 줄지 않는 느낌에 지친 적이 있다면.",
    hopefulLine: "별도 추가수익만 모아 원금에 직접 보태는 흐름을 만들 수 있습니다.",
    recommendedHustleIds: ["offline-delivery", "blog-writing", "resell"],
    resourceIds: ["goal-splitting-guide", "proposal-checklist", "avoid-scam-checklist"],
  },
  {
    id: "academy-fee-500k",
    title: "자녀 학원비 월 50만 원",
    emotionalCopy: "아이에게 필요한 지출을 줄이지 않으면서 버틸 방법이 필요할 때가 있습니다.",
    targetAmount: 500_000,
    ageSegments: ["thirties", "forties"],
    interests: ["family"],
    heroLabel: "가계 보완 루틴",
    painLine: "고정지출이 늘어도 줄이기 어려운 영역이 있다면.",
    hopefulLine: "생활 시간을 크게 깨지 않는 루틴으로 보완 폭을 만들어보세요.",
    recommendedHustleIds: ["blog-writing", "tutoring-materials", "weekend-parttime"],
    resourceIds: ["tutoring-start-guide", "proposal-checklist", "side-time-table"],
  },
  {
    id: "living-gap-300k",
    title: "월 생활비 30만 원 보완",
    emotionalCopy: "매달 마지막 주가 빠듯하다면, 버티는 대신 보완 루틴을 설계해보세요.",
    targetAmount: 300_000,
    ageSegments: ["early_worker", "thirties", "forties", "fifties_plus"],
    interests: ["family", "debt"],
    heroLabel: "생활비 보완 루틴",
    painLine: "매달 일정한 부족분이 반복돼 숨이 찬다면.",
    hopefulLine: "무리한 목표보다 반복 가능한 30분 루틴이 더 오래 갑니다.",
    recommendedHustleIds: ["blog-writing", "offline-delivery", "template-selling"],
    resourceIds: ["side-time-table", "proposal-checklist", "avoid-scam-checklist"],
  },
  {
    id: "retirement-cashflow-500k",
    title: "은퇴 후 월 50만 원 현금흐름",
    emotionalCopy: "노후에 필요한 건 거창한 약속보다 작더라도 지속되는 흐름일 수 있습니다.",
    targetAmount: 500_000,
    ageSegments: ["forties", "fifties_plus"],
    interests: ["retirement", "investment"],
    heroLabel: "현금흐름 루틴",
    painLine: "노후 준비가 막연하고 지금 당장 뭘 해야 할지 모르겠다면.",
    hopefulLine: "작게 시작해도 유지 가능한 디지털 루틴부터 만들 수 있습니다.",
    recommendedHustleIds: ["template-selling", "affiliate", "blog-writing"],
    resourceIds: ["goal-splitting-guide", "blog-profile-copy", "pricing-caution"],
  },
];

export const resources: ResourceContent[] = [
  {
    id: "avoid-scam-checklist",
    title: "첫 부업 시작 전 사기 체크리스트",
    subtitle: "무료 체크리스트",
    type: "checklist",
    access: "free",
    cookiePrice: 0,
    relatedHustleIds: ["shorts-editing", "offline-delivery", "affiliate"],
    preview: "선입금 요구, 과한 장비 구매, 수익 보장 문구는 바로 경계합니다.",
    body: "1. 선입금, 수강 강매, 계정 대여 요구는 피합니다.\n2. '무조건 수익' 문구가 있으면 바로 한 번 더 확인합니다.\n3. 계약 범위, 수정 횟수, 지급 시점을 텍스트로 남깁니다.",
    isEssential: true,
  },
  {
    id: "shorts-free-tools",
    title: "쇼츠 편집 입문 무료 도구 목록",
    subtitle: "무료 팁",
    type: "free_tip",
    access: "free",
    cookiePrice: 0,
    relatedHustleIds: ["shorts-editing"],
    preview: "캡컷, VN, 프리미어 러시처럼 시작 비용이 낮은 도구부터 비교합니다.",
    body: "캡컷은 템플릿이 풍부하고, VN은 타임라인이 가볍고, 프리미어 러시는 익숙한 어도비 흐름이 장점입니다. 처음엔 한 도구만 정해 샘플 3개를 빠르게 만드는 쪽이 낫습니다.",
    isEssential: false,
  },
  {
    id: "portfolio-order",
    title: "첫 포트폴리오 구성 순서",
    subtitle: "무료 미니 가이드",
    type: "mini_guide",
    access: "free",
    cookiePrice: 0,
    relatedHustleIds: ["shorts-editing", "detail-page-assist", "ai-image"],
    preview: "완성본보다 전후 비교와 작업 범위를 먼저 보여주면 이해가 빠릅니다.",
    body: "1. 결과물 한 장면.\n2. 작업 전 문제.\n3. 내가 손본 요소.\n4. 예상 사용처.\n5. 수정 가능 범위.\n짧게 정리할수록 초보 포트폴리오가 더 선명해집니다.",
    isEssential: true,
  },
  {
    id: "blog-structure-sample",
    title: "블로그 원고 샘플 구조",
    subtitle: "무료 템플릿",
    type: "template",
    access: "free",
    cookiePrice: 0,
    relatedHustleIds: ["blog-writing", "affiliate"],
    preview: "도입 - 문제 - 핵심 정보 3개 - 정리 구조만 지켜도 초안이 빨라집니다.",
    body: "도입 한 문단, 핵심 정보 세 문단, 정리 한 문단으로 쓰면 초보자도 흐름을 잡기 쉽습니다. 제목은 검색 키워드를 포함해 구체적으로 적습니다.",
    isEssential: false,
  },
  {
    id: "resell-item-criteria",
    title: "중고 리셀 물건 고르는 기준",
    subtitle: "무료 체크리스트",
    type: "checklist",
    access: "free",
    cookiePrice: 0,
    relatedHustleIds: ["resell"],
    preview: "회전이 빠른지, 보관이 쉬운지, 상태 설명이 명확한지부터 봅니다.",
    body: "1. 최근 거래 완료가 꾸준한 품목인지 확인합니다.\n2. 부피와 파손 리스크를 따집니다.\n3. 수리 여부와 구성품을 사진으로 남깁니다.",
    isEssential: false,
  },
  {
    id: "tutoring-start-guide",
    title: "과외 자료 제작 시작법",
    subtitle: "무료 가이드",
    type: "mini_guide",
    access: "free",
    cookiePrice: 0,
    relatedHustleIds: ["tutoring-materials"],
    preview: "한 과목 전체가 아니라 한 단원 자료 1세트부터 만드는 편이 현실적입니다.",
    body: "문항 수, 대상 학년, 출력 형식만 먼저 정하고 작은 자료 1세트를 완성하면 다음 수정이 쉬워집니다. 처음부터 전범위를 만들 필요는 없습니다.",
    isEssential: true,
  },
  {
    id: "proposal-checklist",
    title: "제안 메시지 보내기 전 점검표",
    subtitle: "무료 체크리스트",
    type: "checklist",
    access: "free",
    cookiePrice: 0,
    relatedHustleIds: ["shorts-editing", "blog-writing", "detail-page-assist"],
    preview: "상대 업종 언급, 내가 줄 수 있는 결과, 샘플 링크 세 가지는 꼭 넣습니다.",
    body: "메시지는 길지 않게, 업종 한 줄 공감, 해결 가능한 문제 한 줄, 샘플 한 줄, 답장 유도 한 줄이면 충분합니다.",
    isEssential: true,
  },
  {
    id: "pricing-caution",
    title: "초보자 단가를 낮게 잡을 때 주의점",
    subtitle: "무료 사례 메모",
    type: "case_note",
    access: "free",
    cookiePrice: 0,
    relatedHustleIds: ["blog-writing", "shorts-editing", "detail-page-assist"],
    preview: "첫 거래를 위해 낮추더라도 수정 횟수와 범위를 같이 제한해야 버틸 수 있습니다.",
    body: "단가를 낮추는 대신 수정 1회, 납기 3일, 추가 작업 별도라는 기준을 먼저 적어두면 소모전을 줄일 수 있습니다.",
    isEssential: false,
  },
  {
    id: "side-time-table",
    title: "부업 시간표 짜는 법",
    subtitle: "무료 팁",
    type: "free_tip",
    access: "free",
    cookiePrice: 0,
    relatedHustleIds: ["weekend-parttime", "offline-delivery", "template-selling"],
    preview: "매일 30분, 주 2회 90분처럼 고정 슬롯을 먼저 만들면 지치지 않습니다.",
    body: "출퇴근 직후, 잠들기 전, 주말 오전처럼 현실적으로 지킬 수 있는 슬롯을 먼저 고정합니다. 남는 시간에 끼워 넣는 방식은 오래가기 어렵습니다.",
    isEssential: true,
  },
  {
    id: "goal-splitting-guide",
    title: "목표 금액 쪼개기 계산법",
    subtitle: "무료 미니 가이드",
    type: "mini_guide",
    access: "free",
    cookiePrice: 0,
    relatedHustleIds: ["template-selling", "weekend-parttime", "blog-writing"],
    preview: "총액보다 주간 필요 금액과 오늘 행동으로 쪼개야 덜 막막합니다.",
    body: "목표 금액에서 이미 준비한 돈을 빼고, 남은 금액을 주 단위로 나눈 뒤, 다시 오늘 할 수 있는 행동으로 줄입니다. 총액만 보면 불안이 커지고 실행이 멈춥니다.",
    isEssential: true,
  },
  {
    id: "dm-template",
    title: "첫 제안 DM 템플릿 5개",
    subtitle: "선택형 템플릿",
    type: "template",
    access: "cookie",
    cookiePrice: 2,
    relatedHustleIds: ["shorts-editing", "blog-writing", "detail-page-assist"],
    preview: "업종별로 말투만 바꿔 바로 써볼 수 있는 짧은 제안 문장 예시 5개입니다.",
    body: "안녕하세요. 최근 올리신 콘텐츠 흐름을 보며 짧은 개선 포인트를 정리해봤습니다. 샘플 1개를 무료로 보여드릴 수 있어요.\n\n안녕하세요. 현재 블로그 게시물 구조를 더 읽히게 다듬을 수 있을 것 같아 간단한 제안을 드립니다.\n\n안녕하세요. 상세페이지 첫 화면에서 전달력이 높아질 수 있는 구성 예시를 하나 보내드립니다.",
    isEssential: false,
  },
  {
    id: "rate-card-sample",
    title: "초보자 단가표 작성 예시",
    subtitle: "선택형 사례 메모",
    type: "case_note",
    access: "cookie",
    cookiePrice: 2,
    relatedHustleIds: ["shorts-editing", "blog-writing"],
    preview: "수정 횟수와 납기 조건을 같이 적은 초보자용 단가표 예시입니다.",
    body: "쇼츠 15초 편집 3만 원, 자막 포함 4만 원, 수정 1회 포함. 블로그 원고 1,500자 3만 원, 자료 조사 포함 시 4만 원처럼 범위를 나눠 적습니다.",
    isEssential: false,
  },
  {
    id: "shorts-sample-flow",
    title: "쇼츠 샘플 영상 제작 순서",
    subtitle: "선택형 미니 가이드",
    type: "mini_guide",
    access: "cookie",
    cookiePrice: 3,
    relatedHustleIds: ["shorts-editing"],
    preview: "샘플용 영상 1개를 30분 안에 만드는 순서를 단계별로 정리했습니다.",
    body: "1. 참고 영상 선택.\n2. 핵심 문장 3개 추리기.\n3. 컷 편집.\n4. 자막 템플릿 적용.\n5. 15초 버전 내보내기.\n처음엔 완성도보다 반복 속도가 중요합니다.",
    isEssential: false,
  },
  {
    id: "blog-profile-copy",
    title: "블로그 원고 프로필 문구 예시",
    subtitle: "선택형 템플릿",
    type: "template",
    access: "cookie",
    cookiePrice: 2,
    relatedHustleIds: ["blog-writing", "affiliate"],
    preview: "초보자도 부담 없이 쓸 수 있는 소개 문구 3종 예시입니다.",
    body: "정보성 글 구조화, 리뷰형 원고 초안, 키워드 정리 중심으로 도와드립니다. 빠르게 읽히는 문장과 기본 조사 정리를 함께 제공합니다.",
    isEssential: false,
  },
];

export const cookiePacks: CookiePack[] = [
  { id: "pack-10", cookies: 10, priceLabel: "2,000원" },
  { id: "pack-30", cookies: 30, priceLabel: "5,500원" },
  { id: "pack-60", cookies: 60, priceLabel: "9,900원" },
];

export const defaultBadges: Badge[] = [
  {
    id: "start-badge",
    title: "시작 인증",
    description: "첫 미션 3개 완료",
    condition: "미션 3개 완료",
    unlocked: false,
  },
  {
    id: "routine-complete",
    title: "7일 루틴 완주",
    description: "7일 루틴 전체 완료",
    condition: "미션 7개 완료",
    unlocked: false,
  },
  {
    id: "proposal-badge",
    title: "첫 제안 인증",
    description: "제안 미션 완료",
    condition: "Day 5 미션 완료",
    unlocked: false,
  },
  {
    id: "first-income",
    title: "첫 수익 인증",
    description: "데모 인증 완료",
    condition: "첫 수익 데모 버튼 클릭",
    unlocked: false,
  },
  {
    id: "goal-achieved",
    title: "목표 달성 인증",
    description: "데모 목표 달성 완료",
    condition: "목표 달성 데모 버튼 클릭",
    unlocked: false,
  },
  {
    id: "monthly-30",
    title: "월 30 인증",
    description: "미래 기능 예정",
    condition: "잠금 상태",
    unlocked: false,
  },
  {
    id: "mentor-candidate",
    title: "멘토 후보",
    description: "미래 기능 예정",
    condition: "잠금 상태",
    unlocked: false,
  },
  {
    id: "creator-ready",
    title: "강의 개설 가능",
    description: "미래 기능 예정",
    condition: "잠금 상태",
    unlocked: false,
  },
];

export const communityPosts: CommunityPost[] = [
  {
    id: "proof-1",
    title: "연인 선물 목표 달성",
    summary: "작은 원고 작업과 주말 루틴으로 한 달 안에 선물 예산을 모았다는 데모 후기입니다.",
    tag: "목표 달성",
    isDemo: true,
  },
  {
    id: "proof-2",
    title: "아이패드 구매 완료",
    summary: "쇼츠 편집 샘플을 3개 만든 뒤 첫 의뢰까지 이어졌다는 데모 기록입니다.",
    tag: "기기 구매",
    isDemo: true,
  },
  {
    id: "proof-3",
    title: "첫 제안 20개 보내고 첫 의뢰 받음",
    summary: "답장이 없던 초반 2주를 버티고, 21번째 메시지에서 첫 상담이 잡힌 데모 사례입니다.",
    tag: "첫 제안",
    isDemo: true,
  },
  {
    id: "proof-4",
    title: "제주도 여행비 70만 원 루틴 진행 중",
    summary: "주말 알바와 제휴 글쓰기를 같이 돌리며 주차별 부족 금액을 줄이는 과정입니다.",
    tag: "진행 중",
    isDemo: true,
  },
  {
    id: "proof-5",
    title: "첫 수익 전까지 제안 메시지 30개 보낸 후기",
    summary: "반응 없는 기간에 어떤 문구를 줄이고, 어떤 샘플을 앞에 배치했는지 적은 데모 메모입니다.",
    tag: "실행 기록",
    isDemo: true,
  },
  {
    id: "proof-6",
    title: "실패 후기: 첫 단가를 너무 낮게 잡았던 이유",
    summary: "거래는 됐지만 수정 요청이 길어져 남는 시간이 거의 없었던 데모 회고입니다.",
    tag: "실패 후기",
    isDemo: true,
  },
];

const currentSavedPresets: Record<string, number> = {
  "gift-lover-500k": 100_000,
  "date-budget-400k": 80_000,
  "jeju-trip-700k": 120_000,
  "ipad-1m": 200_000,
  "deposit-3m": 300_000,
  "parents-pocket-300k": 50_000,
  "perfume-set-500k": 90_000,
  "laptop-upgrade-1_5m": 250_000,
  "summer-overseas-3m": 350_000,
  "investment-seed-300k": 30_000,
  "used-car-downpayment-5m": 400_000,
  "graduation-seed-10m": 500_000,
  "wedding-fund-10m": 900_000,
  "jeonse-deposit-30m": 1_500_000,
  "loan-payback-1m": 100_000,
  "academy-fee-500k": 60_000,
  "living-gap-300k": 40_000,
  "retirement-cashflow-500k": 80_000,
};

const comboOverrides: Record<string, RoutineCombo> = {
  "gift-lover-500k": {
    primaryHustleId: "shorts-editing",
    supportHustleId: "blog-writing",
    savingsLabel: "주 2만 원 자동저축",
    weeklySavings: 20_000,
  },
  "date-budget-400k": {
    primaryHustleId: "blog-writing",
    supportHustleId: "template-selling",
    savingsLabel: "주 1만 5천 원 분리저축",
    weeklySavings: 15_000,
  },
  "jeju-trip-700k": {
    primaryHustleId: "shorts-editing",
    supportHustleId: "affiliate",
    savingsLabel: "주 2만 원 여행통장",
    weeklySavings: 20_000,
  },
};

const defaultCombo: RoutineCombo = {
  primaryHustleId: "blog-writing",
  supportHustleId: "template-selling",
  savingsLabel: "주 2만 원 자동저축",
  weeklySavings: 20_000,
};

const routineBlueprints: Record<
  string,
  Array<{
    title: string;
    description: string;
    estimatedMinutes: number;
    progressPoint: number;
    relatedResourceIds: string[];
  }>
> = {
  "shorts-editing": [
    {
      title: "캡컷 설치 후, 따라 만들 숏폼 3개 저장하기",
      description: "잘 만든 사례를 먼저 저장해 기준점을 만듭니다.",
      estimatedMinutes: 20,
      progressPoint: 1.2,
      relatedResourceIds: ["shorts-free-tools", "avoid-scam-checklist"],
    },
    {
      title: "저장한 숏폼 3개 중 하나를 따라 만들어보기",
      description: "완성도보다 따라 만드는 감각을 먼저 익힙니다.",
      estimatedMinutes: 40,
      progressPoint: 2.1,
      relatedResourceIds: ["shorts-sample-flow", "portfolio-order"],
    },
    {
      title: "샘플 영상 1개를 포트폴리오 카드로 정리하기",
      description: "전후 차이와 작업 범위를 한 화면에 정리합니다.",
      estimatedMinutes: 35,
      progressPoint: 2.7,
      relatedResourceIds: ["portfolio-order"],
    },
    {
      title: "크몽/숨고/당근 프로필 초안 작성하기",
      description: "내가 해결할 수 있는 문제를 짧게 적습니다.",
      estimatedMinutes: 30,
      progressPoint: 3.1,
      relatedResourceIds: ["proposal-checklist", "blog-profile-copy"],
    },
    {
      title: "첫 제안 메시지 10개 보내기",
      description: "업종별로 짧게 다르게 보내며 반응을 봅니다.",
      estimatedMinutes: 30,
      progressPoint: 4.4,
      relatedResourceIds: ["dm-template", "proposal-checklist"],
    },
    {
      title: "저가/무료 첫 작업 조건 정리하기",
      description: "수정 횟수와 제공 범위를 먼저 적어둡니다.",
      estimatedMinutes: 25,
      progressPoint: 4.8,
      relatedResourceIds: ["rate-card-sample", "pricing-caution"],
    },
    {
      title: "후기 요청 문구와 다음 단가표 만들기",
      description: "첫 거래 이후를 대비한 문구를 미리 준비합니다.",
      estimatedMinutes: 30,
      progressPoint: 5.7,
      relatedResourceIds: ["rate-card-sample", "pricing-caution"],
    },
  ],
  "blog-writing": [
    {
      title: "원고 샘플 주제 2개 고르고 구조 메모하기",
      description: "내가 잘 쓸 수 있는 주제부터 시작합니다.",
      estimatedMinutes: 25,
      progressPoint: 1.2,
      relatedResourceIds: ["blog-structure-sample", "goal-splitting-guide"],
    },
    {
      title: "샘플 원고 1개 초안 작성하기",
      description: "도입과 핵심 정보 3개만 먼저 채웁니다.",
      estimatedMinutes: 40,
      progressPoint: 2.1,
      relatedResourceIds: ["blog-structure-sample"],
    },
    {
      title: "샘플 원고를 포트폴리오 카드로 정리하기",
      description: "문제-해결-문체 톤을 짧게 소개합니다.",
      estimatedMinutes: 30,
      progressPoint: 2.7,
      relatedResourceIds: ["portfolio-order"],
    },
    {
      title: "프로필 문구와 가능 작업 범위 적기",
      description: "초보자라도 제공 가능한 범위를 선명하게 적습니다.",
      estimatedMinutes: 25,
      progressPoint: 3.1,
      relatedResourceIds: ["blog-profile-copy", "proposal-checklist"],
    },
    {
      title: "블로그 원고 제안 메시지 10개 보내기",
      description: "주제별로 짧게 수정해 반응을 봅니다.",
      estimatedMinutes: 30,
      progressPoint: 4.4,
      relatedResourceIds: ["dm-template", "proposal-checklist"],
    },
    {
      title: "초보자 단가표와 수정 기준 정리하기",
      description: "낮은 단가라도 범위는 제한합니다.",
      estimatedMinutes: 25,
      progressPoint: 4.8,
      relatedResourceIds: ["rate-card-sample", "pricing-caution"],
    },
    {
      title: "후기 요청 문구와 재의뢰 문구 준비하기",
      description: "첫 거래 이후 반복 의뢰 흐름을 준비합니다.",
      estimatedMinutes: 30,
      progressPoint: 5.7,
      relatedResourceIds: ["blog-profile-copy", "pricing-caution"],
    },
  ],
  "template-selling": [
    {
      title: "해결하고 싶은 문제 1개 정하고 템플릿 구조 스케치하기",
      description: "내가 반복해서 겪은 문제에서 시작합니다.",
      estimatedMinutes: 20,
      progressPoint: 1.2,
      relatedResourceIds: ["goal-splitting-guide", "side-time-table"],
    },
    {
      title: "노션 또는 엑셀 템플릿 1차 버전 만들기",
      description: "기능보다 실제 사용 흐름을 먼저 만듭니다.",
      estimatedMinutes: 45,
      progressPoint: 2.1,
      relatedResourceIds: ["portfolio-order"],
    },
    {
      title: "템플릿 소개 화면 3장 캡처하기",
      description: "사용 전후 장면을 보여주는 데 집중합니다.",
      estimatedMinutes: 30,
      progressPoint: 2.7,
      relatedResourceIds: ["portfolio-order"],
    },
    {
      title: "상세 소개 문구 초안 작성하기",
      description: "누구에게 어떤 문제를 해결하는지 적습니다.",
      estimatedMinutes: 25,
      progressPoint: 3.1,
      relatedResourceIds: ["proposal-checklist", "blog-profile-copy"],
    },
    {
      title: "공유 채널 2곳에 첫 등록하기",
      description: "커뮤니티나 마켓 채널에 공개합니다.",
      estimatedMinutes: 30,
      progressPoint: 4.4,
      relatedResourceIds: ["proposal-checklist"],
    },
    {
      title: "가격과 무료 샘플 범위 정리하기",
      description: "처음부터 과도한 기능 약속은 피합니다.",
      estimatedMinutes: 20,
      progressPoint: 4.8,
      relatedResourceIds: ["pricing-caution", "rate-card-sample"],
    },
    {
      title: "후기 요청 문구와 업데이트 계획 쓰기",
      description: "재사용률을 높일 수 있는 흐름을 정리합니다.",
      estimatedMinutes: 25,
      progressPoint: 5.7,
      relatedResourceIds: ["pricing-caution"],
    },
  ],
  "offline-delivery": [
    {
      title: "가능 지역과 시간대 정리하기",
      description: "무리하지 않을 범위의 시간표를 먼저 만듭니다.",
      estimatedMinutes: 20,
      progressPoint: 1.2,
      relatedResourceIds: ["side-time-table", "avoid-scam-checklist"],
    },
    {
      title: "실수령 계산표 만들기",
      description: "교통비와 소모 비용까지 포함해 봅니다.",
      estimatedMinutes: 30,
      progressPoint: 2.1,
      relatedResourceIds: ["goal-splitting-guide"],
    },
    {
      title: "플랫폼 또는 구인처 3곳 확인하기",
      description: "조건과 지역을 비교해 우선순위를 정합니다.",
      estimatedMinutes: 25,
      progressPoint: 2.7,
      relatedResourceIds: ["avoid-scam-checklist"],
    },
    {
      title: "등록 문구와 프로필 정보 정리하기",
      description: "가능 시간과 강점을 짧게 적어둡니다.",
      estimatedMinutes: 20,
      progressPoint: 3.1,
      relatedResourceIds: ["proposal-checklist"],
    },
    {
      title: "첫 지원 또는 등록 3건 완료하기",
      description: "작게라도 실제 액션을 남깁니다.",
      estimatedMinutes: 30,
      progressPoint: 4.4,
      relatedResourceIds: ["proposal-checklist"],
    },
    {
      title: "안전 수칙과 장비 체크리스트 확인하기",
      description: "빠른 현금흐름보다 안전을 우선합니다.",
      estimatedMinutes: 20,
      progressPoint: 4.8,
      relatedResourceIds: ["avoid-scam-checklist"],
    },
    {
      title: "첫 주 목표 건수와 쉬는 날 정하기",
      description: "지속 가능한 범위로 조절합니다.",
      estimatedMinutes: 20,
      progressPoint: 5.7,
      relatedResourceIds: ["side-time-table"],
    },
  ],
};

function findHustle(hustleId: string): Hustle {
  return hustles.find((hustle) => hustle.id === hustleId) ?? hustles[0];
}

export function getGoalById(goalId: string | null): Goal | undefined {
  return goals.find((goal) => goal.id === goalId);
}

export function getHustleById(hustleId: string): Hustle | undefined {
  return hustles.find((hustle) => hustle.id === hustleId);
}

export function getResourceById(resourceId: string): ResourceContent | undefined {
  return resources.find((resource) => resource.id === resourceId);
}

export function getGoalResources(goal: Goal): ResourceContent[] {
  return goal.resourceIds
    .map((resourceId) => getResourceById(resourceId))
    .filter((resource): resource is ResourceContent => Boolean(resource));
}

export function getDefaultCurrentSaved(goal: Goal): number {
  return currentSavedPresets[goal.id] ?? Math.round(goal.targetAmount * 0.15);
}

export function getRoutineCombo(goal: Goal): RoutineCombo {
  const primaryHustleId = goal.recommendedHustleIds[0] ?? defaultCombo.primaryHustleId;
  const supportHustleId = goal.recommendedHustleIds[1] ?? defaultCombo.supportHustleId;

  return (
    comboOverrides[goal.id] ?? {
      primaryHustleId,
      supportHustleId,
      savingsLabel: defaultCombo.savingsLabel,
      weeklySavings: defaultCombo.weeklySavings,
    }
  );
}

export function getRoutineMissionsForGoal(goal: Goal): RoutineMission[] {
  const combo = getRoutineCombo(goal);
  const blueprint =
    routineBlueprints[combo.primaryHustleId] ?? routineBlueprints["blog-writing"];

  return blueprint.map((mission, index) => ({
    id: `${goal.id}-${combo.primaryHustleId}-day-${index + 1}`,
    day: index + 1,
    title: mission.title,
    description: mission.description,
    estimatedMinutes: mission.estimatedMinutes,
    progressPoint: mission.progressPoint,
    relatedResourceIds: mission.relatedResourceIds,
  }));
}

export function getGoalComboEstimate(goal: Goal): {
  minWeeks: number;
  maxWeeks: number;
} {
  const combo = getRoutineCombo(goal);
  const primary = findHustle(combo.primaryHustleId);
  const support = findHustle(combo.supportHustleId);
  const remaining = calculateRemainingAmount(
    goal.targetAmount,
    getDefaultCurrentSaved(goal),
  );

  const primaryWeeklyMin = primary.expectedMonthlyNetMin * 0.16;
  const primaryWeeklyMax = primary.expectedMonthlyNetMax * 0.1;
  const supportWeeklyMin = support.expectedMonthlyNetMin * 0.05;
  const supportWeeklyMax = support.expectedMonthlyNetMax * 0.06;
  const weeklyMin = Math.max(
    1,
    primaryWeeklyMin + supportWeeklyMin + combo.weeklySavings,
  );
  const weeklyMax = Math.max(
    weeklyMin,
    primaryWeeklyMax + supportWeeklyMax + combo.weeklySavings,
  );

  return {
    minWeeks: Math.max(2, Math.ceil(remaining / weeklyMax)),
    maxWeeks: Math.max(4, Math.ceil(remaining / weeklyMin)),
  };
}

export function getPersonalizedGoals(profile: UserProfile | null): Goal[] {
  if (!profile) {
    return goals;
  }

  const sorted = [...goals].sort((left, right) => {
    const leftScore = getGoalScore(left, profile);
    const rightScore = getGoalScore(right, profile);
    if (rightScore !== leftScore) {
      return rightScore - leftScore;
    }

    return goals.findIndex((goal) => goal.id === left.id) -
      goals.findIndex((goal) => goal.id === right.id);
  });

  return sorted;
}

function getGoalScore(goal: Goal, profile: UserProfile): number {
  let score = 0;

  if (goal.ageSegments.includes(profile.ageSegment)) {
    score += 4;
  }

  score += goal.interests.filter((interest) =>
    profile.interests.includes(interest),
  ).length * 3;

  const workStyleBoosts: Record<WorkStyle, string[]> = {
    writing: ["blog-writing", "affiliate", "template-selling"],
    video: ["shorts-editing", "detail-page-assist"],
    sales: ["resell", "affiliate"],
    offline: ["weekend-parttime", "offline-delivery"],
    ai_tools: ["ai-image", "template-selling"],
    education: ["tutoring-materials"],
  };

  profile.workStyles.forEach((workStyle) => {
    const matched = goal.recommendedHustleIds.some((hustleId) =>
      workStyleBoosts[workStyle]?.includes(hustleId),
    );

    if (matched) {
      score += 1;
    }
  });

  return score;
}

export function getGoalHustleRange(goal: Goal) {
  const remaining = calculateRemainingAmount(
    goal.targetAmount,
    getDefaultCurrentSaved(goal),
  );

  return goal.recommendedHustleIds
    .map((hustleId) => {
      const hustle = getHustleById(hustleId);
      if (!hustle) {
        return null;
      }

      return {
        hustle,
        estimate: calculateWeeksRangeByHustle(remaining, hustle),
      };
    })
    .filter(
      (
        item,
      ): item is {
        hustle: Hustle;
        estimate: { minWeeks: number; maxWeeks: number };
      } => Boolean(item),
    );
}
