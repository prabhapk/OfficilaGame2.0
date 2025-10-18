import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { setNavigation } from "../Utils/getNavigation";
import SplashScreen from "../Screens/splashScreen";
import BottomNavigation from "./BottomNavigation";
import Quick3DScreen from "../Screens/Quick3DScreen";
import Profile from "../Screens/Profile";
import SignUpScreen from "../Screens/SignUpScreen";
import SignInScreen from "../Screens/SignInScreen";
import PasswordChange from "../Screens/PasswordChange";
import ThreeDigitMain from "../Screens/ThreeDigitMain";
import LotteryScreen from "../Screens/Lottery/LotteryScreen";
import ForgotPassword from "../Screens/ForgotPassword";
import SignUpSetPassword from "../Screens/SignUpSetPassword";
import DrawerNavigation from "./DrawerNavigation";
import WalletScreen from "../Screens/WalletScreen";
import Withdraw from "../Screens/Withdraw";
import VipLevelDetailsScreen from "../Screens/VipLevelDetailsScreen";
import Transactions from "../Screens/Transactions";
import InviteScreen from "../Screens/InviteScreen";
import ParticularGameResult from "../Screens/ParticularGameResult";
import MyBetsScreen from "../Screens/MyBetsScreen";
import AddBankAccount from "../Screens/AddBankAccount";
import RebateScreen from "../Screens/RebateScreen";
import AgencyScreen from "../Screens/AgencyScreen";
import InvitationRulesScreen from "../Screens/InvitationRulesScreen";
import HomeScreen from "../Screens/HomeScreen";
import Promotions from "../Screens/Promotions";

const Stack = createNativeStackNavigator();

function MainNavigation() {
  const linking = {
    prefixes: ["http://localhost:8081", "annai-lottery://"],
    config: {
      screens: {
        SplashScreen: "",
        BottomNavigation: "home",
        Quick3DScreen: "quick3d",
        Profile: "profile",
        SignInScreen: "signin",
        SignUpScreen: "signup",
        PasswordChange: "password-change",
        ThreeDigitMain: "three-digit",
        ForgotPassword: "forgot-password",
        SignUpSetPassword: "signup-password",
        DrawerNavigation: "drawer",
        WalletScreen: "wallet",
        Withdraw: "withdraw",
        VipLevelDetailsScreen: "vip-details",
        Transactions: "transactions",
        InviteScreen: "invite",
        ParticularGameResult: "game-result",
        MyBetsScreen: "my-bets",
        AddBankAccount: "add-bank",
        RebateScreen: "rebate",
        AgencyScreen: "agency",
        InvitationRulesScreen: "invitation-rules",
        Promotions: "promotions",
      },
    },
  };

  return (
    <NavigationContainer
      linking={linking}
      ref={(navigationRef) => setNavigation(navigationRef)}
    >
      <Stack.Navigator
        initialRouteName={"SplashScreen"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        <Stack.Screen name="Quick3DScreen" component={Quick3DScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="PasswordChange" component={PasswordChange} />
        <Stack.Screen name="ThreeDigitMain" component={ThreeDigitMain} />
        <Stack.Screen name="LotteryScreen" component={LotteryScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="SignUpSetPassword" component={SignUpSetPassword} />
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        <Stack.Screen name="WalletScreen" component={WalletScreen} />
        <Stack.Screen name="Withdraw" component={Withdraw} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="VipLevelDetailsScreen"
          component={VipLevelDetailsScreen}
        />
        <Stack.Screen name="Transactions" component={Transactions} />
        <Stack.Screen name="InviteScreen" component={InviteScreen} />
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
        <Stack.Screen
          name="RebateScreen"
          component={RebateScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AgencyScreen"
          component={AgencyScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="InvitationRulesScreen"
          component={InvitationRulesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Promotions"
          component={Promotions}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
