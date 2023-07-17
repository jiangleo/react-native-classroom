// StorageTest.js
import React, {useState, useEffect} from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {NativeModules} from 'react-native';

const {StorageModule} = NativeModules;

const StorageTest = () => {
  const [storageValue, setStorageValue] = useState(null);

  const handleSetItem = () => {
    StorageModule.setItem('testKey', 'Hello, World!')
      .then(() => {
        console.log('Value set successfully');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleGetItem = () => {
    StorageModule.getItem('testKey')
      .then(result => {
        console.log('Received value: ', result);
        setStorageValue(result);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Set Item" onPress={handleSetItem} />
      <Button title="Get Item" onPress={handleGetItem} />
      <Text>Stored Value: {storageValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StorageTest;
