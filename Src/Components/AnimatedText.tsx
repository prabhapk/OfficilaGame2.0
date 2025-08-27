import { View, Text,   Animated, Easing, Dimensions  } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Scale from './Scale';

 interface  Props {
    runningText: string;
}

const AnimatedText: React.FC<Props> = ({runningText}) => {
    const translateX = useRef(new Animated.Value(Dimensions.get('window').width)).current;
const screenWidth = Dimensions.get('window').width;
useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(translateX, {
          toValue: -screenWidth * 2, // Move beyond the screen width for smooth looping
          duration: 10000, // Adjust speed (higher = slower)
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };
  
    startAnimation();
  }, [translateX]);
  return (
    <View>
         <View style= {{flexDirection: 'row',  backgroundColor: '#FFE5A3', marginBottom: 20, overflow: 'hidden', paddingVertical: 10}}>
            <View style={{ zIndex: 1 }}>
            <Ionicons
                name={'notifications'}
                size={Scale(18)}
                color={'black'}
                style={{marginLeft: Scale(10), marginTop: Scale(5)}}
              />
            </View>
            <Animated.Text 
        style={{
          color: 'black',
          marginLeft: 5,
          textAlign: 'center',
          marginVertical: 5,
          transform: [{ translateX }],
          // whiteSpace: 'nowrap',
        }}
      >
        {/* Tickets will not be available for 3 mins before the draw */}
       { runningText}
      </Animated.Text>
          </View>
    </View>
  )
}

export default AnimatedText