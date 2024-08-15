import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer, useNavigationState } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./pages/LoginPage";
import UsersListPage from "./pages/UsersListPage";
import CreateUserPage from "./pages/CreateUserPage";
import UserDetailPage from "./pages/UserDetailPage";
import { RootStackParamList } from "./types/types";
import LogoutButton from "./components/LogoutButton";

const Stack = createStackNavigator<RootStackParamList>();

function MyStack() {
  // Hook para obtener la ruta actual
  const getHeaderRight = (routeName: string) => {
    // Condicionamos el botón para que no se muestre en la pantalla de inicio de sesión
    if (routeName === 'Login') {
      return null;
    }
    return <LogoutButton />;
  };

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "#bde0fe",
        },
        headerTintColor: "#023047",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 20,
        },
        headerRight: () => getHeaderRight(route.name),
      })}
    >
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{ title: "Iniciar Sesión" }}
      />
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
