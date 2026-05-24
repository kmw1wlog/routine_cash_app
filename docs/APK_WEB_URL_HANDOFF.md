# APK Web URL Handoff

## Production URL

Use this exact URL for the `루틴캐시` Android wrapper:

```text
https://routine-cash-app.vercel.app/
```

## Why This URL

- this is the current Vercel production alias
- new successful `main` deployments continue to move this URL to the latest app
- if a later deployment fails, the previous ready deployment can remain available

Do not use:

- branch URLs
- preview URLs
- deployment-specific immutable URLs

## Current Known-Good Deployment

- status: `Ready`
- environment: `Production`
- branch: `main`
- web URL: `https://routine-cash-app.vercel.app/`

## Remote Smoke Command

```bash
SMOKE_BASE_URL="https://routine-cash-app.vercel.app" npm run smoke:pre-apk
```

Expected:

- `/` pass
- `/manifest.webmanifest` pass
- `/favicon.ico` pass

## Update Policy

- `routine_cash_app` UI or data copy changes are reflected by updating this Production URL.
- The Android wrapper does not need a new APK or AAB when only the web app changes.
- The Android wrapper does need a new AAB when native settings change, such as app name, icon, permissions, signing, or Capacitor/Android configuration.
