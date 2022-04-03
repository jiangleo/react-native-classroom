import React from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';

export default function Images() {
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
      <ScrollView>
        <Text style={{fontSize: 30}}>上下布局</Text>
        <View>
          <View style={{height: 50, backgroundColor: 'powderblue'}} />
          <View style={{height: 50, backgroundColor: 'skyblue'}} />
          <View style={{height: 50, backgroundColor: 'steelblue'}} />
        </View>
        <Text style={{fontSize: 30}}>左右布局</Text>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{width: 100, height: 100}}
            source={{
              uri: 'https://placeimg.com/640/480/cats',
            }}
          />
          <Text style={{fontSize: 18}}>
            我是文字我是文字我是文字我是文字我是文字我是文字
          </Text>
        </View>
        <Text style={{fontSize: 30}}>水平垂直居中布局（1）</Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // 高度确定
            height: 60,
            borderWidth: 1,
          }}>
          <Text
            style={{
              fontSize: 18,
              //不写下面两个，Android系统上文字会偏下
              includeFontPadding: false,
              textAlignVertical: 'center',
            }}>
            我是文字1
          </Text>
        </View>
        <Text style={{fontSize: 30}}>水平垂直居中布局（2）</Text>
        <Text
          style={{
            height: 60,
            borderWidth: 1,
            fontSize: 18,
            lineHeight: 60,
            textAlign: 'center',
            //不写下面两个，Android系统上文字会偏下
            includeFontPadding: false,
            textAlignVertical: 'center',
          }}>
          我是文字2
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
  },
});
