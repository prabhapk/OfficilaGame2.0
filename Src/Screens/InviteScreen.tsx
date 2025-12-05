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
  agentLevels
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
const InviteScreen = ({route}: any) => {
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
  const { isLoggedIn, userDetails } = useSelector(
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
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.linearTwo}} showsVerticalScrollIndicator={false}>
      {isProfile && <NewAppHeader
        leftIconPress={() => navigation.goBack()}
        centerText={'Invite'}
      />}
      
      {/* Gradient Background */}
      <LinearGradient
        colors={['#1a0033', '#00aaff', '#ffd700']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        
        {/* Logo and Title Section */}
        {/* <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoText}>AL</Text>
              <Text style={styles.crownText}>👑</Text>
            </View>
            <View style={styles.logoTextContainer}>
              <Text style={styles.bhauText}>ANNAI</Text>
              <Text style={styles.lotteryText}>LOTTERY</Text>
            </View>
          </View>
        </View> */}

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome to join</Text>
          <Text style={styles.welcomeSubText}>ANNAI LOTTERY AGENT!</Text>
        </View>

        {/* Hero Image and Description Section */}
        <View style={styles.heroSection}>
          <Image
            source={inviteHero}
            style={styles.heroBackgroundImage}
          />
    
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                  This is not just a referral program. This is your opportunity to create future of financial freedom and growth. We sincerely welcome you to be part of our journey.
                </Text>
                <Text style={styles.growTogetherText}>Let's grow Together!</Text>
              </View>
        
        </View>

        {/* Contact Email and Rules Section */}
        <View style={styles.contactSection}>
          <View style={styles.contactEmailBar}>
            <Text style={styles.contactLabel}>Contact Email:</Text>
            <Text style={styles.contactEmail}>annailottery@gmail.com</Text>
          </View>
          <TouchableOpacity style={styles.rulesButton} onPress={() => navigation.navigate('InvitationRulesScreen')}>
          <LinearGradient
          colors={['#FF4140', '#FFAD45']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.registerGradient}
        >
            <Text style={styles.rulesIcon}>📋</Text>
            <Text style={styles.rulesText}>Rules</Text>
          </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Invitation Code Section */}
        <View style={styles.invitationSection}>
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
              {/* <TouchableOpacity style={styles.refreshButton}>
                <Text style={styles.refreshIcon}>🔄</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>


        {/* Motivational Section */}
        <View style={styles.motivationalSection}>
        <Image source={rightTime} style={styles.rightTimeImage} />
        <Image source={agentLevels} style={styles.agentLevelsImage} />
        </View>

      
      </LinearGradient>
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
                <View style={[styles.shareIcon, { backgroundColor: '#1877F2' }]}>
                  <Text style={styles.shareIconText}>f</Text>
                </View>
                <Text style={styles.shareOptionText}>Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareOption} onPress={handleTelegramShare}>
                <View style={[styles.shareIcon, { backgroundColor: '#0088CC' }]}>
                  <Text style={styles.shareIconText}>✈</Text>
                </View>
                <Text style={styles.shareOptionText}>Telegram</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareOption} onPress={handleWhatsAppShare}>
                <View style={[styles.shareIcon, { backgroundColor: '#25D366' }]}>
                  <Text style={styles.shareIconText}>💬</Text>
                </View>
                <Text style={styles.shareOptionText}>WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareOption} onPress={handleInstagramShare}>
                <View style={[styles.shareIcon, { backgroundColor: '#E4405F' }]}>
                  <Text style={styles.shareIconText}>📷</Text>
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
  );
};

export default InviteScreen;

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
    height:'160%',
    justifyContent: 'center',
    position: 'absolute',
    right: -100,
    resizeMode:"contain",
    top: -30,
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
    backgroundColor: COLORS.tableTopColor,
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
    backgroundColor: COLORS.tableTopColor,
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
    flex:1,
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
    height: Scale(600),
    resizeMode:"cover",
    marginTop: Scale(20),
  },
  agentLevelsImage:{
    width:"100%",
    height: Scale(800),
    resizeMode:"cover",
    marginTop: Scale(20),
  },
});
