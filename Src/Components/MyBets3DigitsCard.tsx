import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CommonBall from "./CommonBall"; // adjust path
import TableCommonBall from "./TableCommonBall"; // adjust path
import { COLORS } from "../Constants/Theme";
import { useContainerScale } from '../hooks/useContainerScale';
import { ImageBackground } from "expo-image";
import { winLabel } from "../../assets/assets";

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
    imageSource
}) => {
    const { Scale, verticalScale } = useContainerScale();
    const styles = createStyles(Scale);
    return (
        <View style={styles.cardContainer}>
            {/* Header with Image */}
            <View style={styles.headerRow}>
                <Image source={imageSource} style={{ width: 50, height: 50 }} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.title}>3 digits</Text>
                    <Text style={styles.subtitle}>Draw Time : {drawTime}</Text>
                </View>
            </View>

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

            {/* Details */}
            <View style={styles.detailsContainer}>
                <View style={styles.detailsHeader}>
                    <Text style={styles.detailText}>ID : {id}</Text>
                    <Text style={styles.detailText}>Payment</Text>
                </View>
                <View style={styles.detailsSubHeader}>
                    <Text style={[styles.detailText,{flexWrap:"wrap"}]}>Betting Time :{"\n"}{bettingTime}</Text>
                    <Text style={styles.paymentAmount}>₹ {paymentAmount}</Text>
                </View>

                <View style={styles.dashedDivider} />
                <View style={styles.dateStatusRow}>
                    <Text style={styles.dateText}>{date}</Text>
                    <Text style={styles.dateText}>{status}</Text>
                </View>

                <Text style={styles.myBetsTitle}>MY BETS</Text>

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
                                <View style={{ flexDirection: "row" }}>
                                    {headers.map((colHead) => {
                                        let color =
                                            colHead === "A"
                                                ? "#DE3C3F"
                                                : colHead === "B"
                                                    ? "#EC8204"
                                                    : "#066FEA";
                                        const value =
                                            myBetsTableData.find(
                                                (item) => item.type === rowHead
                                            )?.value || "-";

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
                                <Text style={{ color: COLORS.white,  }}>
                                    {myBetsTableData.find((item) => item.type === rowHead)
                                        ? `₹${myBetsTableData.find((item) => item.type === rowHead)?.payment}`
                                        : "-"}
                                </Text>

                                {/* Result */}
                                <Text style={{ color: COLORS.white, marginRight: 10 }}>
                                    {myBetsTableData.find((item) => item.type === rowHead)
                                        ?.result || "-"}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                <Text style={styles.footerText}>
                    Sorry, your guess is wrong, Try next time
                </Text>
                <View style={{ marginTop: Scale(5), marginBottom: Scale(10) }}>
  <ImageBackground
    source={winLabel}
    style={{
      width: '100%',
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    contentFit='fill'
  >
    <Text
      style={{
        color: 'white',
        fontSize: Scale(14),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: Scale(30),
      }}
    >
      Congratulations! You won the game lottery and claim your winning amount ₹100
    </Text>
  </ImageBackground>
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
        backgroundColor: "#8E0B00"
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
        backgroundColor: "#630800",
        padding: 10
    },
    equalSign: { fontSize: 20, color: "white", marginHorizontal: 10 },
    detailsContainer: {
        marginTop: Scale(20),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#630800"
    },
    detailsHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10
    },
    detailText: { fontSize: 16, color: "white" },
    detailsSubHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20
    },
    paymentAmount: { fontSize: 20, color: "white", fontWeight: "bold" },
    dashedDivider: {
        borderWidth: 1,
        borderColor: "#DE3C3F",
        marginTop: 20,
        borderStyle: "dashed"
    },
    dateStatusRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 20
    },
    dateText: { fontSize: 18, color: "white" },
    myBetsTitle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        margin: 20
    },
    tableHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: Scale(5)
    },
    tableHeaderText: { color: COLORS.white, fontWeight: "bold" },
    tableRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: Scale(5),
        justifyContent: "space-between"
    },
    footerText: {
        textAlign: "center",
        fontSize: 16,
        color: "white",
        marginVertical: 30
    }
});

export default MyBets3DigitsCard;
