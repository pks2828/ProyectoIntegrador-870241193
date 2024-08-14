import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"; // Asegúrate de que esta importación esté disponible
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

const UsersListPage: React.FC<UsersListProps> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);

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
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("CreateUserScreen")}
          title="Crear Nuevo Usuario"
          color="#000" // Cambia el color del texto del botón
        />
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
            source={{
              uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
            }}
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
});

export default UsersListPage;
