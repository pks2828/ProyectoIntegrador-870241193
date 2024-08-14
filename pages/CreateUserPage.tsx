import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, Alert, TouchableOpacity } from "react-native";
import { db } from "../firebaseConfig"; // Asegúrate de que la ruta sea correcta
import { collection, addDoc } from "firebase/firestore";
import { CreateUserScreenNavigationProp } from "../types/types";

interface Props {
  navigation: CreateUserScreenNavigationProp;
}

const CreateUserPage: React.FC<Props> = ({ navigation }) => {
  const initialState = {
    name: "",
    age: "",
    city: "",
    id: "",
    occupation: "",
  };

  const [state, setState] = useState(initialState);

  const handleChangeText = (value: string, name: keyof typeof initialState) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    if (state.name === "" || state.age === "" || state.city === "" || state.id === "" || state.occupation === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await addDoc(collection(db, "users"), {
        name: state.name,
        age: parseInt(state.age, 10), // Convierte la edad a número
        city: state.city,
        id: state.id,
        occupation: state.occupation,
      });
      
      // Navigate to UsersList page
      navigation.navigate("UsersList");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save user");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nombre Completo"
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
          style={styles.input}
        />
      </View>

      {/* Age Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Edad"
          keyboardType="numeric" // Asegúrate de que el teclado sea numérico
          onChangeText={(value) => handleChangeText(value, "age")}
          value={state.age}
          style={styles.input}
        />
      </View>

      {/* City Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Estado"
          onChangeText={(value) => handleChangeText(value, "city")}
          value={state.city}
          style={styles.input}
        />
      </View>

      {/* ID Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Matricula"
          onChangeText={(value) => handleChangeText(value, "id")}
          value={state.id}
          style={styles.input}
        />
      </View>

      {/* Occupation Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ocupación"
          onChangeText={(value) => handleChangeText(value, "occupation")}
          value={state.occupation}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={saveNewUser}>
          <Text style={styles.buttonText}>Guardar Usuario</Text>
        </TouchableOpacity>      
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  inputContainer: {
    marginBottom: 20,
    padding: 10,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    backgroundColor: "#FFFFFF",
    color: "#333333",
    fontSize: 16,
  },
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden', // Ensures button corners are rounded
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#2196F3",
    elevation: 5, // Adds shadow for Android
    shadowColor: "#000000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 2, // Shadow radius
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default CreateUserPage;