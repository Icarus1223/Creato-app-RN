import * as React from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { AuthProvider } from "./src/utils/AuthContext.tsx";

import Header from "./src/components/Header";
import HomeScreen from "./src/screens/Home";

//DareMe
import CreateDareMeScreen from "./src/screens/DareMe/Create";

import AuthScreen from "./src/screens/Auth";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Header />
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="DareMe-Create" component={CreateDareMeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
};

export default App;