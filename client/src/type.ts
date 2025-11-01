import type { Timestamp } from "firebase/firestore";

export type Role = "user" | "organizer" | "coordinator" | "admin";

export interface Country {
  name: string;
  code: string;
  currency: string;
  lng?: number;
  lat?: number;
}

export interface User {
  uid: string;
  displayName: string;
  email: string;
  phone?: string;
  emailVerified: boolean;
  role?: Role;
  photoURL?: string;
  country?: Country;
  language?: string;
  createdAt?: Timestamp;
}

export interface Location {
  lat: number;
  lng: number;
  name?: string;
  address?: string;
}

export interface EventStats {
  totalBooked: number;
  totalCheckedIn: number;
  pendingBookings: number;
}

export interface Event {
  id?: string;
  organizerId?: string;
  title: string;
  coverImageURL: string;
  shortDescription: string;
  longDescription?: string;
  category: string;
  date_Time: {
    startAt: Date | Timestamp;
    endAt: Date | Timestamp;
  }; // ISO string
  location: Location;
  ticket: {
    amount: number; // in cents
    currency: string;
  };
  capacity: number;
  seatsAvailable?: number;
  coordinators?: string[]; // coordinators id array
  status?: "draft" | "published" | "cancelled";
  stats?: EventStats;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export type BookingStatus = "pending" | "rejected" | "confirmed" | "cancelled";

export interface Bookings {
  id: string;
  eventId: string;
  userId: string;
  seats: number;
  totalAmount: number; // cents
  paymentMethod: string; // 'bank','eSewa','IME','khalti','manual-transfer',etc
  paymentProof?: {
    screenshot?: string;
    paymentProofURL?: string; // storage reference
    transactionId?: string;
    payerName?: string;
    payerPhone?: string;
  };
  status: BookingStatus;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  confirmedBy?: string; // manager/organizer id
  ticket?: {
    ticketNumber: string;
    qrCodeURL: string;
    issuedAt: Timestamp;
  };
}

export interface UserScans {
  id: string;
  bookingId: string;
  scannedBy: string; // manager id
  scannedAt: Timestamp;
  status: "checked-in" | "revoked";
}
