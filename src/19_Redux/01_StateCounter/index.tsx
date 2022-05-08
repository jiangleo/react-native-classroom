import React, {useState} from 'react';
import {View, Text,  StyleSheet} from 'react-native';


export default function Counter() {
    // State: a counter value
    const [counter, setCounter] = useState(0)
  
    // Action: code that causes an update to the state when something happens
    const increment = () => {
      setCounter(prevCounter => prevCounter + 1)
    }
  
    // View: the UI definition
    return (
      <View style={styles.box}>
          <Text>{counter}</Text>
          <Text onPress={increment}>Increment</Text>
      </View>
    )
  }
  
  


const styles = StyleSheet.create({
  box: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
