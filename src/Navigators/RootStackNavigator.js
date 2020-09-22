import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home'

const Stack = createStackNavigator();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      cardStyle: {
        backgroundColor: '#fff'
      }
    }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}