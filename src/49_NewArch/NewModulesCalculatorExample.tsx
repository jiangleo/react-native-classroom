/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {useState} from 'react';
import {View, Text, Button} from 'react-native';
import RTNCalculator from 'rtn-calculator/js/NativeCalculator';

const App: () => JSX.Element = () => {
  const [result, setResult] = useState<number | null>(null);
  return (
    <View style={{borderColor: '#0ac', borderWidth: 1, padding: 5}}>
      <Text>New Component：自定义计算模块</Text>
      <Text style={{marginLeft: 20, marginTop: 20}}>2+7={result ?? '??'}</Text>
      <Button
        title="Compute"
        onPress={async () => {
          const value = await RTNCalculator?.add(2, 7);
          setResult(value ?? null);
        }}
      />
    </View>
  );
};
export default App;
