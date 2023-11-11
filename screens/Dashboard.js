
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, Pressable, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import CategoryGrid from '../components/CategoryGrid';
import AddProduct from '../screens/AddProduct'
import MyTable from '../components/MyTable';
const Dashboard = () => {
  
  const route = useRoute();
  const decodedToken = route.params?.decodedToken;
  const userId =decodedToken._id
  const [user, setUser] = useState(null)
  const [station, setStation] = useState(null)
  const [products, setProducts] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getUser = async () => {    
      try {
        const res = await axios.get(`https://neims-backend.onrender.com/api/user/${userId}`);
        setUser(res.data) 
      } catch (err) {
      console.log(err)
      }
    };
    
    const getStation = async () => {    
      try {
        const res = await axios.get(`http://172.20.10.3:3000/api/station`,{
        params: {
          name: 'Jos',
        }});
        setStation(res.data) 
      } catch (err) {
      console.log(err)
      }
    };
    const getProducts = async () => {    
      try {
        const res = await axios.get(`http://172.20.10.3:3000/api/product`,{
        params: {
          stationName: 'Jos',
        }});
        setProducts(res.data)
        console.log(res.data) 
      } catch (err) {
      console.log(err)
      }
    }; 
    getUser();
    getStation();
    getProducts();
  },[]);

  return (
    <SafeAreaView>
    <View style={{marginTop: 20, backgroundColor:'#FBFAFA'}}>
      <View style={{marginLeft: 20, marginTop: 20, marginBottom: 10, 
                    flexDirection:'row', justifyContent: 'space-between', borderBottomWidth: 1, bordeColor: 'gray',   }}>
      <View>
      <Text style={{fontSize: 20, marginBottom: 5}}>Hello {user?.firstname} {user?.surname}</Text>
      <Text style={{fontSize: 20, marginBottom: 5}}> Station: {user?.station.name}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
      <TouchableOpacity style={{backgroundColor: "#008157D4", height: 40, alignSelf: 'center', 
                        width: '30%', justifyContent:'center', borderRadius: 10}} onPress={() => setModalVisible(true)}>
        <Text style={{alignSelf: 'center', color: 'white'}}>
          Add Product
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor: "#F8507E", height: 40, alignSelf: 'center', 
                        width: '30%', justifyContent:'center', borderRadius: 10}}>
        <Text style={{alignSelf: 'center', color: 'white'}}>
          Issue Product
        </Text>
      </TouchableOpacity>
      </View>
      </View>
        <CategoryGrid data={station[0]?.category}/>
        <MyTable products={products}/>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* Close button (X) at the top right corner */}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>X</Text>
              </Pressable>
              <AddProduct />
            </View>
          </View>
        </Modal>     
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    color: 'black'
  },
  buttonClose: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});


export default Dashboard;
