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
    <ScrollView style={{ flex: 1, backgroundColor: '#380100' }} showsVerticalScrollIndicator={false}>
     {isProfile &&  <NewAppHeader
        leftIconPress={() => navigation.goBack()}
        centerText={'Invite'}
      />}
      <ImageBackground
        source={invitetop}
        style={{ width: '100%', height: '70%' }}
        resizeMode="stretch"
      >
        <View
          style={{
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginTop: '65%',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: Scale(30),
              fontWeight: 'bold',
              letterSpacing: Scale(10),
              color: '#fff',
              marginLeft: Scale(30),
            }}
          >
            {isLoggedIn ? userDetails.referralCode : ''}
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#ff493a',
              borderRadius: 30,
              paddingVertical: Scale(10),
              paddingHorizontal: Scale(20),
              // marginRight: Scale(5),
            }}
            onPress={() => {
              handleInvite();
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: Scale(20),
              }}
            >
              {'Invite'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: Scale(20), marginTop: Scale(50) }}>
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={graphIcon}
                style={{ width: Scale(30), height: Scale(30) }}
                contentFit='contain'
              />
              <Text style={styles.heading}>Team data</Text>
            </View>

            <View style={styles.statsRow}>
              {/* Commission Card */}
              <View style={styles.statCard}>
                <Image
                  source={CommissionIcon}
                  style={styles.statBox}
                  contentFit="contain"
                />
                <View style={styles.statContent}>
                  <Text style={styles.statAmount}>₹0</Text>
                  <Text style={styles.statLabel}>Commission</Text>
                </View>
              </View>

              {/* Recharge Card */}
              <View style={styles.statCard}>
                <Image
                  source={inviteRecharge}
                  style={styles.statBox}
                  contentFit="contain"
                />
                <View style={styles.statContent}>
                  <Text style={styles.statAmount}>₹0</Text>
                  <Text style={styles.statLabel}>Recharges</Text>
                </View>
              </View>
            </View>

            <View style={styles.settlementBox}>
              <Text style={styles.settlementText}>
                Commission to be settled:
              </Text>
              <Text
                style={{
                  fontSize: Scale(18),
                  fontWeight: 'bold',
                  color: 'yellow',
                }}
              >
                ₹0
              </Text>
            </View>
            <Text style={styles.settlementTime}>
              Settlement time: 20-07-2025 02:00 AM
            </Text>
          </View>
          <View style={styles.dateRangeRow}>
            {dateOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateButton,
                  option === 'Today' && styles.activeDateButton,
                ]}
              >
                <Text
                  style={[
                    styles.dateButtonText,
                    option === 'Today' && styles.activeDateButtonText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.datePickerRow}>
            <TouchableOpacity
              onPress={() => setShowStartPicker(true)}
              style={styles.dateInput}
            >
              <Text style={{ color: '#fff' }}>
                {dateRange.start.toISOString().split('T')[0]}
              </Text>
              <Icon
                name="calendar-minus-o"
                size={18}
                style={{ marginLeft: Scale(5) }}
                color={'#fff'}
              />
            </TouchableOpacity>
            <Text style={styles.hyphen}>-</Text>
            <TouchableOpacity
              onPress={() => setShowEndPicker(true)}
              style={styles.dateInput}
            >
              <Text style={{ color: '#fff' }}>
                {dateRange.end.toISOString().split('T')[0]}
              </Text>
              <Icon
                name="calendar-minus-o"
                size={18}
                style={{ marginLeft: Scale(5) }}
                color={'#fff'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>Level</Text>
            <Text style={styles.tableCell}>Invites</Text>
            <Text style={styles.tableCell}>Recharge</Text>
            <Text style={styles.tableCell}>Bets</Text>
            <Text style={styles.tableCell}>Commission</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Lv.1</Text>
            <Text style={styles.tableCell}>-</Text>
            <Text style={styles.tableCell}>-</Text>
            <Text style={styles.tableCell}>-</Text>
            <Text style={styles.tableCell}>-</Text>
          </View>
          <View style={styles.bonusBox}>
            <Text style={styles.bonusText}>
              Every time your first level subordinate recharges, You will
              receive a <Text style={styles.highlight}>5% </Text>bonus!!!
            </Text>
          </View>
        </View>
      </ImageBackground>
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
  container: {
    flex: 1,
    backgroundColor: '#240101',
    padding: 15,
  },
  card: {
    backgroundColor: '#a43f3f',
    borderRadius: 10,
    padding: 15,
    borderColor: 'gold',
    borderWidth: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Scale(10),
  },

  statCard: {
    position: "relative", // important for absolute children
    marginHorizontal: 5,
  },

  statBox: {
    borderRadius: 10,
    width: Scale(160),
    height: Scale(110),
  },

  statContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },


  statAmount: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  settlementBox: {
    marginTop: 15,
    backgroundColor: '#A5595A',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  settlementText: {
    color: '#fff',
    fontSize: 14,
  },
  settlementTime: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
  dateRangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  dateButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeDateButton: {
    backgroundColor: '#a43f3f',
  },
  dateButtonText: {
    color: '#fff',
  },
  activeDateButtonText: {
    fontWeight: 'bold',
  },
  datePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  dateInput: {
    padding: 10,
    borderColor: '#db2020',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  hyphen: {
    color: '#fff',
    fontSize: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#db2020',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#a43f3f',
  },
  tableCell: {
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
  },
  bonusBox: {
    backgroundColor: '#a43f3f',
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    marginBottom: Scale(20),
  },
  bonusText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: Scale(16),
  },
  highlight: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: Scale(24),
  },
  // Share Modal Styles
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
});
