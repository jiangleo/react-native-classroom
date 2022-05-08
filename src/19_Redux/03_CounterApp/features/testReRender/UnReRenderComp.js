import React from 'react';
import {Text} from 'react-native';

export default function UnReRenderComp() {
  console.log('===UnReRenderComp===');
  return <Text style={{width:0,height:0}}></Text>;
}
