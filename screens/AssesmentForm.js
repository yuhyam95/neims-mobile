import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import { Formik } from 'formik';``
import AppButton from '../components/AppButton';
import { AntDesign } from '@expo/vector-icons';
import apiClient from '../service/apiClient';
import * as Location from 'expo-location';
import { date } from 'zod';

export const AssessmentForm = () => {

  const [location, setLocation] = useState(null)  
  const [showDone, setShowDone] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [dateofoccurence, setDateOfOccurence] = useState('');
  const [datereported, setDateReported] = useState('');

  const handleDateOfOccurenceChange = (text) => {
    if ((text.length === 2 && dateofoccurence.length < 2) || (text.length === 5 && dateofoccurence.length < 5)) {
      text += '/';
    } else if (text.length < dateofoccurence.length && (text.length === 2 || text.length === 5)) {
      
      text = text.slice(0, -1);
    }
    setDateOfOccurence(text);
  };

  const handleDateReportedChange = (text) => {
    if ((text.length === 2 && datereported.length < 2) || (text.length === 5 && datereported.length < 5)) {
      text += '/';
    } else if (text.length < datereported.length && (text.length === 2 || text.length === 5)) {
      
      text = text.slice(0, -1);
    }
    setDateReported(text);
  };

  const convertToInt = (value) => {
    const intValue = parseInt(value, 10);
    return isNaN(intValue) ? null : intValue;
  };

  const handleSubmit = async (values) => { 
     const affectedpersons = convertToInt(values.numberofaffectedpersons);
     const affectedhouseholds = convertToInt(values.numberofhouseholdaffected);
     const men = convertToInt(values.numberofmen);
     const women = convertToInt(values.numberofwomen);
     const children = convertToInt(values.numberofchildren);
     const injured = convertToInt(values.numberofinjured);
     const death = convertToInt(values.numberofdeath);
     const completelydamaged = convertToInt(values.numberofhousescompletelydamaged);
     const partiallydamaged = convertToInt(values.numberofhousespartiallydamaged);
       
    if (!isNaN(affectedpersons)) {
      try {
        const response = await apiClient.post('/report', { ...values, 
            
          numberofaffectedpersons: affectedpersons,
            numberofhouseholdaffected: affectedhouseholds,
            numberofmen: men,
            numberofwomen: women,
            numberofchildren: children,
            numberofinjured: injured,
            numberofdeath: death,
            numberofhousescompletelydamaged: completelydamaged,
            numberofhousespartiallydamaged: partiallydamaged,
            dateofoccurence: dateofoccurence,
            datereported: datereported,
            longitude: location?.longitude,
            latitude: location?.latitude

            });
        console.log('Form submitted successfully:', response.data);
        setShowForm(false)
        setShowDone(true)
        
      } catch (error) {
        console.error('Error submitting form:', error);
        setShowForm(false)
        setShowError(true)
      }
    } else {
      console.error('Invalid quantity value:', values.affectedpersons);
    }


    
  };

      const getLocation = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          
          if (status === 'granted') {
            const locationData = await Location.getCurrentPositionAsync({});
            setLocation(locationData.coords);
          } else {
            console.log('Location permission denied');
          }
        } catch (error) {
          console.error('Error getting location:', error);
        }
      };


  return (
  <SafeAreaView>
    
    {showError &&
      <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}}>
      <Text style={{fontSize: 20, marginBottom: 10}}>
        Failed to add report!
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
        Report successfully added
      </Text>

      <AntDesign name="checkcircle" size={120} color="#00BA9D" />

      <TouchableOpacity style={{backgroundColor: "#00BA9D", height: 40, alignSelf: 'center', 
                        marginTop: 15, width: '60%', justifyContent:'center', borderRadius: 10}} 
                        onPress={() => {setShowDone(false)
                                        setShowForm(true)}}>
        <Text style={{alignSelf: 'center', color: 'white'}}>
          Add another report
        </Text>
      </TouchableOpacity>

    </View>
    }
    {showForm &&
    <>
      <View style={{alignItems:'center', justifyContent: 'center', marginTop: 30}}>
      <Text style={{fontSize: 20}}>
        Assessment Form
      </Text>
    </View>
  <Formik
    initialValues={{ state: '', lga: '', community: '', natureofdisaster: '', dateofoccurence: '', datereported: '',
        numberofaffectedpersons: 0, numberofhouseholdaffected: 0, numberofmen: 0, numberofwomen: 0, numberofchildren: 0, numberofhousescompletelydamaged: 0,
        numberofhousespartiallydamaged: 0, numberofinjured: 0, numberofdeath: 0, images: [], approved: false, assessmentteam: [], longitude: '', latitude: ''}}
        onSubmit={handleSubmit}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View style={{ marginTop: 40}}>
  
      <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center', marginBottom: 15}}>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>State</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('state')}
          onBlur={handleBlur('state')}
          value={values.state}
          placeholder='State'
        />
        </View>
        <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>LGA</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('lga')}
          onBlur={handleBlur('lga')}
          value={values.lga}
          placeholder='LGA'
        />
        </View>
        <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>Community</Text>   
        <TextInput
          style={styles.input}
          onChangeText={handleChange('community')}
          onBlur={handleBlur('community')}
          value={values.community}
          placeholder='Community'
        />
        </View>
        </View>

    <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center', marginBottom: 15}}>
      
      <View style={{flexDirection: 'column'}}>
      <Text style={styles.text}>Nature of Disaster</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('natureofdisaster')}
          onBlur={handleBlur('natureofdisaster')}
          value={values.natureofdisaster}
          placeholder='Nature of Disaster'
        />
        </View>

        <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>Date of Occurence</Text>
        <TextInput
        style={styles.input}
        placeholder="MM/DD/YYYY"
        value={dateofoccurence}
        onChangeText={handleDateOfOccurenceChange}
        keyboardType="numeric"
        maxLength={10}
          />
        </View>

        <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>Date Reported</Text>
        <TextInput
          style={styles.input}
          placeholder="MM/DD/YYYY"
          value={datereported}
          onChangeText={handleDateReportedChange}
          keyboardType="numeric"
          maxLength={10}
            />
        </View>

        </View>


        <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center', marginBottom: 15}}>
        
        <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>No. of Men </Text>  
        <TextInput
          style={styles.input}
          inputMode='numeric'
          onChangeText={handleChange('numberofmen')}
          onBlur={handleBlur('numberofmen')}
          value={values.numberofmen}
          placeholder='No. of Men'
        />
        </View>

        <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>No. of Women </Text>  
        <TextInput
          style={styles.input}
          inputMode='numeric'
          onChangeText={handleChange('numberofwomen')}
          onBlur={handleBlur('numberofwomen')}
          value={values.numberofwomen}
          placeholder='No. of Women'
        />
        </View>

        <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>No. of Children</Text>  
        <TextInput
          style={styles.input}
          inputMode='numeric'
          onChangeText={handleChange('numberofchildren')}
          onBlur={handleBlur('numberofchildren')}
          value={values.numberofchildren}
          placeholder='No. of Children'
        />
        </View>
        </View>

        <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center', marginBottom: 15}}>
        
        <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>No. of Injured </Text>  
        <TextInput
          style={styles.input}
          inputMode='numeric'
          onChangeText={handleChange('numberofinjured')}
          onBlur={handleBlur('numberofinjured')}
          value={values.numberofinjured}
          placeholder='No. of Injured'
        />
        </View>

        <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>No. of Death </Text>  
        <TextInput
          style={styles.input}
          inputMode='numeric'
          onChangeText={handleChange('numberofdeath')}
          onBlur={handleBlur('numberofdeath')}
          value={values.numberofdeath}
          placeholder='No. of Death'
        />
        </View>
        
        <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>No. of Affected Persons </Text>  
        <TextInput
          style={styles.input}
          inputMode='numeric'
          onChangeText={handleChange('numberofaffectedpersons')}
          onBlur={handleBlur('numberofaffectedpersons')}
          value={values.numberofaffectedpersons}
          placeholder='No. of Affected Persons'
        />
        </View>

        </View>
        <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center', marginBottom: 15}}>
        
        <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>No. of Households Affected</Text>  
        <TextInput
          style={styles.input}
          inputMode='numeric'
          onChangeText={handleChange('numberofhouseholdaffected')}
          onBlur={handleBlur('numberofhouseholdaffected')}
          value={values.numberofhouseholdaffected}
          placeholder='Households Affected'
        />
        </View>

        <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>Houses Partially Damaged</Text>  
        <TextInput
          style={styles.input}
          inputMode='numeric'
          onChangeText={handleChange('numberofhousespartiallydamaged')}
          onBlur={handleBlur('numberofhousespartiallydamaged')}
          value={values.numberofhousespartiallydamaged}
          placeholder='Houses Damaged'
        />
        </View>
        
        <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>Houses Completely Damaged</Text>  
        <TextInput
          style={styles.input}
          inputMode='numeric'
          onChangeText={handleChange('numberofhousescompletelydamaged')}
          onBlur={handleBlur('numberofhousescompletelydamaged')}
          value={values.numberofhousescompletelydamaged}
          placeholder='Houses Damaged'
        />
        </View>
        
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center',}}>
        <View style={{marginTop: 18}}>
            {!location &&
              <Button title="Get Location" onPress={getLocation} />}
            {location && (
              <View>
                <Text>Latitude: {location.latitude}</Text>
                <Text>Longitude: {location.longitude}</Text>
              </View>
            )}
        </View>
        <AppButton label="Submit Form" onPress={handleSubmit} color="white" backgroundColor="#00BA9D" width={120}/>
        </View>
      </View>
    
    )}
  </Formik>
  </>
  }

  </SafeAreaView>
)
};

const styles = StyleSheet.create({
    text: {
        marginLeft: 15,
        fontSize: 13
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: 180,
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


export default AssessmentForm;