import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'

export default function AppTextInput({marginVertical, keyboardType, placeholder, ...otherProps}) {
    return (
        <View style={styles.container}>
            <TextInput  
                keyboardType={keyboardType}
                placeholder={placeholder}
                style={{
                    backgroundColor:'#FFFFF',
                    //borderRadius: 10,
                    //flexDirection: "row",
                    width: '80%',
                    padding: 10,  
                    marginVertical: marginVertical,  
                    fontSize: 15,
                    textAlign: "center",
                    height: 50,
                }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    input: {
        
        }
})