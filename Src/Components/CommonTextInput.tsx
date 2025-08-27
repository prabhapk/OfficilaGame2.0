import {
    GestureResponderEvent,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
  } from 'react-native';
  import React, {useState} from 'react';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import Scale from './Scale';
  
  interface Props {
    isDisabled: boolean;
    value: any;
    placeholderText: string;
    errorText?: any;
    onChange: (value: any) => void;
    secureTextEntry: boolean;
    onBlur?: (value: any) => void;
    keyboardType?: any;
    maxChar?: number;
    showEyeIcon?: boolean;
    leftIcon?: React.ReactNode;
    rightButton?: React.ReactNode;
    leftText?: boolean
  }
  
  const CommonTextInput: React.FC<Props> = ({
    isDisabled,
    value,
    placeholderText,
    errorText,
    onChange,
    secureTextEntry,
    onBlur,
    keyboardType,
    maxChar,
    showEyeIcon = false,
    leftIcon,
    rightButton,
    leftText,
  }) => {
    const [isOnFocus, setIsOnFocus] = useState(false);
    const [isTextSecure, setIsTextSecure] = useState(secureTextEntry);
  
    const toggleSecureEntry = () => {
      setIsTextSecure(prev => !prev);
    };
  
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
          <View
            style={[
              styles.inputContainer,
              isOnFocus && styles.focusedBorder,
              isDisabled && styles.disabledContainer,
            ]}>
            {/* Left Icon */}
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
            {
              leftText && <Text style ={{color: 'grey', fontWeight:'bold'}}>+91 | </Text>
            }
            {/* Text Input */}
            <TextInput
              style={[
                styles.textInput,
                isDisabled && styles.disabledTextInput,
              ]}
              placeholder={placeholderText}
              placeholderTextColor="#999"
              value={value}
              onFocus={() => setIsOnFocus(true)}
              onBlur={e => {
                setIsOnFocus(false);
                onBlur?.(e);
              }}
              onChangeText={onChange}
              secureTextEntry={isTextSecure}
              editable={!isDisabled}
              keyboardType={keyboardType}
              maxLength={maxChar}
            />
  
            {/* Right Icon/Button */}
            {showEyeIcon && (
              <TouchableOpacity
                style={styles.rightIcon}
                onPress={toggleSecureEntry}>
                <Ionicons
                  name={isTextSecure ? 'eye-off' : 'eye'}
                  size={Scale(20)}
                  color="#999"
                />
              </TouchableOpacity>
            )}
  
            {rightButton && <View style={styles.rightButton}>{rightButton}</View>}
          </View>
  
          {errorText && <Text style={styles.errorText}>{errorText}</Text>}
        </KeyboardAvoidingView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginBottom: Scale(20),
      flex: 1,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: Scale(12),
      height: Scale(48),
      paddingHorizontal: Scale(10),
      width: '95%',
    },
    focusedBorder: {
      borderColor: '#4DA1FF',
    },
    textInput: {
      flex: 1,
      fontSize: Scale(14),
      color: 'black',
    },
    disabledContainer: {
      backgroundColor: '#f5f5f5',
      borderColor: '#ddd',
    },
    disabledTextInput: {
      color: '#999',
    },
    leftIcon: {
      marginRight: Scale(10),
    },
    rightIcon: {
      paddingHorizontal: Scale(8),
    },
    rightButton: {
      marginLeft: Scale(8),
    },
    errorText: {
      fontSize: Scale(12),
      marginLeft: Scale(10),
      color: 'red',
      marginTop: Scale(4),
    },
  });
  
  export default CommonTextInput;
  