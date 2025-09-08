import React, { useEffect } from 'react';
import MainNavigation from './Navigation/mainNavigation';
import CustomLoader from './Components/Modal/CustomLoader';
import { useDispatch, useSelector } from 'react-redux';
// import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { setDeviceInfo, setIpAddress } from './Redux/Slice/signUpSlice';
import { RootState } from './Redux/store';
import Toast from 'react-native-toast-message'
import MobileContainer from './Components/MobileContainer';
import { LogBox } from 'react-native';
const App = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state: any) => state.LoaderSlice);
  const deviceInfo = useSelector(
    (state: RootState) => state.signUpSlice.deviceInfo,
  );
  LogBox.ignoreAllLogs();

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



  useEffect(() => {
    const getIpAddress = async () => {
      try {
        const response = await axios.get('https://api64.ipify.org?format=json');
        const ip = response.data.ip;
        dispatch(setIpAddress(ip));
        console.log('IP Address fetched:', ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
        dispatch(setIpAddress('Error fetching IP address'));
      }
    };

    getIpAddress();
  }, [dispatch]);
  return (
    <MobileContainer>
      <MainNavigation />
      {isLoading && (
        <CustomLoader modalVisible={isLoading} />
      )}
      <Toast />
    </MobileContainer>
  );
};

export default App;
