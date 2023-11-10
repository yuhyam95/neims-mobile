
// Formik x React Native example
import React, { useState } from 'react';
import { Button, SafeAreaView, TextInput, View, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';

export const AddProduct = props => (

  <SafeAreaView>
    <View style={{alignItems:'center', justifyContent: 'center', marginTop: 10}}>
      <Text style={{}}>
        Add Product
      </Text>
    </View>
  <Formik
    initialValues={{ name: '', category: '' }}
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
        <TextInput
            style={styles.input}
            onChangeText={handleChange('category')}
            onBlur={handleBlur('category')}
            value={values.name}
            placeholder='Category'
          />
        </View>  
         {/* <Picker
            selectedValue={values.category}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => handleChange('category')(itemValue)}

          >
            <Picker.Item label="Select a category" value="" />
            <Picker.Item label="Food Items" value="Food Items" />
            <Picker.Item label="Non-Food Items" value="Non-Food Items" />
            {/* Add more categories as needed */}
          {/* </Picker> */} 

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
        <Button onPress={handleSubmit} title="Submit" style={styles.button}/>
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
      backgroundColor: '#00BA9D',
      borderRadius: 10

    }
  });


export default AddProduct;