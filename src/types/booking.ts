export interface BookingSlot {
  id: string;
  date: string; // ISO date string
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  isAvailable: boolean;
  isPreferred?: boolean; // For optimal times
}

export interface ServiceBooking {
  id: string;
  serviceType: string;
  serviceName: string;
  duration: number; // in minutes
  basePrice: number;
  requiresAssessment?: boolean;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  company?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
}

export interface BookingRequest {
  id?: string;
  service: ServiceBooking;
  customer: CustomerInfo;
  selectedSlot: BookingSlot;
  additionalServices: string[];
  specialRequests?: string;
  estimatedPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  confirmedAt?: string;
}

export interface AvailabilityCalendar {
  date: string;
  slots: BookingSlot[];
  isFullyBooked: boolean;
  preferredSlots?: BookingSlot[];
}

export interface BookingFormData {
  selectedDate: string;
  selectedTimeSlot: string;
  serviceType: string;
  additionalServices: string[];
  customer: CustomerInfo;
  specialRequests: string;
}

export interface TimeSlotOptions {
  morning: BookingSlot[]; // 8:00-12:00
  afternoon: BookingSlot[]; // 12:00-17:00
  evening: BookingSlot[]; // 17:00-20:00
}

export interface BookingValidation {
  isValid: boolean;
  errors: {
    date?: string;
    timeSlot?: string;
    customer?: Partial<CustomerInfo>;
    service?: string;
  };
}