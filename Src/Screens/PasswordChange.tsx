import { View, Text, GestureResponderEvent, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import CustomHeaderRegister from '../Components/CustomHeaderRegister'
import { backGround1, leftArrowHeader } from '../../assets/assets'
import CommonTextInput from '../Components/CommonTextInput'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useContainerScale } from '../hooks/useContainerScale';

const PasswordChange = ({navigation}: any) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [otp, setOtp] = React.useState('');
  return (
    <View style={styles.container}>
         <ImageBackground
      source={backGround1}
      style={styles.container}
      > 
     <CustomHeaderRegister
     leftIconPress={() => navigation.goBack()}
      rightIconPress={()=>navigation.navigate('SignUpScreen')}
      leftIcon={leftArrowHeader}
      centerText={'Set Password'}
      />
      <View style ={styles.container1}>
      <CommonTextInput
            placeholderText="Enter Password (6-15)"
            value={password}
            onChange={setPassword}
            isDisabled={false}
            secureTextEntry
            showEyeIcon
            leftIcon={
              <Ionicons name="lock-closed-outline" size={Scale(18)} color="#999" />
            }
          />
      </View>
      <View style ={styles.container2}>
      <CommonTextInput
            placeholderText="Enter Confirm Password (6-15)"
            value={password}
            onChange={setPassword}
            isDisabled={false}
            secureTextEntry
            showEyeIcon
            leftIcon={
              <Ionicons name="lock-closed-outline" size={Scale(18)} color="#999" />
            }
          />
      </View>
      <View style ={styles.container3}>
          <CommonTextInput
            placeholderText="Enter OTP"
            value={otp}
            onChange={setOtp}
            isDisabled={false}
            secureTextEntry={false}
            keyboardType="numeric"
            leftIcon={
              <Ionicons name="keypad-outline" size={Scale(18)} color="#999" />
            }
            rightButton={
              <TouchableOpacity>
                <Text style={{ color: '#4DA1FF', fontWeight: 'bold' }}>GET OTP</Text>
              </TouchableOpacity>
            }
          />
          </View>
          <View style ={styles.container4}>
          <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Confirm</Text>
      </TouchableOpacity>
          </View>
          </ImageBackground>
    </View>
  )
}
const createStyles = (Scale: any) =>
  StyleSheet.create({
    signInButton: {
        marginTop: Scale(20),
        marginHorizontal: Scale(20),
        backgroundColor: '#78a18a',
        paddingVertical: Scale(14),
        borderRadius: Scale(25),
        alignItems: 'center',
      },
      signInButtonText: {
        color: '#fff',
        fontSize: Scale(16),
        fontWeight: 'bold',
      },
      container: {flex: 1},
      container1: {
        marginTop: Scale(20), 
        marginHorizontal: Scale(20)
      },
      container2: {
        marginTop: Scale(50), 
        marginHorizontal: Scale(20)
      },
      container3: {
        marginTop: Scale(50),
         marginHorizontal: Scale(20)
        },
        container4: {
          marginTop: Scale(50), 
          marginHorizontal: Scale(20)
        },

    })
export default PasswordChange