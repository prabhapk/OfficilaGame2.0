import { View, Text } from 'react-native'
import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigation from './BottomNavigation';
import CustomSidebarMenu from './CustomSidebarMenu';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
    return (

         <Drawer.Navigator screenOptions={{headerShown: false}}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
         <Drawer.Screen name="BottomNavigation" component={BottomNavigation} />
      </Drawer.Navigator>
      );
}

export default DrawerNavigation


