import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment'; // Make sure to install the moment library

function BinCard({ bincard } ) {

  return (
    <>
      <View>
        <Text style={{fontSize: 20, marginLeft: 15}}>
         BinCard
        </Text>
      </View>
      
      <View style={styles.container}>
        <View style={styles.tableHeader}>
          <Text style={styles.columnHeader}>Date</Text>
          <Text style={styles.columnHeader}>SIV/SRV</Text>
          <Text style={styles.columnHeader}>Movement</Text>
          <Text style={styles.columnHeader}>Quantity</Text>
          <Text style={styles.columnHeader}>Balance</Text>
          <Text style={styles.columnHeader}>Signature</Text>
        </View>

        <View>
          {bincard?.map((product, index) => (
            <BinCardRows
                key={index}
                date={moment(product?.createdAt).format("MMMM Do YYYY")}
                number={product?.srvnumber || product?.sivnumber} 
                movement={product?.movement}
                quantity={product?.quantity}
                balance={product?.balance}
                signature={product?.signature}
          />
          ))}
        </View>
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd'
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 15,
  },
  columnHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
  tableFooter: {
    marginTop: 10,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
  },
  paginationButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  paginationText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default BinCard;
