import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
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
import { agencyCenterLogo, AnnaPoorna, Durga } from "../../assets/assets";
import { API_BASE_URL } from "../Config/env";

interface Props {
  data: any;
  onPress3Digits: () => void;
}

const CommonDigits: React.FC<Props> = ({ data, onPress3Digits }) => {
  const { min1TargetDate, min3TargetDate, min5TargetDate } = useSelector(
    (state: RootState) => state.threeDigit,
  );
  const BASE_URL = API_BASE_URL;

  const imageSource = data?.cardImageUrl
    ? {
        uri: `${BASE_URL}${data.cardImageUrl}`,
        cache: "force-cache",
      }
    : Durga;

  const dispatch = useDispatch();

  const handleTimerComplete = () => {
    let updatedTime = "";

    if (data.id === "1minGame") {
      updatedTime = new Date(
        new Date(min1TargetDate).getTime() + 1 * 60 * 1000,
      ).toISOString();
      dispatch(setMin1TargetDate(updatedTime));
    } else if (data.id === "3minGame") {
      updatedTime = new Date(
        new Date(min3TargetDate).getTime() + 3 * 60 * 1000,
      ).toISOString();
      dispatch(setMin3TargetDate(updatedTime));
    } else if (data.id === "5minGame") {
      updatedTime = new Date(
        new Date(min5TargetDate).getTime() + 5 * 60 * 1000,
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
  source={imageSource}
  style={styles.imageBackground}
  imageStyle={styles.imageStyle}
  // resizeMode='cover'
>
        <View style={styles.timerContainer}>
          {data?.nextResultTime && (
            <CountdownTimer
              targetDate={data.nextResultTime}
              onComplete={handleTimerComplete}
            />
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
    container: {
      margin: Scale(5),
      width: Platform.OS === "web" ? Scale(200) : "47%",
      maxWidth: Scale(300),
      // fixed responsive height
      height: Scale(180),

      borderRadius: Scale(12),
      overflow: "hidden",
    },

    imageBackground: {
      width: "100%",
      height: "100%",
      justifyContent: "flex-end",
    },

    imageStyle: {
      borderRadius: Scale(12),

      // important for proper fitting
      resizeMode: 'stretch',
    },

    timerContainer: {
      width: "100%",
      alignItems: 'flex-start',
      position: "absolute",
      bottom: Scale(2),
      marginLeft: Scale(5),
    },
  });


export default CommonDigits;
