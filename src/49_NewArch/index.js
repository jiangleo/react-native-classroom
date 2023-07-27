import React from 'react';
import {SafeAreaView} from 'react-native';
import NewModulesCalculatorExample from './NewModulesCalculatorExample';
import OldModulesStorageExample from './OldModulesStorageExample';
import NewComponentTextExample from './NewComponentTextExample';
import OldComponentCustomView from './OldComponentCustomView';
import NewComponentViewExample from './NewComponentViewExample';

export default function App() {
  return (
    <SafeAreaView>
      {/* <NewModulesCalculatorExample />
      <OldModulesStorageExample />
      <NewComponentTextExample /> */}
      <OldComponentCustomView />
      <NewComponentViewExample />
    </SafeAreaView>
  );
}
