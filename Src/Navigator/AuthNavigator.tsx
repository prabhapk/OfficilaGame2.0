// navigation/RootNavigator.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeStack from './HomeStack';


const Tab = createBottomTabNavigator();

const RootNavigator = () => (
   <Tab.Navigator>
    <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
    {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
  </Tab.Navigator>
);

export default RootNavigator;
