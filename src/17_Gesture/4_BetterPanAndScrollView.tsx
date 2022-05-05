import React from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import Animated, {
  withSpring,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const LOADING_HEIGHT = 200;

function PanAndScrollView() {
  const refreshY = useSharedValue(-LOADING_HEIGHT);
  const scrollY = useSharedValue(0);
  const {height: windowHeight} = useWindowDimensions();
  const wrapperHeight = windowHeight + LOADING_HEIGHT;

  // hack: 使用 tapGesture 手势作为控制 scrollGesture 是否执行动画的开关
  // 并不是真正的要响应 Tap 手势
  const tapGesture = Gesture.Tap()
    .onTouchesMove((_, manager) => {
      // 如果 ScrollView 容器没有顶到屏幕顶部
      // 则设置 Tap 手势内部状态为 FAILED，让 ScrollView 内容不可滚动
      if (LOADING_HEIGHT + refreshY.value === 0) {
        manager.fail();
      } else {
        manager.activate();
      }
    })
    .maxDuration(1000000);



  const scrollGesture = Gesture.Native()
    // 当 Tap 手势内部状态为 ACTIVE 则 ScrollView 滚动动画不执行
    // 当 Tap 手势内部状态为 FAILED 则 ScrollView 滚动动画执行
    .requireExternalGestureToFail(tapGesture);

  const panGesture = Gesture.Pan()
    .onChange(e => {
      // 滚动到顶部或者容器整体偏离正常位置时，可触发手势动画
      if (scrollY.value === 0 || refreshY.value !== -LOADING_HEIGHT) {
        refreshY.value = Math.max(-LOADING_HEIGHT, refreshY.value + e.changeY);
      }
    })
    .onEnd(() => {
      // 松手时，如果容器整体偏离正常位置
      if (refreshY.value !== -LOADING_HEIGHT) {
        // 则使用弹性动画 withSpring，回到该位置
        refreshY.value = withSpring(-LOADING_HEIGHT, {
          stiffness: 300,
          overshootClamping: true,
        });
      }
    })
    .simultaneousWithExternalGesture(scrollGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: refreshY.value}],
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      // 记录偏移量，只能读不能写
      scrollY.value = e.contentOffset.y;
    },
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[{height: wrapperHeight}, animatedStyle]}>
        <Text
          style={{
            textAlign: 'center',
            height: LOADING_HEIGHT,
            backgroundColor: '#ccc',
          }}>
          loading...
        </Text>
        <GestureDetector
          gesture={Gesture.Simultaneous(scrollGesture, tapGesture)}>
          <Animated.ScrollView
            bounces={false}
            style={{backgroundColor: '#0ac'}}
            contentContainerStyle={{alignItems: 'center'}}
            onScroll={scrollHandler}
            scrollEventThrottle={1}>
            {Array(100)
              .fill(1)
              .map((_, index) => (
                <Text key={index}>{index}</Text>
              ))}
          </Animated.ScrollView>
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}

export default PanAndScrollView;
