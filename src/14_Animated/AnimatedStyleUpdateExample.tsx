import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { View, Button } from 'react-native';
import React from 'react';

function AnimatedStyleUpdateExample(): React.ReactElement {
  const randomWidth = useSharedValue(10);


  const style = useAnimatedStyle(() => {
    console.log('useAnimatedStyle')
    return {
      width: withTiming(randomWidth.value),
    };
  });

  console.log('---- render ----', style)

  return (
    <View
      style={{
        marginTop: 100,
        flex: 1,
        flexDirection: 'column',
      }}>
      <Animated.View
        style={[
          { width: 100, height: 30, backgroundColor: 'cornflowerblue', marginHorizontal: 30,},
          style,
        ]}
      />
      <Button
        title="切换宽度"
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      />
    </View>
  );
}

export default AnimatedStyleUpdateExample;
