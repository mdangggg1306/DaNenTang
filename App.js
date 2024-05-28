//

import React, { useEffect, useState } from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/core/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import BottomTabNav from "./src/components/BottomTabNav";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  MainScreen,
  CountryRender,
  Create,
  Messages,
  Profile,
  Settings,
  Home,
  EditProfile,
  CheckoutScreen,
} from "./src/screens";
import ChangePassWordScreen from "./src/screens/ChangePasswordScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tabnavigator from "./src/components/Tabnavigator";
import { SERVER_IP } from "./config";
import { getToken, getRefreshToken, refreshToken } from "./src/auth/token";
import { verifyToken } from "./src/auth/auth";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      const token = await getToken();
      if (token && (await verifyToken(token))) {
        setLoggedIn(true);
      } else {
        await AsyncStorage.removeItem("token");
        setLoggedIn(false);
      }
      setLoading(false);
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? "MainScreen" : "StartScreen"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="MainScreen" component={Tabnavigator} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
          <Stack.Screen
            name="ChangePassWordScreen"
            component={ChangePassWordScreen}
          />
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
