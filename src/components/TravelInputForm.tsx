import React, { useState } from 'react';
import { TravelInput } from '../types';

interface TravelInputFormProps {
  onSearch: (input: TravelInput) => void;
}

export const TravelInputForm: React.FC<TravelInputFormProps> = ({ onSearch }) => {
  const [formData, setFormData] = useState<TravelInput>({
    departure: '',
    arrival: '',
    departureTime: '',
    duration: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.departure && formData.arrival && formData.departureTime) {
      onSearch(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) || 1 : value
    }));
  };

  return (
    <div className="travel-input-form">
      <h2>여행 계획 시작하기</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="departure">출발 건물/역</label>
          <input
            type="text"
            id="departure"
            name="departure"
            value={formData.departure}
            onChange={handleChange}
            placeholder="예: 서울역"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="arrival">도착 건물/역</label>
          <input
            type="text"
            id="arrival"
            name="arrival"
            value={formData.arrival}
            onChange={handleChange}
            placeholder="예: 부산역"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="departureTime">출발 시간</label>
          <input
            type="datetime-local"
            id="departureTime"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">여행 기간 (일)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            max="30"
            required
          />
        </div>

        <button type="submit" className="search-button">
          검색하기
        </button>
      </form>
    </div>
  );
};
