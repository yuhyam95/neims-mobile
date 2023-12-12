
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, Pressable, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddProduct from '../screens/AddProduct'
import MyTable from '../components/MyTable';
import IssueProduct from './IssueProduct';
import apiClient from '../service/apiClient';
import BeneficiaryCard from '../components/BeneficiaryCard';

const AssessmentDashboard = () => {
  
  const route = useRoute();
  const decodedToken = route.params?.decodedToken;
  const userId =decodedToken._id
  const [user, setUser] = useState(null)
  const [station, setStation] = useState([])
  const [beneficiaries, setBeneficiaries] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [issueModalVisible, setIssueModalVisible] = useState(false);
  
  useEffect(() => {
    fetchData();
}, [userId]); 

const fetchData = async () => {
      try {
          const userResponse = await apiClient.get(`/user/${userId}`);
          setUser(userResponse.data);

          if (userResponse.data && userResponse.data.station && userResponse.data.station.name) {
              const stationResponse = await apiClient.get(`/station`, {
                  params: {
                      name: userResponse.data.station.name,
                  }
              });
              setStation(stationResponse.data);

              const beneficiariesResponse = await apiClient.get(`/beneficiary`, {
                //   params: {
                //       stationName: userResponse.data.station.name,
                //   }
              });
              setBeneficiaries(beneficiariesResponse.data);
          }
      } catch (error) {
          console.error(error);
      }
    };

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
          Add Beneficiary
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor: "#F8507E", height: 40, alignSelf: 'center', 
                        width: '30%', justifyContent:'center', borderRadius: 10}} onPress={() => setIssueModalVisible(true)}>
        <Text style={{alignSelf: 'center', color: 'white'}}>
          Add Report
        </Text>
      </TouchableOpacity>
      </View>
      </View>
      <View flexDirection='row' alignItems='center' justifyContent='center'>
        <BeneficiaryCard name="Men" total={beneficiaries?.men} color="#0090FF"/>
        <BeneficiaryCard name="Women" total={beneficiaries?.women} color="#FE3169"/>
      </View>
      <View flexDirection='row' alignItems='center' justifyContent='center'>
        <BeneficiaryCard name="Children" total={beneficiaries?.children} color="#A8CF45"/>
        <BeneficiaryCard name="Households" total={beneficiaries?.households} color="#9F48A6"/>
        </View>
        {/* <MyTable products={products}/> */}
          {/* <Modal
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
        </Modal>      */}
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


export default AssessmentDashboard;