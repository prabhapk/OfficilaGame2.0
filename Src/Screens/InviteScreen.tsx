import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image';
import { bannerLuna1 } from '../../assets/assets'
import Scale from '../Components/Scale'
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
const InviteScreen = () => {

  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate: Date | undefined, type: 'start' | 'end') => {
    if (selectedDate) {
      setDateRange(prev => ({ ...prev, [type]: selectedDate }));
    }
    type === 'start' ? setShowStartPicker(false) : setShowEndPicker(false);
  };

  const dateOptions = ['Today', 'Yesterday', '3days', '7days', '14days'];

  return (
    <ScrollView style={{ flex: 1,backgroundColor: '#560303' }}>
      <Image source={bannerLuna1} style={{ width: "100%", height: 250, }} resizeMode="stretch" />
        <View style={{ borderRadius: 10, bottom: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginHorizontal: 10, marginTop: Scale(10) }}>
          <View style={{ borderRadius: 10, padding: Scale(10), borderWidth: 1, borderColor: '#fff', justifyContent: 'center', alignItems: 'center', backgroundColor: "#ff493a" }}>
            <Text style={{ textAlign: 'center', fontSize: Scale(30), fontWeight: "bold", letterSpacing: Scale(5), color: '#fff' }}>
              123456
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#ff493a", borderRadius: 30, paddingVertical: Scale(10),
              paddingHorizontal: Scale(30), marginRight: Scale(10)
            }}

          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: Scale(20),
              }}>
              {"Invite"}
            </Text>
          </TouchableOpacity>
        </View>
<View style={{marginHorizontal:Scale(20),marginTop:Scale(-20)}}>
      <View style={styles.card}>
        <Text style={styles.heading}><Icon name="bar-chart" size={18} /> Team data</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statAmount}>₹0</Text>
            <Text style={styles.statLabel}>Commission</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statAmount}>₹0</Text>
            <Text style={styles.statLabel}>Recharges</Text>
          </View>
        </View>

        <View style={styles.settlementBox}>
          <Text style={styles.settlementText}>Commission to be settled:</Text>
           <Text style={{fontSize:Scale(18),fontWeight:'bold',color:'yellow'}}>₹0</Text>
         
         
        </View>
         <Text style={styles.settlementTime}>Settlement time: 20-07-2025 02:00 AM</Text>
      </View>

      <View style={styles.dateRangeRow}>
        {dateOptions.map((option, index) => (
          <TouchableOpacity key={index} style={[styles.dateButton, option === 'Today' && styles.activeDateButton]}>
            <Text style={[styles.dateButtonText, option === 'Today' && styles.activeDateButtonText]}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
s 
      <View style={styles.datePickerRow}>
        <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateInput}>
          <Text style={{color:"#fff"}}>{dateRange.start.toISOString().split('T')[0]}</Text>
          <Icon name="calendar-minus-o" size={18} style={{marginLeft:Scale(5)}} color={'#fff'}/>
        </TouchableOpacity>
        <Text style={styles.hyphen}>-</Text>
        <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateInput}>
          <Text style={{color:"#fff"}}>{dateRange.end.toISOString().split('T')[0]}</Text>
          <Icon name="calendar-minus-o" size={18} style={{marginLeft:Scale(5)}} color={'#fff'}/>
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
          Every time your first level subordinate recharges, You will receive a <Text style={styles.highlight}>5% </Text>bonus!!!
        </Text>
      </View>
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

    </ScrollView>
  )
}

export default InviteScreen

const styles = StyleSheet.create({
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
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    backgroundColor: '#db2020',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
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
    backgroundColor: '#f09191ff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:10,
  },
  settlementText: {
    color: '#fff',
    fontSize: 14,
  },
  settlementTime: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 5,
    textAlign:'center',
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
   borderWidth:1,
    borderRadius: 8,
    marginHorizontal: 5,
    flexDirection:'row',
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
    borderWidth:1,
    borderColor:'#fff',
    padding:10
  },
  bonusBox: {
    backgroundColor: '#a43f3f',
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    marginBottom:Scale(20)
  },
  bonusText: {
    color: '#fff',
    textAlign: 'center',
    fontSize:Scale(16)
  },
  highlight: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize:Scale(24)
  },
});