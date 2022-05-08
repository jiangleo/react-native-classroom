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

interface NTF {
  title: string;
  describe: string;
  price: number;
  image: ImageRequireSource;
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
        <Stack.Screen name="Discover"  component={Discover} />
        <Stack.Screen name="Detail" component={Detail} />
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
          backgroundColor: '#fff'
        }}>
        <Image style={{width: 100, height: 100}} source={source} />
      </View>
    </Pressable>
  );
}

function Discover({navigation}: NativeStackScreenProps<ParamListBase>) {
  return (
    <ScrollView style={{flex: 1}}>
      {ALL_NTF.map(NTF => (
        <Item
          source={NTF.image}
          onPress={() => {
            navigation.navigate('Detail', NTF);
          }}
        />
      ))}
    </ScrollView>
  );
}

function Detail({route}: NativeStackScreenProps<NativeStackParams, 'Detail'>) {  
  const {describe, price, image} = route.params 
  return (<View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
    <Text style={styles.text}>{describe}</Text>
    <Image style={{width: 100, height: 100}} source={image} />
    <View style={{flexDirection: 'row',justifyContent: 'space-between',}} >
      <Text style={styles.text}>{price}</Text>
      <Text style={styles.button}>Buy</Text>
    </View>
  </View>)
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
  },
  button: {
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: '#0ac',
  },
});

export default App;
