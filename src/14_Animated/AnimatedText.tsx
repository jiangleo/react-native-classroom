import React, { useEffect } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  SafeAreaView,
} from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

Animated.addWhitelistedNativeProps({text: true});

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function AnimatedText(): React.ReactElement {

  const shareValue = useSharedValue('');
  
  const animatedProps = useAnimatedProps(() => {
    return {text: shareValue.value} as unknown as TextInputProps;
  });

  useEffect(()=>{
    setInterval(() =>{
        shareValue.value = ''+Date.now()
    },1000)
  }, [])

  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={true}
      value={shareValue.value}
      style={styles.text}
      animatedProps={animatedProps}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});

export default function App() {
  return (
    <SafeAreaView>
      <AnimatedText  />
    </SafeAreaView>
  );
}
