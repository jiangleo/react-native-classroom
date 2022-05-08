// 改自 Redux 官方 demo https://codesandbox.io/s/github/reduxjs/redux-fundamentals-example-app/tree/checkpoint-10-finalCode/
import React from 'react'
import {Provider} from 'react-redux';
import App from './App';

import './api/server';

import store from './store';
import {fetchTodos} from './features/todos/todosSlice';

console.log(store.getState());
store.dispatch(fetchTodos());

export default function Root() {
  return (
      <Provider store={store}>
        <App />
      </Provider>
  );
}
