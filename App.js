import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import RootStackNavigator from './src/Navigators/RootStackNavigator';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <RootStackNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
