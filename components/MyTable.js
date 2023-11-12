import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment'; // Make sure to install the moment library

import TableRows from './TableRows'; // Assuming you have the TableRows component


function MyTable({ products } ) {

  return (
    <ScrollView>
      <View>
        <Text style={{fontSize: 20, marginLeft: 15}}>
          Product List
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.tableHeader}>
          <Text style={styles.columnHeader}>Item</Text>
          <Text style={styles.columnHeader}>Quantity</Text>
          <Text style={styles.columnHeader}>Reason</Text>
          {/* {showStation && <Text style={styles.columnHeader}>Station</Text>} */}
          <Text style={styles.columnHeader}>Category</Text>
          <Text style={styles.columnHeader}>Date</Text>
        </View>
        <View>
          {products?.map((product, index) => (
            <TableRows
              key={index}
              name={product.name}
              station={product.station.name}
              category={product?.category.name}
              reason={product.tag}
              quantity={product.quantity}
              date={moment(product.createdAt).format("MMMM Do YYYY")}
            />
          ))}
        </View>
        {/* <View style={styles.tableFooter}>
          <View style={styles.pagination}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.paginationButton,
                  { backgroundColor: index + 1 === currentPage ? 'blue' : 'gray' },
                ]}
                onPress={() => setCurrentPage(index + 1)}
              >
                <Text style={styles.paginationText}>{index + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View> */}
      </View>
    </ScrollView>
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

export default MyTable;
