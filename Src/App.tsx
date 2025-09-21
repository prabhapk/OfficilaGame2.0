// App.js
import React, { useEffect } from "react";
import MainNavigation from "./Navigation/mainNavigation";
import CustomLoader from "./Components/Modal/CustomLoader";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setIpAddress } from "./Redux/Slice/signUpSlice";
import Toast from "react-native-toast-message";
import MobileContainer from "./Components/MobileContainer";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FreshChatProvider } from "./context/FreshChatContext";

const App = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: any) => state.LoaderSlice);
  
  LogBox.ignoreAllLogs();

  useEffect(() => {
    const getIpAddress = async () => {
      try {
        const response = await axios.get("https://api64.ipify.org?format=json");
        const ip = response.data.ip;
        dispatch(setIpAddress(ip));
        console.log("IP Address fetched:", ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
        dispatch(setIpAddress("Error fetching IP address"));
      }
    };

    getIpAddress();
  }, [dispatch]);

  return (
    <SafeAreaProvider>
      <FreshChatProvider>
        <MobileContainer>
          <MainNavigation />
          {isLoading && <CustomLoader modalVisible={isLoading} />}
          <Toast />
        </MobileContainer>
      </FreshChatProvider>
    </SafeAreaProvider>
  );
};

export default App;