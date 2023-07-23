/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import RTNCenteredText from 'rtn-centered-text/js/RTNCenteredTextNativeComponent';
import {View, Text, Button} from 'react-native';

const App: () => JSX.Element = () => {
  return (
    <View style={{borderColor: '#0ac', borderWidth: 1, padding: 5}}>
      <Text>New Component：自定义文字组件</Text>
      <RTNCenteredText
        text="Hello World!"
        style={{width: '100%', height: 30}}
      />
    </View>
  );
};
export default App;
