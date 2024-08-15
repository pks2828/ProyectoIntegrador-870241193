import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/types"; // Asegúrate de importar los tipos correctos

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    // Simulación de autenticación
    if (email === "admin" && password === "admin") {
      // Redirigir a la pantalla principal si el login es exitoso
      navigation.dispatch(StackActions.replace("UsersList"));
    } else {
      Alert.alert("Error", "Email o contraseña incorrectos");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Image
        source={require("../assets/candado.png")} // Reemplaza con la ruta a tu imagen de logo
        style={styles.logo}
      />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa", // Color de fondo claro
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  formContainer: {
    width: '80%',
    backgroundColor: "#ffffff", // Fondo blanco para el formulario
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000000", // Sombra para dar un efecto de elevación
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00796b",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 45,
    borderColor: "#b2dfdb",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: "#00796b",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginPage;
