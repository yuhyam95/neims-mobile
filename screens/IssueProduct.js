
// Formik x React Native example
import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet, Text, Platform } from 'react-native';
import { Formik } from 'formik';
import { Picker, PickerIOS } from '@react-native-picker/picker';
import AppButton from '../components/AppButton';
import axios from 'axios';

export const IssueProduct = ({ products, userId, refreshParent}) => {
  
  //console.log(products)
  const handleSubmit = async (values) => { 
    
    const intValue = parseInt(values.quantity, 10);
       
    if (!isNaN(intValue)) {
      try {
        // Make an HTTP POST request using Axios with the integer value
        const response = await axios.post('https://neims-backend.onrender.com/api/sivForm', { ...values, quantity: intValue });
        console.log('Form submitted successfully:', response.data);
      

      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      console.error('Invalid quantity value:', values.quantity);
    }
    
  };

  return (
  <SafeAreaView>
    <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}}>
      <Text style={{fontSize: 20}}>
        Issue Product
      </Text>
    </View>
  <Formik
    initialValues={{ sivnumber: '', product: null, quantity: 0, destination: '', storeofficer: userId, tag: 'distribution', lga: ''}}
    onSubmit={handleSubmit}
  >
    {({ handleChange, handleBlur, handleSubmit, resetForm, values }) => (
      <View style={{ marginTop: 50,}}>
      
      
      <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center'}}>  
      <View style={{flexDirection: 'column'}}>
      <Text style={{marginLeft: 10}}> SIV Number </Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('sivnumber')}
          onBlur={handleBlur('sivnumber')}
          value={values.sivnumber}
          placeholder='SIV number'
        />
        </View>
        <View style={{flexDirection: 'column'}}>
        <Text style={{marginLeft: 10}}> Product </Text>

         <Picker
            selectedValue={values.product}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => handleChange('product')(itemValue)}
          >
            {products?.map((product) => (
            <Picker.Item key={product._id} label={product.name} value={product._id} />
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
        <Text style={{marginLeft: 10}}> Destination </Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('destination')}
          onBlur={handleBlur('destination')}
          value={values.destination}
          placeholder='Destination'
        /> 
        </View> 
        </View>
        
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


export default IssueProduct;