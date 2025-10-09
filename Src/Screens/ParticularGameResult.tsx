// ViewAllScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
} from "react-native";
import { COLORS } from "../Constants/Theme";
import ResultTable from "../Components/ResultTable";
import { hot } from "../../assets/assets";
import CountdownTimer from "../Components/CountdownTimer";
import { useContainerScale } from "../hooks/useContainerScale";
import NewAppHeader from "../Components/NewAppHeader";
import { getIndividualGameResult } from "../Redux/Slice/resultSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { setTableCurrentPage } from "../Redux/Slice/commonSlice";
import { getIndividualGameData } from "../Redux/Slice/HomeSlice";
import { formatToTimeIST } from "../Utils/Common";


const ParticularGameResult = ({ route, navigation }: any) => {
  const { category, data } = route.params;
  const { Scale, verticalScale } = useContainerScale();

  const styles = createStyles(Scale);
  const dispatch = useDispatch();

  const { allResultData, individualGameResults } = useSelector(
    (state: RootState) => state.resultSlice
  );
  const { individualGameData } = useSelector(
    (state: RootState) => state.homeSlice
  );
const BaseURL = "http://8.148.148.185";
  const {
    paymentSuccessModalVisible,
    InsufficientBalanceModalVisible,
    tableCurrentPage,
  } = useSelector((state: RootState) => state.commonSlice);

  console.log("data==>in particular game result", individualGameData);

  const GametypeId = data[0]?.gametypeId;

  useEffect(() => {
    dispatch(
      getIndividualGameResult({
        // groupId: groupId,
        GametypeId: GametypeId,
        page: tableCurrentPage,
        pageSize: 10,
      })
    );
    dispatch(
      getIndividualGameData({
        typeId: GametypeId,
      })
    );
  }, [GametypeId, tableCurrentPage]);

  useEffect(() => {
    dispatch(setTableCurrentPage(1));
  }, []);

  const transformedData = individualGameResults?.results?.map((item: any) => ({
    ...item,
    balls: item.winningNumber.split(""),
  }));
  console.log("transformedData==>", transformedData);

  const totalPages = individualGameResults.totalPages;
  console.log("totalPages==> imageeee" , BaseURL+individualGameData[0]?.cardImageUrl);

  return (
    <View style={{ backgroundColor: COLORS.primary, elevation: 10, flex: 1 }}>
      <NewAppHeader
        leftIconPress={() => {
          navigation.pop();
        }}
        centerText={`${category} Result`}
      />
      {category === "Quick 3D" ? (
         <View
         style={{
           marginTop: 10,
           backgroundColor: COLORS.primary,
           padding: 10,
         }}
       >
         <View
           style={{
             flexDirection: "row",
             justifyContent: "space-between",
             alignItems: "center",
           }}
         >
           <View
             style={{
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "center",
             }}
           >
               <Image source={{uri: BaseURL+individualGameData[0]?.cardImageUrl}} style={{ width: 50, height: 50, borderRadius:10 }} />
             <View>
               <Text
                 style={{
                   fontWeight: "bold",
                   fontSize: 16,
                   color: "white",
                   marginLeft: 10,
                 }}
               >
                 {category}
               </Text>
               <Text
                 style={{
                   fontSize: 14,
                   color: "white",
                   marginLeft: 10,
                 }}
               >
                 Draw Results
               </Text>
             </View>
           </View>
          
         </View>
        
       </View>
      ):(
      <View
        style={{
          marginTop: 10,
          backgroundColor: COLORS.primary,
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={{uri: BaseURL+individualGameData[0]?.cardImageUrl}} style={{ width: 50, height: 50, borderRadius:10 }} />
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "white",
                  marginLeft: 10,
                }}
              >
                {category}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "white",
                  marginLeft: 10,
                }}
              >
                Draw Results
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ThreeDigitMain", {
                gameData: individualGameData[0],
              });
            }}
            style={{
              backgroundColor: COLORS.primary,
              padding: 10,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 20,
              borderColor: COLORS.white,
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Play Now</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: COLORS.tableTopColor,
            padding: 10,
            marginTop: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: "white",
                marginLeft: 10,
              }}
            >
              Next Draw
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "white",
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              {formatToTimeIST(individualGameData[0]?.nextresulttime)}
            </Text>
          </View>

          <CountdownTimer targetDate={individualGameData[0]?.nextresulttime} />
        </View>
      </View>
      )}
      <ResultTable
        tableData={transformedData}
        customStyle={{ marginTop: -10 }}
        //   hidePages
        totalPage={totalPages}
      />
      {/* <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 8 }}>
            <Text style={{ color: 'white' }}>{item.name} - {item.time}</Text>
            <Text style={{ color: 'white' }}>Balls: {item.balls?.join(', ')}</Text>
          </View>
        )}
      /> */}
    </View>
  );
};

export default ParticularGameResult;

const createStyles = (Scale: any) =>
  StyleSheet.create({
    headrrcontainer: {
      backgroundColor: "#3C0D0D", // Dark maroon
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    resultText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
    },
  });
