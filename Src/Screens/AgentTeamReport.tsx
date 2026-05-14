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
import React, { use, useEffect, useState } from "react";
import { COLORS } from "../Constants/Theme";
import { useContainerScale } from "../hooks/useContainerScale";
import NewAppHeader from "../Components/NewAppHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  getAgentDashboardData,
  getRechargeBonusData,
} from "../Redux/Slice/agentSlice";
import { RootState } from "../Redux/store";
import * as Sharing from "expo-sharing";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const AgentTeamReport = ({ navigation }: any) => {
  const DATA = [
    { id: "1", userId: "1", recharge: "₹10.00", commission: "₹5.00" },
    { id: "2", userId: "2", recharge: "₹0.00", commission: "₹0.00" },
    { id: "3", userId: "3", recharge: "₹70.00", commission: "₹13.00" },
    { id: "4", userId: "4", recharge: "₹0.00", commission: "₹0.00" },
    { id: "5", userId: "5", recharge: "₹0.00", commission: "₹0.00" },
    { id: "6", userId: "6", recharge: "₹0.00", commission: "₹0.00" },
    { id: "7", userId: "7", recharge: "₹0.00", commission: "₹0.00" },
  ];
  const dispatch = useDispatch();
  const [showShareModal, setShowShareModal] = useState(false);
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  const { rechargeBonusData, dashboardData, rechargeBonusFUllData } =
    useSelector((state: RootState) => state.agentSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const itemsPerPage = 5;

  // FILTERED DATA
  const filteredData = DATA.filter((item) =>
    item.userId.toLowerCase().includes(searchText.toLowerCase()),
  );

  // TOTAL PAGES
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // PAGINATED DATA
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const { userId } = useSelector((state: RootState) => state.signInSlice);
  console.log("userId==>", userId);
  console.log("dashboardData==>", dashboardData);

  useEffect(() => {
    dispatch(getRechargeBonusData({ userId: userId }));
  }, [dispatch, userId]);

  const handleBackPress = () => {
    navigation.goBack();
  };
  const { isLoggedIn, userDetails } = useSelector(
    (state: RootState) => state.signInSlice,
  );
  const invitedlist = rechargeBonusFUllData?.userStats?.invitedlist || {};
  const qualifiedUsers =
    rechargeBonusFUllData?.userStats?.qualifiedUsersPerLevel || {};

  //   const renderTeamReportItem = ({ item }) => {
  //     const invitedCount = invitedlist[item.level] || 0;
  // const qualifiedCount = qualifiedUsers[item.level] || 0;
  //       return (
  //           <View style ={{
  //               backgroundColor: COLORS.white,
  //               marginHorizontal: Scale(20),
  //               marginTop: Scale(10),
  //               borderRadius: Scale(6),
  //               padding: Scale(10),
  //               borderWidth: 1,
  //               borderColor: '#fff',
  //               marginBottom: Scale(10),
  //           }}>
  //               <View style ={{
  //                   flexDirection: 'row',
  //                   justifyContent: 'space-between',
  //                   alignItems: 'center',
  //                   borderBottomColor: COLORS.black,
  //                   borderBottomWidth: 1,
  //                   padding: Scale(5),
  //                   borderTopColor: 'transparent',
  //                   borderTopWidth: 0,
  //                   borderLeftColor: 'transparent',
  //                   borderRightColor: 'transparent',

  //               }}>
  //               <Text style= {{
  //                   fontSize: Scale(20),
  //                   fontWeight: 'bold',
  //                   color: '#000',
  //               }}>Level {item?.level}</Text>
  //               <Text
  //               style={{
  //                   fontSize: Scale(20),
  //                   fontWeight: 'bold',
  //                   color: '#000'
  //               }}
  //               >₹{item.bonusAmount}</Text>
  //               </View>
  //               <View style ={{
  //                   flexDirection: 'row',
  //                   justifyContent: 'space-between',
  //                   alignItems: 'center',
  //                   backgroundColor: '#F1F2F6',
  //                   padding: Scale(5),
  //                   borderWidth: 1,
  //                   borderRadius: Scale(4),
  //                   marginVertical: Scale(5),
  //                   borderColor: '#F1F2F6',
  //                   marginTop: Scale(10),
  //               }}>
  //                    <Text style= {{
  //                       fontSize: Scale(14),
  //                       fontWeight: '400',
  //                       color: '#000',
  //                       paddingVertical: Scale(5),
  //                   }}>
  //                       Number of invites
  //                   </Text>
  //                   <Text style= {{
  //                       fontSize: Scale(14),
  //                       fontWeight: 'bold',
  //                   }}>
  //                     1
  //                   </Text>
  //               </View>
  //               <View style ={{
  //                   flexDirection: 'row',
  //                   justifyContent: 'space-between',
  //                   alignItems: 'center',
  //                   backgroundColor: '#F1F2F6',
  //                   padding: Scale(5),
  //                   borderWidth: 1,
  //                   borderRadius: Scale(4),
  //                   marginVertical: Scale(2),
  //                   borderColor: '#F1F2F6',
  //                   marginTop: Scale(5),
  //               }}>
  //                   <Text style= {{
  //                       fontSize: Scale(14),
  //                       fontWeight: '400',
  //                       color: '#000',
  //                   }}>
  //                       Recharge per people
  //                   </Text>
  //                   <Text style ={{
  //                       fontSize: Scale(14),
  //                       fontWeight: 'bold',
  //                       color: '#000'
  //                   }}>
  //                   ₹{item.minimumRechargePerPerson}
  //                   </Text>
  //               </View>
  //               <View style ={{
  //                   flexDirection: 'row',
  //                   justifyContent: 'space-between',
  //                   alignItems: 'center',
  //               }}>
  //                   <View style ={{
  //                       marginHorizontal: Scale(20),
  //                       marginTop: Scale(20),
  //                   }}>
  //                       <View style ={{
  //                           flexDirection: 'row',
  //                           alignItems: 'center',
  //                           marginLeft: Scale(20),
  //                       }}>
  //                   <Text style ={{
  //                       fontSize: Scale(16),
  //                       fontWeight: 'bold',
  //                       color: 'red',
  //                   }}>
  //                       {invitedCount}/
  //                   </Text>
  //                   <Text style ={{
  //                       fontSize: Scale(16),
  //                       fontWeight: 'bold',
  //                       color: COLORS.black
  //                   }}>
  //                       {item.totalPeopleRequired}
  //                   </Text>
  //                   </View>
  //                   <Text style ={{
  //                       fontSize: Scale(12),
  //                       fontWeight: '600',
  //                       color: COLORS.black,
  //                       marginVertical: Scale(5),
  //                   }}>
  //                       Number of invites
  //                   </Text>
  //                   </View>
  //                   <View style ={{
  //                       marginHorizontal: Scale(20),
  //                       marginTop: Scale(20),
  //                   }}>
  //                   <View style ={{
  //                       flexDirection: 'row',
  //                       alignItems: 'center',
  //                       marginLeft: Scale(20),
  //                   }}>
  //                   <Text style ={{
  //                       fontSize: Scale(16),
  //                       fontWeight: 'bold',
  //                       color: 'red'
  //                   }}>
  //                      {qualifiedCount}/
  //                   </Text>
  //                   <Text style ={{
  //                       fontSize: Scale(16),
  //                       fontWeight: 'bold',
  //                       color: COLORS.black
  //                   }}>
  //                       {item.totalPeopleRequired}
  //                   </Text>
  //                   </View>
  //                   <Text style ={{
  //                       fontSize: Scale(12),
  //                       fontWeight: '600',
  //                       color: COLORS.black,
  //                       marginVertical: Scale(5),
  //                   }}>
  //                      Deposit number
  //                   </Text>
  //                   </View>
  //               </View>
  //               <View>

  //                   {/* <TouchableOpacity
  //                   style ={{
  //                       backgroundColor: '#00B612',
  //                       padding: Scale(10),
  //                       borderRadius: Scale(20),
  //                       marginTop: Scale(15),
  //                       marginHorizontal: Scale(10),
  //                   }}
  //                   onPress={handleInvite}
  //                   >
  //                       <Text style ={{
  //                           color: COLORS.white,
  //                           fontSize: Scale(14),
  //                           fontWeight: 'bold',
  //                           textAlign: 'center',
  //                       }}>
  //                           Go Complete
  //                       </Text>
  //                   </TouchableOpacity> */}
  //                   <LinearGradient
  //           // colors={[COLORS.linearOne, COLORS.linearTwo]}
  //           colors={['red', 'grey']}
  //           start={{ x: 0, y: 0 }}
  //           end={{ x: 1, y: 0 }}
  //           style={styles.invitationLinkButton}
  //         >
  //           <TouchableOpacity
  //             style={styles.invitationLinkTouchable}
  //             onPress={handleInvite}
  //           >
  //             <Text style={styles.invitationLinkText}>Go Complete</Text>
  //           </TouchableOpacity>
  //         </LinearGradient>

  //               </View>
  //           </View>
  //       )

  //   }
  const renderTeamReportItem = ({ item }: any) => {
    const invitedCount = invitedlist[item.level] || 0;
    const qualifiedCount = qualifiedUsers[item.level] || 0;

    const inviteProgress = (invitedCount / item.totalPeopleRequired) * 100;

    const depositProgress = (qualifiedCount / item.totalPeopleRequired) * 100;
         const isCompleted =
    qualifiedCount >= item.totalPeopleRequired;

    return (
      <View style={styles.levelCard}>
        {/* HEADER */}
        <LinearGradient
          colors={[COLORS.linearOne, COLORS.linearTwo]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.levelHeader}
        >
          <View>
            <Text style={styles.levelText}>Level {item.level}</Text>

            <Text style={styles.bonusLabel}>Reward Bonus</Text>
          </View>

          <Text style={styles.bonusAmount}>₹{item.bonusAmount}</Text>
        </LinearGradient>

        {/* BODY */}
        <View style={styles.levelBody}>
          {/* TOP INFO ROW */}
          <View style={styles.topInfoRow}>
            {/* Recharge */}
            <View style={styles.smallInfoCard}>
              <Ionicons name="wallet-outline" size={18} color="black" />

              <Text style={styles.smallInfoTitle}>Recharge</Text>

              <Text style={styles.smallInfoValue}>
                ₹{item.minimumRechargePerPerson}
              </Text>
            </View>

            {/* Required */}
            <View style={styles.smallInfoCard}>
              <Ionicons name="people-outline" size={18} color="black" />

              <Text style={styles.smallInfoTitle}>Required</Text>

              <Text style={styles.smallInfoValue}>
                {item.totalPeopleRequired}
              </Text>
            </View>
          </View>

          {/* INVITES */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTop}>
              <Text style={styles.progressLabel}>Invites</Text>

              <Text style={styles.progressCount}>
                {invitedCount}/{item.totalPeopleRequired}
              </Text>
            </View>

            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${Math.min(inviteProgress, 100)}%`,
                  },
                ]}
              />
            </View>
          </View>

          {/* DEPOSITS */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTop}>
              <Text style={styles.progressLabel}>Deposits</Text>

              <Text style={styles.depositCount}>
                {qualifiedCount}/{item.totalPeopleRequired}
              </Text>
            </View>

            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.depositBar,
                  {
                    width: `${Math.min(depositProgress, 100)}%`,
                  },
                ]}
              />
            </View>
          </View>

          {/* BUTTON */}
           <TouchableOpacity
          activeOpacity={0.85}
          onPress={!isCompleted ? handleInvite : undefined}
          disabled={isCompleted}
        >
          <LinearGradient
            colors={
              isCompleted
                ? ["#00C853", "#00A86B"] // ✅ GREEN
                : ["#FF416C", "#FF4B2B"] // ✅ RED
            }
            style={styles.completeButton}
          >
            <Ionicons
              name={
                isCompleted
                  ? "checkmark-circle"
                  : "share-social"
              }
              size={18}
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

  const handleInvite = async () => {
    if (isLoggedIn) {
      setShowShareModal(true);
    } else {
      navigation.navigate("SignInScreen");
    }
  };
  const shareUrl =
    "https://yourapp.com/invite?code=" + (userDetails.referralCode || "");
  const shareMessage = `Join me on this amazing app! Use my referral code: ${userDetails.referralCode || ""}\n\nDownload the app: ${shareUrl}`;

  const handleFacebookShare = async () => {
    try {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      await Linking.openURL(facebookUrl);
      setShowShareModal(false);
    } catch (error) {
      console.log("Error sharing to Facebook:", error);
      Alert.alert("Error", "Unable to share to Facebook");
    }
  };

  const handleTelegramShare = async () => {
    try {
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareMessage)}`;
      await Linking.openURL(telegramUrl);
      setShowShareModal(false);
    } catch (error) {
      console.log("Error sharing to Telegram:", error);
      Alert.alert("Error", "Unable to share to Telegram");
    }
  };

  const handleWhatsAppShare = async () => {
    try {
      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(shareMessage)}`;
      await Linking.openURL(whatsappUrl);
      setShowShareModal(false);
    } catch (error) {
      console.log("Error sharing to WhatsApp:", error);
      Alert.alert("Error", "Unable to share to WhatsApp");
    }
  };

  const handleInstagramShare = async () => {
    try {
      // Instagram doesn't support direct URL sharing, so we'll copy the link
      await Linking.openURL("instagram://");
      Alert.alert(
        "Instagram",
        "Please paste the link in your Instagram story or post",
      );
      setShowShareModal(false);
    } catch (error) {
      console.log("Error opening Instagram:", error);
      Alert.alert("Error", "Instagram app not found");
    }
  };

  const handleCopyLink = async () => {
    try {
      await Clipboard.setStringAsync(shareUrl);
      Alert.alert("Copied!", "Link copied to clipboard");
      setShowShareModal(false);
    } catch (error) {
      console.log("Error copying link:", error);
      Alert.alert("Error", "Unable to copy link");
    }
  };

  const renderTableItem = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={styles.userText}>{item.userId}</Text>

      <Text style={styles.rechargeText}>{item.recharge}</Text>

      <Text style={styles.commissionText}>{item.commission}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      <NewAppHeader leftIconPress={handleBackPress} centerText="Team Report" />

      <FlatList
        data={rechargeBonusData}
        keyExtractor={(item) => item.level.toString()}
        renderItem={renderTeamReportItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Scale(10),
          paddingTop: Scale(10),
        }}
        removeClippedSubviews={false}
      />

      <View
        style={{
          // marginTop: Scale(20),
          marginHorizontal: Scale(20),
        }}
      >
        {/* Header */}
        <View style={styles.topContainer}>
          <View style={styles.titleContainer}>
            <Ionicons name="people" size={20} color="white" />
            <Text style={styles.title}>My Teams</Text>
          </View>

          {/* Search Box */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="#555" />
            <TextInput
              placeholder="Search by User Id"
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

        {/* Table */}
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>USER</Text>
            <Text style={styles.headerText}>RECHARGE</Text>
            <Text style={styles.headerText}>COMMISSION</Text>
          </View>

          {/* List */}
          <FlatList
            data={paginatedData}
            keyExtractor={(item) => item.id}
            renderItem={renderTableItem}
            showsVerticalScrollIndicator={false}
            style={styles.tableList}
            scrollEnabled={false}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: Scale(30),
                }}
              >
                <Text
                  style={{
                    color: "#999",
                    fontSize: Scale(14),
                    fontWeight: "600",
                  }}
                >
                  No Users Found
                </Text>
              </View>
            }
          />
          {filteredData.length > 0 && (
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              disabled={currentPage === 1}
              onPress={() => setCurrentPage(currentPage - 1)}
              style={[
                styles.pageButton,
                currentPage === 1 && styles.disabledButton,
              ]}
            >
              <Ionicons name="chevron-back" size={18} color="#fff" />
            </TouchableOpacity>

            {/* PAGE NUMBERS */}
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <TouchableOpacity
                  key={page}
                  onPress={() => setCurrentPage(page)}
                  style={[
                    styles.pageNumber,
                    currentPage === page && styles.activePageNumber,
                  ]}
                >
                  <Text
                    style={[
                      styles.pageText,
                      currentPage === page && styles.activePageText,
                    ]}
                  >
                    {page}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {/* NEXT */}
            <TouchableOpacity
              disabled={currentPage === totalPages}
              onPress={() => setCurrentPage(currentPage + 1)}
              style={[
                styles.pageButton,
                currentPage === totalPages && styles.disabledButton,
              ]}
            >
              <Ionicons name="chevron-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          )}
        </View>
      </View>

      <Modal
        visible={showShareModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowShareModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.shareModal}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowShareModal(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <Text style={styles.shareTitle}>Share</Text>

            <View style={styles.shareOptions}>
              <TouchableOpacity
                style={styles.shareOption}
                onPress={handleFacebookShare}
              >
                <View
                  style={[styles.shareIcon, { backgroundColor: "#1877F2" }]}
                >
                  <Text style={styles.shareIconText}>f</Text>
                </View>
                <Text style={styles.shareOptionText}>Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareOption}
                onPress={handleTelegramShare}
              >
                <View
                  style={[styles.shareIcon, { backgroundColor: "#0088CC" }]}
                >
                  <Text style={styles.shareIconText}>✈</Text>
                </View>
                <Text style={styles.shareOptionText}>Telegram</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareOption}
                onPress={handleWhatsAppShare}
              >
                <View
                  style={[styles.shareIcon, { backgroundColor: "#25D366" }]}
                >
                  <Text style={styles.shareIconText}>💬</Text>
                </View>
                <Text style={styles.shareOptionText}>WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareOption}
                onPress={handleInstagramShare}
              >
                <View
                  style={[styles.shareIcon, { backgroundColor: "#E4405F" }]}
                >
                  <Text style={styles.shareIconText}>📷</Text>
                </View>
                <Text style={styles.shareOptionText}>Instagram</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareOption}
                onPress={handleCopyLink}
              >
                <View
                  style={[styles.shareIcon, { backgroundColor: "#007AFF" }]}
                >
                  <Text style={styles.shareIconText}>🔗</Text>
                </View>
                <Text style={styles.shareOptionText}>Copy Link</Text>
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
      backgroundColor: COLORS.primary,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    shareModal: {
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 20,
      width: "100%",
      maxWidth: 350,
      alignItems: "center",
    },
    closeButton: {
      position: "absolute",
      top: 15,
      left: 15,
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    closeButtonText: {
      fontSize: 24,
      color: "#666",
      fontWeight: "bold",
    },
    shareTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 20,
      marginTop: 10,
    },
    shareOptions: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      width: "100%",
    },
    shareOption: {
      alignItems: "center",
      marginVertical: 10,
      width: "20%",
    },
    shareIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
    },
    shareIconText: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
    },
    shareOptionText: {
      fontSize: 12,
      color: "#333",
      textAlign: "center",
    },
    invitationLinkButton: {
      borderRadius: Scale(12),
      alignItems: "center",
      // width: Scale(200),
      justifyContent: "center",
      alignSelf: "center",
      marginTop: Scale(20),
      height: Scale(40),
    },
    invitationLinkTouchable: {
      paddingVertical: Scale(10),
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: Scale(20),
    },
    invitationLinkText: {
      fontSize: Scale(16),
      fontWeight: "bold",
      color: "#fff",
      textAlign: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: 18,
      borderBottomWidth: 1,
      borderBottomColor: "#F0F0F0",
    },

    userText: {
      flex: 1,
      fontSize: 15,
      color: "#333",
      fontWeight: "600",
      textAlign: "center",
    },

    rechargeText: {
      flex: 1,
      fontSize: 15,
      color: "black",
      textAlign: "center",
      fontWeight: "600",
    },

    commissionText: {
      flex: 1,
      fontSize: 15,
      color: "#2EAD65",
      textAlign: "center",
      fontWeight: "600",
    },
    topContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      paddingVertical: 5,
    },

    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    title: {
      fontSize: 20,
      fontWeight: "700",
      color: "white",
      marginLeft: 8,
    },

    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 12,
      paddingHorizontal: 12,
      width: "50%",
      height: 40,
      elevation: 2,
      marginVertical: Scale(5),
    },

    input: {
      marginLeft: 8,
      flex: 1,
      color: "#000",
    },

    tableContainer: {
      backgroundColor: "#fff",
      borderRadius: 18,
      overflow: "hidden",
    },

    tableHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 18,
      paddingHorizontal: 18,
      borderBottomWidth: 1,
      borderBottomColor: "#C9A3E6",
      backgroundColor: "#FAF9FD",
    },

    headerText: {
      flex: 1,
      fontSize: 14,
      fontWeight: "700",
      color: "#3B214A",
      textAlign: "center",
    },
    infoBox: {
      backgroundColor: "#F5F2FF",
      borderRadius: Scale(14),
      padding: Scale(14),
      marginBottom: Scale(18),
    },

    infoTitle: {
      color: "#777",
      marginTop: Scale(8),
      fontSize: Scale(12),
    },

    infoValue: {
      color: "#222",
      fontWeight: "700",
      fontSize: Scale(18),
      marginTop: Scale(4),
    },

    levelCard: {
      marginHorizontal: Scale(16),
      marginTop: Scale(14),
      borderRadius: Scale(20),
      overflow: "hidden",
      backgroundColor: "#fff",
      elevation: 6,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.12,
      shadowRadius: 5,
    },

    levelHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Scale(18),
      paddingVertical: Scale(10),
    },

    levelBody: {
      padding: Scale(10),
    },

    levelText: {
      color: "#fff",
      fontSize: Scale(20),
      fontWeight: "700",
    },

    bonusLabel: {
      color: "#E9D8FF",
      marginTop: Scale(2),
      fontSize: Scale(11),
      fontWeight: "bold",
    },

    bonusAmount: {
      color: "#fff",
      fontSize: Scale(24),
      fontWeight: "bold",
    },

    topInfoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: Scale(14),
    },

    smallInfoCard: {
      flex: 0.48,
      backgroundColor: "#F6F3FF",
      borderRadius: Scale(14),
      paddingVertical: Scale(5),
      paddingHorizontal: Scale(5),
    },

    smallInfoTitle: {
      fontSize: Scale(11),
      color: "#666",
      marginTop: Scale(6),
    },

    smallInfoValue: {
      fontSize: Scale(17),
      fontWeight: "700",
      color: "#222",
      marginTop: Scale(4),
    },

    progressContainer: {
      marginBottom: Scale(12),
    },

    progressTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: Scale(6),
    },

    progressLabel: {
      fontSize: Scale(13),
      color: "#444",
      fontWeight: "600",
    },

    progressCount: {
      fontSize: Scale(13),
      fontWeight: "700",
      color: "#00C853",
    },

    depositCount: {
      fontSize: Scale(13),
      fontWeight: "700",
      color: "#00A86B",
    },

    progressBarBg: {
      height: Scale(8),
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
      backgroundColor: "#00C853",
      borderRadius: Scale(20),
    },

    completeButton: {
      marginTop: Scale(10),
      borderRadius: Scale(14),
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: Scale(13),
    },

    completeText: {
      color: "#fff",
      fontSize: Scale(14),
      fontWeight: "700",
      marginLeft: Scale(8),
    },
    paginationContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: Scale(20),
      marginBottom: Scale(20),
    },

    pageButton: {
      width: Scale(38),
      height: Scale(38),
      borderRadius: Scale(10),
      backgroundColor: COLORS.linearOne,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: Scale(4),
    },

    disabledButton: {
      opacity: 0.4,
    },

    pageNumber: {
      width: Scale(38),
      height: Scale(38),
      borderRadius: Scale(10),
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: Scale(4),

      elevation: 3,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },

    activePageNumber: {
      backgroundColor: COLORS.linearOne,
    },

    pageText: {
      color: "#333",
      fontWeight: "700",
      fontSize: Scale(14),
    },

    activePageText: {
      color: "#fff",
    },
    tableList: {
      minHeight: Scale(260),
      maxHeight: Scale(260),
    },
  });
export default AgentTeamReport;
