
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryGrid from '../components/CategoryGrid';
import AddProduct from '../screens/AddProduct'
import MyTable from '../components/MyTable';
import IssueProduct from './IssueProduct';
import apiClient from '../service/apiClient';
import { useAuth } from '../context/AuthContext';
import MenuGrid from '../components/MenuGrid';
import AssessmentForm from './AssesmentForm';
import ReportsTable from '../components/ReportsTable';

const Dashboard = () => {

  const navigation = useNavigation();
  const [station, setStation] = useState([])
  const [products, setProducts] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [issueModalVisible, setIssueModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [toggleProducts, setToggleProducts] = useState(true)
  const [reports, setReports] = useState([]);
  const {user, logout} = useAuth()
  const stationName = user?.station.name;
  const userId = user?._id
  

  const handleAddProduct = () => {
    setModalVisible(true)
  }
  const handleAddReport = () => {
    setReportModalVisible(true)
  }
  const handleToggle = () => {
    setToggleProducts(!toggleProducts)
  }
  const menuData = [{
    id: 1,
    name: "Add Product",
    color: "#008157D4",
    onPress: handleAddProduct
    },

    {
        id: 2,
        name: "Add Report",
        color: "#0090FF",
        onPress: handleAddReport
    },

    {
      id: 3,
      name: toggleProducts ? "View Reports" : "View Products",
      color: "#FF6347",
      onPress: handleToggle
    },

      ]


  useEffect(() => {
    fetchData();
}, [user]); 

const fetchData = async () => {
      try {
     
              const stationResponse = await apiClient.get(`/station`, {
                  params: {
                      name: stationName,
                  }
              });
              setStation(stationResponse.data);

              const productsResponse = await apiClient.get(`/product`, {
                  params: {
                      stationName: stationName,
                  }
              });
              setProducts(productsResponse.data);

              const reportsResponse = await apiClient.get(`/report`, {
                params: {
                    stationName: station,
                }
            });
            setReports(reportsResponse.data);
      } catch (error) {
          console.error(error);
      }
    };
    
    const handleLogout = () => {
      logout();
      navigation.navigate('Login');
    }

  return (
    <SafeAreaView>
     <ScrollView> 
    <View style={{marginTop: 20, backgroundColor:'#FBFAFA'}}>
      <View style={{marginLeft: 20, marginTop: 20, marginBottom: 10, 
                    flexDirection:'row', borderBottomWidth: 1, bordeColor: 'gray',   }}>
      <View style={{marginRight: 50}}>
      <Text style={{fontSize: 15, marginBottom: 5}}>Hello {user?.firstname} {user?.surname}</Text>
      <Text style={{fontSize: 15, marginBottom: 5}}> Station: {user?.station.name}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
      
      <TouchableOpacity style={{backgroundColor: "#0090FF", height: 35, alignSelf: 'center', marginRight: 100,
                        width: 85, justifyContent:'center', borderRadius: 10}} onPress={() => setIssueModalVisible(true)}>
        <Text style={{alignSelf: 'center', color: 'white', fontSize: 10}}>
          Issue Product
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor: "#F8507E", height: 35, alignSelf: 'center', 
                        width: 75, justifyContent:'center', borderRadius: 10}} onPress={handleLogout}>
        <Text style={{alignSelf: 'center', color: 'white', fontSize: 13}}>
          Logout
        </Text>
      </TouchableOpacity>
      </View>
      </View>
      
        <MenuGrid data={menuData}/>
    {toggleProducts &&
      <MyTable products={products}/>}
    {!toggleProducts &&
      <ReportsTable reports={reports}/>
                      }  
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
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {setModalVisible(!modalVisible); fetchData()}}>
                <Text style={styles.textStyle}>X</Text>
              </Pressable>
              <AddProduct stationId={station[0]?._id} userId={userId} categories={station[0]?.category} />
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={issueModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setIssueModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {setIssueModalVisible(!issueModalVisible); fetchData()}}>
                <Text style={styles.textStyle}>X</Text>
              </Pressable>
              <IssueProduct userId={userId} products={products} />
            </View>
          </View>
        </Modal> 

        <Modal
          animationType="slide"
          transparent={true}
          visible={reportModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setReportModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {setReportModalVisible(!reportModalVisible); fetchData()}}>
                <Text style={styles.textStyle}>X</Text>
              </Pressable>
              <AssessmentForm />
            </View>
          </View>
        </Modal>

    </View>
    </ScrollView>
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
    //margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
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
