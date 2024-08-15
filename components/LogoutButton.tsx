// components/LogoutButton.tsx

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { StackNavigationProp } from '@react-navigation/stack';

type LogoutButtonNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LogoutButton: React.FC = () => {
  const navigation = useNavigation<LogoutButtonNavigationProp>();

  const handleLogout = () => {
    // Aquí iría la lógica de cierre de sesión, como limpiar el estado, tokens, etc.
    // Luego redirigir a la pantalla de login
    navigation.dispatch(StackActions.replace('Login'));
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.buttonText}>Cerrar Sesión</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#023047',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LogoutButton;
