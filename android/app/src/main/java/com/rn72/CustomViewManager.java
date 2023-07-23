package com.rn72;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import android.view.View;
import android.graphics.Color;

public class CustomViewManager extends SimpleViewManager<View> {
    public static final String REACT_CLASS = "CustomView";

    private ReactApplicationContext reactContext;

    public CustomViewManager(ReactApplicationContext context) {
        reactContext = context;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected View createViewInstance(ThemedReactContext reactContext) {
        // Here you can create your view instance
        View view = new View(reactContext);
        return view;
    }

    @ReactProp(name = "color")
    public void setColor(View view, String color) {
        view.setBackgroundColor(Color.parseColor(color));
    }
}
