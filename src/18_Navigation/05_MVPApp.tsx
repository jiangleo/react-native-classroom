import * as React from 'react';
import {View, Text, StyleSheet, Pressable, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {ParamListBase} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTabHome">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="BottomTabHome"
          component={BottomTabHome}
        />
        <Stack.Screen name="Page" component={Page} />
        <Stack.Screen
          options={{
            presentation: 'transparentModal' ,
            animation: 'fade',
            headerShown: false,
          }}
          name="Modal"
          component={DialogScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function BottomTabHome() {
  return (
    <Tab.Navigator
    initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={TopTabHome} options={{title: '首页'}} />
      <Tab.Screen name="Messages" component={Page} options={{title: '消息'}}/>
      <Tab.Screen name="My" component={Page} options={{title: '我'}}/>
    </Tab.Navigator>
  );
}

function TopTabHome() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopTab.Navigator initialRouteName="TopTabDiscover">
        <TopTab.Screen
          name="Follow"
          component={Page}
          options={{title: '关注'}}
        />
        <TopTab.Screen
          name="TopTabDiscover"
          component={TopTabDiscover}
          options={{title: '发现'}}
        />
        <TopTab.Screen
          name="Location"
          component={Page}
          options={{title: '附近'}}
        />
      </TopTab.Navigator>
    </SafeAreaView>
  );
}

function TopTabDiscover() {
  return (
    <TopTab.Navigator initialRouteName="Recommend">
      <TopTab.Screen name="Recommend" component={Page} options={{title: '推荐'}} />
      <TopTab.Screen
        name="Cat"
        component={Page}
        options={{title: '猫猫'}}
      />
      <TopTab.Screen
        name="Dog"
        component={Page}
        options={{title: '狗狗'}}
      />
    </TopTab.Navigator>
  );
}

function Page({route,navigation}: NativeStackScreenProps<ParamListBase>) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.text}>我是{route.name}页面</Text>
      <Text
        style={styles.button}
        onPress={() => {
          navigation.push('Page');
        }}>
        跳转下一页
      </Text>
      <Text
        style={styles.button}
        onPress={() => {
          navigation.push('Modal');
        }}>
        打开弹窗
      </Text>
    </View>
  );
}

const DialogScreen = ({
  navigation,
}: NativeStackScreenProps<ParamListBase>) => {

  return (
    <View style={styles.container}>
      <Pressable style={styles.backdrop} onPress={navigation.goBack} />
      <View
        style={styles.dialog}
      >
        <Text style={styles.text}>
          我是弹窗
        </Text>
        <Button title='我知道了' onPress={navigation.goBack}/>
      </View>
    </View>
  );
};

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
    backgroundColor: '#fff'
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  text: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  button: {
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: '#0ac'
  },
});


export default App;
