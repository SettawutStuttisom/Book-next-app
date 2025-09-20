export interface RegisterRes {
  message: string;
  user?: {
    username: string;
    email: string;
  };
}
