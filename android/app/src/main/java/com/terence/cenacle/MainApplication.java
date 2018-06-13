package com.terence.cenacle;

import android.app.Application;
import android.content.Context;
import android.os.Build;
import android.support.multidex.MultiDex;
import android.support.multidex.MultiDexApplication;
import android.util.Log;
import android.webkit.WebView;

//import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;

import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;

import com.jordansexton.react.crosswalk.webview.CrosswalkWebViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.holy.RNBibleRealmPackage;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;


import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.calendarevents.CalendarEventsPackage;
import com.reactlibrary.RNGooglePlacePickerPackage;
import com.rnfs.RNFSPackage;

import java.util.Arrays;
import java.util.List;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFirebasePackage(),
            new RNSensitiveInfoPackage(),
            new VectorIconsPackage(),
            new ReactNativeI18n(),
            new RNGooglePlacePickerPackage(),
//            new RNFirebasePackage(),
              new RNFirebaseAuthPackage(),
            new RNDeviceInfo(),
            new ReactNativeConfigPackage(),
              new RNFirebaseFirestorePackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new RNFSPackage(),
//              new MapsPackage(),
              new CalendarEventsPackage(),
              new RNBibleRealmPackage(),
              new WebViewBridgePackage(),
              new CrosswalkWebViewPackage()


      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Log.d("nice","oncreate");
    SoLoader.init(this, /* native exopackage */ false);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
      WebView.setWebContentsDebuggingEnabled(true);
    }
  }

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    Log.d("nice","attachBaseContext");
    MultiDex.install(this);
  }


}
