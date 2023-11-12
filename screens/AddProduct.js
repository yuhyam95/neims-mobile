
// Formik x React Native example
import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet, Text, Platform } from 'react-native';
import { Formik } from 'formik';
import { Picker, PickerIOS } from '@react-native-picker/picker';
import AppButton from '../components/AppButton';
import axios from 'axios';

export const AddProduct = ({stationId, categories, userId}) => {
  
  //console.log(stationId)
  
  const handleSubmit = async (values) => { 
    const intValue = parseInt(values.quantity, 10);
       
    if (!isNaN(intValue)) {
      try {
        // Make an HTTP POST request using Axios with the integer value
        const response = await axios.post('https://neims-backend.onrender.com/api/product', { ...values, quantity: intValue });
        console.log('Form submitted successfully:', response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      console.error('Invalid quantity value:', values.quantity);
    }
    
    // try {
    //   const res = await axios.post(`https://neims-backend.onrender.com/api/product`, values);
    //   console.log('Form submitted successfully:', res.data); 
    // } catch (err) {
    // console.log(err.message)
    // }
  };

  return (
  <SafeAreaView>
    <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}}>
      <Text style={{fontSize: 20}}>
        Add Product
      </Text>
    </View>
  <Formik
    initialValues={{ srvnumber: '', name: '', category: null, quantity: 0, signature: '', 
                      station: stationId, storeofficer: userId, tag: 'restock', verificationofficer: userId }}
    onSubmit={handleSubmit}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View style={{ marginTop: 50,}}>
      <View style={{flexDirection: 'column'}}>
      <Text style={{marginLeft: 10}}> SRV Number </Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('srvnumber')}
          onBlur={handleBlur('srvnumber')}
          value={values.srvnumber}
          placeholder='SRV number'
        />
        </View>
      <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center'}}>
      <View style={{flexDirection: 'column'}}>
      <Text style={{marginLeft: 10}}> Name </Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
          placeholder='Name'
        />
        </View>
        
        <View style={{flexDirection: 'column'}}>
        <Text style={{marginLeft: 10}}> Category </Text>

         <Picker
            selectedValue={values.category}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => handleChange('category')(itemValue)}

          >
            {categories?.map((category) => (
            <Picker.Item key={category._id} label={category.name} value={category._id} />
          ))}
          </Picker> 
          </View>
          </View>
        <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center'}}>
        <View style={{flexDirection: 'column'}}>
        <Text style={{marginLeft: 10}}> Quantity </Text>  
        <TextInput
          style={styles.input}
          inputMode='numeric'
          onChangeText={handleChange('quantity')}
          onBlur={handleBlur('quantity')}
          value={values.quantity}
          placeholder='Quantity'
        />
        </View>
        <View style={{flexDirection: 'column', marginTop: 10}}>
        <Text style={{marginLeft: 10}}> Signature </Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('signature')}
          onBlur={handleBlur('signature')}
          value={values.signature}
          placeholder='Signature'
        /> 
        </View> 
          </View>
        {/* <Button onPress={handleSubmit} title="Submit" style={styles.button}/> */}
        <AppButton label="Add Product" onPress={handleSubmit} color="white" backgroundColor="#00BA9D" />
      </View>
    
    )}
  </Formik>
  </SafeAreaView>
)
};

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: 350,
      borderColor: '#E2E1E1',
      borderRadius: 10
    },
    button: {
      color: '#00BA9D',
      borderRadius: 10
    }
  });


export default AddProduct;