import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../types/types";

type Props = StackScreenProps<RootStackParamList, 'UserDetailScreen'>;

const UserDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const initialState = {
    id: "",
    name: "",
    age: "",
    city: "",
    occupation: "",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value: string, prop: keyof typeof initialState) => {
    setUser({ ...user, [prop]: value });
  };

  const getUserById = async (id: string) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser({ ...docSnap.data(), id: docSnap.id } as typeof initialState);
    } else {
      console.log("No such document!");
    }
    setLoading(false);
  };

  const deleteUser = async () => {
    setLoading(true);
    const docRef = doc(db, "users", user.id);
    await deleteDoc(docRef);
    setLoading(false);
    navigation.navigate("UsersList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the User",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      name: user.name,
      age: user.age,
      city: user.city,
      occupation: user.occupation,
    });
    setUser(initialState);
    navigation.navigate("UsersList");
  };

  useEffect(() => {
    const { userId } = route.params;
    getUserById(userId);
  }, [route.params]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={user.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Age"
          keyboardType="numeric"
          style={styles.input}
          value={user.age}
          onChangeText={(value) => handleTextChange(value, "age")}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="City"
          style={styles.input}
          value={user.city}
          onChangeText={(value) => handleTextChange(value, "city")}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Occupation"
          style={styles.input}
          value={user.occupation}
          onChangeText={(value) => handleTextChange(value, "occupation")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#E57373" // Color rojo claro para eliminar
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Update"
          onPress={() => updateUser()}
          color="#4CAF50" // Color verde para actualizar
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Fondo gris claro
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cccccc",
    backgroundColor: "#ffffff",
    color: "#333333", // Color del texto gris oscuro
  },
  buttonContainer: {
    marginBottom: 15,
  },
});

export default UserDetailScreen;
