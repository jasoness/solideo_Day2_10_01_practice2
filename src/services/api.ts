import { TransportOption, Recommendation, UserPreferences, Location } from '../types';

// Mock geocoding function - in production, use Google Maps Geocoding API
export const geocodeAddress = async (address: string): Promise<Location> => {
  // Mock coordinates - in production, use actual geocoding API
  const mockCoordinates: { [key: string]: Location } = {
    '서울역': { lat: 37.5547, lng: 126.9707, address: '서울역' },
    '부산역': { lat: 35.1156, lng: 129.0418, address: '부산역' },
    '인천공항': { lat: 37.4602, lng: 126.4407, address: '인천공항' },
    '강남역': { lat: 37.4979, lng: 127.0276, address: '강남역' },
  };

  return mockCoordinates[address] || {
    lat: 37.5665 + Math.random() * 0.1,
    lng: 126.9780 + Math.random() * 0.1,
    address
  };
};

// Mock transportation search - in production, integrate with real APIs
export const searchTransportation = async (
  departure: string,
  arrival: string,
  _date: string
): Promise<TransportOption[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockOptions: TransportOption[] = [
    {
      id: '1',
      type: 'train',
      departure,
      arrival,
      departureTime: '09:00',
      arrivalTime: '11:30',
      duration: 150,
      price: 45000,
      company: 'KTX',
    },
    {
      id: '2',
      type: 'train',
      departure,
      arrival,
      departureTime: '10:30',
      arrivalTime: '13:00',
      duration: 150,
      price: 42000,
      company: 'SRT',
    },
    {
      id: '3',
      type: 'bus',
      departure,
      arrival,
      departureTime: '08:00',
      arrivalTime: '12:30',
      duration: 270,
      price: 28000,
      company: '고속버스',
    },
    {
      id: '4',
      type: 'airplane',
      departure,
      arrival,
      departureTime: '14:00',
      arrivalTime: '15:00',
      duration: 60,
      price: 89000,
      company: '대한항공',
    },
  ];

  return mockOptions;
};

// Mock recommendations based on preferences
export const getRecommendations = async (
  destination: string,
  preferences: UserPreferences
): Promise<Recommendation[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const destLocation = await geocodeAddress(destination);

  const mockRecommendations: Recommendation[] = [
    {
      id: '1',
      name: '해운대 해수욕장',
      type: 'attraction',
      location: { ...destLocation, lat: destLocation.lat + 0.01 },
      rating: 4.5,
      description: '아름다운 백사장과 맑은 바다가 있는 유명 해수욕장',
      tags: ['자연', '해변', '가족'],
    },
    {
      id: '2',
      name: '광안리 해수욕장',
      type: 'attraction',
      location: { ...destLocation, lat: destLocation.lat + 0.02 },
      rating: 4.3,
      description: '광안대교 야경이 유명한 해수욕장',
      tags: ['야경', '해변', '로맨틱'],
    },
    {
      id: '3',
      name: '돼지국밥 본점',
      type: 'restaurant',
      location: { ...destLocation, lat: destLocation.lat - 0.01 },
      rating: 4.7,
      description: '부산의 유명한 돼지국밥 맛집',
      tags: ['한식', '현지음식', '저렴'],
    },
    {
      id: '4',
      name: '자갈치 시장',
      type: 'attraction',
      location: { ...destLocation, lng: destLocation.lng + 0.01 },
      rating: 4.6,
      description: '신선한 해산물을 맛볼 수 있는 전통시장',
      tags: ['시장', '해산물', '문화'],
    },
    {
      id: '5',
      name: '밀면 맛집',
      type: 'restaurant',
      location: { ...destLocation, lng: destLocation.lng - 0.01 },
      rating: 4.4,
      description: '부산의 특색 있는 밀면 전문점',
      tags: ['한식', '면요리', '현지음식'],
    },
  ];

  // Filter by preferences
  return mockRecommendations.filter(rec => {
    if (rec.type === 'attraction') {
      return preferences.interests.length === 0 ||
        rec.tags.some(tag => preferences.interests.includes(tag));
    }
    if (rec.type === 'restaurant') {
      return preferences.foodPreferences.length === 0 ||
        rec.tags.some(tag => preferences.foodPreferences.includes(tag));
    }
    return true;
  });
};
