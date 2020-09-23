import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import customStorageMiddelware from '../CustomAsyncStorage/storageMiddleware';
import reducer from './reducer';

const logger = createLogger({
  collapsed: false,
  predicate: () => __DEV__,
});

export const store = createStore(
  reducer,
  {},
  applyMiddleware(thunkMiddleware, logger, customStorageMiddelware),
);
