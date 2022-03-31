import React from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';

export default function Images() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Text style={{fontSize: 30}}>
          需求：已知图片宽640高480，在容器宽度不确定的情况下，展示不拉伸的图片。
        </Text>
        <Text style={{fontSize: 20}}>
          方案一：图片宽度为容器宽度，高度不填（不显示）
        </Text>
        <Image
          style={{width: '100%', borderWidth: 2, borderColor: '#0ac'}}
          source={{
            uri: 'https://placeimg.com/640/480/cats',
          }}
        />
        <Text style={{fontSize: 20}}>
          方案二：图片宽度为容器宽度，宽高比为 640/480（正确显示）
        </Text>
        <Image
          style={{
            width: '100%',
            aspectRatio: 640 / 480,
            borderWidth: 2,
            borderColor: '#0ac',
          }}
          source={{
            uri: 'https://placeimg.com/640/480/people',
          }}
        />
        <Text style={{fontSize: 20}}>图片阴影</Text>
        <Image
          style={{
            width: 100,
            height: (480 / 640) * 100,
            borderWidth: 2,
            borderColor: '#0ac',
            shadowColor: '#000',
            shadowRadius: 2,
            shadowOpacity: 0.8,
            elevation: 5,
            backgroundColor: '#0ac',
            shadowOffset: {width: 2, height: 2},
            overflow: 'visible',
          }}
          source={{
            uri: 'https://placeimg.com/640/480/people',
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
