import React from 'react';
import { View } from 'react-native';
import CategoryCard from './CategoryCard';


const CategoryGrid = ({data}) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 10 }}>
      {data?.map((category) => (
        <CategoryCard key={category.id} name={category.name} total={category.total} color={category.color} />
      ))}
    </View>
  );
};

export default CategoryGrid;