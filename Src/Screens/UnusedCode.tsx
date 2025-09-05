

import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { gifAgent, gifLottery, gifPromotion, gifRefer } from '../../assets/assets'
import CommonDigits from '../Components/CommonDigits'

const UnusedCode = () => {

      const renderGameItem = (title: any, item: any) => {
        switch (title) {
          case 'Dice':
            return <CommonDice data={item} 
            onPressDice={()=> Alert.alert('will implement soon')}
            />;
    
          case 'Color':
            return (
          
              <ImageBackground
                source={item.image}
                resizeMode="stretch"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  borderRadius: 10,
                  overflow: 'hidden',
                  flexDirection: 'row',
                    height: 180,
                  width:"100%"
                }}>
                      <TouchableOpacity
                      
              onPress={()=> Alert.alert('will implement soon')}
              > 
               
                </TouchableOpacity>
              </ImageBackground>
              
            );
    
          case '3Digits':
            return <CommonDigits data={item} 
            onPress3Digits={ ()=> {
              console.log("cheeeeeeeeeeeeeeeeeeeeeeeeeeeee",item);
              if(item.gameTye==="Custom"){
                navigation.navigate('ThreeDigitMain',{gameData:item});
              }
              else if(item.gameTye==="RealGame"){
              // navigation.navigate('ThreeDigitMain',{gameDat:item});
            }}
            }
            />;
    
          default:
            return null;
        }
      };

      
    return (
        <>
        {/* Home screen header  */}

        <View style={styles.referalView}>
            <TouchableOpacity style={styles.refButton}>
                <Image
                    source={gifAgent}
                    style={styles.refImage}
                    contentFit="contain"
                />
                <Text style={styles.refText}>Agent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.refButton}>
                <Image
                    source={gifRefer}
                    style={styles.refImage}
                    contentFit="contain"
                />
                <Text style={styles.refText}>Refer Friend</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.refButton}>
                <Image
                    source={gifLottery}
                    style={styles.refImage}
                    contentFit="contain"
                />
                <Text style={styles.refText}>Free Lottery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.refButton}>
                <Image
                    source={gifPromotion}
                    style={styles.refImage}
                    contentFit="contain"
                />
                <Text style={styles.refText}>Promotions</Text>
            </TouchableOpacity>
        </View>


{/* Homescreen game code */}

 <FlatList
          data={gamesArray.filter(game => gameDataMap[game.title]?.length > 0)}
          ref={verticalListRef}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={styles.section}>
              <Text
                style={[
                  activeHeader === item.id && styles.verticalActiveHeader,
                  styles.verticalHeader,
                ]}>
                {item.title}
              </Text>
              <FlatList
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                showsVerticalScrollIndicator={false}
                data={gameDataMap[item.title] || []}
                keyExtractor={(subItem, index) => index.toString()}
                numColumns={2}
                renderItem={({item: subItem}) =>
                  renderGameItem(item.title, subItem)
                }
              />
            </View>
          )}
        />

        </>
    )
}

export default UnusedCode

const styles = StyleSheet.create({
    container: { flex: 1 },
    horizontalList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: 1,
    },
    headerItem: {
        padding: 10,
        marginHorizontal: 5,
        paddingHorizontal: 20,
        // borderWidth: 1,

    },
    activeHeaderText: {
        borderBottomWidth: 5,
        borderBottomColor: '#7C00EC',
    },
    headerText: { fontSize: 16, color: 'black', fontWeight: 'bold' },
    section: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    verticalHeader: { fontSize: 18, marginBottom: 5 },
    verticalActiveHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },

    referalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 20,
    },
    refImage: { width: 70, height: 80, resizeMode: 'cover' },
    refText: { color: 'black', fontWeight: 'bold', fontSize: 16, marginVertical: 5 },
    refButton: { alignItems: 'center' },
    stickyHeader: { padding: 5, },
});
