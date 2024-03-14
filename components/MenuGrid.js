import React from 'react';
import { View } from 'react-native';
import MenuCard from './MenuCard';

const MenuGrid = ({data}) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 5 }}>
      {data?.map((menu) => (
        <MenuCard key={menu.id} name={menu.name} color={menu.color} onPress={menu.onPress}/>
      ))}
    </View>
  );
};

export default MenuGrid;
