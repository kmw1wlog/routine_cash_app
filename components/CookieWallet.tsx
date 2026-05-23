import { Coins, Plus } from "lucide-react";

import { cookiePacks } from "@/lib/demoData";

type CookieWalletProps = {
  cookieBalance: number;
  onCharge: (cookies: number) => void;
};

export function CookieWallet({ cookieBalance, onCharge }: CookieWalletProps) {
  return (
    <section className="rounded-[28px] border border-app-line bg-app-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-app-muted">자료실 지갑</p>
          <h3 className="mt-2 flex items-center gap-2 text-2xl font-extrabold text-app-text">
            <Coins className="h-6 w-6 text-app-warning" />
            {cookieBalance}쿠키
          </h3>
          <p className="mt-2 text-sm leading-6 text-app-muted">
            쿠키는 참고자료를 여는 데모 재화입니다. 실제 결제는 연결되지 않습니다.
          </p>
        </div>
        <div className="rounded-2xl bg-app-warning-soft px-3 py-2 text-xs font-semibold text-app-warning">
          초기 가입 12쿠키
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {cookiePacks.map((pack) => (
          <div
            key={pack.id}
            className="flex items-center justify-between rounded-[22px] border border-app-line bg-app-surface/80 p-4"
          >
            <div>
              <p className="text-base font-bold text-app-text">{pack.cookies}쿠키</p>
              <p className="text-sm text-app-muted">{pack.priceLabel}</p>
            </div>
            <button
              type="button"
              onClick={() => onCharge(pack.cookies)}
              className="inline-flex items-center gap-2 rounded-full bg-app-accent px-4 py-3 text-sm font-semibold text-white"
            >
              <Plus className="h-4 w-4" />
              데모 충전
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
