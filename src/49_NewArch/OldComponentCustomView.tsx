import React from 'react';
import {View, Text, requireNativeComponent} from 'react-native';

/**
 * Composes `View`.
 *
 * - src: string
 * - borderRadius: number
 * - resizeMode: 'cover' | 'contain' | 'stretch'
 */
const CustomView = requireNativeComponent('CustomView');

const App: () => JSX.Element = () => {
  return (
    <View style={{borderColor: '#0ac', borderWidth: 1, padding: 5}}>
      <Text>Old Component：自定义视图组件</Text>
      <CustomView
        style={{
          width: 100,
          height: 100,
        }}
        color="red"
      />
    </View>
  );
};
export default App;
