import { View, StyleSheet } from 'react-native';
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { WebView } from 'react-native-webview';
import { verifyRechargeDeposit } from '../Redux/Slice/depositSlice';
import Toast from 'react-native-toast-message';

const PaymentScreen = ({navigation}:any) => {
  const { paymentPageURL, orderId, clientTransactionId } = useSelector(
    (state: RootState) => state.depositSlice,
  );
  const dispatch = useDispatch();

  console.log('paymentPageURL==>', paymentPageURL);

const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
const isVerifying = useRef(false);
const startPaymentVerification = () => {
  // Check every 10 seconds
  intervalRef.current = setInterval(() => {
    verifyRecharge();
  }, 10000);

  // Stop after 10 minutes
  timeoutRef.current = setTimeout(() => {
    clearInterval(intervalRef.current);

    Toast.show({
      type: "error",
      text1: "Payment timed out",
      position: "top",
    });

    navigation.replace("walletScreen");
  }, 10 * 60 * 1000);
};

const stopVerification = () => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }

  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
};

const verifyRecharge = async () => {
  if (isVerifying.current) {
    return;
  }

  isVerifying.current = true;

  try {
    const response = await dispatch(
      verifyRechargeDeposit({
        orderId,
        clientTransactionId,
      })
    ).unwrap();

    console.log("verifyRechargeResponse", response);

    if (response?.success) {
      stopVerification();

      Toast.show({
        type: "success",
        text1: response?.message || "Payment Successful",
        position: "top",
      });

      navigation.replace("walletScreen");
    }
  } catch (error) {
    console.log("verifyRecharge error", error);
  } finally {
    isVerifying.current = false;
  }
};
useEffect(() => {
  startPaymentVerification();

  return () => {
    stopVerification();
  };
}, []);


  return (
    <View style={styles.container}>
      {paymentPageURL && (
        <WebView
          source={{ uri: paymentPageURL }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          useWebKit={true}
          startInLoadingState={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default PaymentScreen;