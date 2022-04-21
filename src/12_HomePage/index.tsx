import React from 'react';
import {SafeAreaView} from 'react-native';
import TopBar from './features/TopBar';
import List from './features/List';

import {QueryClient, QueryClientProvider, focusManager} from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{flex: 1}}>
        <TopBar />
        <List />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;
