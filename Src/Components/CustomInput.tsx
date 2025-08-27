import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
  required?: boolean;
  error?: string;
  showSendButton?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  required,
  error,
  showSendButton = false,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {required && <Text style={styles.required}>* </Text>}
        {label}
      </Text>
      <TextInput
        style={[styles.input, error && styles.errorBorder]}
        placeholderTextColor="#aaa"
        {...props}
      />
      {showSendButton && (
        <TouchableOpacity onPress={()=>{Alert.alert('Send')}}
          style={{ position: 'absolute', right: 10, top: 10, padding: 8 }}
        >
          <Text
            style={{ color: '#e43d3dff', fontSize: 16, fontWeight: 'bold' }}
          >
            Send
          </Text>
        </TouchableOpacity>
      )}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    backgroundColor: '#2a0000',
    padding: 8,
  },
  label: {
    color: '#fff',
    fontSize: 14,
  },
  required: {
    color: 'red',
  },
  input: {
    fontSize: 14,
    color: '#fff',
    // dark input bg
    borderRadius: 8,
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default CustomInput;
