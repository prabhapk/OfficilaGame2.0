// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,

//   StatusBar,
// } from 'react-native';
// import { useContainerScale } from '../hooks/useContainerScale';
// import NewAppHeader from '../Components/NewAppHeader';
// import { COLORS } from '../Constants/Theme';

// interface RewardTier {
//   id: number;
//   people: number;
//   deposit: number;
//   bonus: number;
// }

// const InvitationRulesScreen = ({ navigation }: { navigation: any }) => {
//   const { Scale, verticalScale } = useContainerScale();
//   const styles = createStyles(Scale);

//   const rewardTiers: RewardTier[] = [
//     { id: 1, people: 1, deposit: 500, bonus: 100 },
//     { id: 2, people: 3, deposit: 500, bonus: 300 },
//     { id: 3, people: 10, deposit: 500, bonus: 1000 },
//     { id: 4, people: 30, deposit: 500, bonus: 3000 },
//     { id: 5, people: 70, deposit: 500, bonus: 7000 },
//     { id: 6, people: 200, deposit: 500, bonus: 20000 },
//     { id: 7, people: 500, deposit: 500, bonus: 50000 },
//     { id: 8, people: 1000, deposit: 500, bonus: 100000 },
//     { id: 9, people: 5000, deposit: 500, bonus: 500000 },
//     { id: 10, people: 10000, deposit: 500, bonus: 1000000 },
//     { id: 11, people: 20000, deposit: 500, bonus: 2000000 },
//   ];

//   const rules = [
//     "Only when the number of invited accounts is reached and each account can meet the recharge amount can you receive the bonus.",
//     "The invitation account meets the requirements, but the recharge amount of the account does not meet the requirements, and the bonus cannot be claimed.",
//     "Please claim the event bonus within the event period. All bonuses will be cleared after the event expires.",
//     "Please complete the task within the event period. After the event expires, the task will be invalid.",
//   ];

//   const handleBackPress = () => {
//     navigation.goBack();
//   };

//   const handleCustomerService = () => {
//     // Navigate to customer service or show help
//     console.log('Customer service pressed');
//   };

//   const formatNumber = (num: number) => {
//     if (num >= 1000000) {
//       return `${(num / 1000000).toFixed(0)},00,000`;
//     } else if (num >= 100000) {
//       return `${(num / 100000).toFixed(0)},00,000`;
//     } else if (num >= 10000) {
//       return `${(num / 10000).toFixed(0)},000`;
//     } else if (num >= 1000) {
//       return `${(num / 1000).toFixed(0)},000`;
//     }
//     return num.toString();
//   };

//   const renderRewardRow = (tier: RewardTier) => (
//     <View key={tier.id} style={styles.tableRow}>
//       <View style={styles.tableCell}>
//         <Text style={styles.tableCellText}>{tier.people} People</Text>
//       </View>
//       <View style={styles.tableCell}>
//         <Text style={styles.tableCellText}>₹{tier.deposit}</Text>
//       </View>
//       <View style={styles.tableCell}>
//         <Text style={styles.tableCellText}>₹{formatNumber(tier.bonus)}</Text>
//       </View>
//     </View>
//   );

//   const renderRule = (rule: string, index: number) => (
//     <View key={index} style={styles.ruleItem}>
//       <Text style={styles.bulletPoint}>*</Text>
//       <Text style={styles.ruleText}>{rule}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
//       {/* Header */}
//       <NewAppHeader
//         leftIconPress={handleBackPress}
//         centerText="Invitation Rules"
//         rightIcon={require('../../assets/customer-service.webp')}
//         rightIconPress={handleCustomerService}
//       />

//       <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//         {/* Introductory Text */}
//         <View style={styles.introSection}>
//           <Text style={styles.introText}>
//             Invite friends and recharge to get additional platform rewards!
//           </Text>
//           <Text style={styles.introSubText}>
//             After being claimed, the rewards will be directly distributed to the wallet balance within 10 minutes.
//           </Text>
//         </View>

//         {/* Rewards Table */}
//         <View style={styles.tableContainer}>
//           {/* Table Header */}
//           <View style={styles.tableHeader}>
//             <View style={styles.tableHeaderCell}>
//               <Text style={styles.tableHeaderText}>Invite Account</Text>
//             </View>
//             <View style={styles.tableHeaderCell}>
//               <Text style={styles.tableHeaderText}>Deposit Account</Text>
//             </View>
//             <View style={styles.tableHeaderCell}>
//               <Text style={styles.tableHeaderText}>Bonus</Text>
//             </View>
//           </View>

//           {/* Table Rows */}
//           {rewardTiers.map(renderRewardRow)}
//         </View>

