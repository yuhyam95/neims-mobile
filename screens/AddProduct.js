
// Formik x React Native example
import React, { useState } from 'react';
import { Button, SafeAreaView, TextInput, View, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import { Picker, PickerIOS } from '@react-native-picker/picker';
import AppButton from '../components/AppButton';

export const AddProduct = props => (

  <SafeAreaView>
    <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}}>
      <Text style={{fontSize: 20}}>
        Add Product
      </Text>
    </View>
  <Formik
    initialValues={{ name: '', category: '', quantity: 0, signature: '' }}
    onSubmit={values => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View style={{ marginTop: 50,}}>
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
            <Picker.Item label="Select a category" value="" />
            <Picker.Item label="Food Items" value="Food Items" />
            <Picker.Item label="Non-Food Items" value="Non-Food Items" />
          </Picker> 
          </View>
          </View>
        <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center'}}>
        <View style={{flexDirection: 'column'}}>
        <Text style={{marginLeft: 10}}> Quantity </Text>  
        <TextInput
          style={styles.input}
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
);

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