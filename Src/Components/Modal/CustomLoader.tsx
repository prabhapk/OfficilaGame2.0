import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, ActivityIndicator} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
interface Props {
  modalVisible: boolean

}

const CustomLoader: React.FC<Props> = ({
modalVisible
}) => {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
         >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ActivityIndicator size="large" color="#F194FF" />
             
            </View>
          </View>
        </Modal>
       
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
});

export default CustomLoader;
