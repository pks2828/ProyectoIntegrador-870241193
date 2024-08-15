import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { StackNavigationProp } from '@react-navigation/stack';
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { collection, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Definir tipos para navegación
type RootStackParamList = {
  UserDetailScreen: { userId: string };
  UsersList: undefined;
  CreateUserScreen: undefined;
};

type UsersListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UsersList'>;

interface UsersListProps {
  navigation: UsersListScreenNavigationProp;
}

interface User {
  id: string;
  name: string;
  age: string;
  city: string;
  occupation: string;
}

const profileImage = require('../assets/uifaces-abstract-image.jpg');

const UsersListPage: React.FC<UsersListProps> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga

  useEffect(() => {
    const usersCollection = collection(db, "users");
    const unsubscribe = onSnapshot(usersCollection, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const usersList: User[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        usersList.push({
          id: doc.id,
          name: data.name,
          age: data.age,
          city: data.city,
          occupation: data.occupation,
        });
      });
      setUsers(usersList);
      setLoading(false); // Datos cargados
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Cargando usuarios...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateUserScreen")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Crear Nuevo Usuario</Text>
        </TouchableOpacity>
      </View>
      {users.map((user) => (
        <ListItem
          key={user.id}
          bottomDivider
          containerStyle={styles.listItem}
          onPress={() => {
            navigation.navigate("UserDetailScreen", {
              userId: user.id,
            });
          }}
        >
          <Avatar
            source={profileImage} // Usar imagen local
            rounded
            containerStyle={styles.avatar}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{user.name}</ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>{user.occupation}</ListItem.Subtitle>
            <ListItem.Subtitle style={styles.subtitle}>{user.city}</ListItem.Subtitle>
            <ListItem.Subtitle style={styles.subtitle}>{user.age}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Fondo de pantalla gris claro
    padding: 10,
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: 'center', // Centra el botón horizontalmente
  },
  button: {
    backgroundColor: '#2196F3', // Color de fondo azul
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, // Sombra para Android
  },
  buttonText: {
    color: '#fff', // Color de texto blanco
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listItem: {
    backgroundColor: '#fff', // Fondo blanco para los elementos de la lista
    borderRadius: 8, // Bordes redondeados
    shadowColor: '#000', // Sombra para el efecto de elevación
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Sombra para Android
    marginBottom: 10, // Espacio entre elementos de la lista
  },
  avatar: {
    backgroundColor: '#e0e0e0', // Fondo gris claro para el avatar
  },
  title: {
    fontSize: 18,
    color: '#333', // Color de texto gris oscuro
  },
  subtitle: {
    fontSize: 14,
    color: '#555', // Color de texto gris medio
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default UsersListPage;
