import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Message" component={Message} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Page} />
      <Stack.Screen name="Page1" component={Page} />
      <Stack.Screen name="Page2" component={Page} />
    </Stack.Navigator>
  );
}

function Message() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Page} />
      <Stack.Screen name="Page3" component={Page} />
      <Stack.Screen name="Page4" component={Page} />
    </Stack.Navigator>
  );
}

function Page({navigation,route}: NativeStackScreenProps<ParamListBase>) {
  return (
    <View style={{flex: 1}}>
        <Text onPress={()=>{
          navigation.navigate('Page3')
        }}>我是普通页面{route.name}，点我跳转到 Message 页面的 Page3</Text>
    </View>
  );
}
