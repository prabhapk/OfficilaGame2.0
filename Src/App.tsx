import React, { useEffect } from 'react';
import MainNavigation from './Navigation/mainNavigation';
import CustomLoader from './Components/Modal/CustomLoader';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { setDeviceInfo, setIpAddress } from './Redux/Slice/signUpSlice';
import { RootState } from './Redux/store';
import Toast from 'react-native-toast-message';
import MobileContainer from './Components/MobileContainer';

const App = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state: RootState) => state.LoaderSlice);
  const deviceInfo = useSelector(
    (state: RootState) => state.signUpSlice.deviceInfo,
  );

  // Fetch device info
  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const deviceId = DeviceInfo.getDeviceId();
        const brand = DeviceInfo.getBrand();
        const model = DeviceInfo.getModel();

        const info = { deviceId, brand, model };
        console.log('Fetched Device Info:', info);

        // Save to Redux
        dispatch(setDeviceInfo(info));
      } catch (error) {
        console.error('Error fetching device info:', error);
      }
    };

    fetchDeviceInfo();
  }, [dispatch]);

  // Log Redux state when updated
  useEffect(() => {
    if (!deviceInfo.deviceId) {
      console.log("Device info not ready yet");
    } else {
      console.log("Device info ready:", deviceInfo);
    }
  }, [deviceInfo]);

  // Fetch IP
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
      {isLoading && <CustomLoader modalVisible={isLoading} />}
      <Toast />
  </MobileContainer>
  );
};

export default App;
