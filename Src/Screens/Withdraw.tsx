import React, { use, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { walletMini, refresh, lefArrow, checkBox } from "../../assets/assets";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { Divider } from "@rneui/base";
import Modal from "react-native-modal";
import CommonTextInput from "../Components/CommonTextInput";
import NewAppHeader from "../Components/NewAppHeader";
import { useContainerScale } from "../hooks/useContainerScale";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { formatToDecimal } from "../Utils/Common";
import {
  deleteBankAccount,
  getBankAccounts,
  withDrawAmount,
  withdrawBalanceConversion,
} from "../Redux/Slice/withdrawSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { set } from "date-fns";
import { getWalletBalance } from "../Redux/Slice/signInSlice";
import { COLORS } from "../Constants/Theme";

const Withdraw = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [walletAmount, setWalletAmount] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState<any | null>(
    null);
  // const amounts = ["₹100", "₹200", "₹500", "₹1000"];
  const amounts = ["100", "200", "500", "1000"];
  const withdrawAmounts = [110, 300, 500, 1000, 2000,5000, 10000,20000,35000];
  const [selectedWithdrawAmounts, setSelectedWithdrawAmounts] = useState(0)
  const actualAmount = walletAmount / 0.03;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [withdrawableAmount, setWithdrawableAmount] = useState(0);
  const [BankAccountModalVisible, setBankAccountModalVisible] = useState(false);
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  const { withdrawBalance, userId, mainWalletBalance } = useSelector(
    (state: RootState) => state.signInSlice
  );
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedBankId, setSelectedBankId] = React.useState<number | null>(
    null
  );
  const [selectedBank, setSelectedBank] = useState<any | null>(null);


  useEffect(() => {
    dispatch(
      getBankAccounts({
        userId: userId,
      })
    );
  }, []);
  const { bankAccountsData } = useSelector(
    (state: RootState) => state.withdrawSlice
  );

  console.log("bankAccountsDataScreenData==>", bankAccountsData);

  const bankName = "Avis Bank of Australia";

  const handleWithDrawAmount = async () => {
    if (!selectedBank) {
      Toast.show({
        type: "error",
        text1: "Please select a bank account",
        position: "top",
      });
      return;
    }
  
    try {
      const resultAction = await dispatch(
        withDrawAmount({
          userId: userId,
          withdrawalAmount: selectedWithdrawAmounts,
          bankName: bankName,
          accountNo: selectedBank.accountNumber,
          ifsc: selectedBank.ifsc,
          holderName: selectedBank.accountHolderName,
          upi: selectedBank.upi,
        })
      );
      unwrapResult(resultAction);
      Toast.show({
        type: "success",
        text1: "Withdrawal request submitted for approval",
        position: "top",
      });
      setWalletAmount(0);
      dispatch(getWalletBalance())
    } catch (error: any) {
      console.log("error", error);
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        position: "top",
      });
    }
  };
  

  // const renderBankAccounts = ({ item }: { item: any }) => {
  //   return (
  //     <View>
  //       <TouchableOpacity
  //         style={{
  //           marginTop: Scale(10),
  //           marginHorizontal: Scale(10),
  //           flexDirection: "row",
  //           alignItems: "center",
  //           justifyContent: "space-between",
  //           borderColor: "#FF4242",
  //           borderWidth: 1,
  //           borderRadius: 10,
  //           padding: Scale(15),
  //           marginVertical: Scale(10),
  //           width: "95%",
  //         }}
  //       >
  //         <View style={{ flexDirection: "row", alignItems: "center" }}>
  //           <Entypo
  //             name={"wallet"}
  //             size={Scale(30)}
  //             color={"white"}
  //             style={{ marginRight: Scale(20) }}
  //           />

  //           <View>
  //             <Text
  //               style={{
  //                 fontSize: Scale(16),
  //                 fontWeight: "bold",
  //                 color: "#fff",
  //               }}
  //             >
  //               {item.accountHolderName}
  //             </Text>
  //             <Text
  //               style={{
  //                 fontSize: Scale(12),
  //                 fontWeight: "bold",
  //                 color: "#fff",
  //               }}
  //             >
  //               {item.accountNumber}
  //             </Text>
  //           </View>
  //         </View>
  //         <View>
  //           <TouchableOpacity
  //             style={{
  //               flexDirection: "row",
  //               alignItems: "center",
  //               bottom: Scale(5),
  //             }}
  //             onPress={()=>
  //               navigation.navigate("AddBankAccount", { bankAccountId: item.id })
  //             }
  //           >
  //             <Entypo
  //               name={"edit"}
  //               size={Scale(14)}
  //               color={"#FF4242"}
  //               style={{ marginRight: Scale(5) }}
  //             />
  //             <View>
  //               <Text
  //                 style={{
  //                   fontSize: Scale(12),
  //                   fontWeight: "bold",
  //                   color: "#FF4242",
  //                 }}
  //               >
  //                 Edit
  //               </Text>
  //             </View>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             style={{
  //               flexDirection: "row",
  //               alignItems: "center",
  //               marginTop: Scale(10),
  //             }}
  //             onPress={() => {
  //               setSelectedBankId(item.id); // store selected bank id
  //               setDeleteModalVisible(true);
  //             }}
  //           >
  //             <AntDesign
  //               name={"delete"}
  //               size={Scale(14)}
  //               color={"#FF4242"}
  //               style={{ marginRight: Scale(5) }}
  //             />
  //           </TouchableOpacity>
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };
  
  const renderBankAccounts = ({ item }: { item: any }) => {
    const isSelected = selectedBank?.id === item.id;
  
    return (
      <TouchableOpacity
        onPress={() => setSelectedBank(item)} // select bank
        style={{
          marginTop: Scale(10),
          marginHorizontal: Scale(10),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: isSelected ? "#fff" : "grey",
          borderWidth: 2,
          borderRadius: 10,
          padding: Scale(15),
          marginVertical: Scale(10),
          width: "95%",
          backgroundColor: "transparent",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Entypo
            name={"wallet"}
            size={Scale(30)}
            color={"white"}
            style={{ marginRight: Scale(20) }}
          />
  
          <View>
            <Text
              style={{
                fontSize: Scale(16),
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {item.accountHolderName}
            </Text>
            <Text
              style={{
                fontSize: Scale(12),
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {item.accountNumber}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              bottom: Scale(5),
            }}
            onPress={() =>
              navigation.navigate("AddBankAccount", { bankAccountId: item.id })
            }
          >
            <Entypo
              name={"edit"}
              size={Scale(14)}
              color={"#fff"}
              style={{ marginRight: Scale(5) }}
            />
            <Text
              style={{
                fontSize: Scale(12),
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: Scale(10),
            }}
            onPress={() => {
              setSelectedBankId(item.id);
              setDeleteModalVisible(true);
            }}
          >
            <AntDesign
              name={"delete"}
              size={Scale(14)}
              color={"#fff"}
              style={{ marginRight: Scale(5) }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  

  const handleDelete = async () => {
    if (!selectedBankId) return;
  
    try {
      const resultAction = await dispatch(
        deleteBankAccount({ id: selectedBankId })
      );
  
      const data = unwrapResult(resultAction);
      console.log("dataDelete===>", data);
  
      setDeleteModalVisible(false);
      setSelectedBankId(null); // reset state
      dispatch(getBankAccounts({ userId: userId }));
  
      Toast.show({
        type: "success",
        text1: "Account deleted successfully",
        position: "top",
      });
    } catch (error) {
      console.error("Error deleting account:", error);
      setDeleteModalVisible(false);
      setSelectedBankId(null);
    }
  };

  const handleWithdrawConversion = async () => {
    // if (!selectedBank) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Please select a bank account",
    //     position: "top",
    //   });
    //   return;
    // }
  
    try {
      const resultAction = await dispatch(
        withdrawBalanceConversion({
          amount: withdrawableAmount,
  transferType: "transfer",
        })
      );
      unwrapResult(resultAction);
      Toast.show({
        type: "success",
        text1: "Withdrawal conversion request submitted for approval",
        position: "top",
      });
      setWalletAmount(0);
      setWithdrawableAmount(0)
      setSelectedAmount(0);
      dispatch(getWalletBalance())
    } catch (error: any) {
      console.log("error", error);
      Toast.show({
        type: "error",
        text1: error.error,
        position: "top",
      });
    }
  };
  

  

  return (  
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <NewAppHeader
        leftIconPress={() => navigation.goBack()}
        centerText={"Withdraw"}
      />
      <ScrollView style={styles.container}>
        {/* Wallet Header */}
        <LinearGradient
          colors={[COLORS.linearOne,COLORS.linearTwo]}
          style={styles.walletHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.walletTopRow}>
            <View style={{ flexDirection: "column" }}>
              <View style={styles.walletInfo}>
                <Image source={walletMini} style={styles.iconSmall} />
                <Text style={styles.walletTitle}>Total Wallet</Text>
              </View>
              <View style={styles.amountRow}>
                <Text style={styles.amountText}>
                  ₹ {formatToDecimal(withdrawBalance)}
                </Text>
                <TouchableOpacity
                  onPress={() => 
                    // setBankAccountModalVisible(true);
                  dispatch(getWalletBalance())
                  }
                >
                  <Image source={refresh} style={styles.iconMedium} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Transactions")}
              style={styles.rechargeRecords}
            >
              <Text style={styles.rechargeText}>Recharge{"\n"}records</Text>
              <Image
                source={lefArrow}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={{}}>
            <LinearGradient
              // colors={["black", "transparent"]}
              colors={['#f5eceb', 'transparent']}
              style={{
                // backgroundColor: '#909191',
                borderRadius: 10,
                width: "100%",
                padding: Scale(10),
                marginTop: Scale(10),
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={styles.currentMethod}>Transfer</Text>
                  <Text style={styles.warningText}>
                    Converting to no withdrawal can earn an
                  </Text>
                </View>
                <View style={{ right: Scale(20) }}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsModalVisible(true);
                    }}
                  >
                    <Image
                      source={lefArrow}
                      style={styles.arrowIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        </LinearGradient>

        {/* Amount Box */}
        <View style={styles.amountBox}>
          <Text
            style={{
              fontSize: Scale(20),
              fontWeight: "bold",
              color: "#fff",
              marginVertical: Scale(10),
            }}
          >
            Transfer to bank account
          </Text>

          <View
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              padding: Scale(12),
              marginBottom: Scale(12),
              width: "100%",
              maxHeight: Scale(250),
              flexGrow: 0,
            }}
          >
            <FlatList
    data={bankAccountsData}
    keyExtractor={(item, index) => index.toString()}
    renderItem={renderBankAccounts}
    showsVerticalScrollIndicator={true} 
    scrollEnabled={true} 
  nestedScrollEnabled={true}
    ListFooterComponent={
      <View>
        <TouchableOpacity
          style={{
            padding: Scale(12),
            alignItems: "center",
            alignSelf: "center",
          }}
          onPress={() => navigation.navigate("AddBankAccount")}
        >
          <AntDesign name="plus" size={Scale(30)} color="#fff" />
          <Text
            style={{
              textAlign: "center",
              fontSize: Scale(16),
              color: "#fff",
              fontWeight: "bold",
              marginVertical: Scale(10),
            }}
          >
            Add Bank Account
          </Text>
        </TouchableOpacity>
      </View>
    }
  />
          </View>
        </View>

        {/* Self Service Recharge */}
        <View style={styles.rechargeSection}>
          <Text style={styles.sectionTitle}>Withdrawable Amount</Text>
              <View style={styles.amountChipsRowWithdraw}>
                    {withdrawAmounts.map((amt, i) => {
                      const isSelected = selectedAmount === amt;

                      const withDrawChipContent = (
                        <Text
                          style={[
                            styles.chipText,
                            isSelected && styles.activeChipText,
                          ]}
                        >
                          ₹{amt}
                        </Text>
                      );

                      return (
                        <TouchableOpacity
                          key={i}
                          onPress={() => {
                            // setWithdrawableAmount(amt);
                            setSelectedAmount(amt);
                            setSelectedWithdrawAmounts(amt);
                          }}
                          style={{ borderRadius: Scale(8), overflow: "hidden" }}
                        >
                          {isSelected ? (
                            <LinearGradient
                              colors={[COLORS.linearOne, COLORS.linearTwo]}
                              // start={{ x: 0, y: 0 }}
                              // end={{ x: 1, y: 0 }}
                              style={styles.amountChipWithdraw}
                            >
                              {withDrawChipContent}
                            </LinearGradient>
                          ) : (
                            <View style={styles.amountChipWithdraw}>{withDrawChipContent}</View>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
          <Text style={[styles.sectionTitle, { marginVertical: Scale(20) }]}>
            Actual amount received:₹ {actualAmount}{" "}
          </Text>
          <Divider style={{ marginVertical: Scale(10) }} />
          <Text
            style={{
              fontSize: Scale(16),
              fontWeight: "bold",
              color: "#fff",
              marginVertical: Scale(10),
            }}
          >
            Withdrawal will be charged with 3% of withdraw fee will be charged.
          </Text>
          <Text
            style={{
              fontSize: Scale(16),
              fontWeight: "bold",
              color: "#fff",
              marginVertical: Scale(10),
            }}
          >
            Each user could withdraw (3) times per day.
          </Text>
          <Text
            style={{
              fontSize: Scale(16),
              fontWeight: "bold",
              color: "#fff",
              marginVertical: Scale(10),
            }}
          >
            Note: Withdrawal may be delayed due to bank issues. In this case,
            the withdrawn amount will be returned to your wallet. Thank you for
            your patience.
          </Text>
          <Text
            style={{
              fontSize: Scale(16),
              fontWeight: "bold",
              color: "#fff",
              marginVertical: Scale(10),
            }}
          >
            Our platforms withdrawal delay compensation polices.
          </Text>
          <Text
            style={{
              fontSize: Scale(16),
              fontWeight: "bold",
              color: "#fff",
              marginVertical: Scale(10),
            }}
          >
            1. Within 24 hours to 72 hours - 5% of withdrawal amount.
          </Text>
          <Text
            style={{
              fontSize: Scale(16),
              fontWeight: "bold",
              color: "#fff",
              marginVertical: Scale(10),
            }}
          >
            2. Within 72 hours to 168 hours - 30% of withdrawal amount.
          </Text>
          <Text
            style={{
              fontSize: Scale(16),
              fontWeight: "bold",
              color: "#fff",
              marginVertical: Scale(10),
            }}
          >
            Over 168 hours - 100% compensation of withdrawal amount.
          </Text>
          <Text
            style={{
              fontSize: Scale(16),
              fontWeight: "bold",
              color: "#fff",
              marginVertical: Scale(10),
            }}
          >
            Note: No Compensation of payment within 24 hours. Compensation will
            be added to user's wallet after his bank account's credited. To
            claim the compensation, user have to contact customer service.
          </Text>
        </View>
        {/* Modal  */}
        <View>
          <Modal
            isVisible={isModalVisible}
            animationIn="flipInY"
            animationOut="flipOutY"
            animationInTiming={500}
            animationOutTiming={500}
            style={{
              justifyContent: "flex-end",
              margin: 0,
            }}
          >
            <KeyboardAvoidingView
              style={{ flex: 1, justifyContent: "flex-end" }}
            >
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: 10,
                  padding: 20,
                  // marginBottom: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: Scale(20),
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: Scale(16),
                    }}
                  >
                    Transfer
                  </Text>
                  <TouchableOpacity onPress={() =>{ 
                    setIsModalVisible(false)
                    setWithdrawableAmount(0)
                    setSelectedAmount(0);
      
                  }}>
                    <AntDesign
                      name={"delete"}
                      size={Scale(18)}
                      color={"white"}
                      style={{ marginRight: Scale(10) }}
                    />
                  </TouchableOpacity>
                </View>

                {/* TextInput wrapper */}
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    marginTop: 10,
                  }}
                >
                  <TextInput
                    style={{
                      fontSize: Scale(16),
                      color: "white",
                      fontWeight: "bold",
                      outlineWidth: 0,
                    }}
                    placeholder="Enter Withdrawable amount"
                    placeholderTextColor="#999"
                    value={withdrawableAmount}
                    onChangeText={(text) => setWithdrawableAmount(text)}
                    keyboardType="numeric"
                    maxLength={10}
                  />
                </View>
                <View
                  style={{ marginTop: Scale(20), marginHorizontal: Scale(2) }}
                >
                  <View style={styles.amountChipsRow}>
                    {amounts.map((amt, i) => {
                      const isSelected = selectedAmount === amt;

                      const chipContent = (
                        <Text
                          style={[
                            styles.chipText,
                            isSelected && styles.activeChipText,
                          ]}
                        >
                          ₹{amt}
                        </Text>
                      );

                      return (
                        <TouchableOpacity
                          key={i}
                          onPress={() => {
                            setWithdrawableAmount(amt);
                            setSelectedAmount(amt);
                          }}
                          style={{ borderRadius: Scale(8), overflow: "hidden" }}
                        >
                          {isSelected ? (
                            <LinearGradient
                              colors={[COLORS.linearOne, COLORS.linearTwo]}
                              // start={{ x: 0, y: 0 }}
                              // end={{ x: 1, y: 0 }}
                              style={styles.amountChip}
                            >
                              {chipContent}
                            </LinearGradient>
                          ) : (
                            <View style={styles.amountChip}>{chipContent}</View>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                <Text
                  style={{
                    marginTop: Scale(10),
                    marginHorizontal: Scale(10),
                    color: "white",
                    fontSize: Scale(12),
                    fontWeight: "500",
                  }}
                >
                  After clicking Confirm, your withdrawable balance will be
                  converted into Recharge wallet and you will the corresponding
                  bonus.
                </Text>
                <Divider
                  style={{
                    marginVertical: Scale(20),
                    marginHorizontal: Scale(10),
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: Scale(12),
                      fontWeight: "500",
                    }}
                  >
                    Will get:
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: Scale(16),
                      fontWeight: "bold",
                      marginLeft: Scale(5),
                    }}
                  >
                    ₹ {withdrawableAmount}
                  </Text>
                </View>
                <View
                  style={{ marginTop: Scale(10), marginHorizontal: Scale(10) }}
                >
                  <TouchableOpacity 
                  onPress={handleWithdrawConversion}
                  style={styles.buttonWrapper}>
                    <LinearGradient
                      colors={[COLORS.linearOne, COLORS.linearTwo]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.signInButton}
                    >
                      <Text style={styles.signInButtonText}>Withdraw</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </View>

        {/* Bank account details modal  */}

        <View>
          <Modal
            isVisible={BankAccountModalVisible}
            animationIn="flipInY"
            animationOut="flipOutY"
            animationInTiming={500}
            animationOutTiming={500}
            style={{
              justifyContent: "flex-end",
              margin: 0,
            }}
          >
            <KeyboardAvoidingView
              style={{ flex: 1, justifyContent: "flex-end" }}
            >
              <View
                style={{
                  backgroundColor: "#360400",
                  borderRadius: 10,
                  padding: 20,
                  // marginBottom: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: Scale(20),
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: Scale(16),
                    }}
                  >
                    Choose a bank account
                  </Text>
                  <TouchableOpacity
                    onPress={() => setBankAccountModalVisible(false)}
                  >
                    <AntDesign
                      name={"close"}
                      size={Scale(18)}
                      color={"white"}
                      style={{ marginRight: Scale(10) }}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={{
                    marginTop: Scale(10),
                    marginHorizontal: Scale(10),
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderColor: "#FF4242",
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: Scale(15),
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Entypo
                      name={"wallet"}
                      size={Scale(30)}
                      color={"white"}
                      style={{ marginRight: Scale(20) }}
                    />

                    <View>
                      <Text
                        style={{
                          fontSize: Scale(16),
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                      >
                        Beckham
                      </Text>
                      <Text
                        style={{
                          fontSize: Scale(12),
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                      >
                        *********1234
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      bottom: Scale(5),
                    }}
                  >
                    <Entypo
                      name={"edit"}
                      size={Scale(14)}
                      color={"#FF4242"}
                      style={{ marginRight: Scale(5) }}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: Scale(12),
                          fontWeight: "bold",
                          color: "#FF4242",
                        }}
                      >
                        Edit
                      </Text>
                    </View>
                  </TouchableOpacity>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AddBankAccount");
                    setBankAccountModalVisible(false);
                  }}
                  style={{
                    backgroundColor: "#360400",
                    borderRadius: 10,
                    padding: Scale(12),
                    marginVertical: Scale(10),
                    alignItems: "center",
                    alignSelf: "center",
                    width: "100%",
                  }}
                >
                  <AntDesign name="plus" size={Scale(30)} color="#FF4242" />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: Scale(16),
                      color: "#FF4242",
                      fontWeight: "bold",
                      marginVertical: Scale(10),
                    }}
                  >
                    Add Bank Account
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </View>
        <Toast />
      </ScrollView>
      <Modal
        isVisible={deleteModalVisible}
        animationIn="flipInX"
        animationOut="flipOutX"
        backdropOpacity={0.5}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Delete?</Text>
          </View>
          <Text style={styles.modalBodyText}>
            Are you sure you want to Delete Account Details?
          </Text>
          <View style={styles.modalButtonRow}>
            <TouchableOpacity
              onPress={() => setDeleteModalVisible(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.modalButton}>
              <Text style={styles.modalLogoutText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{ marginBottom: Scale(10) }}>
        <TouchableOpacity
          style={[
            styles.buttonWrapper,
            // {
            //   opacity:
            //     !selectedWithdrawAmounts || selectedWithdrawAmounts >= 0 ? 0.5 : 1,
            // },
          ]}
          // disabled={!selectedWithdrawAmounts || selectedWithdrawAmounts >= 0}
          onPress={handleWithDrawAmount}
        >
          <LinearGradient
            colors={[COLORS.linearOne, COLORS.linearTwo]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.signInButton}
          >
            <Text style={styles.signInButtonText}>Withdraw</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primary,
      padding: Scale(10),
    },
    walletHeader: {
      borderRadius: 12,
      padding: Scale(16),
      marginBottom: Scale(12),
    },
    walletTopRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    walletInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconSmall: {
      width: Scale(18),
      height: Scale(18),
      marginRight: Scale(6),
    },
    walletTitle: {
      fontSize: Scale(16),
      color: "#fff",
      fontWeight: "bold",
    },
    rechargeRecords: {
      alignItems: "center",
      flexDirection: "row",
    },
    rechargeText: {
      color: "#fff",
      fontSize: Scale(14),
      textAlign: "center",
      fontWeight: "bold",
    },
    arrowIcon: {
      width: Scale(14),
      height: Scale(14),
      transform: [{ rotate: "180deg" }],
      marginHorizontal: Scale(10),
    },
    amountRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: Scale(12),
    },
    amountText: {
      fontSize: Scale(26),
      color: "#fff",
      fontWeight: "bold",
      maxWidth: Scale(150),
    },
    iconMedium: {
      width: Scale(30),
      height: Scale(30),
      marginLeft: Scale(10),
    },
    currentMethod: {
      marginTop: Scale(10),
      color: COLORS.primary,
      fontWeight: "bold",
      fontSize: Scale(16)

    },
    warningText: {
      color: COLORS.primary,
      fontSize: Scale(12),
      marginTop: Scale(4),
      width: Scale(300),
      fontWeight:'600'
    },
    amountBox: {
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      padding: Scale(12),
      marginBottom: Scale(12),
      borderWidth: 0.2,
      borderColor: COLORS.white,
    },
    amountInput: {
      color: "#fff",
      fontSize: Scale(20),
      fontWeight: "bold",
      marginBottom: Scale(4),
    },
    rangeText: {
      color: "#fff",
      fontSize: Scale(12),
      marginBottom: Scale(10),
    },
    amountChipsRow: {
      flexDirection: "row",
      // flexWrap: 'wrap',
      gap: Scale(5),
    },
    amountChipsRowWithdraw: {
      flexDirection: "row",
      flexWrap: 'wrap',
      gap: Scale(15),
    },
    amountChipWithdraw: {
      backgroundColor: COLORS.tableTopColor,
      borderRadius: 8,
      paddingVertical: Scale(6),
      paddingHorizontal: Scale(16),
      marginBottom: Scale(8),
      width: Scale(110),
      marginTop: Scale(10),
    },
    amountChip: {
      backgroundColor: COLORS.tableTopColor,
      borderRadius: 8,
      paddingVertical: Scale(6),
      paddingHorizontal: Scale(16),
      marginBottom: Scale(8),
      width: Scale(85),
      marginTop: Scale(10),
    },
    chipText: {
      color: "#fff",
      fontSize: Scale(14),
      textAlign: "center",
      paddingHorizontal: Scale(4),
      paddingVertical: Scale(4),
      fontWeight: "bold",
    },
    activeChip: {
      backgroundColor: "linear-gradient(to right, #FF4242, #f6c976ff)",
    },
    activeChipText: {
      color: "#fff",
      fontWeight: "bold",
    },
    rechargeSection: {
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      padding: Scale(12),
      marginBottom: Scale(12),
      borderColor: COLORS.white,
      borderWidth: 0.2,
    },
    sectionTitle: {
      color: "#fff",
      fontSize: Scale(16),
      fontWeight: "bold",
      marginBottom: Scale(8),
    },
    bankOption: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#333",
      borderRadius: 10,
      padding: Scale(10),
      marginTop: Scale(10),
    },
    bankOptionView: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#47231E",
      borderWidth: 1,
      borderRadius: 10,
      padding: Scale(10),
      marginVertical: Scale(10),
    },
    paytmLogo: {
      width: Scale(28),
      height: Scale(28),
      marginRight: Scale(10),
    },
    bankText: {
      color: "#fff",
      fontSize: Scale(14),
      fontWeight: "500",
    },
    attentionBox: {
      backgroundColor: "#6E4B44",
      padding: Scale(10),
      borderRadius: 8,
      marginBottom: Scale(10),
    },
    attentionTitle: {
      fontWeight: "bold",
      color: "#fff",
      fontSize: Scale(16),
    },
    attentionText: {
      color: "#fff",
      fontSize: Scale(14),
      marginVertical: Scale(5),
      textAlign: "justify",
    },
    redWarningBox: {
      backgroundColor: "#5A1414",
      padding: Scale(10),
      borderRadius: 8,
      marginVertical: Scale(10),
    },
    redWarningText: {
      color: "#FF6464",
      fontSize: Scale(14),
      textAlign: "justify",
      marginVertical: Scale(10),
      lineHeight: Scale(25),
      fontWeight: "bold",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#442727",
      borderColor: "#FF4242",
      borderWidth: 3,
      borderRadius: Scale(12),
      height: Scale(48),
      paddingHorizontal: Scale(10),
      width: "100%",
    },
    textInput: {
      flex: 1,
      fontSize: Scale(16),
      color: "white",
      fontWeight: "bold",
      outlineWidth: 0,
    },
    optionContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    checkIcon: {
      width: Scale(20),
      height: Scale(20),
      position: "absolute",
      right: Scale(20),
    },
    buttonWrapper: {
      marginTop: Scale(10),
      marginHorizontal: Scale(20),
    },
    signInButton: {
      paddingVertical: Scale(14),
      borderRadius: Scale(25),
      alignItems: "center",
    },
    signInButtonText: {
      color: "#fff",
      fontSize: Scale(16),
      fontWeight: "bold",
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

export default Withdraw;
