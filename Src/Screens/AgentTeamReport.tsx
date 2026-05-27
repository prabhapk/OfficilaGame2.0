import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { COLORS } from "../Constants/Theme";
import { useContainerScale } from "../hooks/useContainerScale";
import NewAppHeader from "../Components/NewAppHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyTeamData,
  getRechargeBonusData,
} from "../Redux/Slice/agentSlice";
import { RootState } from "../Redux/store";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { defaultRechargeData } from "../Utils/Constants";

const AgentTeamReport = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const { Scale } = useContainerScale();

  const styles = createStyles(Scale);

  const {
    rechargeBonusData,
    rechargeBonusFUllData,
    teamData,
  } = useSelector((state: RootState) => state.agentSlice);

  const { userId, agentId, isLoggedIn, userDetails } = useSelector(
    (state: RootState) => state.signInSlice,
  );

  const [selectedLevel, setSelectedLevel] = useState("All");

  const [showShareModal, setShowShareModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [searchText, setSearchText] = useState("");

  const levelsData = teamData?.data?.levels || [];

  const safeRechargeData =
    rechargeBonusData?.length > 0
      ? rechargeBonusData
      : defaultRechargeData;

  useEffect(() => {
    dispatch(getRechargeBonusData({ userId: userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getMyTeamData({ agentId: agentId }));
  }, [dispatch, agentId]);

  const tableData = useMemo(() => {
    return selectedLevel === "All"
      ? levelsData.flatMap((levelItem: any) =>
          levelItem.members.map((member: any) => ({
            id: `${levelItem.level}-${member.userId}`,
            level: levelItem.level,
            userId: member.userId,
            recharge: member.totalRecharge,
            commission: member.totalBetCommission,
          })),
        )
      : levelsData
          .filter((item: any) => item.level === Number(selectedLevel))
          .flatMap((levelItem: any) =>
            levelItem.members.map((member: any) => ({
              id: `${levelItem.level}-${member.userId}`,
              level: levelItem.level,
              userId: member.userId,
              recharge: member.totalRecharge,
              commission: member.totalBetCommission,
            })),
          );
  }, [levelsData, selectedLevel]);

  const filteredData = useMemo(() => {
    return tableData.filter((item: any) =>
      String(item.userId)
        .toLowerCase()
        .includes(searchText.toLowerCase()),
    );
  }, [tableData, searchText]);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const invitedlist =
    rechargeBonusFUllData?.userStats?.invitedlist || {};

  const qualifiedUsers =
    rechargeBonusFUllData?.userStats?.qualifiedUsersPerLevel || {};

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleInvite = async () => {
    if (isLoggedIn) {
      setShowShareModal(true);
    } else {
      navigation.navigate("SignInScreen");
    }
  };

  const shareUrl =
    "https://yourapp.com/invite?code=" +
    (userDetails.referralCode || "");

  const shareMessage = `Join me on this amazing app! Use my referral code: ${
    userDetails.referralCode || ""
  }\n\nDownload the app: ${shareUrl}`;

  const handleFacebookShare = async () => {
    try {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl,
      )}`;

      await Linking.openURL(facebookUrl);

      setShowShareModal(false);
    } catch (error) {
      Alert.alert("Error", "Unable to share to Facebook");
    }
  };

  const handleTelegramShare = async () => {
    try {
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
        shareUrl,
      )}&text=${encodeURIComponent(shareMessage)}`;

      await Linking.openURL(telegramUrl);

      setShowShareModal(false);
    } catch (error) {
      Alert.alert("Error", "Unable to share to Telegram");
    }
  };

  const handleWhatsAppShare = async () => {
    try {
      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
        shareMessage,
      )}`;

      await Linking.openURL(whatsappUrl);

      setShowShareModal(false);
    } catch (error) {
      Alert.alert("Error", "Unable to share to WhatsApp");
    }
  };

  const handleInstagramShare = async () => {
    try {
      await Linking.openURL("instagram://");

      Alert.alert(
        "Instagram",
        "Paste your invite link manually in story/post",
      );

      setShowShareModal(false);
    } catch (error) {
      Alert.alert("Error", "Instagram app not found");
    }
  };

  const handleCopyLink = async () => {
    try {
      await Clipboard.setStringAsync(shareUrl);

      Alert.alert("Copied", "Link copied successfully");

      setShowShareModal(false);
    } catch (error) {
      Alert.alert("Error", "Unable to copy link");
    }
  };

  const renderTeamReportItem = ({ item }: any) => {
    const invitedCount = invitedlist[item.level] || 0;

    const qualifiedCount = qualifiedUsers[item.level] || 0;

    const inviteProgress =
      (invitedCount / item.totalPeopleRequired) * 100;

    const depositProgress =
      (qualifiedCount / item.totalPeopleRequired) * 100;

    const isCompleted =
      qualifiedCount >= item.totalPeopleRequired;

    return (
      <View style={styles.levelCard}>
        <LinearGradient
          colors={[COLORS.linearOne, COLORS.linearTwo]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.levelHeader}
        >
          <View>
            <Text style={styles.levelText}>
              Level {item.level}
            </Text>

            <Text style={styles.bonusLabel}>
              Reward Bonus
            </Text>
          </View>

          <Text style={styles.bonusAmount}>
            ₹{item.bonusAmount}
          </Text>
        </LinearGradient>

        <View style={styles.levelBody}>
          <View style={styles.topInfoRow}>
            <View style={styles.smallInfoCard}>
              <Ionicons
                name="wallet-outline"
                size={16}
                color="#333"
              />

              <Text style={styles.smallInfoTitle}>
                Recharge
              </Text>

              <Text style={styles.smallInfoValue}>
                ₹{item.minimumRechargePerPerson}
              </Text>
            </View>

            <View style={styles.smallInfoCard}>
              <Ionicons
                name="people-outline"
                size={16}
                color="#333"
              />

              <Text style={styles.smallInfoTitle}>
                Required
              </Text>

              <Text style={styles.smallInfoValue}>
                {item.totalPeopleRequired}
              </Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressTop}>
              <Text style={styles.progressLabel}>
                Invites
              </Text>

              <Text style={styles.progressCount}>
                {invitedCount}/{item.totalPeopleRequired}
              </Text>
            </View>

            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${Math.min(
                      inviteProgress,
                      100,
                    )}%`,
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressTop}>
              <Text style={styles.progressLabel}>
                Deposits
              </Text>

              <Text style={styles.depositCount}>
                {qualifiedCount}/{item.totalPeopleRequired}
              </Text>
            </View>

            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.depositBar,
                  {
                    width: `${Math.min(
                      depositProgress,
                      100,
                    )}%`,
                  },
                ]}
              />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            disabled={isCompleted}
            onPress={!isCompleted ? handleInvite : undefined}
          >
            <LinearGradient
              colors={
                isCompleted
                  ? ["#00C853", "#00A86B"]
                  : ["#FF416C", "#FF4B2B"]
              }
              style={styles.completeButton}
            >
              <Ionicons
                name={
                  isCompleted
                    ? "checkmark-circle"
                    : "share-social"
                }
                size={16}
                color="#fff"
              />

              <Text style={styles.completeText}>
                {isCompleted
                  ? "Completed"
                  : "Invite Now"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTableItem = ({ item, index }: any) => (
    <View
      style={[
        styles.row,
        {
          backgroundColor:
            index % 2 === 0 ? "#FFFFFF" : "#FAFAFA",
        },
      ]}
    >
      <View style={styles.userContainer}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {String(item.userId).charAt(0)}
          </Text>
        </View>

        <Text
          style={styles.userText}
          numberOfLines={1}
        >
          {item.userId}
        </Text>
      </View>

      <Text style={styles.rechargeText}>
        ₹{Number(item.recharge).toFixed(2)}
      </Text>

      <Text style={styles.commissionText}>
        ₹{Number(item.commission).toFixed(2)}
      </Text>
    </View>
  );

  const renderHeaderSection = () => (
    <>
      <FlatList
        data={safeRechargeData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.level.toString()}
        renderItem={renderTeamReportItem}
        contentContainerStyle={{
          paddingHorizontal: Scale(16),
          paddingTop: Scale(10),
        }}
      />

      <View style={styles.teamSection}>
        <View style={styles.topContainer}>
          <View style={styles.titleContainer}>
            <Ionicons
              name="people"
              size={16}
              color="#fff"
            />

            <Text style={styles.title}>My Teams</Text>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={18}
              color="#777"
            />

            <TextInput
              placeholder="Search User Id"
              placeholderTextColor="#999"
              style={styles.input}
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                setCurrentPage(1);
              }}
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: Scale(10),
          }}
        >
          {["All", "1", "2", "3", "4"].map((level) => {
            const isActive = selectedLevel === level;

            return (
              <TouchableOpacity
                key={level}
                onPress={() => {
                  setSelectedLevel(level);
                  setCurrentPage(1);
                }}
                style={[
                  styles.filterButton,
                  isActive &&
                    styles.activeFilterButton,
                ]}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    isActive &&
                      styles.activeFilterText,
                  ]}
                >
                  {level === "All"
                    ? "All"
                    : `Level ${level}`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>
              USER ID
            </Text>

            <Text style={styles.headerText}>
              RECHARGE
            </Text>

            <Text style={styles.headerText}>
              COMMISSION
            </Text>
          </View>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle="light-content"
      />

      <NewAppHeader
        leftIconPress={handleBackPress}
        centerText="Team Report"
      />

      <FlatList
        data={paginatedData}
        keyExtractor={(item) => item.id}
        renderItem={renderTableItem}
        ListHeaderComponent={renderHeaderSection}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Scale(100),
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No Users Found
            </Text>
          </View>
        }
      />

      {filteredData.length > 0 && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            disabled={currentPage === 1}
            onPress={() =>
              setCurrentPage(currentPage - 1)
            }
            style={[
              styles.pageButton,
              currentPage === 1 &&
                styles.disabledButton,
            ]}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color="#fff"
            />
          </TouchableOpacity>

          {Array.from(
            { length: totalPages },
            (_, index) => {
              const page = index + 1;

              return (
                <TouchableOpacity
                  key={page}
                  onPress={() =>
                    setCurrentPage(page)
                  }
                  style={[
                    styles.pageNumber,
                    currentPage === page &&
                      styles.activePageNumber,
                  ]}
                >
                  <Text
                    style={[
                      styles.pageText,
                      currentPage === page &&
                        styles.activePageText,
                    ]}
                  >
                    {page}
                  </Text>
                </TouchableOpacity>
              );
            },
          )}

          <TouchableOpacity
            disabled={currentPage === totalPages}
            onPress={() =>
              setCurrentPage(currentPage + 1)
            }
            style={[
              styles.pageButton,
              currentPage === totalPages &&
                styles.disabledButton,
            ]}
          >
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={showShareModal}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setShowShareModal(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.shareModal}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                setShowShareModal(false)
              }
            >
              <Text style={styles.closeButtonText}>
                ×
              </Text>
            </TouchableOpacity>

            <Text style={styles.shareTitle}>
              Share
            </Text>

            <View style={styles.shareOptions}>
              <TouchableOpacity
                style={styles.shareOption}
                onPress={handleFacebookShare}
              >
                <View
                  style={[
                    styles.shareIcon,
                    {
                      backgroundColor: "#1877F2",
                    },
                  ]}
                >
                  <Text
                    style={styles.shareIconText}
                  >
                    f
                  </Text>
                </View>

                <Text
                  style={styles.shareOptionText}
                >
                  Facebook
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareOption}
                onPress={handleTelegramShare}
              >
                <View
                  style={[
                    styles.shareIcon,
                    {
                      backgroundColor: "#0088CC",
                    },
                  ]}
                >
                  <Text
                    style={styles.shareIconText}
                  >
                    ✈
                  </Text>
                </View>

                <Text
                  style={styles.shareOptionText}
                >
                  Telegram
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareOption}
                onPress={handleWhatsAppShare}
              >
                <View
                  style={[
                    styles.shareIcon,
                    {
                      backgroundColor: "#25D366",
                    },
                  ]}
                >
                  <Text
                    style={styles.shareIconText}
                  >
                    💬
                  </Text>
                </View>

                <Text
                  style={styles.shareOptionText}
                >
                  WhatsApp
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareOption}
                onPress={handleInstagramShare}
              >
                <View
                  style={[
                    styles.shareIcon,
                    {
                      backgroundColor: "#E4405F",
                    },
                  ]}
                >
                  <Text
                    style={styles.shareIconText}
                  >
                    📷
                  </Text>
                </View>

                <Text
                  style={styles.shareOptionText}
                >
                  Instagram
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareOption}
                onPress={handleCopyLink}
              >
                <View
                  style={[
                    styles.shareIcon,
                    {
                      backgroundColor: "#007AFF",
                    },
                  ]}
                >
                  <Text
                    style={styles.shareIconText}
                  >
                    🔗
                  </Text>
                </View>

                <Text
                  style={styles.shareOptionText}
                >
                  Copy Link
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F4F6FB",
    },

    teamSection: {
      marginTop: Scale(16),
      marginHorizontal: Scale(16),
    },

    topContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Scale(10),
    },

    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    title: {
      fontSize: Scale(16),
      fontWeight: "700",
      color: COLORS.primary,
      marginLeft: Scale(6),
    },

    searchContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: Scale(12),
      marginLeft: Scale(12),
      paddingHorizontal: Scale(12),
      height: Scale(40),

      elevation: 2,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.08,
      shadowRadius: 3,
    },

    input: {
      flex: 1,
      marginLeft: Scale(8),
      color: "#000",
      fontSize: Scale(13),
    },

    levelCard: {
      width: Scale(290),
      marginRight: Scale(14),
      borderRadius: Scale(20),
      overflow: "hidden",
      backgroundColor: "#fff",

      elevation: 3,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },

    levelHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Scale(16),
      paddingVertical: Scale(12),
    },

    levelBody: {
      padding: Scale(12),
    },

    levelText: {
      color: "#fff",
      fontSize: Scale(15),
      fontWeight: "700",
    },

    bonusLabel: {
      color: "#E9D8FF",
      fontSize: Scale(11),
      marginTop: Scale(2),
    },

    bonusAmount: {
      color: "#fff",
      fontSize: Scale(16),
      fontWeight: "bold",
    },

    topInfoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: Scale(8),
    },

    smallInfoCard: {
      flex: 0.48,
      backgroundColor: "#F7F5FF",
      borderRadius: Scale(14),
      padding: Scale(10),
    },

    smallInfoTitle: {
      fontSize: Scale(10),
      color: "#666",
      marginTop: Scale(4),
    },

    smallInfoValue: {
      fontSize: Scale(13),
      fontWeight: "700",
      color: "#222",
      marginTop: Scale(4),
    },

    progressContainer: {
      marginBottom: Scale(8),
    },

    progressTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: Scale(4),
    },

    progressLabel: {
      fontSize: Scale(10),
      color: "#444",
      fontWeight: "600",
    },

    progressCount: {
      fontSize: Scale(10),
      fontWeight: "700",
      color: "#00C853",
    },

    depositCount: {
      fontSize: Scale(10),
      fontWeight: "700",
      color: "#00A86B",
    },

    progressBarBg: {
      height: Scale(6),
      backgroundColor: "#ECECEC",
      borderRadius: Scale(20),
      overflow: "hidden",
    },

    progressBar: {
      height: "100%",
      backgroundColor: "#00C853",
      borderRadius: Scale(20),
    },

    depositBar: {
      height: "100%",
      backgroundColor: "#00A86B",
      borderRadius: Scale(20),
    },

    completeButton: {
      marginTop: Scale(8),
      borderRadius: Scale(12),
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: Scale(9),
    },

    completeText: {
      color: "#fff",
      fontSize: Scale(13),
      fontWeight: "700",
      marginLeft: Scale(6),
    },

    filterButton: {
      paddingHorizontal: Scale(14),
      paddingVertical: Scale(7),
      borderRadius: Scale(30),
      backgroundColor: "#fff",
      marginRight: Scale(10),

      elevation: 2,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.08,
      shadowRadius: 3,
    },

    activeFilterButton: {
      backgroundColor: COLORS.primary,
    },

    filterButtonText: {
      color: "#333",
      fontWeight: "700",
      fontSize: Scale(12),
    },

    activeFilterText: {
      color: "#fff",
    },

    tableContainer: {
      backgroundColor: "#fff",
      borderRadius: Scale(18),
      overflow: "hidden",
      marginTop: Scale(10),

      elevation: 3,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },

    tableHeader: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.secondaryTextColor,
      paddingVertical: Scale(12),
      paddingHorizontal: Scale(12),
    },

    headerText: {
      flex: 1,
      textAlign: "center",
      color: "#fff",
      fontSize: Scale(12),
      fontWeight: "700",
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Scale(12),
      paddingHorizontal: Scale(14),
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      borderBottomColor: "#F2F2F2",
      marginHorizontal: Scale(16),
    },

    userContainer: {
      flex: 1.4,
      flexDirection: "row",
      alignItems: "center",
    },

    avatarCircle: {
      width: Scale(30),
      height: Scale(30),
      borderRadius: Scale(15),
      backgroundColor: COLORS.primary,
      justifyContent: "center",
      alignItems: "center",
      marginRight: Scale(8),
    },

    avatarText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: Scale(12),
    },

    userText: {
      flex: 1,
      color: "#222",
      fontSize: Scale(13),
      fontWeight: "600",
    },

    rechargeText: {
      flex: 1,
      textAlign: "center",
      color: "#000",
      fontSize: Scale(13),
      fontWeight: "600",
    },

    commissionText: {
      flex: 1,
      textAlign: "center",
      color: "#00A86B",
      fontSize: Scale(13),
      fontWeight: "700",
    },

    paginationContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: Scale(20),
      backgroundColor: "#F4F6FB",
    },

    pageButton: {
      width: Scale(36),
      height: Scale(36),
      borderRadius: Scale(10),
      backgroundColor: COLORS.primary,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: Scale(4),
    },

    disabledButton: {
      opacity: 0.4,
    },

    pageNumber: {
      width: Scale(36),
      height: Scale(36),
      borderRadius: Scale(10),
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: Scale(4),
    },

    activePageNumber: {
      backgroundColor: COLORS.primary,
    },

    pageText: {
      color: "#333",
      fontWeight: "700",
    },

    activePageText: {
      color: "#fff",
    },

    emptyContainer: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: Scale(40),
    },

    emptyText: {
      color: "#777",
      fontWeight: "600",
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.45)",
      justifyContent: "center",
      alignItems: "center",
    },

    shareModal: {
      backgroundColor: "#fff",
      width: "90%",
      borderRadius: Scale(22),
      padding: Scale(20),
      alignItems: "center",
    },

    closeButton: {
      position: "absolute",
      top: Scale(10),
      right: Scale(10),
      width: Scale(32),
      height: Scale(32),
      justifyContent: "center",
      alignItems: "center",
    },

    closeButtonText: {
      fontSize: Scale(24),
      color: "#666",
      fontWeight: "bold",
    },

    shareTitle: {
      fontSize: Scale(18),
      fontWeight: "700",
      color: "#222",
      marginBottom: Scale(20),
    },

    shareOptions: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "100%",
    },

    shareOption: {
      width: "30%",
      alignItems: "center",
      marginBottom: Scale(18),
    },

    shareIcon: {
      width: Scale(52),
      height: Scale(52),
      borderRadius: Scale(26),
      justifyContent: "center",
      alignItems: "center",
      marginBottom: Scale(8),
    },

    shareIconText: {
      color: "#fff",
      fontSize: Scale(20),
      fontWeight: "700",
    },

    shareOptionText: {
      fontSize: Scale(11),
      color: "#333",
      textAlign: "center",
    },
  });

export default AgentTeamReport;