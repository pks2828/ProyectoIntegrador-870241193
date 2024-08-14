import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UsersListPage from "./pages/UsersListPage";
import CreateUserPage from "./pages/CreateUserPage";
import UserDetailPage from "./pages/UserDetailPage";
import { RootStackParamList } from "./types/types";



const Stack = createStackNavigator<RootStackParamList>();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#bde0fe"
        },
        headerTintColor: "#023047",
        headerTitleStyle: {
          fontWeight: 600,
          fontSize: 20,

        },
      }}
    >
      <Stack.Screen
        name="UsersList"
        component={UsersListPage}
        options={{ title: "Lista De Usuarios" }}
      />
      <Stack.Screen
        name="CreateUserScreen"
        component={CreateUserPage}
        options={{ title: "Crear Nuevo Usuario" }}
      />
      <Stack.Screen
        name="UserDetailScreen"
        component={UserDetailPage}
        options={{ title: "Detalles Del Usuario" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "center",
  },
});
