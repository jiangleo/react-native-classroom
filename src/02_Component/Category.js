import React from 'react';
import {Text} from 'react-native';
export default function Category({category}) {
  return (
    <Text
      style={{
        marginTop: 20,
        flexDirection: 'row',
        width: 100,
        fontWeight: 'bold',
      }}>
      {category}
    </Text>
  );
}
