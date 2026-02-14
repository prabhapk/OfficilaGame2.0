import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
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
  const baseURL = "http://8.148.148.185";
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);

  return (
    <TouchableOpacity onPress={onPress3Digits} style={styles.container}>
      <Image
        source={{
          uri: baseURL + data.cardImageUrl,
        }}
        style={styles.subConatiner}
      />
      <View style={{ margin: 5 }}>
        <Text style={styles.digitTitle}>{data.name}</Text>
      </View>
      <Text style={styles.win_priceText}>WIN ₹{data.prizeAmount}</Text>
      <View style={{ position: "absolute", bottom: 40, left: 10 }}>
        <Text style={styles.digitTitle}>{"Time for Next booking"}</Text>
        <CountdownTimer
          targetDate={data.nextResultTime}
          onComplete={() => handleTimerComplete()}
        />
      </View>
      <View style={{ position: "absolute", bottom: 0 }}>
        <Text style={{ margin: 5, color: COLORS.gameTileTitle, fontSize: 12 }}>
          ₹{data.ticketPrice}
          {" / "}
          <Text style={{ color: COLORS.gameTileSubtext, fontSize: 10, }}>Ticket</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
    container: {
      margin: 5,
      width: Scale(190),
      borderRadius: 10,
      marginTop: 5,
      height: 180,
      backgroundColor: COLORS.gameTileBg,
      borderWidth: 1,
      borderColor: COLORS.gameTileBorder,
    },
    subConatiner: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      width: "100%",
      height: 150,
      resizeMode: "stretch",
      position: "absolute",
    },
    digitTitle: {
      fontSize: 12,
      color: COLORS.gameTileTitle,
      fontWeight: "600",
    },
    win_priceText: {
      marginLeft: 15,
      fontSize: 16,
      color: COLORS.gameTilePrice,
      fontWeight: "bold",
    },
    priceText: {
      fontSize: 30,
      color: COLORS.sectionHeaderText,
      fontWeight: "bold",
      bottom: 10,
    },
  });

export default CommonDigits;
