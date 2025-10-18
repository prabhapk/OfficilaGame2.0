import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import { useContainerScale } from '../hooks/useContainerScale';
  interface Props {
    isDisabled: boolean;
    value: any;
    placeholderText: string;
    onChange: (value: any) => void;
    onBlur?: () => void;
    keyboardType: any;
    maxChar?: number;
  }
  
  const SingleIntegerTextInput: React.FC<Props> = ({
    isDisabled,
    value,
    placeholderText,
    onChange,
    onBlur,
    keyboardType,
    maxChar,
  }) => {
    const [isOnFocus, setIsOnFocus] = useState(false);
    const { Scale, verticalScale } = useContainerScale();
    const styles = createStyles(Scale);
  
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={styles.container}>
        <View
          style={[
            styles.inputContainer,
            isOnFocus && styles.focusedContainer,
            isDisabled && styles.disabledContainer,
          ]}>
          <TextInput
            style={[styles.textInput, isDisabled && styles.disabledTextInput]}
            placeholderTextColor="#fff"
            value={value}
            placeholder={placeholderText}
            onBlur={() => {
              setIsOnFocus(false);
              onBlur && onBlur(); // Ensure it doesn't throw an error if onBlur is undefined
            }}
            
            onChangeText={onChange}
            editable={!isDisabled}
            keyboardType={keyboardType}
            maxLength={maxChar}
            textAlign="center" // Ensures the text always starts from center
            textAlignVertical="center" // Ensures text remains vertically centered
            allowFontScaling={false} // Prevents resizing that can cause misalignment
          />
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  const createStyles = (Scale: any) =>
    StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    inputContainer: {
      backgroundColor: 'transparent',
      borderColor: '#fff',
      borderWidth: Scale(2),
      borderRadius: Scale(4),
      height: Scale(35),
      width: Scale(35),
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: Scale(2),
    },
    textInput: {
      fontSize: Scale(16),
      fontWeight: 'bold',
      color: 'white',
      height: Scale(40),
      textAlign: 'center',
      textAlignVertical: 'center',
      paddingHorizontal: 0, // Ensures text does not shift
      // width:Scale(40),
      outlineWidth: 0,
    },
    focusedContainer: {
      borderColor: '#5c4280',
      backgroundColor: '#f7f3fc',
    },
    disabledContainer: {
      backgroundColor: '#f0f0f0',
      borderColor: '#d0d0d0',
    },
    disabledTextInput: {
      color: '#000',
      opacity: 0.6,
    },
  });
  
  export default SingleIntegerTextInput;
  