
// Formik x React Native example
import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Picker, PickerIOS } from '@react-native-picker/picker';
import AppButton from '../components/AppButton';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

export const IssueProduct = ({ products, userId, refreshParent}) => {
  
  const [showDone, setShowDone] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showForm, setShowForm] = useState(true)
  

  const handleSubmit = async (values) => { 
    
    const intValue = parseInt(values.quantity, 10);
       
    if (!isNaN(intValue)) {
      try {
        // Make an HTTP POST request using Axios with the integer value
        const response = await axios.post('https://neims-backend.onrender.com/api/sivForm', { ...values, quantity: intValue });
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
        Failed to issue product!
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
        Product successfully issued
      </Text>

      <AntDesign name="checkcircle" size={120} color="#00BA9D" />

      <TouchableOpacity style={{backgroundColor: "#00BA9D", height: 40, alignSelf: 'center', 
                        marginTop: 15, width: '60%', justifyContent:'center', borderRadius: 10}} 
                        onPress={() => {setShowDone(false)
                                        setShowForm(true)}}>
        <Text style={{alignSelf: 'center', color: 'white'}}>
          Issue another product
        </Text>
      </TouchableOpacity>

    </View>
    }

    {showForm &&
      <>
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
         <Picker
            selectedValue={values.product}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => handleChange('product')(itemValue)}
          >
             <Picker.Item label="Select a product" value="" />
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
        
        <AppButton label="Issue Product" onPress={handleSubmit} color="white" backgroundColor="#F8507E" />
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