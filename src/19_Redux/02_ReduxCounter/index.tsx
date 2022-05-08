import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStore} from 'redux';

const defaultState = {counter: 0}

function counterApp(state = defaultState, action: {type: string}) {
  if (action.type === 'INCREMENT') {
    return {counter: state.counter + 1};
  }
  return state;
}

const store = createStore(counterApp);
console.log('state:', store.getState());

export default function Counter() {
  // State: a counter value
  const [counter, setCounter] = useState(defaultState.counter)

  // Store: Update the state when the store changes
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCounter(store.getState().counter);
    })
    return unsubscribe
  }, [])

  // Action: code that causes an update to the state when something happens
  const increment = () => {
    // setCounter(prevCounter => prevCounter + 1)
    store.dispatch({type: 'INCREMENT'});
  };

  // View: the UI definition
  return (
    <View style={styles.box}>
      <Text>{counter}</Text>
      <Text onPress={increment}>Increment</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
