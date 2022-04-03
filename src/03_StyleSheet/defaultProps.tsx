import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  text: {
    flex: 1,
    width: '1',
    a: 1,
  },
});

const newLocal = {
  flex: 1,
  a: 1,
};
export default function Images() {
  return (
    <SafeAreaView style={{flex: 1, a: 1}}>
      <Text style={styles.text}>全局样式</Text>
    </SafeAreaView>
  );
}
