#!/bin/bash

# rm -rf $TMPDIR/react-*
# npm start -- --reset-cache

rm -rf ios
rm -rf android
react-native upgrade

# rm -rf node_modules
npm install
react-native link

# watchman watch-del-all
cp _clean/AppDelegate.m ios/cenacle/AppDelegate.m
cp _clean/Podfile ios/Podfile
cd ios
pod install
cd ../
react-native run-ios