// src/services/userService.ts
import { db } from '../firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { collection, addDoc } from 'firebase/firestore';

interface User {
  name: string;
  id: string;
  age: number;
  occupation: string;
  city: string;
}

export const addUser = async ({ name, id, age, occupation, city }: User): Promise<void> => {
  try {
    await addDoc(collection(db, 'users'), {
      name,
      id,
      age,
      occupation,
      city,
    });
    console.log('Usuario añadido con éxito');
  } catch (e) {
    console.error("Error añadiendo el documento: ", e);
  }
};
