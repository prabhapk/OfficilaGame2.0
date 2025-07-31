// navigation/HomeStack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DetailsScreen from '../Screens/DetailsScreen';
import HomeScreen from '../Screens/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
);

export default HomeStack;
