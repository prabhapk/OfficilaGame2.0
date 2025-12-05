import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import CommonBall from "./CommonBall"; // adjust path
import TableCommonBall from "./TableCommonBall"; // adjust path
import { COLORS } from "../Constants/Theme";
import { useContainerScale } from "../hooks/useContainerScale";
import { ImageBackground } from "expo-image";
import { copyImage, myOrdersWinLabel, winLabel } from "../../assets/assets";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";

type BetData = {
  type: string;
  value: string | number;
  payment: number; // per-bet unit or already-calculated amount
  result: string;
  totalAmount?: number; // optional total for that bet
  betCount?: number; // optional times for this bet
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
  winOrLossId: string;
  gameName: string;
  totalWinningAmount: number;
};

const MyBets3DigitsCard: React.FC<MyBetsCardProps> = ({
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
  winOrLossId,
  gameName,
  totalWinningAmount,
}) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  const getRowAmount = (bet: BetData) => {
    if (bet.totalAmount !== undefined && !isNaN(Number(bet.totalAmount))) {
      return Number(bet.totalAmount);
    }
    const count = bet.betCount !== undefined ? Number(bet.betCount) : 1;
    return Number(bet.payment || 0) * count;
  };

  const orderTotal =
    typeof paymentAmount === "number"
      ? Number(paymentAmount)
      : myBetsTableData.reduce((s, b) => s + getRowAmount(b), 0);
  return (
    <View style={styles.cardContainer}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.drawResultsTitle}>Draw Results:</Text>

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

        {status === "To Be Drawn" && (
          <LinearGradient
            colors={[COLORS.linearOne, COLORS.linearTwo]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.toBeDrawnStatusContainer}
          >
            <Text style={styles.statusLabelText}>TO BE DRAWN</Text>
            <Text style={styles.statusIdText}>{winOrLossId}</Text>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setStringAsync(winOrLossId);
                Alert.alert("Copied!", "ID copied to clipboard");
              }}
            >
              <Image source={copyImage} style={styles.copyIcon} />
            </TouchableOpacity>
          </LinearGradient>
        )}

        {status === "No Won" && (
          <LinearGradient
            colors={[COLORS.linearOne, COLORS.linearTwo]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.noWonStatusContainer}
          >
            <Text style={styles.statusLabelText}>NO WON</Text>
            <Text style={styles.statusIdText}>{winOrLossId}</Text>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setStringAsync(winOrLossId);
                Alert.alert("Copied!", "ID copied to clipboard");
              }}
            >
              <Image source={copyImage} style={styles.copyIcon} />
            </TouchableOpacity>
          </LinearGradient>
        )}

        {/* Game Details */}
        <View style={styles.gameDetailsSection}>
          <View style={styles.detailsSubHeader}>
            <View>
              <Text style={styles.detailText}>{gameName || "AvisGaming"}</Text>
              <Text style={[styles.detailText1, { flexWrap: "wrap" }]}>
                Draw time: {drawTime || "-"}
              </Text>
            </View>
            <View>
              <Text style={styles.paymentAmount}>Payment</Text>
              <Text style={styles.paymentAmount1}>
                ₹{" "}
                {myBetsTableData
                  .reduce((sum, bet) => {
                    const rowTotal = (bet?.betCount ?? 1) * (bet?.payment ?? 0);
                    return sum + rowTotal;
                  }, 0)
                  .toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.dashedDivider} />

        {/* My Bets Section */}
        <View style={styles.myBetsSection}>
          <View style={styles.dateStatusRow}>
            <Text style={styles.myBetsTitle}>MY BETS</Text>
            <Text style={styles.dateText}>{bettingTime}</Text>
          </View>

          {/* Table */}
          <View style={{ backgroundColor: COLORS.tableTopColor }}>
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
            {myBetsTableData.map((bet, rowIndex) => {
              const isEvenRow = rowIndex % 2 === 0;
              const rowBgColor = isEvenRow ? COLORS.tableSecondaryColor  : COLORS.tableTopColor;

              const totalPaymentAmount = bet?.betCount * bet?.payment;

              return (
                <View
                  key={`${bet.type}-${rowIndex}`}
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

                      const digits = String(bet.value).split("");
                      let showDigit = "-";

                      if (bet.type.length === digits.length) {
                        const pos = bet.type.indexOf(colHead);
                        if (pos !== -1) showDigit = digits[pos] || "-";
                      } else if (bet.type.includes(colHead)) {
                        showDigit = digits[0] || "-";
                      }

                      return (
                        <TableCommonBall
                          key={colHead}
                          backgroundColor={
                            showDigit !== "-" ? color : "#BFBFBF"
                          }
                          innerText={showDigit}
                          borderColor={showDigit !== "-" ? color : "#BFBFBF"}
                        />
                      );
                    })}
                  </View>

                  {/* Payment */}
                  <Text style={{ color: COLORS.white }}>
                    ₹{totalPaymentAmount.toFixed(2)}
                  </Text>

                  {/* Result */}
                  <Text style={{ color: COLORS.white, marginRight: 20 }}>
                    {status}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* Status Section - Moved to Bottom */}
      <View style={styles.statusSection}>
        {/* Status Label Section */}
        {status === "Won" && (
          <ImageBackground
            source={myOrdersWinLabel}
            style={styles.wonStatusContainer}
          >
            <View style={styles.statusContent}>
              <Text style={styles.statusIdText}>{winOrLossId}</Text>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setStringAsync(winOrLossId);
                  Alert.alert("Copied!", "ID copied to clipboard");
                }}
              >
                <Image source={copyImage} style={styles.copyIcon} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}

        {/* Footer Message */}
        <View style={styles.footerMessageContainer}>
          {status === "Won" && (
            <ImageBackground
              source={winLabel}
              style={styles.winMessageContainer}
              contentFit="fill"
            >
              <Text style={styles.winMessageText}>
                Congratulations! You won the game lottery and claim your winning
                amount ₹{totalWinningAmount}
              </Text>
            </ImageBackground>
          )}
          {status === "No Won" && (
            <Text style={styles.footerText}>
              Sorry, your guess is wrong, Try next time
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
    cardContainer: {
      marginTop: Scale(10),
      marginHorizontal: Scale(10),
      borderRadius: 10,
      backgroundColor: "#DC2626", // Red background
      overflow: "hidden",
    },
    headerSection: {
      backgroundColor: COLORS.gameDetailColor,
    },
    drawResultsTitle: {
      color: "white",
      fontSize: Scale(18),
      fontWeight: "bold",
      marginTop: Scale(20),
      marginHorizontal: Scale(20),
    },
    ballsRow: {
      marginTop: Scale(10),
      marginHorizontal: Scale(20),
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
    },
    equalSign: { fontSize: 20, color: "white", marginHorizontal: 10 },
    gameDetailsSection: {
      marginTop: Scale(10),
    },
    detailsSubHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 20,
      marginTop: Scale(10),
    },
    detailText: { fontSize: 18, color: "white", fontWeight: "bold" },
    detailText1: {
      fontSize: 16,
      color: "white",
      fontWeight: "bold",
      marginVertical: Scale(5),
      width: Scale(200),
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
      borderColor: "#fff",
      marginTop: 20,
      borderStyle: "dashed",
    },
    myBetsSection: {
      backgroundColor:COLORS.gameDetailColor,
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
    // Status Section Styles
    statusSection: {
      backgroundColor: COLORS.gameDetailColor,
      paddingBottom: Scale(10),
    },
    wonStatusContainer: {
      marginVertical: Scale(10),
      height: Scale(35),
      marginHorizontal: Scale(10),
    },
    statusContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
    },
    noWonStatusContainer: {
      borderBottomLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingHorizontal: 10,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      marginHorizontal: 15,
      marginTop: 10,
    },
    toBeDrawnStatusContainer: {
      borderBottomLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingHorizontal: 10,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      marginHorizontal: 15,
      marginTop: 10,
    },
    statusLabelText: {
      fontSize: Scale(16),
      fontWeight: "bold",
      color: "white",
      marginLeft: Scale(10),
      marginVertical: Scale(5),
    },
    statusIdText: {
      fontSize: Scale(16),
      fontWeight: "bold",
      color: "white",
      marginLeft: Scale(20),
      marginVertical: Scale(5),
    },
    copyIcon: {
      width: Scale(20),
      height: Scale(20),
      marginLeft: Scale(10),
      marginTop: Scale(5),
    },
    footerMessageContainer: {
      marginTop: Scale(10),
      marginBottom: Scale(5),
    },
    winMessageContainer: {
      width: "100%",
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
    winMessageText: {
      color: "white",
      fontSize: Scale(14),
      fontWeight: "bold",
      textAlign: "center",
      paddingHorizontal: Scale(30),
    },
    footerText: {
      textAlign: "center",
      fontSize: 16,
      color: "white",
      marginVertical: 30,
    },
  });

export default MyBets3DigitsCard;
