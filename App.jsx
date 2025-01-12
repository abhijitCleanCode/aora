import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login, OnBoarding, SignUp, TabNavigator} from './src/screens';
import GlobalProvider from './src/context/GlobalProvider';

const Stack = createNativeStackNavigator();
function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="OnBoarding"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      {/* main app (tab navigator) */}
      <Stack.Screen name="Tabs" component={TabNavigator} />
      {/* auth screen */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </GlobalProvider>
  );
};

export default App;
