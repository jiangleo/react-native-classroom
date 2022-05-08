import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  useSelector,
  useDispatch,
  Provider,
  TypedUseSelectorHook,
} from 'react-redux';
import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // Reducer
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

console.log('all global state:', store.getState());
console.log('increment action:',counterSlice.actions.increment(1));
console.log('reducer',counterSlice.reducer);

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function CounterApp() {
  // State: a counter value
  const counter = useAppSelector((state: RootState) => state.counter.value);

  const dispatch = useAppDispatch();

  // Event Hanlder
  const handlePress = () => {
    // Action
    const action = counterSlice.actions.increment(1);
    // dispatch
    dispatch(action);
  };

  // View/UI
  return (
      <View style={styles.box}>
        <Text>{(!!global.HermesInternal).toString()}</Text>
        <Text>{counter}</Text>
        {/* click event: deposit */}
        <Text onPress={handlePress}>+1</Text>
      </View>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <CounterApp />
    </Provider>
  );
}
console.log('CounterApp',CounterApp.toString())
const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
