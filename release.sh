#!/bin/bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
rm -rf android/app/src/main/res/drawable-mdpi/node_modules_reactnativezssrichtexteditor_src_editor.html
cd android
./gradlew assembleRelease -x bundleReleaseJsAndAssets
python upload_apk.py com.terence.cenacle android/app/build/outputs/apk/release/