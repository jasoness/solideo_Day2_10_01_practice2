export interface TravelInput {
  departure: string;
  arrival: string;
  departureTime: string;
  duration: number; // in days
}

export interface TransportOption {
  id: string;
  type: 'bus' | 'train' | 'airplane';
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: number; // in minutes
  price: number;
  company: string;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Recommendation {
  id: string;
  name: string;
  type: 'attraction' | 'restaurant';
  location: Location;
  rating: number;
  description: string;
  image?: string;
  tags: string[];
}

export interface UserPreferences {
  interests: string[];
  foodPreferences: string[];
  budget: 'low' | 'medium' | 'high';
}
