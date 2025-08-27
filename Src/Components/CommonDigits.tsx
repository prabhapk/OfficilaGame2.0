import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import CountdownTimer from './CountdownTimer';
import { setMin1TargetDate, setMin3TargetDate, setMin5TargetDate } from '../Redux/Slice/threeDigitSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

interface Props {
  data: any;
  onPress3Digits: () => void;
}

const CommonDigits: React.FC<Props> = ({data, onPress3Digits}) => {
  const {min1TargetDate, min3TargetDate, min5TargetDate} = useSelector((state: RootState) => state.threeDigit);
  const dispatch = useDispatch();
  const handleTimerComplete = () => {
    let updatedTime=""
    if(data.id==="1minGame"){
     updatedTime = new Date(new Date(min1TargetDate).getTime() + 1 * 60 * 1000).toISOString();
     dispatch(setMin1TargetDate(updatedTime));
    }
    else if(data.id==="3minGame"){
     updatedTime = new Date(new Date(min3TargetDate).getTime() + 3 * 60 * 1000).toISOString();
     dispatch(setMin3TargetDate(updatedTime));
    }
    else if(data.id==="5minGame"){
    updatedTime = new Date(new Date(min5TargetDate).getTime() + 5 * 60 * 1000).toISOString();
    dispatch(setMin5TargetDate(updatedTime));
    }
   console.log(updatedTime,"kokokokokok"); // 👉 Outputs: 2025-07-03T19:00:27.123Z
   
   };
  return (
    <TouchableOpacity
    onPress={onPress3Digits}
    style={styles.container}>
      <Image source={data.bgImage} style={styles.subConatiner} />
      <View style={{margin:5}}>
        <Text style={styles.digitTitle}>{data.title}</Text>


      
      </View>
      <View style={{position:"absolute",bottom:40,left:10}}>
          <Text style={styles.digitTitle}>{'Time for Next booking'}</Text>
          <CountdownTimer
            targetDate={data.ends_On}
            onComplete={() => handleTimerComplete()}
          />
        </View>
      <View style={{position:"absolute",bottom:0}} >
      <Text style={{margin: 5}}>
        ₹{data.price}/<Text style={{color: 'grey', fontSize: 10}}>Ticket</Text>
      </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {

    margin: 5,
    width: '47%',
    borderRadius: 10,
    marginTop: 5,
    height: 180,
        backgroundColor:"white"
  },
  subConatiner: {
    
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    height:150,
    resizeMode:"stretch",
    position:"absolute"
  },
  digitTitle: {fontSize: 8, color: 'white', fontWeight: '600',},
  win_priceText: {fontSize: 16, color: 'gold', fontWeight: 'bold'},
  priceText: {fontSize: 30, color: 'white', fontWeight: 'bold', bottom: 10},
});

export default CommonDigits;
