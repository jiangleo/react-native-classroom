import React from 'react';
import {useSelector} from 'react-redux';
import {Text} from 'react-native';

import {selectFreezeValue} from '../couter/counterSlice.js';

export default function MayReRenderComp() {
  console.log('===MayReRenderComp===');

  const freezeValue = useSelector(selectFreezeValue);

  return <Text style={{width:0,height:0}}>{freezeValue}</Text>;
}
