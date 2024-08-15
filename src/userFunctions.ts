// src/userFunctions.ts

// Define el tipo `User`
export interface User {
  id: string;
  name: string;
  age: number;
  city: string;
  occupation: string;
}

export const updateUser = (user: User, navigation: { navigate: (screen: string) => void }) => {
  if (user.name === '' || user.age <= 0) {
    throw new Error('Invalid user data');
  }

  // Simula la actualización del usuario
  console.log(`User ${user.id} updated`);

  // Navega a la lista de usuarios
  navigation.navigate('UsersList');
};
