import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Button} from 'react-native';
// react-native-gesture-handler 依赖 react-native-reanimated
import Animated, { runOnJS } from 'react-native-reanimated';
import {Gesture, GestureDetector, } from 'react-native-gesture-handler';
import {COLORS} from './colors';

type DemoProps = {
  addLog: (log: string) => void;
};

function RaceDemo({addLog}:DemoProps) {
  const pan = Gesture.Pan()
    .onStart(() => runOnJS(addLog)('pan onStart'))
    .onUpdate(() => runOnJS(addLog)('pan onUpdate'))
    .onEnd(() => runOnJS(addLog)('pan onEnd'));

  const longPress = Gesture.LongPress()
    .onStart(() => runOnJS(addLog)('longPress onStart'))
    .onEnd(() => runOnJS(addLog)('longPress onEnd'));

  return (
    <View style={styles.demo}>
      <Text style={styles.text}>
        Gesture.Race(pan, longPress) - the first gesture that meets its
        activation criteria will activate
      </Text>
      <GestureDetector gesture={Gesture.Race(pan, longPress)}>
        <View style={[styles.largeBox, {backgroundColor: COLORS.KINDA_RED}]} />
      </GestureDetector>
    </View>
  );
}

function ExclusiveDemo({addLog}:DemoProps) {
  const singleTap = Gesture.Tap().onStart(() => console.log('single tap!'));
  const doubleTap = Gesture.Tap()
    .onStart(() => console.log('double tap!'))
    .numberOfTaps(2);

  return (
    <View style={styles.demo}>
      <Text style={styles.text}>
        Gesture.Exclusive(doubleTap, singleTap) - the second gesture will wait
        for the failure of the first one
      </Text>
      <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
        <View
          style={[styles.largeBox, {backgroundColor: COLORS.KINDA_GREEN}]}
        />
      </GestureDetector>
    </View>
  );
}

function SimultaneousDemo({addLog}:DemoProps) {
  const pinch = Gesture.Pinch()
    .onStart(() => runOnJS(addLog)('pinch onStart'))
    .onUpdate(() => runOnJS(addLog)('pinch onUpdate'))
    .onEnd(() => runOnJS(addLog)('pinch onEnd'));
  const rotation = Gesture.Rotation()
    .onStart(() => runOnJS(addLog)('rotation onStart'))
    .onUpdate(() => runOnJS(addLog)('rotation onUpdate'))
    .onEnd(() => runOnJS(addLog)('rotation onEnd'));

  return (
    <View style={styles.demo}>
      <Text style={styles.text}>
        Gesture.Simultaneous(pinch, rotation) - both gestures can activate and
        process touches at the same time
      </Text>
      <GestureDetector gesture={Gesture.Simultaneous(pinch, rotation)}>
        <View
          style={[styles.largerBox, {backgroundColor: COLORS.KINDA_BLUE}]}
        />
      </GestureDetector>
    </View>
  );
}

export default function ComponentsScreen() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (log: string): void => {
    setLogs(logs.concat(log))
  }


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.bold}>
        Gesture Handler provides a simple API for using multiple gestures at
        once in different configurations.
      </Text>
      <RaceDemo addLog={addLog}/>
      <ExclusiveDemo addLog={addLog} />
      <SimultaneousDemo addLog={addLog}/>
      <View>
      <Button title='清空日志' onPress={()=>{
        setLogs([])
      }}/>
        {logs.map((log,index) => (
          <Text key={index}>{log}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },

  bold: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  text: {
    marginVertical: 3,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  demo: {
    marginVertical: 3,
    alignItems: 'center',
  },
  largeBox: {
    width: 100,
    height: 100,
  },
  largerBox: {
    width: 150,
    height: 150,
  },
});
