import type { CapacitorConfig } from "@capacitor/cli";

const appUrl =
  process.env.ROUTINE_CASH_WEB_URL ||
  "https://routine-cash-app.vercel.app/";

if (!appUrl.startsWith("https://")) {
  throw new Error("ROUTINE_CASH_WEB_URL must start with https://");
}

const config: CapacitorConfig = {
  appId: "com.kmw1wlog.routinecashapp",
  appName: "루틴캐시",
  webDir: "www",
  server: {
    url: appUrl,
    cleartext: false,
    androidScheme: "https",
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: true,
  },
};

export default config;
