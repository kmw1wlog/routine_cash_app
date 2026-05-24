# Release AAB Runbook

## Current Target

- app label: `루틴캐시`
- applicationId: `com.kmw1wlog.routinecashapp`
- WebView URL: `https://routine-cash-app.vercel.app/`
- versionName: `0.1.0`
- versionCode: `1`

## Required Secrets

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

If any of these are missing, `Build Release AAB` should fail. That is expected and safer than building an unsigned artifact by mistake.

## Workflow

1. Push the wrapper changes to `main`.
2. Wait for `Build Release AAB` on `main`, or run it manually with `workflow_dispatch`.
3. Download artifact `routine-cash-app-release-aab`.
4. Extract `android/app/build/outputs/bundle/release/app-release.aab`.
5. Upload it to Google Play Console closed testing.
