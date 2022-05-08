import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice.js';

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');


  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.text}>{count}</Text>
      <View style={styles.box}>
        <Button title="+" onPress={() => dispatch(increment())} />
        <Button title="-" onPress={() => dispatch(decrement())} />
      </View>
      <View style={styles.box}>
        <TextInput
          style={styles.textInput}
          value={incrementAmount}
          onChangeText={text => setIncrementAmount(text)}
        />

        <Button
          title="Add Amount"
          onPress={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        />

        <Button
          title="Add Async"
          onPress={() =>
            dispatch(incrementAsync(Number(incrementAmount) || 0))
          }>
          Add Async
        </Button>
      </View>
    </View>
  );
}

function Button({title, onPress, style}) {
  return (
    <View style={[styles.button, style]}>
      <Text style={styles.buttonText} onPress={onPress}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    marginBottom: 50,
  },
  text: {
    fontSize: 50,
    marginBottom: 80,
    color: 'rgb(112, 76, 182)',
  },
  button: {
    width: 100,
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'rgb(112, 76, 182)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(112, 76, 182, 0.1)',
    borderRadius: 2,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'rgb(112, 76, 182)',
  },
  textInput: {
    fontSize: 24,
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 10,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(112, 76, 182)',
    width: 100,
    borderRadius: 2,
    textAlign: 'center',
  },
});
