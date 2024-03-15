import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import moment from 'moment'; // Make sure to install the moment library
import ReportRows from './ReportRows';


function ReportsTable({ reports } ) {

  return (
    <ScrollView>
      <View>
        <Text style={{fontSize: 20, marginLeft: 15}}>
          Recent Reports
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.tableHeader}>
          <Text style={styles.columnHeader}>State</Text>
          <Text style={styles.columnHeader}>LGA</Text>
          <Text style={styles.columnHeader}>Community</Text>
          <Text style={styles.columnHeader}>Affected Persons</Text>
          <Text style={styles.columnHeader}>Date</Text>
        </View>
        <View>
          {reports?.map((report, index) => (
            <ReportRows
              key={index}
              state={report.state}
              lga={report.lga}
              community={report.community}
              affectedpersons={report.numberofaffectedpersons}
              date={moment(report.createdAt).format("MMMM Do YYYY")}
            />
          ))}
        </View>
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

export default ReportsTable;
