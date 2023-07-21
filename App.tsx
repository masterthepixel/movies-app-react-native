/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {LogBox} from 'react-native';

import RootNavigator from './src/navigation/RootNavigator';
import {AxiosProvider} from './src/provider/Axios';
import {theme} from './src/utils/theme';

LogBox.ignoreLogs([
  'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <AxiosProvider>
        <QueryClientProvider client={queryClient}>
          <RootNavigator />
        </QueryClientProvider>
      </AxiosProvider>
    </NativeBaseProvider>
  );
}

export default App;
