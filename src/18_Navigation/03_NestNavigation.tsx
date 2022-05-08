import * as React from 'react';
import { Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabHome">
        <Stack.Screen name="TabHome" component={TabHome}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabHome() {
  return (
    <Tab.Navigator  >
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}

function Home() {return <Text>我是首页</Text>}