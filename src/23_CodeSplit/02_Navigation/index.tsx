import React, {lazy, Suspense} from 'react';
import {
  Text,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {Views, RootStackParamList} from './types';
import Main from './component/Main';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Foo = lazy(() => import('./component/Foo'));
const Bar = lazy(() => import('./component/Bar'));

export default function App() {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Views.Main}>
          <Stack.Screen name={Views.Main} component={Main} />
          <Stack.Screen name={Views.Foo} component={Foo} />
          <Stack.Screen name={Views.Bar} component={Bar} />
        </Stack.Navigator>
      </NavigationContainer>
    </Suspense>
  );
}
