// Shared TypeScript types for API

export interface Property {
  partitionKey: string;
  rowKey: string;
  name: string;
  description: string;
  address: string; // JSON stringified
  amenities: string; // JSON array stringified
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  images: string; // JSON array of URLs
  basePrice: number;
  currency: string;
  cleaningFee: number;
  minStay: number;
  checkInTime: string;
  checkOutTime: string;
  isActive: boolean;
}

export interface Booking {
  partitionKey: string;
  rowKey: string;
  bookingReference: string;
  propertyId: string;
  status: 'pending_payment' | 'confirmed' | 'cancelled';
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCount: number;
  checkIn: string; // ISO date string
  checkOut: string;
  nights: number;
  basePrice: number;
  total: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'expired';
  paymentMethod: string;
  specialRequests?: string;
  createdAt: string;
  expiresAt?: string;
  timestamp?: Date;
}

export interface BlockedDate {
  partitionKey: string;
  rowKey: string;
  propertyId: string;
  startDate: string;
  endDate: string;
  reason: string;
  createdBy: string;
  createdAt: string;
}

export interface Settings {
  partitionKey: string;
  rowKey: string;
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  bankDetails: string; // JSON with account info
  currency: string;
}

export interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
}

export interface Admin {
  partitionKey: string;
  rowKey: string;
  name: string;
  email: string;
  passwordHash: string;
  status: "pending" | "approved";
  createdAt: string;
}

export interface CreateBookingRequest {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guestDetails: {
    name: string;
    email: string;
    phone: string;
    guestCount: number;
  };
  specialRequests?: string;
}

export interface CreateBookingResponse {
  success: boolean;
  bookingId: string;
  bookingReference: string;
  bookingDetails: Booking;
  bankDetails: BankDetails;
  emailSent?: boolean;
  emailError?: string;
}
