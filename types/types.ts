// types.ts
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  CreateUserScreen: undefined;
  UserDetailScreen: { userId: string };
  UsersList: undefined;
  Login: undefined;

};

export type CreateUserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateUserScreen'>;
