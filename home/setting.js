import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Alert, Modal, Pressable } from "react-native";
import * as Device from "expo-device";


import { useForm } from "react-hook-form";

const Setting = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [deviceid, setDeviceid] = useState();
    const handleclick = () => {
        console.log('fffffffffff')
        setModalVisible(true);
      };

      useEffect(() => {
        const getDeviceInformation = async () => {
          const deviceName = Device.deviceName;
    
          console.log("Device Name:", deviceName);
    
          setDeviceid(deviceName)
          let memory = await Device.getMaxMemoryAsync();
          // console.log("memory", memory);
        };
    
        getDeviceInformation();
      }, []);

      

      const handlenavigate  =  ()=>{
        navigation.replace('Home')
      }
    
    
  return (

    <View style={styles.container}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
        
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>confirmation !</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handlenavigate}
             
            >
              <Text style={styles.textStyle}>Oui</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>



    <View style={styles.app}>
      {/* <Text>dfddddddd</Text> */}
      <TextInput  editable={false} style={styles.input} value={deviceid} placeholder="Device ID" />
      {/* <TextInput style={styles.input} placeholder="Conducteur" /> */}

      <View>

      <TouchableOpacity style={styles.dechetvert} onPress={handleclick}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

    
      </View>
    </View>
    </View>
  );
};

export default Setting;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dechetvert: {
    width: 250,
  
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    height: 200,
    width: 300,
    justifyContent: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    width: 86,
    height: 40,
    justifyContent: "center",
    textAlign: 'center',
    alignItems:'center'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
    // backgroundColor: "#4CAF50",
  },
  modalText: {
    top: -50,
    position: "relative",
    marginBottom: 15,
    textAlign: "center",
  },
  app: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: 250,
  },
  input: {
   
    borderRadius: 7,
    width:400,

    padding: 12,
    borderWidth: 1,
    margin: 5,
  },
});
