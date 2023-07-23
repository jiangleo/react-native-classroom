import React from 'react';
import {SafeAreaView} from 'react-native';
import NewModulesCalculatorExample from './NewModulesCalculatorExample';
import OldModulesStorageExample from './OldModulesStorageExample';
import NewComponentTextExample from './NewComponentTextExample';
import OldComponentImageView from './OldComponentImageView';

export default function App() {
  return (
    <SafeAreaView>
      <NewModulesCalculatorExample />
      <OldModulesStorageExample />
      <NewComponentTextExample />
      <OldComponentImageView />
    </SafeAreaView>
  );
}
