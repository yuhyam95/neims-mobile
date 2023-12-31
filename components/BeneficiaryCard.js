import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BeneficiaryCard = ({ name, total, color }) => {

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: color }]}>
      <View style={styles.cardBody}>
        <View style={styles.stat}>
          <View style={styles.hStack}>
            <Text style={[styles.statLabel, { color: 'white' }]}>{name}</Text>
          </View>
          <Text style={[styles.statNumber, { color: 'white', fontSize: 32 }]}>{total}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 15,
    width: 250,
    borderRadius: 10,
    elevation: 10,
    height: 80
  },
  cardBody: {
    // Add your card body styles here
  },
  stat: {
    // Add your stat container styles here
  },
  hStack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10
  },
  statLabel: {
    
  },
  statNumber: {
    marginLeft: 10
  },
});

export default BeneficiaryCard;
