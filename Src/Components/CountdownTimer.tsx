import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

interface CountdownTimerProps {
  targetDate?: string;
  onComplete?: () => void;
  onThirtySecondsLeft?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  onComplete,
  onThirtySecondsLeft,
}) => {
  const isFocused = useIsFocused();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const targetDateTime = new Date(targetDate).getTime();
    console.log("targetDateTime1212",targetDateTime, targetDate, now);
    const difference = targetDateTime - now;

    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return { hours, minutes, seconds };
    } else {
      return { hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [alertTriggered, setAlertTriggered] = useState(false);

  useEffect(() => {
    if (!isFocused) return;
console.log("targetDatetargetDate");

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
console.log("newTimeLeftqwqwq",newTimeLeft);
const now = new Date().toISOString(); // returns ISO 8601 with milliseconds and 'Z'
console.log(now,newTimeLeft);
console.log(now,"newTimeLeft");

      if (!alertTriggered && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 30) {
        setAlertTriggered(true);
        onThirtySecondsLeft?.();
      }

      if (
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isFocused]);

  useEffect(() => {
    setAlertTriggered(false);
  }, [targetDate]);

  const hourString = String(timeLeft.hours).padStart(2, "0");
  const minuteString = String(timeLeft.minutes).padStart(2, "0");
  const secondString = String(timeLeft.seconds).padStart(2, "0");

  return (
    <View style={styles.container}>
      <View style={styles.timerBlock}>
        <Text style={styles.timerText}>{hourString[0]}</Text>
        <Text style={styles.timerText}>{hourString[1]}</Text>
      </View>
      <Text style={styles.separator}>:</Text>
      <View style={styles.timerBlock}>
        <Text style={styles.timerText}>{minuteString[0]}</Text>
        <Text style={styles.timerText}>{minuteString[1]}</Text>
      </View>
      <Text style={styles.separator}>:</Text>
      <View style={styles.timerBlock}>
        <Text style={styles.timerText}>{secondString[0]}</Text>
        <Text style={styles.timerText}>{secondString[1]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 5,
  },
  timerBlock: {
    backgroundColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
    flexDirection: "row",
  },
  timerText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  separator: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});

export default CountdownTimer;
