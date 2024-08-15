// __tests__/userFunctions.test.ts

import { updateUser, User } from '../src/userFunctions';

describe('updateUser function', () => {
  test('should navigate to "UsersList" on successful update', () => {
    const user: User = {
      id: '870241193',
      name: 'Angel Daniel Doria Moncada',
      age: 21,
      city: 'San nicolas de los garza',
      occupation: 'Desarrollador',
    };

    const mockNavigate = jest.fn();
    const mockNavigation = {
      navigate: mockNavigate,
    };

    updateUser(user, mockNavigation);

    expect(mockNavigate).toHaveBeenCalledWith('UsersList');
  });

  test('should throw an error if user data is invalid', () => {
    // Datos inválidos para el usuario
    const invalidUser: User = {
      id: '001',
      name: '', 
      age: 0,   
      city: 'Tu Ciudad', 
      occupation: 'Junior Developer',
    };

    const mockNavigation = {
      navigate: jest.fn(),
    };

    // Verifica que se lance un error para datos inválidos
    expect(() => updateUser(invalidUser, mockNavigation)).toThrow('Invalid user data');
  });
});
