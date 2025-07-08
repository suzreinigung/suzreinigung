import { ServiceBooking, BookingSlot, AvailabilityCalendar, TimeSlotOptions } from '@/types/booking';

// Service catalog for booking
export const bookingServices: ServiceBooking[] = [
  {
    id: 'bueroreinigung',
    serviceType: 'bueroreinigung',
    serviceName: 'Büroreinigung',
    duration: 120, // 2 hours standard
    basePrice: 120,
    requiresAssessment: false,
  },
  {
    id: 'hausreinigung',
    serviceType: 'hausreinigung',
    serviceName: 'Hausreinigung',
    duration: 180, // 3 hours standard
    basePrice: 150,
    requiresAssessment: false,
  },
  {
    id: 'fensterreinigung',
    serviceType: 'fensterreinigung',
    serviceName: 'Fensterreinigung',
    duration: 90, // 1.5 hours
    basePrice: 80,
    requiresAssessment: false,
  },
  {
    id: 'grundreinigung',
    serviceType: 'grundreinigung',
    serviceName: 'Grundreinigung',
    duration: 240, // 4 hours
    basePrice: 200,
    requiresAssessment: true,
  },
  {
    id: 'teppichreinigung',
    serviceType: 'teppichreinigung',
    serviceName: 'Teppichreinigung',
    duration: 150, // 2.5 hours
    basePrice: 100,
    requiresAssessment: false,
  },
  {
    id: 'hotelzimmerreinigung',
    serviceType: 'hotelzimmerreinigung',
    serviceName: 'Hotelzimmerreinigung',
    duration: 60, // 1 hour per room
    basePrice: 45,
    requiresAssessment: false,
  },
];

// Additional services that can be booked
export const additionalBookingServices = [
  { id: 'fenster-zusatz', name: 'Fensterreinigung (Zusatz)', price: 25, duration: 30 },
  { id: 'teppich-zusatz', name: 'Teppichreinigung (Zusatz)', price: 35, duration: 45 },
  { id: 'polster-zusatz', name: 'Polsterreinigung', price: 40, duration: 60 },
  { id: 'balkon-zusatz', name: 'Balkon/Terrasse', price: 20, duration: 30 },
  { id: 'keller-zusatz', name: 'Keller reinigen', price: 30, duration: 45 },
  { id: 'garage-zusatz', name: 'Garage reinigen', price: 25, duration: 40 },
];

// German business hours and preferences
export const businessHours = {
  monday: { start: '08:00', end: '18:00', preferred: ['09:00', '10:00', '14:00', '15:00'] },
  tuesday: { start: '08:00', end: '18:00', preferred: ['09:00', '10:00', '14:00', '15:00'] },
  wednesday: { start: '08:00', end: '18:00', preferred: ['09:00', '10:00', '14:00', '15:00'] },
  thursday: { start: '08:00', end: '18:00', preferred: ['09:00', '10:00', '14:00', '15:00'] },
  friday: { start: '08:00', end: '17:00', preferred: ['09:00', '10:00', '13:00', '14:00'] },
  saturday: { start: '09:00', end: '15:00', preferred: ['10:00', '11:00'] },
  sunday: { start: '10:00', end: '14:00', preferred: ['11:00', '12:00'] }, // Limited Sunday service
};

// Generate time slots for a given date
export const generateTimeSlots = (date: string, serviceDuration: number = 120): TimeSlotOptions => {
  const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof typeof businessHours;
  const hours = businessHours[dayOfWeek];
  
  if (!hours) {
    return { morning: [], afternoon: [], evening: [] };
  }

  const slots: BookingSlot[] = [];
  const startHour = parseInt(hours.start.split(':')[0]);
  const endHour = parseInt(hours.end.split(':')[0]);
  
  // Generate 30-minute intervals
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const endTime = calculateEndTime(startTime, serviceDuration);
      
      // Check if slot fits within business hours
      const endTimeHour = parseInt(endTime.split(':')[0]);
      const endTimeMinute = parseInt(endTime.split(':')[1]);
      
      if (endTimeHour < endHour || (endTimeHour === endHour && endTimeMinute === 0)) {
        const isPreferred = hours.preferred.includes(startTime);
        
        slots.push({
          id: `${date}-${startTime}`,
          date,
          startTime,
          endTime,
          isAvailable: true, // Will be determined by actual bookings
          isPreferred,
        });
      }
    }
  }

  // Categorize slots
  const morning = slots.filter(slot => parseInt(slot.startTime.split(':')[0]) < 12);
  const afternoon = slots.filter(slot => {
    const hour = parseInt(slot.startTime.split(':')[0]);
    return hour >= 12 && hour < 17;
  });
  const evening = slots.filter(slot => parseInt(slot.startTime.split(':')[0]) >= 17);

  return { morning, afternoon, evening };
};

// Calculate end time based on start time and duration
const calculateEndTime = (startTime: string, durationMinutes: number): string => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const startDate = new Date();
  startDate.setHours(hours, minutes, 0, 0);
  
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
  
  return `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
};

// Generate availability calendar for the next 30 days
export const generateAvailabilityCalendar = (serviceDuration: number = 120): AvailabilityCalendar[] => {
  const calendar: AvailabilityCalendar[] = [];
  const today = new Date();
  
  for (let i = 1; i <= 30; i++) { // Start from tomorrow
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    
    const timeSlots = generateTimeSlots(dateString, serviceDuration);
    const allSlots = [...timeSlots.morning, ...timeSlots.afternoon, ...timeSlots.evening];
    
    // Simulate some booked slots (in real app, this would come from database)
    const bookedSlots = simulateBookedSlots(allSlots);
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot.id));
    
    calendar.push({
      date: dateString,
      slots: availableSlots,
      isFullyBooked: availableSlots.length === 0,
      preferredSlots: availableSlots.filter(slot => slot.isPreferred),
    });
  }
  
  return calendar;
};

// Simulate already booked time slots (replace with real database query)
const simulateBookedSlots = (slots: BookingSlot[]): string[] => {
  const bookedSlots: string[] = [];
  
  // Randomly book 20-40% of slots to simulate real usage
  const bookingRate = 0.3;
  
  slots.forEach(slot => {
    if (Math.random() < bookingRate) {
      bookedSlots.push(slot.id);
    }
  });
  
  return bookedSlots;
};

// Get service by ID
export const getServiceById = (serviceId: string): ServiceBooking | undefined => {
  return bookingServices.find(service => service.id === serviceId);
};

// Get available dates for next 30 days
export const getAvailableDates = (): string[] => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip if it's a day with no business hours
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof typeof businessHours;
    if (!businessHours[dayOfWeek]) continue;
    
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
};

// Validate booking time constraints
export const validateBookingTime = (date: string, startTime: string, serviceDuration: number): boolean => {
  const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof typeof businessHours;
  const hours = businessHours[dayOfWeek];
  
  if (!hours) return false;
  
  const endTime = calculateEndTime(startTime, serviceDuration);
  const businessEndTime = hours.end;
  
  return startTime >= hours.start && endTime <= businessEndTime;
};

// Format time for display
export const formatTimeForDisplay = (time: string): string => {
  return `${time} Uhr`;
};

// Format date for display in German
export const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};