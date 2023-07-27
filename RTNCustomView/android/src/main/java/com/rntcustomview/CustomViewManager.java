package com.rtncustomview;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import android.graphics.Color;  // 这里添加导入语句

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.RTNCustomViewManagerInterface;
import com.facebook.react.viewmanagers.RTNCustomViewManagerDelegate;

@ReactModule(name = CustomViewManager.NAME)
public class CustomViewManager extends SimpleViewManager<CustomView>
        implements RTNCustomViewManagerInterface<CustomView> {

    private final ViewManagerDelegate<CustomView> mDelegate;

    static final String NAME = "RTNCustomView";

    public CustomViewManager(ReactApplicationContext context) {
        mDelegate = new RTNCustomViewManagerDelegate<>(this);
    }

    @Nullable
    @Override
    protected ViewManagerDelegate<CustomView> getDelegate() {
        return mDelegate;
    }

    @NonNull
    @Override
    public String getName() {
        return CustomViewManager.NAME;
    }

    @NonNull
    @Override
    protected CustomView createViewInstance(@NonNull ThemedReactContext context) {
        return new CustomView(context);
    }

    // Here we are exposing a background color prop.
    @ReactProp(name = "background", customType = "Color")
    public void setBackground(CustomView view, @Nullable String color) {
        if (color != null) {
            view.setBackground(color);
        }
    }
}