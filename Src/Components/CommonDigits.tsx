import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Platform } from "react-native";
import CountdownTimer from "./CountdownTimer";
import {
  setMin1TargetDate,
  setMin3TargetDate,
  setMin5TargetDate,
} from "../Redux/Slice/threeDigitSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useContainerScale } from "../hooks/useContainerScale";
import { COLORS } from "../Constants/Theme";
import { AnnaPoorna, Durga } from "../../assets/assets";

interface Props {
  data: any;
  onPress3Digits: () => void;
}

const CommonDigits: React.FC<Props> = ({ data, onPress3Digits }) => {
  const { min1TargetDate, min3TargetDate, min5TargetDate } = useSelector(
    (state: RootState) => state.threeDigit
  );

  const dispatch = useDispatch();

  const handleTimerComplete = () => {
    let updatedTime = "";

    if (data.id === "1minGame") {
      updatedTime = new Date(
        new Date(min1TargetDate).getTime() + 1 * 60 * 1000
      ).toISOString();
      dispatch(setMin1TargetDate(updatedTime));
    } else if (data.id === "3minGame") {
      updatedTime = new Date(
        new Date(min3TargetDate).getTime() + 3 * 60 * 1000
      ).toISOString();
      dispatch(setMin3TargetDate(updatedTime));
    } else if (data.id === "5minGame") {
      updatedTime = new Date(
        new Date(min5TargetDate).getTime() + 5 * 60 * 1000
      ).toISOString();
      dispatch(setMin5TargetDate(updatedTime));
    }

    console.log(updatedTime, "kokokokokok");
  };

  const { Scale } = useContainerScale();
  const styles = createStyles(Scale);

  return (
    <TouchableOpacity onPress={onPress3Digits} style={styles.container}>
      <ImageBackground
        source={Durga}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
        resizeMode='stretch'
      >
        <View style={styles.timerContainer}>
          <CountdownTimer
            targetDate={data.nextResultTime}
            onComplete={handleTimerComplete}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
    // container: {
    //   margin: 5,
    //   width: Platform.OS === 'web' ? Scale(300) : '47%',
    //   height: Platform.OS === 'web' ? Scale(180) : Scale(180),
    //   overflow: "hidden",
    //   backgroundColor: 'transparent',
    //   borderWidth: 1,
    //   borderColor: 'transparent',
    // },
    container: {
  margin: 5,
  width: Platform.OS === "web" ? Scale(200) : "47%",
  maxWidth: Scale(300),
  height: Scale(180),
  overflow: "hidden",
},

 imageBackground: {
  flex: 1,
  width: "100%",
  height: "100%",
},

 imageStyle: {
  borderRadius: 10,
  width: "100%",
  height: "100%",
},

    timerContainer: {
      position: "absolute",
      bottom: Scale(6),
      right: Scale(5),
    },
  });

export default CommonDigits;
