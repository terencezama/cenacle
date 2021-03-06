package com.terence.cenacle.nativeModules;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.terence.cenacle.nativeModules.radio.RadioStreamModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by leonardolerasse on 2018/05/25.
 */

public class nativeModulesReactPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {

        List<NativeModule> modules = new ArrayList<>();

        modules.add(new ToastModule(reactContext));
        modules.add(new RadioStreamModule(reactContext));

        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
