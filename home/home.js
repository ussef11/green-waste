import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Alert, Modal, Pressable } from "react-native";
import * as Location from 'expo-location';
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Octicons";
import * as Device from "expo-device";
// import DeviceInfo from 'react-native-device-info';

export default function Home({ navigation }) {
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleinter, setModalVisibleinter] = useState(false);
  const [handledechets, sethandledechets] = useState(false);
  const [handledinter, sethandledinter] = useState(false);
  const [id, setid] = useState();

  const handlenavigate = () => {
    navigation.navigate("Setting");
  };

  // BTD-74765B2F7239

  useEffect(() => {
    
    const getDeviceInformation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      const deviceName = Device.deviceName;

      console.log("Device Name:", deviceName);

      setid(deviceName);
      let memory = await Device.getMaxMemoryAsync();
      // console.log("memory", memory);
    };

    getDeviceInformation();
  }, []);

  const handleFetch = async (apiUrl, device, lat, lng) => {
    let timestamp = new Date().toLocaleString().replace(",", "");
    timestamp = timestamp.replace(/\b(?:AM|PM)\b/, "");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "frontend_lang=fr_FR; session_id=f822412f02d06570b627930141151ea195d05292"
    );

    const raw = JSON.stringify({
      deviceid: device,
      lat: lat,
      lng: lng,
      createddate: timestamp,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Network request failed", error);
    }

    console.log(device, lat, lng, timestamp);
  };

  useEffect(() => {
    let lat = null;
    let lng = null;
  

    const getLocation = async apiUrl => {
      try {
       
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Location permission denied');
          return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
        const { latitude: lat, longitude: lng } = location.coords;
    
        console.log('Device Name:', id);
        console.log('Latitude:', lat);
        console.log('Longitude:', lng);
    
        await handleFetch(apiUrl, id, lat, lng);
      } catch (error) {
        console.error(error);
      }
    };
    

    if (handledechets == true) {
      setCount(count + 1);
      sethandledechets(false);
      setModalVisible(!modalVisible);
      console.log("Dechets Verts");

      getLocation("http://192.168.100.50:5000/api/insertData");
    }
    if (handledinter == true) {
      console.log("Intervention");
      getLocation("http://192.168.100.50:5000/api/inertvention");
      sethandledinter(false);
    }
  }, [handledechets, count, handledinter]);

  const handleclick = () => {
    setModalVisible(true);
  };
  const handleclickinter = () => {
    setModalVisibleinter(true);
  };
  // intervention
  return (
    <>
      <View style={styles.settingView}>
        <Pressable style={styles.settingbutton} onPress={handlenavigate}>
          <Text>
            {" "}
            <Icon name="setting" size={30} color="#000" />
          </Text>
        </Pressable>
      </View>
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
            <View style={styles.modalView}>
              <View style={styles.topLeft}>
                <Icon2
                  onPress={() => setModalVisible(!modalVisible)}
                  name="x"
                  size={30}
                  color="#000"
                />
              </View>
              <Text style={styles.modalText}>Confirmation!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => sethandledechets(true)}
              >
                <Text style={styles.textStyle}>Oui</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleinter}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisibleinter(!modalVisibleinter);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.topLeft}>
                <Icon2
                  onPress={() => setModalVisibleinter(!modalVisibleinter)}
                  name="x"
                  size={30}
                  color="#000"
                />
              </View>
              <Text style={styles.modalText}>Confirmation!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => sethandledinter(true)}
              >
                <Text style={styles.textStyle}>Oui</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={styles.dechetvertView}>
          <Text>You clicked {count} times</Text>
          <TouchableOpacity style={styles.dechetvert} onPress={handleclick}>
            <Text style={styles.buttonText}>déchets verts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.intervention}
            onPress={handleclickinter}
          >
            <Text style={styles.buttonText}>Intervention</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // modalView: {
  //   height: "37%",
  //   width: 280,
  //   margin: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  topLeft: {
    marginTop: 13,
    marginRight: 13,
    marginBottom: 1,
    marginLeft: 1,
    position: "absolute",
    top: 0,
    right: 0,
  },

  dechetvertView: {
    textAlign: "center",
    width:500,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    top: -61,
    zIndex: 0,
  },

  settingView: {
    // width: "100%",
    alignSelf: "flex-end",
    backgroundColor: "rgb(255, 255, 255)",
    padding: 5,
    paddingHorizontal: 12,
    zIndex: 900,
  },
  settingbutton: {
    alignSelf: "flex-end",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dechetvert: {
    width: 450,
    height: 100,
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
    fontSize: 40,
  },

  intervention: {
    width: 450,
    height: 100,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  // centeredView: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 22,
  // },
  modalView: {
    height: 300,
    width: 380,
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
    padding: 0,
    backgroundColor: "#2196F3",
    width: 100,
    height: 50,
    justifyContent: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    top: -50,
    position: "relative",
    marginBottom: 15,
    textAlign: "center",
  },
});
