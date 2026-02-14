import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { COLORS } from "../Constants/Theme";
import ResultTable from "../Components/ResultTable";
import CountdownTimer from "../Components/CountdownTimer";
import { useContainerScale } from "../hooks/useContainerScale";
import NewAppHeader from "../Components/NewAppHeader";
import { getIndividualGameResult } from "../Redux/Slice/resultSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { setTableCurrentPage } from "../Redux/Slice/commonSlice";
import { getIndividualGameData } from "../Redux/Slice/HomeSlice";
import { formatToTimeIST } from "../Utils/Common";

const QUICK3D_SUB_TABS = [
  { id: "1min", name: "1 min" },
  { id: "3min", name: "3 min" },
  { id: "5min", name: "5 min" },
];

const ParticularGameResult = ({ route, navigation }: any) => {
  const { category, data } = route.params;
  const { Scale } = useContainerScale();
  const styles = createStyles(Scale);
  const dispatch = useDispatch<AppDispatch>();

  const [quick3dSubIndex, setQuick3dSubIndex] = useState(0);

  const { individualGameResults } = useSelector(
    (state: RootState) => state.resultSlice
  );
  const { individualGameData } = useSelector(
    (state: RootState) => state.homeSlice
  );
  const { tableCurrentPage } = useSelector(
    (state: RootState) => state.commonSlice
  );

  const BaseURL = "http://8.148.148.185";
  const GametypeId = data?.[0]?.gametypeId;

  useEffect(() => {
    if (GametypeId) {
      dispatch(
        getIndividualGameResult({
          GametypeId,
          page: tableCurrentPage,
          pageSize: 10,
        })
      );
      dispatch(getIndividualGameData({ typeId: GametypeId }));
    }
  }, [GametypeId, tableCurrentPage, dispatch]);

  useEffect(() => {
    dispatch(setTableCurrentPage(1));
  }, [dispatch]);

  const transformedData =
    individualGameResults?.results?.map((item: any) => ({
      ...item,
      balls: item.winningNumber?.split("") ?? [],
    })) ?? [];
  const totalPages = individualGameResults?.totalPages ?? 1;

  const isQuick3D = category === "Quick 3D";

  return (
    <View style={styles.screen}>
      <NewAppHeader
        leftIconPress={() => navigation.pop()}
        centerText={`${category} Result`}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Image
                source={{ uri: BaseURL + individualGameData?.[0]?.cardImageUrl }}
                style={styles.gameImage}
              />
              <View>
                <Text style={styles.categoryTitle}>{category}</Text>
                <Text style={styles.drawResultsLabel}>Draw Results</Text>
              </View>
            </View>
            {!isQuick3D && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ThreeDigitMain", {
                    gameData: individualGameData?.[0],
                  })
                }
                style={styles.playNowButton}
              >
                <Text style={styles.playNowText}>Play Now</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {isQuick3D && (
          <View style={styles.quick3dSubRow}>
            {QUICK3D_SUB_TABS.map((sub, idx) => (
              <TouchableOpacity
                key={sub.id}
                style={[
                  styles.quick3dSubTab,
                  idx === quick3dSubIndex && styles.quick3dSubTabActive,
                ]}
                onPress={() => setQuick3dSubIndex(idx)}
              >
                <Text
                  style={[
                    styles.quick3dSubText,
                    idx === quick3dSubIndex && styles.quick3dSubTextActive,
                  ]}
                >
                  {sub.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {!isQuick3D && individualGameData?.[0]?.nextresulttime && (
          <View style={styles.nextDrawCard}>
            <View>
              <Text style={styles.nextDrawTitle}>Next Draw</Text>
              <Text style={styles.nextDrawTime}>
                {formatToTimeIST(individualGameData[0]?.nextresulttime)}
              </Text>
            </View>
            <CountdownTimer
              targetDate={individualGameData[0]?.nextresulttime}
            />
          </View>
        )}

        <ResultTable
          tableData={transformedData}
          customStyle={styles.resultTableWrap}
          totalPage={totalPages}
          useLightTheme
        />
      </ScrollView>
    </View>
  );
};

export default ParticularGameResult;

const createStyles = (Scale: (n: number) => number) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: COLORS.primaryBackground,
    },
    scroll: {
      flex: 1,
      backgroundColor: COLORS.gamesBackground,
    },
    scrollContent: {
      paddingBottom: Scale(24),
    },
    headerCard: {
      marginTop: Scale(10),
      backgroundColor: COLORS.sectionHeaderBg,
      padding: Scale(12),
      marginHorizontal: Scale(10),
      borderRadius: Scale(10),
      borderWidth: 1,
      borderColor: COLORS.gameCardBorder,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    gameImage: {
      width: Scale(50),
      height: Scale(50),
      borderRadius: Scale(10),
    },
    categoryTitle: {
      fontWeight: "bold",
      fontSize: Scale(16),
      color: COLORS.sectionHeaderText,
      marginLeft: Scale(10),
    },
    drawResultsLabel: {
      fontSize: Scale(14),
      color: COLORS.sectionHeaderSubtext,
      marginLeft: Scale(10),
    },
    playNowButton: {
      backgroundColor: COLORS.tabActiveBg,
      padding: Scale(10),
      borderRadius: Scale(20),
      paddingHorizontal: Scale(20),
      borderWidth: 1,
      borderColor: COLORS.tabActiveBg,
    },
    playNowText: {
      fontSize: Scale(16),
      color: COLORS.tabActiveText,
      fontWeight: "600",
    },
    quick3dSubRow: {
      flexDirection: "row",
      marginHorizontal: Scale(10),
      marginTop: Scale(12),
      marginBottom: Scale(8),
      gap: Scale(8),
    },
    quick3dSubTab: {
      flex: 1,
      paddingVertical: Scale(10),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: Scale(8),
      backgroundColor: COLORS.cardBg,
      borderWidth: 1,
      borderColor: COLORS.gameCardBorder,
    },
    quick3dSubTabActive: {
      backgroundColor: COLORS.tabActiveBg,
      borderColor: COLORS.tabActiveBg,
    },
    quick3dSubText: {
      fontSize: Scale(14),
      fontWeight: "600",
      color: COLORS.tabInactiveText,
    },
    quick3dSubTextActive: {
      color: COLORS.tabActiveText,
    },
    nextDrawCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: COLORS.sectionHeaderBg,
      padding: Scale(12),
      marginHorizontal: Scale(10),
      marginTop: Scale(10),
      borderRadius: Scale(8),
      borderWidth: 1,
      borderColor: COLORS.gameCardBorder,
    },
    nextDrawTitle: {
      fontWeight: "bold",
      fontSize: Scale(16),
      color: COLORS.sectionHeaderText,
    },
    nextDrawTime: {
      fontSize: Scale(14),
      color: COLORS.sectionHeaderSubtext,
      marginTop: Scale(4),
    },
    resultTableWrap: {
      marginTop: Scale(10),
    },
  });
