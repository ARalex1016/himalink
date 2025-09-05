export interface User {
  id: string;
  displayName: string;
  email: string;
  phoneNumber?: string;
  providerId?: string;
  photoURL?: string;
}

export interface AuthStore {
  user: User | null;
  setuser: (user: User) => void;
  signupWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}
