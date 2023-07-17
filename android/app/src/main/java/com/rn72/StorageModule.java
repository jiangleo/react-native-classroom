package com.rn72;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.content.Context;
import android.content.SharedPreferences;


public class StorageModule extends ReactContextBaseJavaModule {
    StorageModule(ReactApplicationContext context) {
        super(context);
    }

    private static final String PREFERENCES_FILE = "com.your_project.storage";

    @Override
    public String getName() {
        return "StorageModule";
    }


    @ReactMethod
    public void setItem(String key, String value, Promise promise) {
        try {
            SharedPreferences sharedPref = getReactApplicationContext().getSharedPreferences(PREFERENCES_FILE, Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = sharedPref.edit();
            editor.putString(key, value);
            editor.apply();
            promise.resolve(null);
        } catch(Exception e) {
            promise.reject("StorageModule setItem Error", e);
        }
    }

    @ReactMethod
    public void getItem(String key, Promise promise) {
        try {
            SharedPreferences sharedPref = getReactApplicationContext().getSharedPreferences(PREFERENCES_FILE, Context.MODE_PRIVATE);
            String value = sharedPref.getString(key, null);
            promise.resolve(value);
        } catch (Exception e){
            promise.reject("StorageModule getItem Error", e);
        }
    }

}