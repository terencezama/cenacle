
# react-native-bible-realm

## Getting started

`$ npm install react-native-bible-realm --save`

### Mostly automatic installation

`$ react-native link react-native-bible-realm`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-bible-realm` and add `RNBibleRealm.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNBibleRealm.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNBibleRealmPackage;` to the imports at the top of the file
  - Add `new RNBibleRealmPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-bible-realm'
  	project(':react-native-bible-realm').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-bible-realm/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-bible-realm')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNBibleRealm.sln` in `node_modules/react-native-bible-realm/windows/RNBibleRealm.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Bible.Realm.RNBibleRealm;` to the usings at the top of the file
  - Add `new RNBibleRealmPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNBibleRealm from 'react-native-bible-realm';

// TODO: What to do with the module?
RNBibleRealm;
```
  