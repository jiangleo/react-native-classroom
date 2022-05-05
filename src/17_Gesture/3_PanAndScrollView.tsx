import React, {useRef} from 'react';
import {SafeAreaView, Text, View, useWindowDimensions} from 'react-native';
import Animated, {
  withSpring,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const LOADING_HEIGHT = 30

function PanAndScrollView() {
  const refreshY = useSharedValue(-LOADING_HEIGHT);
  const scrollY = useSharedValue(0);
  const {height: windowHeight} = useWindowDimensions()
  const wrapperHeight = windowHeight + LOADING_HEIGHT

  const scrollGesture = Gesture.Native()

  const panGesture = Gesture.Pan()
    .onChange(e => {
      // 滚动到顶部或者容器整体偏离正常位置时，可触发手势动画
      if (scrollY.value === 0 || refreshY.value !== -LOADING_HEIGHT) {
        refreshY.value =  Math.max(-LOADING_HEIGHT,refreshY.value + e.changeY) ;
      }
    })
    .onEnd(() => {
      // 松手时，如果容器整体偏离正常位置
      if (refreshY.value !== -LOADING_HEIGHT) {
        // 则使用弹性动画 withSpring，回到该位置
        refreshY.value = withSpring(-LOADING_HEIGHT, {
          stiffness:300,
          overshootClamping: true
        })
      }
    })


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
        <Animated.View style={[{height: wrapperHeight}, animatedStyle]}>
          <Text style={{textAlign: 'center', height: LOADING_HEIGHT }}>loading...</Text>
          <GestureDetector gesture={Gesture.Simultaneous(scrollGesture, panGesture)}>
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
  );
}

export default PanAndScrollView;
