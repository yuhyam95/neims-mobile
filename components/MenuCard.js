import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MenuCard = ({ name, color, onPress }) => {

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: color }]} onPress={onPress}>
      <View>
        <View>
          <Text style={[styles.statNumber, { color: 'white', fontSize: 20}]}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    width: 170,
    borderRadius: 10,
    elevation: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
    statNumber: {
    marginLeft: 10,
  },
});

export default MenuCard;
