import React, {useRef} from 'react';
import {View, Text, StyleSheet, ViewStyle, Pressable} from 'react-native';
import { availableColors } from '../features/filters/colors'

interface DotProps {
  color: string;
  onPress: (color: string) => void;
  style: ViewStyle;
  checked: boolean
}

const allColors = ['transparent',...availableColors]

export default function Dot({color, onPress, style, checked}: DotProps) {
    const ref = useRef(0)
    console.log(ref.current)

  return (
    <Pressable onPress={() => {
        console.log('allColors', allColors)
        ref.current = ref.current+1
        console.log(ref.current)
        const color = allColors[ref.current%allColors.length]

        onPress(color)
    }}>
      <View style={[styles.dot, style, {backgroundColor: color}, {opacity: checked? 0.7: 0.2}]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    borderWidth: 3,
    borderColor: '#f6f6f6',
    borderRadius: 40,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'rgb(112, 76, 182)',
  },
});
