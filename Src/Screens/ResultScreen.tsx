import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Image,
} from "react-native";
import { resultFilterList } from "../Constants/CommonFlatlist";
import { COLORS } from "../Constants/Theme";
import ResultTable from "../Components/ResultTable";
import CustomTabs from "../Components/CustomTabsHeader";
import { useContainerScale } from "../hooks/useContainerScale";
import { useDispatch, useSelector } from "react-redux";
import { getAllResults } from "../Redux/Slice/resultSlice";
import { AppDispatch, RootState } from "../Redux/store";
import { checked, unchecked } from "../../assets/assets";
import CasinoResult from "./CasinoResult";

const MAIN_TABS = [
  { id: "lottery", name: "Lottery" },
  { id: "casino", name: "Casino" },
];

const QUICK3D_SUB_TABS = [
  { id: "1min", name: "1 min" },
  { id: "3min", name: "3 min" },
  { id: "5min", name: "5 min" },
];

const ResultScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { allResultData } = useSelector((state: RootState) => state.resultSlice);
  const { Scale } = useContainerScale();
  const styles = createStyles(Scale);

  const [mainTabIndex, setMainTabIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quick3dSubIndex, setQuick3dSubIndex] = useState(0);
  const [selectedFilerId, setSelectedFilerId] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const onClose = () => setShowFilter(false);

  const resultHeaderList = useMemo(
    () => [
      { id: 1, name: "All" },
      ...Object.keys(allResultData || {}).map((key, index) => {
        const displayName = key.startsWith("QUICK3D") ? "Quick 3D" : key;
        return { id: index + 2, name: displayName };
      }),
    ],
    [allResultData]
  );

  const selectedTabName = resultHeaderList[selectedIndex]?.name ?? "All";
  const isQuick3DSelected = selectedTabName === "Quick 3D";

  const filteredData = useMemo(() => {
    const allCategories: any = allResultData || {};
    const formatCategoryName = (key: string) =>
      key.startsWith("QUICK3D") ? "Quick 3D" : key;

    if (selectedTabName === "All") {
      return Object.keys(allCategories).map((key) => ({
        category: formatCategoryName(key),
        data: allCategories[key],
      }));
    }

    const categoryKey = Object.keys(allCategories).find(
      (key) =>
        formatCategoryName(key).toLowerCase() === selectedTabName.toLowerCase()
    );
    if (categoryKey) {
      const data = allCategories[categoryKey]?.slice(0, 15) ?? [];
      return [{ category: formatCategoryName(categoryKey), data }];
    }
    return [];
  }, [selectedTabName, allResultData]);

  useEffect(() => {
    dispatch(getAllResults());
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <View style={styles.headerSection}>
        <Text style={styles.resultTitle}>Result</Text>
      </View>

      {/* Lottery / Casino main tabs - above existing tabs */}
      <View style={styles.mainTabsRow}>
        {MAIN_TABS.map((tab, idx) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.mainTab, idx === mainTabIndex && styles.mainTabActive]}
            onPress={() => setMainTabIndex(idx)}
          >
            <Text
              style={[
                styles.mainTabText,
                idx === mainTabIndex && styles.mainTabTextActive,
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {mainTabIndex === 0 ? (
        <>
          <View style={styles.lotteryTabsWrapper}>
            <CustomTabs
              tabs={resultHeaderList}
              index={selectedIndex}
              onIndexChange={setSelectedIndex}
              lightTheme
            />
          </View>

          {isQuick3DSelected && (
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

          <ScrollView
            style={styles.contentScroll}
            showsVerticalScrollIndicator={false}
          >
            {filteredData.map(({ category, data }) => (
              <View key={category}>
                <View style={styles.categoryRow}>
                  <Text style={styles.categoryTitle}>{category}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ParticularGameResult", {
                        category,
                        data,
                      })
                    }
                    style={styles.viewAllButton}
                  >
                    <Text style={styles.viewAllText}>View All</Text>
                  </TouchableOpacity>
                </View>
                <ResultTable
                  tableData={data}
                  customStyle={styles.resultTableWrap}
                  hidePages
                  useLightTheme
                />
              </View>
            ))}
          </ScrollView>
        </>
      ) : (
        <View style={styles.casinoResultWrap}>
          <CasinoResult />
        </View>
      )}

      <Modal
        transparent
        visible={showFilter}
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackdrop} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <ScrollView
            nestedScrollEnabled
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {resultFilterList.map((item) => (
              <TouchableOpacity
                key={item.id.toString()}
                style={styles.optionItem}
                onPress={() => {
                  setSelectedFilerId(item.id);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    item.id === selectedFilerId && styles.selectedText,
                  ]}
                >
                  {item.name}
                </Text>
                <Image
                  source={item.id === selectedFilerId ? checked : unchecked}
                  style={{ width: Scale(25), height: Scale(25) }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ResultScreen;

const createStyles = (Scale: (n: number) => number) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: COLORS.primaryBackground,
    },
    headerSection: {
      backgroundColor: COLORS.headerBackground,
      paddingHorizontal: 16,
      paddingVertical: Scale(12),
      borderBottomWidth: 1,
      borderBottomColor: COLORS.gameCardBorder,
    },
    resultTitle: {
      fontSize: Scale(18),
      fontWeight: "bold",
      color: COLORS.sectionHeaderText,
      textAlign: "center",
    },
    mainTabsRow: {
      flexDirection: "row",
      backgroundColor: COLORS.sectionHeaderBg,
      paddingHorizontal: Scale(12),
      paddingVertical: Scale(8),
      gap: Scale(8),
    },
    mainTab: {
      flex: 1,
      paddingVertical: Scale(12),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: Scale(8),
      backgroundColor: COLORS.tabInactiveBg,
      borderWidth: 1,
      borderColor: COLORS.tabInactiveBorder,
    },
    mainTabActive: {
      backgroundColor: COLORS.tabActiveBg,
      borderColor: COLORS.tabActiveBg,
    },
    mainTabText: {
      fontSize: Scale(15),
      fontWeight: "600",
      color: COLORS.tabInactiveText,
    },
    mainTabTextActive: {
      color: COLORS.tabActiveText,
    },
    lotteryTabsWrapper: {
      backgroundColor: COLORS.gamesBackground,
    },
    quick3dSubRow: {
      flexDirection: "row",
      backgroundColor: COLORS.gamesBackground,
      paddingHorizontal: Scale(12),
      paddingVertical: Scale(8),
      gap: Scale(6),
      alignItems: "center",
      justifyContent: "center",
    },
    quick3dSubTab: {
      paddingVertical: Scale(8),
      paddingHorizontal: Scale(16),
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
      fontSize: Scale(13),
      fontWeight: "600",
      color: COLORS.tabInactiveText,
    },
    quick3dSubTextActive: {
      color: COLORS.tabActiveText,
    },
    contentScroll: {
      flex: 1,
      backgroundColor: COLORS.gamesBackground,
    },
    casinoResultWrap: {
      flex: 1,
      backgroundColor: COLORS.gamesBackground,
    },
    categoryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: Scale(10),
      marginTop: Scale(12),
    },
    categoryTitle: {
      fontWeight: "bold",
      fontSize: Scale(16),
      color: COLORS.sectionHeaderText,
    },
    viewAllButton: {
      backgroundColor: COLORS.tabActiveBg,
      padding: Scale(10),
      borderRadius: Scale(8),
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: COLORS.tabActiveBg,
    },
    viewAllText: {
      fontSize: Scale(14),
      color: COLORS.tabActiveText,
      fontWeight: "600",
    },
    resultTableWrap: {
      marginTop: Scale(-10),
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    modalContainer: {
      position: "absolute",
      top: Scale(100),
      width: "100%",
      alignSelf: "center",
      maxHeight: Scale(250),
      backgroundColor: COLORS.cardBg,
      borderRadius: Scale(8),
      paddingVertical: Scale(10),
      borderWidth: 1,
      borderColor: COLORS.cardBorder,
    },
    scrollContent: {
      marginHorizontal: Scale(5),
    },
    optionItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Scale(5),
      backgroundColor: "transparent",
      justifyContent: "space-between",
    },
    optionText: {
      fontSize: Scale(16),
      color: COLORS.sectionHeaderText,
      padding: Scale(10),
      fontWeight: "400",
    },
    selectedText: {
      fontWeight: "bold",
    },
  });
