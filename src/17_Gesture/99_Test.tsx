import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Button} from 'react-native';
// react-native-gesture-handler 依赖 react-native-reanimated
import Animated, {runOnJS} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {COLORS} from './colors';

type DemoProps = {
  addLog: (log: string) => void;
};

function ManualEvent({addLog}: DemoProps) {
  const singleTap = Gesture.Manual().onFinalize(e =>
    console.log('onUpdate', e.allTouches ),
  );

  // .onBegin((e) => console.log('onBegin',e))
  // .onTouchesDown((e, manager) => console.log('onTouchesDown',e, manager))
  // .onTouchesMove((e, manager) => console.log('onTouchesMove',e, manager))
  // .onStart((e, manager) => console.log('onStart',e))
  // .onUpdate((e, manager) => console.log('onUpdate',e))
  // .onChange((e, manager) => console.log('onChange',e))
  // .onTouchesUp((e, manager) => console.log('onTouchesUp',e,manager))
  // .onEnd((e, manager) => console.log('onEnd',e,manager))
  // .onTouchesCancelled((e, manager) => console.log('onTouchesCancelled',e,manager))
  // .onFinalize((e, manager) => console.log('onFinalize',e,manager))

  return (
    <View style={styles.demo}>
      <Text style={styles.text}>测试原始事件</Text>
      <GestureDetector gesture={singleTap}>
        <View
          style={[styles.largeBox, {backgroundColor: COLORS.KINDA_GREEN}]}
        />
      </GestureDetector>
    </View>
  );
}

function EventOrder({addLog}: DemoProps) {
  const singleTap = Gesture.Pan()
    .onBegin(() => console.log('onBegin'))
    .onTouchesDown(() => console.log('onTouchesDown'))
    .onTouchesMove(() => console.log('onTouchesMove'))
    .onStart(() => console.log('onStart'))
    .onUpdate(e => console.log('onUpdate', e))
    .onChange(e => console.log('onChange', e))
    .onTouchesUp(() => console.log('onTouchesUp'))
    .onEnd(() => console.log('onEnd'))
    .onTouchesCancelled(() => console.log('onTouchesCancelled'))
    .onFinalize(() => console.log('onFinalize'));

  return (
    <View style={styles.demo}>
      <Text style={styles.text}>测试事件触发顺序</Text>
      <GestureDetector gesture={singleTap}>
        <View
          style={[styles.largeBox, {backgroundColor: COLORS.KINDA_GREEN}]}
        />
      </GestureDetector>
    </View>
  );
}

function TapWithoutAnimated({addLog}: DemoProps) {
  const singleTap = Gesture.Tap()
    // .onStart(() => runOnJS(addLog)('single tap start'))
    .onStart(() => addLog('single tap start'));
  // .onEnd(() => runOnJS(addLog)('single tap end'))

  return (
    <View style={styles.demo}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Text style={{color: 'red', letterSpacing: 10}}>给点</Text>
        <Text style={{letterSpacing: 100}}> </Text>
        <Text style={{color: 'red', letterSpacing: 10}}>空间</Text>
        <Text>手势（使用普通视图1111111）111111111111</Text>
      </View>
      <GestureDetector gesture={singleTap}>
        <View
          style={[styles.largeBox, {backgroundColor: COLORS.KINDA_GREEN}]}
        />
      </GestureDetector>
    </View>
  );
}

function TapWithAnimated({addLog}: DemoProps) {
  const singleTap = Gesture.Tap().onStart(() =>
    runOnJS(addLog)('single tap start'),
  );
  // 点击会报错
  // .onStart(() => addLog('single tap start'))
  // .onEnd(() => runOnJS(addLog)('single tap end'))

  return (
    <View style={styles.demo}>
      <Text style={styles.text}>轻点手势（使用动画视图）</Text>
      <GestureDetector gesture={singleTap}>
        <Animated.View
          style={[styles.largeBox, {backgroundColor: COLORS.KINDA_GREEN}]}
        />
      </GestureDetector>
    </View>
  );
}

export default function App() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (log: string): void => {
    setLogs(logs.concat(log));
  };
  const scrollGesture = Gesture.Native().onBegin(e =>
    console.log('scroll', e),
  );

  const singleTap = Gesture.Tap()
    // .onStart(() => runOnJS(addLog)('single tap start'))
    .onStart(() => runOnJS(setLogs)(logs.concat('开始触发轻点事件')));
  // .onEnd(() => runOnJS(addLog)('single tap end'))

  return (
    <GestureDetector gesture={scrollGesture}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {Array(20)
          .fill(1)
          .map((log, index) => (
            <Text key={index}>{index}</Text>
          ))}

        <ManualEvent addLog={addLog} />
        <EventOrder addLog={addLog} />
        <TapWithoutAnimated addLog={addLog} />
        <TapWithAnimated addLog={addLog} />

        <View style={styles.demo}>
          <Text style={styles.text}>？？（使用普通视图）</Text>
          <GestureDetector gesture={singleTap}>
            <View
              style={[styles.largeBox, {backgroundColor: COLORS.KINDA_GREEN}]}
            />
          </GestureDetector>
        </View>

        <View>
          <Button
            title="清空日志"
            onPress={() => {
              setLogs([]);
            }}
          />
          {logs.map((log, index) => (
            <Text key={index}>{log}</Text>
          ))}
        </View>
      </ScrollView>
    </GestureDetector>
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
