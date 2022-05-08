import * as React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageSourcePropType,
  GestureResponderEvent,
  ImageRequireSource,
} from 'react-native';
import type {ParamListBase} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useEffect, useLayoutEffect } from 'react';

interface NTF {
  title: string;
  describe: string;
  price: number;
  image: ImageRequireSource;
  symbol?: string;
}

const ALL_NTF: NTF[] = [
  {
    title: 'Kitty',
    describe: 'She is a beautiful girl.',
    price: 9.9,
    image: require('./images/kitty.png'),
  },
  {
    title: '旺财',
    describe: '旺财旺财旺财~',
    price: 99.9,
    image: require('./images/dog.png'),
  },
  {
    title: 'Simba',
    describe: '狮子王归来',
    price: 19.9,
    image: require('./images/lion.png'),
  },
];

export type NativeStackParams = {
  Detail: NTF;
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Discover">
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen
          name="Detail"
          initialParams={{symbol: '$'}}
          options={{
            title: '详情页',
            // headerBackButtonMenuEnabled: false,
            // headerBackTitle: '1234',
            // headerBackTitleVisible: false,
            // statusBarHidden: false,
            // headerShown: false,
            // gestureEnabled: false,
            // animation: 'slide_from_bottom'
            // fullScreenGestureEnabled: true,
          }}
          component={Detail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Item({
  source,
  onPress,
}: {
  source: ImageSourcePropType;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
}) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#cfcfcf',
          borderRadius: 10,
          borderWidth: StyleSheet.hairlineWidth,
          margin: 10,
          backgroundColor: '#fff',
        }}>
        <Image style={{width: 100, height: 100}} source={source} />
      </View>
    </Pressable>
  );
}

function Discover({navigation}: NativeStackScreenProps<ParamListBase>) {
  return (
    <ScrollView style={{flex: 1}}>
      {ALL_NTF.map((NTF, index) => (
        <Item
          key={index}
          source={NTF.image}
          onPress={() => {
            navigation.navigate('Detail', NTF);
          }}
        />
      ))}
    </ScrollView>
  );
}

function Detail({
  route,
  navigation,
}: NativeStackScreenProps<NativeStackParams, 'Detail'>) {

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      fullScreenGestureEnabled: true,
    });
  }, [navigation])
  const {describe, price, image, symbol} = route.params;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fefefe',
      }}>
      <Text style={styles.text}>{describe}</Text>
      <Image style={{width: 300, height: 300}} source={image} />
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text}>
          {symbol}
          {price}
        </Text>
        <Text style={[styles.button]}>Buy</Text>
        <Text
          style={[styles.button]}
          onPress={() => {
            if (symbol === '￥') {
              return;
            }
            navigation.setParams({
              symbol: '￥',
              price: price * 6.3,
            });
          }}>
          切换成￥
        </Text>
        <Text
          style={[styles.button]}
          onPress={() => {
            navigation.setOptions({
              title: '新标题',
            });
          }}>
          设置新标题
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    padding: 16,
    width: '90%',
    maxWidth: 400,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  text: {
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  button: {
    alignSelf: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
  },
});

export default App;
