import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { setValue } from '../Redux/Slice/threeDigitSlice'


const Login = () => {
    const dispatch = useDispatch()
    const navigation:any=useNavigation()
    const {value} = useSelector((state: any) => state.counter)
  return (
    <View>
      <Text>{value}</Text>

         <TouchableOpacity onPress={() =>{dispatch(setValue(5))}}>
              <Text>Login</Text>
            </TouchableOpacity>
    </View>
  )
}

export default Login