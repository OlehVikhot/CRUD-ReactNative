import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { DataContextProvider } from "./store/DataContext";
import ErrorBoundary from "react-native-error-boundary";
import MainScreen from "./screens/MainScreen";
import AddNewPostScreen from "./screens/AddNewPostScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ErrorBoundary>
      <DataContextProvider>
        <NavigationContainer>
          <StatusBar barStyle='dark-content' />
          <Stack.Navigator>
            <Stack.Screen name='MainScreen' component={MainScreen} />
            <Stack.Screen
              name='AddNewPostScreen'
              component={AddNewPostScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DataContextProvider>
    </ErrorBoundary>
  );
}
