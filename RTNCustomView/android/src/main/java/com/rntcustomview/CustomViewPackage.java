package com.rtncustomview;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CustomViewPackage implements ReactPackage {
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        // return a list that contains our CustomViewManager
        List<ViewManager> viewManagers = new ArrayList<>();
        viewManagers.add(new CustomViewManager(reactContext));
        return viewManagers;
    }
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        // return an empty list because we do not have any native modules to export
        return Collections.emptyList();
    }

}
