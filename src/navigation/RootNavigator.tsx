import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DetailsScreen from '../screens/Details';
import SearchScreen from '../screens/Search';

export type RootStackParamList = {
  Search: undefined;
  Details: {
    movieId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const options = {
  headerShown: false,
  contentStyle: {
    backgroundColor: 'black',
  },
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={options}>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
