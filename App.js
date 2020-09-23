import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import RootStackNavigator from './src/Navigators/rootStackNavigator';
import LoadPersistedStore from './src/CustomAsyncStorage/loadPersistedStore';
import {store} from './src/Redux/store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <LoadPersistedStore store={store}>
          <NavigationContainer>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <RootStackNavigator />
          </NavigationContainer>
        </LoadPersistedStore>
      </Provider>
    </>
  );
};

export default App;
