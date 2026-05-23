type SafetyNoticeProps = {
  className?: string;
};

export function SafetyNotice({ className = "" }: SafetyNoticeProps) {
  return (
    <div
      className={`rounded-[24px] border border-amber-200 bg-app-warning-soft/90 p-4 text-sm leading-6 text-app-warning ${className}`}
    >
      이 앱의 예상 기간과 수익은 데모 추정입니다. 수익은 보장되지 않으며,
      투입 시간·숙련도·고객 확보 여부에 따라 달라질 수 있습니다.
      초기비용이 크거나 수익을 보장하는 부업은 추천하지 않습니다.
    </div>
  );
}
