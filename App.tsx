import * as React from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Provider as ReduxProvider } from "react-redux";

import { AuthProvider } from "./src/utils/AuthContext.tsx";
import { store } from "./src/redux/store";

import Header from "./src/components/Header";
import HomeScreen from "./src/screens/Home";

//DareMe
import CreateDareMeScreen from "./src/screens/DareMe/Create";
import CreateDareMeTitleScreen from "./src/screens/DareMe/Create/title.tsx";
import CreateDareMeOptionScreen from "./src/screens/DareMe/Create/dareOption.tsx";

import DareMeDetailScreen from "./src/screens/DareMe/Detail";

import AuthScreen from "./src/screens/Auth";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ReduxProvider store={store}>
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
              <Stack.Screen name="DareMe-Create-Title" component={CreateDareMeTitleScreen} />
              <Stack.Screen name="DareMe-Create-DareOption" component={CreateDareMeOptionScreen} />
              <Stack.Screen name="DareMe-Detail" component={DareMeDetailScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </AuthProvider>
    </ReduxProvider>
  );
};

export default App;