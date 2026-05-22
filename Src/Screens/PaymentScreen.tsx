import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { WebView } from 'react-native-webview';

const PaymentScreen = () => {
  const { paymentPageURL } = useSelector(
    (state: RootState) => state.depositSlice,
  );

  console.log('paymentPageURL==>', paymentPageURL);

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