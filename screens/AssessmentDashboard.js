
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiClient from '../service/apiClient';
import BeneficiaryCard from '../components/BeneficiaryCard';
import ReportsTable from '../components/ReportsTable';
import AssessmentForm from './AssesmentForm';
import Addbeneficiary from './AddBeneficiary';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const AssessmentDashboard = () => {
  
  const [reports, setReports] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const {user, logout} = useAuth()
  const station = user?.station.name;
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
}, [station]); 

const fetchData = async () => {
      try {
              const reportsResponse = await apiClient.get(`/report`, {
                  params: {
                      stationName: station,
                  }
              });
              setReports(reportsResponse.data);

              const beneficiariesResponse = await apiClient.get(`/beneficiary`, {
                  params: {
                      stationName: station,
                  }
              });
              setBeneficiaries(beneficiariesResponse.data);
      } catch (error) {
          console.error(error);
      }
    };

    const handleLogout = async () => {
        logout();
        navigation.navigate('Login');
    }

  return (
    <SafeAreaView>
    <View style={{marginTop: 20, backgroundColor:'#FBFAFA'}}>
      <View style={{marginLeft: 20, marginTop: 20, marginBottom: 10, 
                    flexDirection:'row', borderBottomWidth: 1, bordeColor: 'gray',}}>
      <View style={{marginRight: 50}}>
      <Text style={{fontSize: 15, marginBottom: 5}}>Hello {user?.firstname} {user?.surname}</Text>
      <Text style={{fontSize: 15, marginBottom: 5}}> Station: {station}</Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
      <TouchableOpacity style={{backgroundColor: "#008157D4", height: 35, marginRight: 10, 
                        width: 85, justifyContent:'center', borderRadius: 10}} onPress={() => setModalVisible(true)}>
        <Text style={{alignSelf: 'center', color: 'white', fontSize: 10}}>
          Add Beneficiary
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor: "#0090FF", height: 35, marginRight: 60,
                        width: 85, justifyContent:'center', borderRadius: 10}} onPress={() => setReportModalVisible(true)}>
        <Text style={{alignSelf: 'center', color: 'white', fontSize: 13}}>
          Add Report
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor: "#F8507E", height: 35, 
                        width: 75, justifyContent:'center', borderRadius: 10}} onPress={handleLogout}>
        <Text style={{alignSelf: 'center', color: 'white', fontSize: 13}}>
          Logout
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
        <BeneficiaryCard name="Total Beneficiaries" total={beneficiaries?.households} color="#9F48A6"/>
        </View>
        <ReportsTable reports={reports}/>
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
              <Addbeneficiary/>
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