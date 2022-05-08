import React from 'react'
import { View, Text, StyleSheet, ViewStyle} from 'react-native'

interface ButtonProps {
    title: string;
    onPress: () => void;
    style: ViewStyle
}

export default function Button({title, onPress, style}: ButtonProps) {
    return (
    <View style={[styles.button, style]}>
      <Text style={styles.buttonText} onPress={onPress}>
        {title}
      </Text>
    </View>
    );
  }
  
  const styles = StyleSheet.create({
    button: {
      width: 100,
      marginVertical: 10,
      marginHorizontal: 10,
      borderWidth: 2,
      borderColor: 'rgb(112, 76, 182)',
      paddingHorizontal: 12,
      paddingVertical: 4,
      backgroundColor: 'rgba(112, 76, 182, 0.1)',
      borderRadius: 2,
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 18,
      color: 'rgb(112, 76, 182)',
    },
  });
  