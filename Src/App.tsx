import React, { useEffect } from "react";
import MainNavigation from "./Navigation/mainNavigation";
import CustomLoader from "./Components/Modal/CustomLoader";
import SessionExpiredModal from "./Components/SessionExpiredModal";
import ErrorBoundary from "./Components/ErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
// import DeviceInfo from 'react-native-device-info';
import axios from "axios";
import { setDeviceInfo, setIpAddress } from "./Redux/Slice/signUpSlice";
import { setSessionExpiredVisible } from "./Redux/Slice/commonSlice";
import { RootState } from "./Redux/store";
import Toast from "react-native-toast-message";
import MobileContainer from "./Components/MobileContainer";
import { LogBox, StatusBar, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS } from "./Constants/Theme";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { setShouldNavigateToLogin } from "./Redux/Slice/commonSlice";
import { CommonActions } from "@react-navigation/native";
import { getNavigation } from "./Utils/getNavigation";

const App = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state: any) => state.LoaderSlice);
  const deviceInfo = useSelector(
    (state: RootState) => state.signUpSlice.deviceInfo
  );
  const sessionExpiredVisible = useSelector(
    (state: RootState) => state.commonSlice?.sessionExpiredVisible || false
  );
  const shouldNavigateToLogin = useSelector(
    (state: RootState) => state.commonSlice?.shouldNavigateToLogin || false
  );
  LogBox.ignoreAllLogs();

  // Reset session expired modal on app startup
  useEffect(() => {
    const clearPersistedState = async () => {
      try {
        const AsyncStorage = require("@react-native-async-storage/async-storage").default;
        await AsyncStorage.removeItem("persist:root");
      } catch (error) {
        console.log("🚨 Error clearing AsyncStorage:", error);
      }
    };

    clearPersistedState();
    dispatch(setSessionExpiredVisible(false));
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchDeviceInfo = async () => {
  //     try {
  //       const deviceId = DeviceInfo.getDeviceId();
  //       console.log('Device ID:', deviceId);
  //       const brand = DeviceInfo.getBrand();
  //       const model = DeviceInfo.getModel();

  //       const info = { deviceId, brand, model };

  //       dispatch(setDeviceInfo(info));
  //       console.log('DeviceInfo =>', info);
  //     } catch (error) {
  //       console.error('Error fetching device info:', error);
  //     }
  //   };

  //   fetchDeviceInfo();
  // }, [dispatch]);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#FF4140", // your brand color
      secondary: "#FFAD45", // accent color
    },
  };

  useEffect(() => {
    const getIpAddress = async () => {
      try {
        const response = await axios.get("https://api64.ipify.org?format=json");
        const ip = response.data.ip;
        dispatch(setIpAddress(ip));
      } catch (error) {
        dispatch(setIpAddress("Error fetching IP address"));
      }
    };

    getIpAddress();
  }, [dispatch]);

  useEffect(() => {
    if (shouldNavigateToLogin) {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: "SignInScreen" }],
      });

      const navigationRef = getNavigation();
      if (navigationRef) {
        navigationRef.dispatch(resetAction);
        dispatch(setShouldNavigateToLogin(false));
      } else {
        setTimeout(() => {
          const delayedNavigation = getNavigation();
          if (delayedNavigation) {
            delayedNavigation.dispatch(resetAction);
          }
          dispatch(setShouldNavigateToLogin(false));
        }, 500);
      }
    }
  }, [shouldNavigateToLogin, dispatch]);
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={COLORS.primary}
          barStyle="light-content"
          translucent={Platform.OS === "android"}
        />
        <PaperProvider theme={theme}>
          <MobileContainer>
            <MainNavigation />
            {isLoading && <CustomLoader modalVisible={isLoading} />}
            <SessionExpiredModal />
            <Toast />
          </MobileContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default App;
