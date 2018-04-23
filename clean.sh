#!/bin/bash
bundle_id=com.terence.cenacle
# rm -rf $TMPDIR/react-*
# npm start -- --reset-cache


rm -rf ios
rm -rf android
react-native upgrade

# rm -rf node_modules
npm install
react-native link

# watchman watch-del-all

# ios works
plutil -replace CFBundleIdentifier -string $bundle_id ios/cenacle/Info.plist
cp _clean/AppDelegate.m ios/cenacle/AppDelegate.m
cp _clean/Podfile ios/Podfile
cp _clean/GoogleService-Info.plist ios/cenacle
cd ios
pod install
cd ../
react-native run-ios