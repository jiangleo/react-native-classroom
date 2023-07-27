/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import RTNCustomView from 'rtn-custom-view/js/RTNCustomViewNativeComponent';
import {View, Text, Button} from 'react-native';

const App: () => JSX.Element = () => {
  return (
    <View style={{borderColor: '#0ac', borderWidth: 1, padding: 5}}>
      <Text>New Component：自定义视图组件</Text>
      <RTNCustomView
        backgroundColor="blue"
        style={{
          width: 100,
          height: 100,
        }}
      />
    </View>
  );
};
export default App;
