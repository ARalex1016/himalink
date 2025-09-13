export interface User {
  id: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber?: string;
  providerId?: string;
  photoURL?: string;
}

export interface Event {
  id?: string;
  title: string;
  image: string[];
  description?: string;
  category: string;
  date: string; // ISO string
  location?: string;
  ticketAmount: number;
  capacity: number;
}
