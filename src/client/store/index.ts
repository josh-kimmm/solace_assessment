import { configureStore, combineReducers } from '@reduxjs/toolkit';
import * as reducers from './reducers';

const appReducer = combineReducers(reducers);

// automatically include redux-dev-tools and thunk middleware
const store = configureStore({
  reducer: appReducer,
  devTools: process.env.REACT_APP_NODE_ENV !== 'production',
});

export default store;
