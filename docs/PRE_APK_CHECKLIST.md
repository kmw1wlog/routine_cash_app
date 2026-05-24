# Pre-APK Checklist

## Baseline

- Repository: `kmw1wlog/routine_cash_app`
- Android wrapper target URL: `https://routine-cash-app.vercel.app/`
- Focus:
  - production build stability
  - deployable HTTPS URL validation
  - Android WebView wrapper generation

## Required Checks Before APK Wrapping

1. Reinstall and verify the web app:
   - `npm install`
   - `npm run lint`
   - `npm run build`
2. Test the deployed HTTPS app:
   - `SMOKE_BASE_URL="https://routine-cash-app.vercel.app" npm run smoke:pre-apk`
3. Sync Android wrapper:
   - `npm run cap:sync`
4. Build debug APK:
   - `npm run android:debug`

## HTTPS URL Requirement

`루틴캐시` APK must open a real HTTPS app URL in Android WebView. Valid examples:

- Vercel production URL
- Vercel preview URL
- HTTPS tunnel URL

The URL is only acceptable after `npm run smoke:pre-apk` passes against that URL.

## Manual Mobile Browser Check

Open the HTTPS URL in Android Chrome and verify:

1. `/` loads within about 5 seconds.
2. 온보딩 또는 홈 진입이 가능하다.
3. 목표 카드가 보인다.
4. 하단 탭 전환이 가능하다.
5. 가로 스크롤이나 잘림이 없다.
6. 상태바와 하단 내비게이션에 UI가 가려지지 않는다.

## Decision Rule

APK wrapping may proceed only when both are true:

- production build succeeds
- deployed HTTPS smoke succeeds

APK wrapping must stop when any of these remain true:

- `/` exceeds 5 seconds or times out
- `/manifest.webmanifest` fails
- `/favicon.ico` fails
- no deployable HTTPS URL exists
