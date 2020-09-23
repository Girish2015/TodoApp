import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import Home from '../Home';
import CreateTodo from '../Home/createTodo';

const Stack = createStackNavigator();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateTodo"
        component={CreateTodo}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
