import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import Login from "./pages/Login";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BorrowerHomeScreen from "./pages/BorowerHomePage";
import LenderHomeScreen from "./pages/LenderHomePage";
import LoginScreen from "./pages/Login";
import SplashScreen from "./pages/SplashScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeBorrower" component={BorrowerHomeScreen} />
        <Stack.Screen name="HomeLender" component={LenderHomeScreen} />
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
