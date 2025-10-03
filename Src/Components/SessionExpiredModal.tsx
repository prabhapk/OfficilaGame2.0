import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { scale } from 'react-native-size-matters';
import { setSessionExpiredVisible, setShouldNavigateToLogin } from '../Redux/Slice/commonSlice';
import { logoutUser } from '../Redux/Slice/signInSlice';
import { resetState } from '../Redux/store';

const SessionExpiredModal: React.FC = () => {
  const dispatch = useDispatch();
  const {sessionExpiredVisible} = useSelector((state:any)=>state.commonSlice);
  
  // Debug logging
  console.log('🚨 SessionExpiredModal render: sessionExpiredVisible =', sessionExpiredVisible);
  console.log('🚨 SessionExpiredModal render: Full commonSlice state =', useSelector((state:any)=>state.commonSlice));
  
  const handleLogin = () => {
    console.log('SessionExpiredModal: handleLogin called');
    
    // Hide the modal first
    dispatch(setSessionExpiredVisible(false));
    
    // Clear all user data and tokens
    dispatch(logoutUser());
    
    // Clear all persisted Redux state (including AsyncStorage)
    dispatch(resetState());
    
    // Trigger navigation to login screen
    dispatch(setShouldNavigateToLogin(true));
    
    console.log('SessionExpiredModal: Dispatched logout, state reset, and navigation action');
  };
console.log('setSessionExpiredVisibleasasasas, and navigation action', sessionExpiredVisible)
  if (!sessionExpiredVisible) {
    return null; // Don't render anything if not visible
  }

  return (
    <Modal
      isVisible={true}  
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropColor="rgba(0, 0, 0, 0.5)"
      backdropOpacity={0.5}
      onBackdropPress={handleLogin}
      style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Session Expired</Text>
          <Text style={styles.message}>
            Your session has expired. Please login again to continue.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: scale(12),
    marginHorizontal: scale(20),
    minWidth: scale(280),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    padding: scale(24),
    alignItems: 'center',
  },
  title: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: scale(12),
    textAlign: 'center',
  },
  message: {
    fontSize: scale(14),
    color: '#666',
    textAlign: 'center',
    lineHeight: scale(20),
    marginBottom: scale(24),
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: scale(32),
    paddingVertical: scale(12),
    borderRadius: scale(8),
    minWidth: scale(120),
  },
  buttonText: {
    color: 'white',
    fontSize: scale(16),
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SessionExpiredModal;


