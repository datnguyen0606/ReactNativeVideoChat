# Installation

```
brew install node
brew install watchman
npm install -g react-native-cli
```

# Run app on simulator 

(for Android, need to install android SDK first https://facebook.github.io/react-native/docs/getting-started.html)
```
react-native run-ios
react-native run-android
```

# Build apk file for android device

Bundle debug build:
```
react-native bundle --dev false --platform android --entry-file index.android.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug
```

Create debug build:
```
cd android
./gradlew assembleDebug
```

Generated `apk` will be located at `android/app/build/outputs/apk`
