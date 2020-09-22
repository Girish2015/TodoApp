import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import RootStackNavigator from './src/Navigators/RootStackNavigator';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/Redux/store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <RootStackNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
