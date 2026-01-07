import { View, Text, StatusBar, StyleSheet, TouchableOpacity, FlatList, ScrollView, Modal,
  Linking,
  Alert, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../Constants/Theme'
import { useContainerScale } from '../hooks/useContainerScale';
import NewAppHeader from '../Components/NewAppHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getAgentDashboardData } from '../Redux/Slice/agentSlice';
import { RootState } from '../Redux/store';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from 'expo-linear-gradient';

const AgentCommissionDetail = ({navigation}: any) => {
    const dispatch = useDispatch();
    const { Scale, verticalScale } = useContainerScale();
    const styles = createStyles(Scale);
    const [selectedLevel, setSelectedLevel] = React.useState<string>('Basic');
    const [showShareModal, setShowShareModal] = useState(false);

    const {commissionBonusData } = useSelector(
        (state: RootState) => state.agentSlice
      );
      const { isLoggedIn, userDetails } = useSelector(
        (state: RootState) => state.signInSlice,
      );

      const levels = Array.from(new Set(commissionBonusData.map(item => item.agentLevel)));
      const filteredData = commissionBonusData.filter(
        item => item.agentLevel === selectedLevel
      );
      const shareUrl = 'https://yourapp.com/invite?code=' + (userDetails.referralCode || '');
      const shareMessage = `Join me on this amazing app! Use my referral code: ${userDetails.referralCode || ''}\n\nDownload the app: ${shareUrl}`;
      
    const handleBackPress = () => {
        navigation.goBack();
      };
    const renderCommissionDetailItem = ({ item }) => {
        return (
              <View> 
            <View style ={{
                backgroundColor: COLORS.white,
                marginHorizontal: Scale(20),
                marginTop: Scale(10),
                borderRadius: Scale(6),
                padding: Scale(10),
                borderWidth: 1,
                borderColor: '#fff',
            }}>
                <View style ={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomColor: COLORS.black,
                    borderBottomWidth: 1,
                    padding: Scale(5),
                    borderTopColor: 'transparent',
                    borderTopWidth: 0,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                
                }}> 
                <Text style= {{
                    fontSize: Scale(20),
                    fontWeight: 'bold',
                    color: '#000',
                }}>Commission Details</Text> 
                </View>

                <View style ={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: Scale(5),
                    borderWidth: 0.2,
                    borderRadius: Scale(4),
                    marginVertical: Scale(2),
                    borderBottomColor: '#000',
                    borderTopColor: 'transparent',
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    marginTop: Scale(5),
                }}>
                     <Text style= {{
                        fontSize: Scale(14),
                        fontWeight: '400',
                        color: '#000',
                        paddingVertical: Scale(5),
                    }}>
                        level1Commission
                    </Text>
                    <Text style= {{
                        fontSize: Scale(14),
                        fontWeight: 'bold',
                        color: '#000'
                    }}>
                      ₹{item.level1Commission}
                    </Text>
                </View>
                <View style ={{
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     backgroundColor: '#fff',
                     padding: Scale(5),
                     borderWidth: 0.2,
                     borderRadius: Scale(4),
                     marginVertical: Scale(2),
                     borderBottomColor: '#000',
                     borderTopColor: 'transparent',
                     borderLeftColor: 'transparent',
                     borderRightColor: 'transparent',
                     marginTop: Scale(5),
                }}>
                    <Text style= {{
                        fontSize: Scale(14),
                        fontWeight: '400',
                        color: '#000',
                        paddingVertical: Scale(5),
                    }}>
                        Level2Commission
                    </Text>
                    <Text style ={{
                        fontSize: Scale(14),
                        fontWeight: 'bold',
                        color: '#000'
                    }}>
                    ₹{item.level2Commission}
                    </Text>
                </View>
                <View style ={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: Scale(5),
                    borderWidth: 0.2,
                    borderRadius: Scale(4),
                    marginVertical: Scale(2),
                    borderBottomColor: '#000',
                    borderTopColor: 'transparent',
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    marginTop: Scale(5),
                }}>
                    <Text style= {{
                        fontSize: Scale(14),
                        fontWeight: '400',
                        color: '#000',
                    }}>
                        Level3Commission
                    </Text>
                    <Text style ={{
                        fontSize: Scale(14),
                        fontWeight: 'bold',
                        color: '#000',
                        paddingVertical: Scale(5),
                    }}>
                    ₹{item.level3Commission}
                    </Text>
                </View>
                <View style ={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: Scale(5),
                    borderWidth: 0.2,
                    borderRadius: Scale(4),
                    marginVertical: Scale(2),
                    borderBottomColor: '#000',
                    borderTopColor: 'transparent',
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    marginTop: Scale(5),
                }}>
                    <Text style= {{
                        fontSize: Scale(14),
                        fontWeight: '400',
                        color: '#000',
                        paddingVertical: Scale(5),
                    }}>
                        Level4Commission
                    </Text>
                    <Text style ={{
                        fontSize: Scale(14),
                        fontWeight: 'bold',
                        color: '#000'
                    }}>
                    ₹{item.level4Commission}
                    </Text>
                </View>
             
                <View>
                {/* <LinearGradient
            colors={[COLORS.linearOne, COLORS.linearTwo]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.invitationLinkButton}
          >
          <TouchableOpacity
                    style ={{
                        backgroundColor: '#00B612',
                        padding: Scale(10),
                        borderRadius: Scale(20),
                        marginTop: Scale(15),
                        marginHorizontal: Scale(10),
                    }}
                    onPress={handleInvite}
                    >
             <Text style ={{
                            color: COLORS.white,
                            fontSize: Scale(14),
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}>Go Complete</Text>
            </TouchableOpacity>
          </LinearGradient> */}
          <LinearGradient
            // colors={[COLORS.linearOne, COLORS.linearTwo]}
            colors={['black', 'grey']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.invitationLinkButton}
          >
            <TouchableOpacity
              style={styles.invitationLinkTouchable}
              onPress={handleInvite}
            >
              <Text style={styles.invitationLinkText}>Go Complete</Text>
            </TouchableOpacity>
          </LinearGradient>
    
                    
                    
    
                </View>
            </View>
            </View>
        )

    }
    const handleInvite = async () => {
      if (isLoggedIn) {
        setShowShareModal(true);
      } else {
        navigation.navigate('SignInScreen');
      }
    };
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
               
  return (
    <View style={styles.container}>
      <ScrollView> 
    <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
    <NewAppHeader
        leftIconPress={handleBackPress}
        centerText="Commission Details"
      />

<View>
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: Scale(15),
      paddingHorizontal: Scale(10),
    }}
  >
    {levels.map(level => (
      <TouchableOpacity
        key={level}
        onPress={() => setSelectedLevel(level)}
        style={{
          paddingVertical: Scale(8),
          paddingHorizontal: Scale(15),
          borderRadius: Scale(20),
          backgroundColor: selectedLevel === level ? 'grey' : '#F1F2F6',
        }}
      >
        <Text
          style={{
            color: selectedLevel === level ? COLORS.white : COLORS.black,
            fontSize: Scale(14),
            fontWeight: 'bold',
          }}
        >
          {level}
        </Text>
      </TouchableOpacity>
    ))}
  </View>

  <FlatList
    data={filteredData}
    keyExtractor={(item) => item.id.toString()}
    renderItem={renderCommissionDetailItem}
    showsVerticalScrollIndicator={false}
  />
</View>
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
    </View>
  )
}
const createStyles = (Scale: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.primary,
          },
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
          invitationLinkButton: {
            borderRadius: Scale(12),
            alignItems: 'center',
            // width: Scale(200),
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: Scale(20),
            height: Scale(40),
          },
          invitationLinkTouchable: {
            paddingVertical: Scale(10),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: Scale(20),
          },
          invitationLinkText: {
            fontSize: Scale(16),
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
          },
    })
    
export default AgentCommissionDetail