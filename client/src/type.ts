export interface User {
  id: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber?: string;
  providerId?: string;
  photoURL?: string;
}
