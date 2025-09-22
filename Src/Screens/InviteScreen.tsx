import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
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
import Scale from '../Components/Scale';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { useNavigation } from '@react-navigation/native';
import { useContainerScale } from '../hooks/useContainerScale';
import NewAppHeader from '../Components/NewAppHeader';
import * as Clipboard from 'expo-clipboard';
const InviteScreen = ({route}: any) => {
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
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
      await Clipboard.setStringAsync(userDetails.referralCode || '');
      // Alert.alert('Copied!', 'Code copied to clipboard');
    } else {
      navigation.navigate('SignInScreen');
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
          s
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
});