//         {/* Rules Section */}
//         <View style={styles.rulesSection}>
//           <View style={styles.rulesHeader}>
//             <Text style={styles.rulesHeaderText}>Rules</Text>
//           </View>
//           <View style={styles.rulesContent}>
//             {rules.map(renderRule)}
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const createStyles = (Scale: any) =>
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: COLORS.primary,
//     },
//     scrollView: {
//       flex: 1,
//       backgroundColor: COLORS.primary,
//     },
//     introSection: {
//       backgroundColor: COLORS.primary,
//       margin: Scale(20),
//       padding: Scale(20),
//       borderRadius: Scale(12),
//       borderWidth: 1,
//       borderColor: '#fff',
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 3,
//     },
//     introText: {
//       fontSize: Scale(16),
//       fontWeight: 'bold',
//       color: '#fff',
//       marginBottom: Scale(10),
//       lineHeight: Scale(22),
//     },
//     introSubText: {
//       fontSize: Scale(14),
//       color: '#ff5f5f',
//       lineHeight: Scale(20),
//     },
//     tableContainer: {
//       marginHorizontal: Scale(20),
//       marginBottom: Scale(20),
//       borderRadius: Scale(12),
//       overflow: 'hidden',
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 3,
//     },
//     tableHeader: {
//       flexDirection: 'row',
//       backgroundColor: COLORS.tableTopColor,
//     },
//     tableHeaderCell: {
//       flex: 1,
//       paddingVertical: Scale(15),
//       paddingHorizontal: Scale(10),
//       alignItems: 'center',
//       borderRightWidth: 1,
//       borderRightColor: COLORS.tableTopColor,
//     },
//     tableHeaderText: {
//       fontSize: Scale(14),
//       fontWeight: 'bold',
//       color: '#fff',
//       textAlign: 'center',
//     },
//     tableRow: {
//       flexDirection: 'row',
//       backgroundColor: '#F8F9FA',
//       borderBottomWidth: 1,
//       borderBottomColor: '#E9ECEF',
//     },
//     tableCell: {
//       flex: 1,
//       paddingVertical: Scale(12),
//       paddingHorizontal: Scale(10),
//       alignItems: 'center',
//       borderRightWidth: 1,
//       borderRightColor: '#E9ECEF',
//     },
//     tableCellText: {
//       fontSize: Scale(13),
//       color: '#333',
//       textAlign: 'center',
//       fontWeight: '500',
//     },
//     rulesSection: {
//       marginHorizontal: Scale(20),
//       marginBottom: Scale(20),
//       borderRadius: Scale(12),
//       overflow: 'hidden',
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 3,
//     },
//     rulesHeader: {
//       backgroundColor: COLORS.tableTopColor,
//       paddingVertical: Scale(15),
//       paddingHorizontal: Scale(20),
//     },
//     rulesHeaderText: {
//       fontSize: Scale(16),
//       fontWeight: 'bold',
//       color: '#fff',
//     },
//     rulesContent: {
//       backgroundColor: COLORS.primary,
//       padding: Scale(20),
//       borderWidth: 2,
//       borderColor: COLORS.tableTopColor,
//     },
//     ruleItem: {
//       flexDirection: 'row',
//       marginBottom: Scale(12),
//       alignItems: 'flex-start',
//     },
//     bulletPoint: {
//       fontSize: Scale(16),
//       color: '#fff',
//       marginRight: Scale(10),
//       marginTop: Scale(2),
//     },
//     ruleText: {
//       flex: 1,
//       fontSize: Scale(14),
//       color: '#fff',
//       lineHeight: Scale(20),
//     },
//   });

