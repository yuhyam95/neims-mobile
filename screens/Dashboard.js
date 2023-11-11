
import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Dashboard = () => {
  const route = useRoute();
  const decodedToken = route.params?.decodedToken;

  return (
    <View>
      <Text>Welcome to the Dashboard!</Text>
      <Text>Decoded Token: {JSON.stringify(decodedToken)}</Text>
    </View>
  );
};

export default Dashboard;
