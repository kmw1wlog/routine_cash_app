import { ResourceCard } from "@/components/ResourceCard";
import { SafetyNotice } from "@/components/SafetyNotice";
import type { ResourceContent } from "@/types";

type ResourceLibraryProps = {
  resources: ResourceContent[];
  unlockedResourceIds: string[];
  cookieBalance: number;
  onUnlockResource: (resource: ResourceContent) => void;
  onNeedWallet: () => void;
};

export function ResourceLibrary({
  resources,
  unlockedResourceIds,
  cookieBalance,
  onUnlockResource,
  onNeedWallet,
}: ResourceLibraryProps) {
  const sortedResources = [...resources].sort((left, right) => {
    if (left.access === right.access) {
      return left.cookiePrice - right.cookiePrice;
    }

    return left.access === "free" ? -1 : 1;
  });

  return (
    <section className="space-y-5">
      <header className="rounded-[30px] bg-card-gradient p-6 shadow-sm">
        <p className="text-sm font-semibold text-app-accent">자료실</p>
        <h2 className="mt-2 text-[28px] font-extrabold leading-9 text-app-text">
          무료 자료부터, 막힐 때만 참고자료를 열어보세요.
        </h2>
        <p className="mt-3 text-sm leading-6 text-app-muted">
          무료 자료와 체크리스트만으로도 7일 루틴은 끝까지 진행할 수 있게
          구성했습니다.
        </p>
      </header>

      <div className="grid gap-4">
        {sortedResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            isUnlocked={unlockedResourceIds.includes(resource.id)}
            canAfford={cookieBalance >= resource.cookiePrice}
            onUnlock={onUnlockResource}
            onNeedWallet={onNeedWallet}
          />
        ))}
      </div>

      <SafetyNotice />
    </section>
  );
}