// export default InvitationRulesScreen;

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
  Modal,
  Linking,
} from 'react-native';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import {
  bannerLuna1,
  CommissionIcon,
  graphIcon,
  inviteRecharge,
  invitetop,
  inviteHero,
  rightTime,
  agentLevels,
  inviteScreenTopImage,
  inviteFriends,
  earnCommissions,
  commissionRules,
  referalLevel,
  referAndEarn,
  fbIcon,
  telegramIcon,
  instagram,
  whatsappIcon,
  casionCommissionRate,
  colorCommissionRate,
  teamSize,
  threeDigitCommissionRate
} from '../../assets/assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { useNavigation } from '@react-navigation/native';
import { useContainerScale } from '../hooks/useContainerScale';
import NewAppHeader from '../Components/NewAppHeader';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';
import { COLORS } from '../Constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import AgencyScreen from './AgencyScreen';
const InvitationRulesScreen = ({route}: any) => {
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const navigation = useNavigation();
  const handleDateChange = (
    event: any,
    selectedDate: Date | undefined,
    type: 'start' | 'end',
  ) => {
    if (selectedDate) {
      setDateRange(prev => ({ ...prev, [type]: selectedDate }));
    }
    type === 'start' ? setShowStartPicker(false) : setShowEndPicker(false);
  };
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);

  const dateOptions = ['Today', 'Yesterday', '3days', '7days', '14days'];
  const { isLoggedIn, userDetails, isAgent } = useSelector(
    (state: RootState) => state.signInSlice,
  );

  const handleInvite = async () => {
    if (isLoggedIn) {
      setShowShareModal(true);
    } else {
      navigation.navigate('SignInScreen');
    }
  };

  const shareUrl = 'https://yourapp.com/invite?code=' + (userDetails.referralCode || '');
  const shareMessage = `Join me on this amazing app! Use my referral code: ${userDetails.referralCode || ''}\n\nDownload the app: ${shareUrl}`;

  const handleFacebookShare = async () => {
    try {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      await Linking.openURL(facebookUrl);
      setShowShareModal(false);
    } catch (error) {
      console.log('Error sharing to Facebook:', error);
      Alert.alert('Error', 'Unable to share to Facebook');
    }
  };

  const handleTelegramShare = async () => {
    try {
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareMessage)}`;
      await Linking.openURL(telegramUrl);
      setShowShareModal(false);
    } catch (error) {
      console.log('Error sharing to Telegram:', error);
      Alert.alert('Error', 'Unable to share to Telegram');
    }
  };

  const handleWhatsAppShare = async () => {
    try {
      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(shareMessage)}`;
      await Linking.openURL(whatsappUrl);
      setShowShareModal(false);
    } catch (error) {
      console.log('Error sharing to WhatsApp:', error);
      Alert.alert('Error', 'Unable to share to WhatsApp');
    }
  };

  const handleInstagramShare = async () => {
    try {
      // Instagram doesn't support direct URL sharing, so we'll copy the link
      await Linking.openURL('instagram://');
      Alert.alert('Instagram', 'Please paste the link in your Instagram story or post');
      setShowShareModal(false);
    } catch (error) {
      console.log('Error opening Instagram:', error);
      Alert.alert('Error', 'Instagram app not found');
    }
  };

  const handleCopyLink = async () => {
    try {
      await Clipboard.setStringAsync(shareUrl);
      Alert.alert('Copied!', 'Link copied to clipboard');
      setShowShareModal(false);
    } catch (error) {
      console.log('Error copying link:', error);
      Alert.alert('Error', 'Unable to copy link');
    }
  };

  const isProfile = route?.params?.isProfile;
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.linearTwo}} 
    >
       <NewAppHeader
        leftIconPress={() => navigation.goBack()}
        centerText={'Invitation rules and guidelines'}
      />

    <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
   

        {/* Hero Image and Description Section */}
        <View style ={{
             backgroundColor: COLORS.primary,
    paddingHorizontal: Scale(20),
    paddingTop: Scale(20),
    paddingBottom: Scale(40),
        }}>

        <View style={styles.heroSection}>
          <Image
          contentFit="cover"
            source={inviteScreenTopImage}
            style={styles.heroBackgroundImage}
          />
  
        </View>

        {/* Invitation Code Section */}
        {/* <View style={styles.invitationSection}>
          <View style={styles.invitationHeader}>
            <Text style={styles.diamond}>♦</Text>
            <Text style={styles.invitationLabel}>My Invitation Code</Text>
            <Text style={styles.diamond}>♦</Text>
          </View>
          
          <View style={styles.codeContainer}>
            <Text style={styles.invitationCode}>
              {isLoggedIn ? userDetails.referralCode : 'M85LUU28'}
            </Text>
            <View style={styles.codeActions}>
              <TouchableOpacity style={styles.copyButton} onPress={handleInvite}>
                <Text style={styles.copyButtonText}>COPY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> */}


        {/* Motivational Section */}
        <View style={styles.motivationalSection}>
        <Image
         contentFit= "fill"
        source={referAndEarn} style={styles.agentLevelsImage} />
        <Image
      contentFit= "contain"
        source={referalLevel} style={[styles.agentLevelsImage, {bottom: 10}]} />
        <Image
    contentFit= "contain"
        source={inviteFriends} style={[styles.agentLevelsImage, {marginTop: Scale(10)}]} />
        <Image
         contentFit= "contain"
        source={earnCommissions} style={[styles.agentLevelsImage, {marginTop: Scale(20)}]} />
        <Image
         contentFit= "contain"
        source={commissionRules} style={[styles.agentLevelsImage, {marginTop: Scale(20)}]} />
        </View>

        <View style={styles.motivationalSection}>
        <Image
         contentFit= "fill"
        source={teamSize} style={styles.agentLevelsImage} />
        <Image
      contentFit= "fill"
        source={threeDigitCommissionRate} style={[styles.agentLevelsImage, {marginTop: Scale(10)}]} />
        <Image
    contentFit= "fill"
        source={casionCommissionRate} style={[styles.agentLevelsImage, {marginTop: Scale(10)}]} />
        <Image
         contentFit= "fill"
        source={colorCommissionRate} style={[styles.agentLevelsImage, {marginTop: Scale(20)}]} />
        </View>

      
      {/* </LinearGradient> */}
      </View>
      {showStartPicker && (
        <DateTimePicker
          value={dateRange.start}
          mode="date"
          display="default"
          onChange={(e, date) => handleDateChange(e, date, 'start')}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={dateRange.end}
          mode="date"
          display="default"
          onChange={(e, date) => handleDateChange(e, date, 'end')}
        />
      )}

      {/* Custom Share Modal */}
      <Modal
        visible={showShareModal}
        transparent={true}
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
              <TouchableOpacity style={styles.shareOption} onPress={handleFacebookShare}>
                <View style={styles.shareIcon}>
                  {/* <Text style={styles.shareIconText}>f</Text> */}
                  <Image source={fbIcon} 
                  style ={{
                    height: Scale(70),
                    width: Scale(70),
                  }}
                  />

                </View>
                <Text style={styles.shareOptionText}>Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareOption} onPress={handleTelegramShare}>
                <View style={styles.shareIcon}>
                 <Image source={telegramIcon} 
                  style ={{
                    height: Scale(65),
                    width: Scale(65),
                  }}
                  />

                </View>
                <Text style={styles.shareOptionText}>Telegram</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareOption} onPress={handleWhatsAppShare}>
                <View style={styles.shareIcon}>
                 <Image source={whatsappIcon} 
                  style ={{
                    height: Scale(50),
                    width: Scale(50),
                    borderRadius: Scale(10),
                  }}
                  />
                </View>
                <Text style={styles.shareOptionText}>WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareOption} onPress={handleInstagramShare}>
                <View style={styles.shareIcon}>
               <Image source={instagram} 
                  style ={{
                    height: Scale(45),
                    width: Scale(45),
                  }}
                  />
                </View>
                <Text style={styles.shareOptionText}>Instagram</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareOption} onPress={handleCopyLink}>
                <View style={[styles.shareIcon, { backgroundColor: '#007AFF' }]}>
                  <Text style={styles.shareIconText}>🔗</Text>
                </View>
                <Text style={styles.shareOptionText}>Copy Link</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
        </ScrollView>
        {/* ) : ( */}
         
          <AgencyScreen navigation={navigation} />
      
      {/* )} */}
    </View>
  );
};

