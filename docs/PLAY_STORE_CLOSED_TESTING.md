# Play Store Closed Testing

`루틴캐시`는 `routine_cash_app`의 Vercel 배포 URL을 여는 Android WebView wrapper입니다. 이번 문서는 Google Play Console closed testing을 시작하기 위한 최소 release AAB 절차를 정리합니다.

## 현재 기준

- applicationId: `com.kmw1wlog.routinecashapp`
- 앱 이름: `루틴캐시`
- WebView URL: `https://routine-cash-app.vercel.app/`
- Android release version: `0.1.0 (versionCode 1)`
- 현재 release AAB는 closed testing 시작용 최소 버전

## Debug APK와 Release AAB 차이

- `debug APK`: 폰에 직접 설치해 빠르게 테스트하는 용도
- `release AAB`: Google Play Console에 업로드하는 용도
- release AAB는 signing이 필수이며, unsigned 산출물로 closed testing을 진행하지 않음

## AAB 생성 절차

1. GitHub repository secrets에 signing 정보를 등록합니다.
2. `Build Release AAB` workflow를 수동 실행합니다.
3. artifact `routine-cash-app-release-aab`를 다운로드합니다.
4. 압축 해제 후 `app-release.aab`를 Play Console closed testing에 업로드합니다.

필요한 GitHub Secrets:

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

## versionCode 증가 규칙

Play Console에 새 AAB를 올릴 때마다 `versionCode`는 반드시 이전보다 커야 합니다.

현재 기준:

- `versionCode 1`
- `versionName 0.1.0`
