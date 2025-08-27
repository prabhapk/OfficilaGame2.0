import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeaderRegister from '../Components/CustomHeaderRegister';
import {addIcon, backGround1, leftArrowHeader} from '../../assets/assets';
import Scale from '../Components/Scale';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import {Avatar} from '@rneui/themed';

const UserDetails = ({navigation}: any) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const avatarList = [
    {
      image_url:
        'https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg',
    },
    {
      image_url:
        'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg',
    },
    {
      image_url:
        'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg',
    },
    {
      image_url:
        'https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg',
    },
    {
      image_url:
        'https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg',
    },
  ];

const handleImagePick = async () => {
    try {
      // Ask permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need access to your gallery.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,          // enables basic cropping
        aspect: [1, 1],               // 1:1 square crop
        quality: 0.8,                 // compression (0 = worst, 1 = best)
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick image.');
      console.error(err);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground source={backGround1} style={{flex: 1}}>
        <CustomHeaderRegister
          leftIconPress={() => navigation.goBack()}
          rightIconPress={() => navigation.navigate('SignUpScreen')}
          leftIcon={leftArrowHeader}
          centerText={'My Profile'}
        />

        <View style={styles.contentContainer}>
          <View style={styles.profileSection}>
            <TouchableOpacity
              onPress={handleImagePick}
              style={styles.imageWrapper}>
              {profileImage ? (
                <Image
                  source={{uri: profileImage}}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.placeholder}>
                  <Text style={styles.placeholderText}>Tap to upload</Text>
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.avatarRow}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.avatarList}>
                {avatarList.map((avatar, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setProfileImage(avatar.image_url)}
                    style={styles.avatarContainer}>
                    <Avatar
                      size={64}
                      rounded
                      source={{uri: avatar.image_url}}
                      containerStyle={{
                        borderWidth: profileImage === avatar.image_url ? 2 : 0,
                        borderColor: '#fff',
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                onPress={handleImagePick}
                style={styles.addIconWrapper}>
                <Image source={addIcon} style={styles.addIconStyle} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.optionsContainer}>
            <View style={styles.optionContainer}>
              <View style={styles.optionLeft}>
                <Entypo name="mobile" size={Scale(22)} color="white" />
                <Text style={styles.optionText}>Phone Number</Text>
              </View>
              <Text style={styles.optionText}>+91**********</Text>
            </View>

            <View style={styles.optionContainer}>
              <View style={styles.optionLeft}>
                <Feather name="lock" size={Scale(22)} color="white" />
                <Text style={styles.optionText}>Change password</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.optionText}>******</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PasswordChange')}
                  style={{marginLeft: Scale(10)}}>
                  <Entypo name="chevron-right" size={Scale(22)} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.optionContainer}>
              <View style={styles.optionLeft}>
                <Ionicons name="id-card" size={Scale(22)} color="white" />
                <Text style={styles.optionText}>User ID</Text>
              </View>
              <Text style={styles.optionText}>322211</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: Scale(20),
    marginHorizontal: Scale(20),
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: Scale(30),
  },
  imageWrapper: {
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: Scale(50),
    width: Scale(100),
    height: Scale(100),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  placeholderText: {
    color: 'black',
    fontSize: Scale(14),
  },
  label: {
    marginTop: Scale(10),
    fontSize: Scale(16),
    color: 'black',
    fontWeight: '500',
  },
  avatarLabel: {
    marginTop: Scale(20),
    fontSize: Scale(14),
    color: 'black',
    fontWeight: '600',
  },
  optionsContainer: {
    backgroundColor: '#b8cff5',
    borderRadius: Scale(10),
    padding: Scale(15),
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Scale(10),
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: Scale(16),
    color: 'white',
    fontWeight: 'bold',
    marginLeft: Scale(10),
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },

  avatarList: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarContainer: {
    marginRight: 10,
  },

  addIconWrapper: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addIconStyle: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});

export default UserDetails;
