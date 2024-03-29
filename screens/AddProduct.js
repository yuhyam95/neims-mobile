import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import AppButton from '../components/AppButton';
import { AntDesign } from '@expo/vector-icons';
import apiClient from '../service/apiClient';

export const AddProduct = ({stationId, categories, userId}) => {
  
  const [showDone, setShowDone] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [products, setProducts] = useState(null)
  const [expiryDate, setExpiryDate] = useState('')
  
  useEffect(() => {
    fetchProducts();
}, [userId]); 

const handleExpiryDateChange = (text) => {
  if ((text.length === 2 && expiryDate.length < 2) || (text.length === 5 && expiryDate.length < 5)) {
    text += '/';
  } else if (text.length < expiryDate.length && (text.length === 2 || text.length === 5)) {
    
    text = text.slice(0, -1);
  }
  setExpiryDate(text);
};
 console.log(expiryDate)
const fetchProducts = async () => {
      try {
          const res = await apiClient.get(`/singleProduct`);  
          setProducts(res.data);
          }
       catch (error) {
          console.error(error);
      }
    };

  const handleSubmit = async (values) => { 
    const intValue = parseInt(values.quantity, 10);
       
    if (!isNaN(intValue)) {
      try {
        const response = await apiClient.post('/product', { ...values, quantity: intValue, expiryDate: expiryDate });
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
        Failed to add product!
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
        Product successfully added
      </Text>

      <AntDesign name="checkcircle" size={120} color="#00BA9D" />

      <TouchableOpacity style={{backgroundColor: "#00BA9D", height: 40, alignSelf: 'center', 
                        marginTop: 15, width: '60%', justifyContent:'center', borderRadius: 10}} 
                        onPress={() => {setShowDone(false)
                                        setShowForm(true)}}>
        <Text style={{alignSelf: 'center', color: 'white'}}>
          Add another product
        </Text>
      </TouchableOpacity>

    </View>
    }
    {showForm &&
    <>
      <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}}>
      <Text style={{fontSize: 20}}>
        Add Product
      </Text>
    </View>
  <Formik
    initialValues={{ srvnumber: '', name: '', category: null, quantity: 0, signature: '', 
                      station: stationId, storeofficer: userId, tag: 'restock', verificationofficer: userId, expiryDate: expiryDate }}
    onSubmit={handleSubmit}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View style={{ marginTop: 50,}}>
  
      <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center'}}>
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

          <View style={{flexDirection: 'column'}}>
          <Picker
            selectedValue={values.name}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => handleChange('name')(itemValue)}

          >
            <Picker.Item label="Select Product" value="" />
            {products?.map((product) => (
            <Picker.Item key={product._id} label={product.name} value={product.name} />
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
        <View style={{flexDirection: 'column'}}>
          <Picker
            selectedValue={values.category}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => handleChange('category')(itemValue)}

          >
            <Picker.Item label="Select Category" value="" />
            {categories?.map((category) => (
            <Picker.Item key={category._id} label={category.name} value={category._id} />
          ))}
          </Picker>
          </View>
          </View>
      
      <View style={{flexDirection: 'row', alignItems:'flex-start', justifyContent: 'flex-start'}}>
      
      <View style={{flexDirection: 'column'}}>
        <Text style={{marginLeft: 10}}>Expiry Date</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          value={expiryDate}
          onChangeText={handleExpiryDateChange}
          keyboardType="numeric"
          maxLength={10}
            />
        </View>

        </View>
        <AppButton label="Add Product" onPress={handleSubmit} color="white" backgroundColor="#00BA9D" width={95}/>
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