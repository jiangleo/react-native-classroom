package com.rtncustomview;

import androidx.annotation.Nullable;
import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.view.View;

public class CustomView extends View {
    private int color;

    public CustomView(Context context) {
        super(context);
        this.configureComponent();
    }

    public CustomView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        this.configureComponent();
    }

    public CustomView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.configureComponent();
    }

    private void configureComponent() {
        // 默认背景色为红色
        this.color = Color.RED;
        this.setBackgroundColor(this.color);
    }

    public void setBackground(String color) {
        // 颜色值由React Native传入，格式为#RRGGBB，如红色为#FF0000
        this.color = Color.parseColor(color);
        this.setBackgroundColor(this.color);
    }
}