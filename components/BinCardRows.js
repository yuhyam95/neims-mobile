import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';



function BinCardRows({ balance, quantity, reason, date, signature}) {
  

  return (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.text}>{date}</Text>
      </View>
     
      <View style={styles.cell}>
        <Text style={styles.text}>{quantity}</Text>
      </View>
      
      <View style={styles.cell}>
        <View style={[styles.reasonBox, { backgroundColor: reason === 'restock' ? '#BAF2E0' : '#FBD8D8' }]}>
          <Text style={{ color: reason === 'restock' ? '#2FD197' : '#EB4547', fontSize: 13 }}>
            {reason === 'restock' ? 'RESTOCK' : 'DISTRIBUTION'}
          </Text>
        </View>
      </View>

      <View style={styles.cell}>
        <View style={styles.quantityBox}>
          <Text style={styles.text}>{quantity}</Text>
        </View>
      </View>

      <View style={styles.cell}><Text style={styles.text}>{balance}</Text></View>
      <View style={styles.cell}><Text style={styles.text}>{signature}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
    fontSize: 13
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityBox: {
    borderWidth: 0.5,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reasonBox: {
    borderWidth: 0.5,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'teal',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default BinCardRows;
