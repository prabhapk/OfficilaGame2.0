import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../Screens/splashScreen';
import Login from '../Screens/Login';
import BottomNavigation from './BottomNavigation';
import ThreeDigitMain from '../Screens/ThreeDigitMain';
import Profile from '../Screens/Profile';
import SignUpScreen from '../Screens/SignUpScreen';
import SignInScreen from '../Screens/SignInScreen';
import UserDetails from '../Screens/UserDetails';
import PasswordChange from '../Screens/PasswordChange';
import DummyScreen from '../Screens/DummyScreen';
import LotteryScreen from '../Screens/Lottery/LotteryScreen';
import ForgotPassword from '../Screens/ForgotPassword';
import SignUpSetPassword from '../Screens/SignUpSetPassword';
import DrawerNavigation from './DrawerNavigation';
import WalletScreen from '../Screens/WalletScreen';
import Withdraw from '../Screens/Withdraw';
import VipLevelDetailsScreen from '../Screens/VipLevelDetailsScreen';
import Transactions from '../Screens/Transactions';
import InviteScreen from '../Screens/InviteScreen';
import ParticularGameResult from '../Screens/ParticularGameResult';
import MyBetsScreen from '../Screens/MyBetsScreen';
import AddBankAccount from '../Screens/AddBankAccount';

const Stack = createNativeStackNavigator();

function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'SplashScreen'} screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
        />
         <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
        />
        <Stack.Screen
          name="ThreeDigitMain"
          component={ThreeDigitMain}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
        />
        <Stack.Screen
          name="PasswordChange"
          component={PasswordChange}
        />
        <Stack.Screen
          name="DummyScreen"
          component={DummyScreen}
        />
        <Stack.Screen
          name="LotteryScreen"
          component={LotteryScreen}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
        />
        <Stack.Screen
          name="SignUpSetPassword"
          component={SignUpSetPassword}
        />
        <Stack.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
      />
        <Stack.Screen
          name="WalletScreen"
          component={WalletScreen}
        />
        <Stack.Screen 
          name="Withdraw"
          component={Withdraw}
        />
        <Stack.Screen
          name="VipLevelDetailsScreen"
          component={VipLevelDetailsScreen}
        />
        <Stack.Screen
          name="Transactions"
          component={Transactions}
        />
        <Stack.Screen
          name="InviteScreen"
          component={InviteScreen}
        />
        <Stack.Screen
          name="ParticularGameResult"
          component={ParticularGameResult}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyBetsScreen"
          component={MyBetsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddBankAccount"
          component={AddBankAccount}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
