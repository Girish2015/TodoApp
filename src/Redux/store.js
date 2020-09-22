import {applyMiddleware, createStore, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from './reducer';
import AsyncStorage from '@react-native-community/async-storage';

const logger = createLogger({
  collapsed: false,
  predicate: () => __DEV__,
});

const enhancers = [applyMiddleware(thunkMiddleware, logger)];

const composeEnhancers =
  (__DEV__ &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const enhancer = composeEnhancers(...enhancers);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer, {}, enhancer);
export const persistor = persistStore(store);
