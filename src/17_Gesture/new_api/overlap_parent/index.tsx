import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

function Box(props: {
  color: string;
  overlap?: boolean;
  children?: React.ReactNode;
}) {
  const gesture = Gesture.Tap().onEnd((_e, success) => {
    if (success) {
      console.log(props.color);
    }
  });

  return (
    <GestureDetector gesture={gesture}>
      <View
        style={[
          styles.box,
          { backgroundColor: props.color },
          props.overlap ? styles.overlap : {},
        ]}>
        {props.children}
      </View>
    </GestureDetector>
  );
}

export default function Example() {
  const gesture = Gesture.Tap().onEnd((_e, success) => {
    console.log('outer')
  });

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.home}>
        <Box color="red">
          <Box color="green" overlap />
        </Box>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  home: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: 'plum',
  },
  box: {
    width: 150,
    height: 150,
  },
  overlap: {
    position: 'absolute',
    left: 75,
    top: 75,
  },
});
