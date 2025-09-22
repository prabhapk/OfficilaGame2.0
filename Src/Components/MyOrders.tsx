import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Scale from "./Scale"; // adjust path
import CommonBall from "./CommonBall"; // adjust path
import TableCommonBall from "./TableCommonBall"; // adjust path
import { COLORS } from "../Constants/Theme";
import { useContainerScale } from "../hooks/useContainerScale";
import { ImageBackground } from "expo-image";
import { copyImage, myOrdersWinLabel, winLabel } from "../../assets/assets";
import { LinearGradient } from "expo-linear-gradient";

type BetData = {
  type: string;
  value: string | number;
  payment: string | number;
  result: string;
};

type MyBetsCardProps = {
  headers: string[];
  myBetsTableData: BetData[];
  id: string;
  bettingTime: string;
  paymentAmount: string | number;
  drawTime: string;
  topBalls: { text: string; color: string }[];
  bottomBalls: { text: string; color: string }[];
  date: string;
  status: string;
  imageSource: any; // require(...) or { uri: string }
};

const MyOrders: React.FC<MyBetsCardProps> = ({
  headers,
  myBetsTableData,
  id,
  bettingTime,
  paymentAmount,
  drawTime,
  topBalls,
  bottomBalls,
  date,
  status,
  imageSource,
}) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  return (
    <View style={styles.cardContainer}>
      <Text
        style={{
          color: "white",
          fontSize: Scale(18),
          fontWeight: "bold",
          marginTop: Scale(20),
          marginHorizontal: Scale(20),
        }}
      >
        Draw Results:
      </Text>
      {/* Top Balls */}
      <View style={styles.ballsRow}>
        {topBalls.map((ball, idx) => (
          <CommonBall
            key={idx}
            backgroundColor={ball.color}
            innerText={ball.text}
            borderColor={ball.color}
          />
        ))}
        <Text style={styles.equalSign}>=</Text>
        {bottomBalls.map((ball, idx) => (
          <CommonBall
            key={idx}
            backgroundColor={ball.color}
            innerText={ball.text}
            borderColor={ball.color}
          />
        ))}
      </View>

      <View style={styles.dashedDivider} />
      {/* Details */}
      <View style={styles.detailsContainer}>
        <View>
          <ImageBackground
            source={myOrdersWinLabel}
            style={{
              marginVertical: Scale(10),
              height: Scale(35),
              marginHorizontal: Scale(10),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: Scale(16),
                  fontWeight: "bold",
                  color: "white",
                  marginLeft: Scale(110),
                  marginVertical: Scale(5),
                }}
              >
                ID PK269331509072321
              </Text>
              <Image
                source={copyImage}
                style={{
                  width: Scale(20),
                  height: Scale(20),
                  marginLeft: Scale(10),
                  marginTop: Scale(5),
                }}
              />
            </View>
          </ImageBackground>
        </View>
        <View>
          <LinearGradient
            colors={["#844d4d", "#825q4d"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderBottomLeftRadius: 10,
              paddingHorizontal: 10,
              height: 30,
              bottom: 10,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginHorizontal: 15,
              marginTop: 10,
              borderTopRightRadius: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: Scale(16),
                  fontWeight: "bold",
                  color: "white",
                  marginLeft: Scale(10),
                  marginVertical: Scale(5),
                }}
              >
                NO WON
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: Scale(16),
                  fontWeight: "bold",
                  color: "white",
                  marginLeft: Scale(20),
                  marginVertical: Scale(5),
                }}
              >
                ID PK269331509072321
              </Text>
              <Image
                source={copyImage}
                style={{
                  width: Scale(20),
                  height: Scale(20),
                  marginLeft: Scale(10),
                  marginTop: Scale(5),
                }}
              />
            </View>
          </LinearGradient>
        </View>
        <View style={styles.detailsSubHeader}>
          <View>
            <Text style={styles.detailText}>Dear Lottery</Text>
            {/* <Text style={[styles.detailText1,{flexWrap:"wrap"}]}>Draw time:{bettingTime}</Text> */}
            <Text style={[styles.detailText1, { flexWrap: "wrap" }]}>
              Draw time: 09-09 01:00 PM
            </Text>
          </View>
          <View>
            <Text style={styles.paymentAmount}>Payment</Text>
            <Text style={styles.paymentAmount1}>₹ {paymentAmount}</Text>
          </View>
        </View>

        <View style={{ marginTop: Scale(10), marginBottom: Scale(5) }}>
          <ImageBackground
            source={winLabel}
            style={{
              width: "100%",
              height: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
            contentFit="fill"
          >
            <Text
              style={{
                color: "white",
                fontSize: Scale(14),
                fontWeight: "bold",
                textAlign: "center",
                paddingHorizontal: Scale(30),
              }}
            >
              Congratulations! You won the game lottery and claim your winning
              amount ₹100
            </Text>
          </ImageBackground>
          <Text style={styles.footerText}>
            Sorry, your guess is wrong, Try next time
          </Text>
        </View>
        <View style={styles.newDivider} />
        <View style={styles.dateStatusRow}>
          <Text style={styles.myBetsTitle}>MY BETS</Text>
          <Text style={styles.dateText}>07-09-2025 02:00 AM</Text>
        </View>

        {/* <Text style={styles.myBetsTitle}>MY BETS</Text> */}

        {/* Table */}
        <View style={{ backgroundColor: "#812B2B" }}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={{ flexDirection: "row" }}>
              {headers.map((head) => {
                let color =
                  head === "A"
                    ? "#DE3C3F"
                    : head === "B"
                    ? "#EC8204"
                    : "#066FEA";
                return (
                  <TableCommonBall
                    key={head}
                    backgroundColor={color}
                    innerText={head}
                    borderColor={color}
                  />
                );
              })}
            </View>
            <Text style={styles.tableHeaderText}>Payment</Text>
            <Text style={[styles.tableHeaderText, { marginRight: 10 }]}>
              Result
            </Text>
          </View>

          {/* Table Rows */}
          {headers.map((rowHead, rowIndex) => {
            const isEvenRow = rowIndex % 2 === 0;
            const rowBgColor = isEvenRow ? "#550011" : "#812B2B";

            return (
              <View
                key={rowHead}
                style={[styles.tableRow, { backgroundColor: rowBgColor }]}
              >
                {/* Row Balls */}
                <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                  {headers.map((colHead) => {
                    let color =
                      colHead === "A"
                        ? "#DE3C3F"
                        : colHead === "B"
                        ? "#EC8204"
                        : "#066FEA";
                    const value =
                      myBetsTableData.find((item) => item.type === rowHead)
                        ?.value || "-";

                    if (colHead === rowHead) {
                      return (
                        <TableCommonBall
                          key={colHead}
                          backgroundColor={color}
                          innerText={String(value)}
                          borderColor={color}
                        />
                      );
                    } else {
                      return (
                        <TableCommonBall
                          key={colHead}
                          backgroundColor={"#BFBFBF"}
                          innerText={"-"}
                          borderColor={"#BFBFBF"}
                        />
                      );
                    }
                  })}
                </View>

                {/* Payment */}
                <Text style={{ color: COLORS.white }}>
                  {myBetsTableData.find((item) => item.type === rowHead)
                    ? `₹${
                        myBetsTableData.find((item) => item.type === rowHead)
                          ?.payment
                      }`
                    : "-"}
                </Text>

                {/* Result */}
                <Text style={{ color: COLORS.white, marginRight: 30 }}>
                  {myBetsTableData.find((item) => item.type === rowHead)
                    ?.result || "-"}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
    cardContainer: {
      marginTop: Scale(10),
      // marginHorizontal: Scale(10),
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: "#4F0001",
    },
    headerRow: { flexDirection: "row", padding: 10 },
    title: { fontWeight: "bold", fontSize: 22, color: "white" },
    subtitle: { fontSize: 16, color: "white" },
    ballsRow: {
      marginTop: Scale(10),
      marginHorizontal: Scale(20),
      borderTopLeftRadius: 20,
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
      // backgroundColor: "#630800",
      padding: 10,
    },
    equalSign: { fontSize: 20, color: "white", marginHorizontal: 10 },
    detailsContainer: {
      marginTop: Scale(10),
      // borderTopLeftRadius: 30,
      // borderTopRightRadius: 30,
      backgroundColor: "#4F0001",
    },
    detailsHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      marginHorizontal: 10,
      marginTop: 10,
    },
    detailText: { fontSize: 18, color: "white", fontWeight: "bold" },
    detailText1: {
      fontSize: 16,
      color: "white",
      fontWeight: "bold",
      marginVertical: Scale(5),
    },
    detailsSubHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 20,
      marginTop: Scale(10),
    },
    paymentAmount: { fontSize: 16, color: "white", fontWeight: "bold" },
    paymentAmount1: {
      fontSize: 18,
      color: "white",
      fontWeight: "bold",
      marginVertical: Scale(5),
    },
    dashedDivider: {
      borderWidth: 1,
      borderColor: "#DE3C3F",
      marginTop: 20,
      borderStyle: "dashed",
    },
    newDivider: {
      borderWidth: 0.5,
      borderColor: "#DE3C3F",
      marginTop: 10,
    },
    dateStatusRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 10,
      marginTop: 10,
    },
    dateText: { fontSize: Scale(16), color: "white", fontWeight: "bold" },
    myBetsTitle: {
      fontSize: Scale(20),
      color: "white",
      fontWeight: "bold",
      // marginHorizontal: 10,
      marginVertical: 10,
    },
    tableHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: Scale(5),
      marginHorizontal: 10,
    },
    tableHeaderText: { color: COLORS.white, fontWeight: "bold" },
    tableRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Scale(5),
      justifyContent: "space-between",
    },
    footerText: {
      textAlign: "center",
      fontSize: 16,
      color: "white",
      marginVertical: 30,
    },
  });

export default MyOrders;
