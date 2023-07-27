// StorageTest.js
import React, {useState, useEffect} from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {NativeModules} from 'react-native';

const {StorageModule} = NativeModules;

const StorageTest = () => {
  const [storageValue, setStorageValue] = useState(null);

  const handleSetItem = async () => {
    try {
      await StorageModule.setItem('testKey', 'Hello, World!');
      console.log('Value set successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetItem = async () => {
    try {
      const result = await StorageModule.getItem('testKey');
      console.log('Received value: ', result);
      setStorageValue(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{borderColor: '#0ac', borderWidth: 1, padding: 5}}>
      <Text>Old Modules: 自定义存储模块</Text>
      <Button title="Set Item" onPress={handleSetItem} />
      <Button title="Get Item" onPress={handleGetItem} />
      <Text>Stored Value: {storageValue}</Text>
    </View>
  );
};

export default StorageTest;
