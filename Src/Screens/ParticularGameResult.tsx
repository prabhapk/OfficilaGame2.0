// ViewAllScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, GestureResponderEvent } from 'react-native';
import { COLORS } from '../Constants/Theme';
import ResultTable from '../Components/ResultTable';
import { hot } from '../../assets/assets';
import CountdownTimer from '../Components/CountdownTimer';
import { useContainerScale } from '../hooks/useContainerScale';
import NewAppHeader from '../Components/NewAppHeader';

const ParticularGameResult = ({ route, navigation }: any) => {
  const { category, data } = route.params;
    const { Scale, verticalScale } = useContainerScale();
    const styles = createStyles(Scale);

  return (
    <View style={{ backgroundColor: COLORS.primary, elevation: 10, flex: 1 }}>
        <NewAppHeader leftIconPress={() => {
        navigation.pop();
      }} centerText={`${category} Result`} />
      <View style={{
        marginTop: 10,
        backgroundColor: '#5C1818',
        padding: 10,
      }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image source={hot} style={{ width: 20, height: 20 }} />
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: 'white',
                  marginLeft: 10,
                }}
              >
                {category}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  marginLeft: 10,
                }}
              >
                Draw Results
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
            }}
            style={{
              backgroundColor: '#61201bff',
              padding: 10,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ fontSize: 16, color: 'white' }}>Play Now</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#3C0D0D',
            padding: 10,
            marginTop: 10,
          }}
        >


          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: 'white',
                marginLeft: 10,
              }}
            >
              Next Draw
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'white',
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              07:00 PM
            </Text>
          </View>

          <CountdownTimer />
        </View>
      </View>
      <ResultTable
        tableData={data}
        customStyle={{ marginTop: -10 }}
      //   hidePages
      />
      {/* <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 8 }}>
            <Text style={{ color: 'white' }}>{item.name} - {item.time}</Text>
            <Text style={{ color: 'white' }}>Balls: {item.balls?.join(', ')}</Text>
          </View>
        )}
      /> */}
    </View>
  );
}

export default ParticularGameResult

const createStyles = (Scale: any) => StyleSheet.create({
  headrrcontainer: {
    backgroundColor: '#3C0D0D', // Dark maroon
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});