export default InvitationRulesScreen;

const createStyles = (Scale: any) => StyleSheet.create({
  // Gradient Background
  gradientBackground: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: Scale(20),
    paddingTop: Scale(20),
    paddingBottom: Scale(40),
  },
  
  // Logo Section
  logoSection: {
    marginTop: Scale(20),
    marginBottom: Scale(20),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: Scale(50),
    height: Scale(50),
    backgroundColor: '#00ff88',
    borderRadius: Scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Scale(15),
    position: 'relative',
  },
  logoText: {
    fontSize: Scale(20),
    fontWeight: 'bold',
    color: '#fff',
  },
  crownText: {
    position: 'absolute',
    top: -Scale(5),
    right: -Scale(5),
    fontSize: Scale(12),
  },
  logoTextContainer: {
    flexDirection: 'column',
  },
  bhauText: {
    fontSize: Scale(28),
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: Scale(2),
  },
  lotteryText: {
    fontSize: Scale(16),
    color: '#fff',
    fontWeight: '400',
  },
  
  // Welcome Section
  welcomeSection: {
    marginBottom: Scale(30),
  },
  welcomeText: {
    fontSize: Scale(24),
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#00aaff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  welcomeSubText: {
    fontSize: Scale(24),
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#00aaff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  
  // Hero Section
  heroSection: {
 
  },
  heroBackgroundImage: {
    width: '100%',
    height:500,
    justifyContent: 'center',
    // position: 'absolute',
    // right: -100,
    // top: -30,
  },
  heroContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Scale(20),
    paddingVertical: Scale(20),
  },
  descriptionContainer: {
    flex: 1,

    padding: Scale(15),
    marginRight: Scale(20),
    width:"70%",
  },
  descriptionText: {
    fontSize: Scale(16),
    color: '#fff',
    lineHeight: Scale(20),
    marginBottom: Scale(15),
  },
  growTogetherText: {
    fontSize: Scale(18),
    fontWeight: 'bold',
    color: '#ffaa00',
  },
  
  // Contact Section
  contactSection: {
    flexDirection: 'row',
    marginBottom: Scale(25),
    alignItems: 'center',
    marginTop: Scale(20),
  },
  contactEmailBar: {
   
    backgroundColor: '#1e4d72',
    borderRadius: Scale(25),
    paddingVertical: Scale(12),
    paddingHorizontal: Scale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  envelopeIcon: {
    fontSize: Scale(16),
    marginRight: Scale(8),
  },
  contactLabel: {
    fontSize: Scale(12),
    color: '#fff',
    marginRight: Scale(5),
  },
  contactEmail: {
    fontSize: Scale(12),
    color: '#fff',
    fontWeight: 'bold',
  },
  rulesButton: {
    marginLeft: Scale(10),
  },
  registerGradient: {
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  rulesIcon: {
    fontSize: Scale(16),
    marginRight: Scale(8),
  },
  rulesText: {
    fontSize: Scale(12),
    color: '#fff',
    fontWeight: 'bold',
  },
  
  // Invitation Section
  invitationSection: {
    marginBottom: Scale(30),
    marginTop: Scale(20),
  },
  invitationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Scale(15),
  },
  diamond: {
    fontSize: Scale(12),
    color: '#fff',
    marginHorizontal: Scale(8),
  },
  invitationLabel: {
    fontSize: Scale(14),
    color: '#fff',
    fontWeight: 'bold',
  },
  codeContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: Scale(15),
    paddingVertical: Scale(20),
    paddingHorizontal: Scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderStyle: 'dashed',
    borderWidth: Scale(2),
    borderColor: '#fff',
  },
  invitationCode: {
    fontSize: Scale(24),
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: Scale(2),
  },
  codeActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyButton: {
    backgroundColor: COLORS.primary,
    borderRadius: Scale(20),
    paddingVertical: Scale(8),
    paddingHorizontal: Scale(20),
    marginRight: Scale(10),
    borderColor: COLORS.white,
    borderWidth: 1
  },
  copyButtonText: {
    fontSize: Scale(12),
    color: '#fff',
    fontWeight: 'bold',
  },
  refreshButton: {
    width: Scale(35),
    height: Scale(35),
    backgroundColor: '#00ff88',
    borderRadius: Scale(17.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshIcon: {
    fontSize: Scale(16),
  },
  
  // Benefits Section
  benefitsSection: {
    flexDirection: 'row',
    marginBottom: Scale(30),
  },
  agentBenefitsButton: {
    flex: 1,
    backgroundColor: '#ff6b35',
    borderRadius: Scale(15),
    paddingVertical: Scale(15),
    marginRight: Scale(10),
    alignItems: 'center',
  },
  agentCommissionButton: {
    flex: 1,
    backgroundColor: '#00aaff',
    borderRadius: Scale(15),
    paddingVertical: Scale(15),
    marginLeft: Scale(10),
    alignItems: 'center',
  },
  benefitsButtonText: {
    fontSize: Scale(14),
    color: '#fff',
    fontWeight: 'bold',
  },
  
  // Motivational Section
  motivationalSection: {
    marginBottom: Scale(30),
  },
  motivationalTitle: {
    fontSize: Scale(20),
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    textShadowColor: '#ff6b35',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: Scale(10),
  },
  motivationalSubtitle: {
    fontSize: Scale(14),
    color: '#fff',
    textAlign: 'center',
    marginBottom: Scale(15),
  },
  starsContainer: {
    alignItems: 'center',
  },
  stars: {
    fontSize: Scale(20),
  },
  
  // Footer Section
  footerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: Scale(14),
    color: '#fff',
    fontWeight: 'bold',
  },
  floatingCube: {
    width: Scale(40),
    height: Scale(40),
    backgroundColor: '#00ff88',
    borderRadius: Scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cubeText: {
    fontSize: Scale(20),
  },
  
  // Share Modal Styles (keeping existing)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
    fontWeight: 'bold',
  },
  shareTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 10,
  },
  shareOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  shareOption: {
    alignItems: 'center',
    marginVertical: 10,
    width: '20%',
  },
  shareIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  shareIconText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  shareOptionText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  rightTimeImage:{
    width:"100%",
    height: Scale(200),
  },
  agentLevelsImage:{
    // width:"100%",
    height: Scale(200),
  },
});

