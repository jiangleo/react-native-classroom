import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './features/couter/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
