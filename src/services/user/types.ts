export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserCredential {
  id: string;
  email: string;
  passwordHash: string;
  token: string;
}

export type UserInsert = Omit<User, 'id'> & {
  password: string;
};
