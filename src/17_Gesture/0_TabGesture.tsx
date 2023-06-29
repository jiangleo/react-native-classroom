import React, {useState} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {runOnJS} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

export default function App() {
  const [logs, setLogs] = useState<string[]>([]);

  const singleTap = Gesture.Tap()
    // 渲染
    .onStart(() => runOnJS(setLogs)(logs.concat('开始触发轻点事件')));
  // 动画或日志
  // .onStart(() => console.log('开始触发轻点事件'));

  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        <GestureDetector gesture={singleTap}>
          <View style={[{width: 100, height: 100, backgroundColor: 'red'}]} />
        </GestureDetector>
        {logs.map((log, index) => (
          <Text key={index}>{log}</Text>
        ))}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
