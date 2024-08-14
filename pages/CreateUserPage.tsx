import React, { useState } from "react";
import { Button, View, StyleSheet, TextInput, ScrollView, Alert } from "react-native";
import { db } from "../firebaseConfig"; // Asegúrate de que la ruta sea correcta
import { collection, addDoc } from "firebase/firestore";
import { CreateUserScreenNavigationProp } from "../types/types";


interface Props {
  navigation: CreateUserScreenNavigationProp;
}

const CreateUserPage: React.FC<Props> = ({ navigation })=> {
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
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
        />
      </View>

      {/* Age Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Age"
          keyboardType="numeric" // Asegúrate de que el teclado sea numérico
          onChangeText={(value) => handleChangeText(value, "age")}
          value={state.age}
        />
      </View>

      {/* City Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="City"
          onChangeText={(value) => handleChangeText(value, "city")}
          value={state.city}
        />
      </View>

      {/* ID Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="ID"
          onChangeText={(value) => handleChangeText(value, "id")}
          value={state.id}
        />
      </View>

      {/* Occupation Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Occupation"
          onChangeText={(value) => handleChangeText(value, "occupation")}
          value={state.occupation}
        />
      </View>

      <View style={styles.button}>
        <Button title="Save User" onPress={saveNewUser} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  button: {
    marginTop: 15,
  },
});

export default CreateUserPage;
