import { Formik } from 'formik'
import React from 'react'
import { SafeAreaView, Text, TextInput, View, StyleSheet, Image } from 'react-native'
import AppButton from '../components/AppButton'

const Login = () => {
  return (
    <SafeAreaView>   
    <View style={{alignItems:'center', justifyContent: 'center', marginTop: 400}}>
    <View style={{marginBottom: 10}}>
     <Image source={require('../assets/nema-logo.png')}/>
     </View>
      <Text style={{fontSize: 30}}>
        Welcome Back, Login
      </Text>
    </View>
  <Formik
    initialValues={{ email: '', password: '',}}
    onSubmit={values => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View style={{ marginTop: 50,}}>
        <View style={{flexDirection: 'column', alignItems:'center', justifyContent: 'center'}}>
      
      <View style={{flexDirection: 'column'}}>
      <Text style={{marginLeft: 10}}> Email </Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.name}
          placeholder='Email'
        />
        </View>
        
        <View style={{flexDirection: 'column'}}>
        <Text style={{marginLeft: 10}}> Password </Text>
            <TextInput
            style={styles.input}
            onChangeText={handleChange('quantity')}
            onBlur={handleBlur('quantity')}
            value={values.quantity}
            secureTextEntry={true}
            placeholder='Password'
            />    
          </View>
          </View>
        <AppButton label="Login" onPress={handleSubmit} color="white" backgroundColor="#00BA9D" />
      </View>
    
    )}
  </Formik>
        <View style={{alignSelf: 'center', marginTop: 200, flexDirection: 'column'}}>
            <Text style={{textAlign: 'center'}}>
               National Emergency Management Agency Inventory Management System  
            </Text>
            <Text style={{textAlign: 'center'}}>
               Copyright © 2023  
            </Text>
        </View>
  </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    input: {
      height: 50,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: 500,
      borderColor: '#E2E1E1',
      borderRadius: 10
    },
    button: {
      color: '#00BA9D',
      borderRadius: 10

    }
  });

export default Login