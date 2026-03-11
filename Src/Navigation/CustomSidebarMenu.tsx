import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../Constants/Theme";
import {
  bigSpin,
  cancel,
  drawerLevel,
  freeLottery,
  homeAppIcon,
  newLogo,
  promotions,
  rebateMenu,
  robMoney,
  superAgent,
  wallet3dImage1,
} from "../../assets/assets";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { MenuBarList } from "../Constants/CommonFlatlist";
import Entypo from "react-native-vector-icons/Entypo";
import { ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, persistor, resetState, } from "../Redux/store";
import { formatToDecimal } from "../Utils/Common";
import { useContainerScale } from "../hooks/useContainerScale";
const CustomSidebarMenu = ({ navigation }: any) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  const { isLoggedIn, userDetails, mainWalletBalance, withdrawBalance } =
    useSelector((state: RootState) => state.signInSlice);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

  const totalBalance = mainWalletBalance + withdrawBalance;

  const renderMenuItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.menuContainer}
        onPress={() => navigation.navigate(item.component)}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={item.image}
            style={styles.menuImage}
            contentFit="contain"
          />
          <Text style={styles.menuText}>{item.name}</Text>
        </View>
        <Entypo
          name="chevron-right"
          size={Scale(30)}
          color="white"
          style={{ marginLeft: Scale(10) }}
        />
      </TouchableOpacity>
    );
  };
  const handleLogout = async () => {
    try {
      dispatch(resetState());
      setShowModal(false);
      await persistor.flush();
      persistor.purge();
      navigation.replace("DrawerNavigation");
    } catch (error) {
      console.error("Error resetting state:", error);
    }
  };
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.primary }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View> 
          <Image
            source={newLogo}
            contentFit="contain"
            style={{ width: Scale(160), height: Scale(80) }}
          />
          </View>
          <View>
          {!isLoggedIn ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignInScreen");
              }}
              style={styles.loginButton}
            >
              <LinearGradient
                colors={[COLORS.linearOne, COLORS.linearTwo]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.registerGradient}
              >
                <Text style={{ color: "#fff" }}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
          ):
          (
            <TouchableOpacity
            onPress={() => setShowModal(true)}
              style={styles.loginButton}
            >
              <LinearGradient
                colors={[COLORS.linearOne, COLORS.linearTwo]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.registerGradient}
              >
                <Text style={{ color: "#fff" }}>Logout</Text>
              </LinearGradient>
            </TouchableOpacity>
          )
          }
           </View>
        </View>
      </View>
      <View
        style={{ borderTopWidth: 1, borderTopColor: "#ccc", bottom: 10 }}
      ></View>

      {isLoggedIn && (
        <LinearGradient
          colors={[COLORS.linearOne, COLORS.linearTwo]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            marginTop: Scale(10),
            backgroundColor: COLORS.secondary,
            borderRadius: 10,
            padding: Scale(10),
            zIndex: 100,
            marginHorizontal: 10,
            borderWidth: 1,
            borderColor: "#fff",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
              marginTop: Scale(10),
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  marginLeft: Scale(5),
                  color: "#fff",
                  fontSize: Scale(16),
                  fontWeight: "bold",
                }}
              >
                Player {userDetails.id}
              </Text>
              <Image
                source={drawerLevel}
                style={{
                  width: Scale(70),
                  height: Scale(30),
                  marginLeft: Scale(15),
                }}
                contentFit="contain"
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
              marginTop: Scale(40),
            }}
          >
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={wallet3dImage1}
                  style={{ width: Scale(30), height: Scale(30) }}
                />
                <Text
                  style={{
                    marginLeft: Scale(5),
                    color: "#fff",
                    fontSize: Scale(14),
                  }}
                >
                  My Wallet
                </Text>
              </View>
              <Text
                style={{
                  marginLeft: Scale(5),
                  fontSize: Scale(22),
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                ₹ {formatToDecimal(totalBalance)}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                padding: 10,
                borderRadius: Scale(20),
                borderWidth: 0.1,
                borderColor: "#fff",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: Scale(14),
                }}
              >
                {"Recharge"}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}

      {/* <View style={styles.referalView}>
        <TouchableOpacity
          style={styles.refButton}
          onPress={() => navigation.navigate("RebateScreen")}
        >
          <Image
            source={rebateMenu}
            style={styles.refImage}
            contentFit="contain"
          />
          <Text style={styles.refText}>Rebate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.refButton}>
          <Image
            source={bigSpin}
            style={styles.refImage}
            contentFit="contain"
          />
          <Text style={styles.refText}>Big Spin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.refButton}>
          <Image
            source={robMoney}
            style={styles.refImage}
            contentFit="contain"
          />
          <Text style={styles.refText}>Rob money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.refButton}>
          <Image
            source={freeLottery}
            style={styles.refImage}
            contentFit="contain"
          />
          <Text style={styles.refText}>Free Lottery</Text>
        </TouchableOpacity>
      </View> */}

      <FlatList
        data={MenuBarList}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ marginTop: Scale(20) }}
        renderItem={renderMenuItem}
      />

      {/* <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("AgencyScreen")}
      >
        <Image
          source={superAgent}
          style={{ width: "93%", height: Scale(110) }}
          contentFit="fill"
        />
      </TouchableOpacity> */}
{/* 
      <TouchableOpacity 
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("Promotions")}
      >
        <Image
          source={promotions}
          style={{ width: "93%", height: Scale(110) }}
          contentFit="fill"
        />
      </TouchableOpacity> */}
      <Modal
          isVisible={showModal}
          animationIn="flipInX"
          animationOut="flipOutX"
          backdropOpacity={0.5}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Logout?</Text>
            </View>
            <Text style={styles.modalBodyText}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.modalButton}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.modalButton}
              >
                <Text style={styles.modalLogoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </ScrollView>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
    profileImg: {
      width: 80,
      height: 80,
    },
    headingTxt: {
      fontSize: Scale(22),
      letterSpacing: Scale(0.5),
      color: "#595959",
      fontFamily: "Satoshi-Bold",
    },
    btnNext: {
      backgroundColor: "rgba(102, 45, 145, 1)",
      width: "90%",
      borderRadius: Scale(50),
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      marginBottom: Scale(20),
      flexDirection: "row",
    },
    Txtnextstyle: {
      paddingVertical: 20,
      color: "white",
      fontSize: Scale(18),
      marginLeft: 10,
      fontFamily: "Satoshi-Regular",
    },

    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 10,
      alignItems: "center",
    },
    menuContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "white",
      marginHorizontal: 10,
      marginVertical: 5,
      borderRadius: 10,
      padding: 8,
      justifyContent: "space-between",
    },
    loginButton: {
      marginHorizontal: Scale(30),
    },

    referalView: {
      flexDirection: "row",
      // justifyContent: "space-between",
      justifyContent: "space-evenly",
      marginHorizontal: 10,
      marginTop: 30,
    },
    refImage: { width: 50, height: 50, },
    refText: {
      color: "white",
      fontSize: 12,
      fontWeight: "bold",
      marginVertical: 5,
    },
    refButton: { alignItems: "center" },
    menuText: {
      color: "white",
      fontSize: 12,
      fontWeight: "bold",
      marginVertical: 5,
    },
    menuImage: { width: 40, height: 40,},
    registerGradient: {
      borderRadius: 50,
      paddingVertical: 8,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    modalContainer: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      marginBottom: 16,
    },
    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: Scale(20),
    },
    modalHeaderText: {
      color: "black",
      fontWeight: "bold",
      fontSize: Scale(24),
    },
    modalBodyText: {
      color: "black",
      fontWeight: "bold",
      fontSize: Scale(16),
      textAlign: "center",
    },
    modalButtonRow: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: Scale(10),
      marginTop: Scale(40),
      justifyContent: "space-evenly",
    },
    modalButton: {
      borderRadius: Scale(10),
      backgroundColor: "white",
      paddingVertical: Scale(10),
      paddingHorizontal: Scale(20),
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "black",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalCancelText: {
      color: "black",
      fontWeight: "bold",
      fontSize: Scale(14),
    },
    modalLogoutText: {
      color: "red",
      fontWeight: "bold",
      fontSize: Scale(14),
    },
  });

export default CustomSidebarMenu;
