import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CustomDateField = () => {
  const [date, setDate] = useState('');

  const handleDateChange = (text) => {
    // Format the date with backslash as the user types
    if ((text.length === 2 && date.length < 2) || (text.length === 5 && date.length < 5)) {
      // Add backslash after the second and fifth character
      text += '/';
    } else if (text.length < date.length && (text.length === 2 || text.length === 5)) {
      // Remove the backslash when the user is deleting
      text = text.slice(0, -1);
    }

    setDate(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="MM/DD/YYYY"
        value={date}
        onChangeText={handleDateChange}
        keyboardType="numeric"
        maxLength={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default CustomDateField;
