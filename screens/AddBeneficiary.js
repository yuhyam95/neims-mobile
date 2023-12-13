
import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import AppButton from '../components/AppButton';
import { AntDesign } from '@expo/vector-icons';
import apiClient from '../service/apiClient';

export const Addbeneficiary = ({stationId}) => {
  
  const [showDone, setShowDone] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showForm, setShowForm] = useState(true)


  const handleSubmit = async (values) => { 
    const intValue = parseInt(values.quantity, 10);
       
    if (!isNaN(intValue)) {
      try {
        const response = await apiClient.post('/beneficiary', { ...values, quantity: intValue });
        console.log('Form submitted successfully:', response.data);
        setShowForm(false)
        setShowDone(true)
        
      } catch (error) {
        console.error('Error submitting form:', error);
        setShowForm(false)
        setShowError(true)
      }
    } else {
      console.error('Invalid quantity value:', values.quantity);
    }
    
  };

  return (
  <SafeAreaView>
    
    {showError &&
      <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}}>
      <Text style={{fontSize: 20, marginBottom: 10}}>
        Failed to add beneficiary!
      </Text>
      
      <AntDesign name="closecircle" size={120} color="#F8507E" />

      <TouchableOpacity style={{backgroundColor: "#00BA9D", height: 40, alignSelf: 'center', 
                        marginTop: 15, width: '40%', justifyContent:'center', borderRadius: 10}} 
                        onPress={() => {setShowError(false)
                                        setShowForm(true)}}>
        <Text style={{alignSelf: 'center', color: 'white'}}>
          Try again
        </Text>
      </TouchableOpacity>
    </View>
    }
    
    {showDone && 
      <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}}>
      <Text style={{fontSize: 20, marginBottom: 10}}>
        Beneficiary successfully added
      </Text>

      <AntDesign name="checkcircle" size={120} color="#00BA9D" />

      <TouchableOpacity style={{backgroundColor: "#00BA9D", height: 40, alignSelf: 'center', 
                        marginTop: 15, width: '60%', justifyContent:'center', borderRadius: 10}} 
                        onPress={() => {setShowDone(false)
                                        setShowForm(true)}}>
        <Text style={{alignSelf: 'center', color: 'white'}}>
          Add another beneficiary
        </Text>
      </TouchableOpacity>

    </View>
    }
    {showForm &&
    <>
      <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}}>
      <Text style={{fontSize: 20}}>
        Add beneficiary
      </Text>
    </View>
  <Formik
    initialValues={{  name: '', individual: null, station: stationId,  
                      state: '', lga: '', age: 0}}
    onSubmit={handleSubmit}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View style={{ marginTop: 50,}}>
  
      <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center'}}>
      <View style={{flexDirection: 'column'}}>
      <Text> Name </Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.srvnumber}
          placeholder='Name'
        />
        </View>

        <View style={{flexDirection: 'column'}}>  
        <Picker
            selectedValue={values.individual}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => handleChange('individual')(itemValue)}

          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Child" value="child" />
          </Picker>
        </View>
        
        </View>
        
        <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center'}}>
        
        <View style={{flexDirection: 'column'}}>
        <Text> State </Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('state')}
          onBlur={handleBlur('state')}
          value={values.state}
          placeholder='State'
        />
        </View>

        <View style={{flexDirection: 'column'}}>
        <Text> LGA </Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('lga')}
          onBlur={handleBlur('lga')}
          value={values.lga}
          placeholder='LGA'
        />
        </View>
        </View>
        <View style={{flexDirection: 'row', alignItems:'flex-start', justifyContent: 'flex-start'}}>

        <View style={{flexDirection: 'column', marginLeft: 7}}>
        <Text> Age </Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('age')}
          onBlur={handleBlur('age')}
          value={values.age}
          placeholder='Age'
        />
        </View>
        </View>
        <AppButton label="Add Beneficiary" onPress={handleSubmit} color="white" backgroundColor="#00BA9D" width={130}/>
      </View>
    
    )}
  </Formik>
  </>
  }

  </SafeAreaView>
)
};

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 7,
      borderWidth: 1,
      padding: 10,
      width: 200,
      borderColor: '#E2E1E1',
      borderRadius: 10
    },
    picker:{
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: 200,
      borderColor: '#E2E1E1',
      borderRadius: 10
    },  
    button: {
      color: '#00BA9D',
      borderRadius: 10
    }
  });


export default Addbeneficiary;