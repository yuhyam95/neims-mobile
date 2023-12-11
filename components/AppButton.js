import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { scale } from 'react-native-size-matters';


const AppButton = ({ label, onPress, backgroundColor, color }) => {
    return (
        <View style={{alignItems: 'center'}}>
        <TouchableOpacity
            style={{
                width: "20%",
                height: scale(20),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                backgroundColor: backgroundColor,
                marginTop: scale(10),
            }}
            onPress={onPress}
        >
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ color: color, fontWeight: "bold", fontSize: 15 }}>{label}</Text>
            </View>
        </TouchableOpacity>
        </View>
    )
}

export default AppButton;