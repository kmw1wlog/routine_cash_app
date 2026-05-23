"use client";

import { BadgeCheck, Calculator, Home, Library, ListTodo } from "lucide-react";

import type { TabKey } from "@/types";

type BottomNavProps = {
  selectedTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
};

const tabs: { id: TabKey; label: string; icon: typeof Home }[] = [
  { id: "home", label: "홈", icon: Home },
  { id: "calc", label: "계산", icon: Calculator },
  { id: "routine", label: "루틴", icon: ListTodo },
  { id: "resources", label: "자료실", icon: Library },
  { id: "proof", label: "인증", icon: BadgeCheck },
];

export function BottomNav({ selectedTab, onSelectTab }: BottomNavProps) {
  return (
    <nav className="glass-panel fixed inset-x-0 bottom-0 z-30 mx-auto flex w-full max-w-[430px] items-center justify-between rounded-t-[30px] border border-white/70 px-3 pb-[calc(env(safe-area-inset-bottom)+14px)] pt-3 shadow-app">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === selectedTab;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`flex min-w-[70px] flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-semibold transition ${
              isActive
                ? "bg-app-accent text-white shadow-md"
                : "text-app-muted hover:bg-white/70"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
