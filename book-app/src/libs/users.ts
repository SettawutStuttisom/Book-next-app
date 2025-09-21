// src/lib/users.ts
export interface User {
  username: string;
  email: string;
  password: string;
}

// memory store user
export const users: User[] = [];
