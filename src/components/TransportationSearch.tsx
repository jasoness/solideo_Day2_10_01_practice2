import React, { useState, useEffect } from 'react';
import { TransportOption } from '../types';
import { searchTransportation } from '../services/api';

interface TransportationSearchProps {
  departure: string;
  arrival: string;
  date: string;
  onSelectTransport: (transport: TransportOption) => void;
}

export const TransportationSearch: React.FC<TransportationSearchProps> = ({
  departure,
  arrival,
  date,
  onSelectTransport
}) => {
  const [options, setOptions] = useState<TransportOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<'all' | 'bus' | 'train' | 'airplane'>('all');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const results = await searchTransportation(departure, arrival, date);
        setOptions(results);
      } catch (error) {
        console.error('Error fetching transportation:', error);
      } finally {
        setLoading(false);
      }
    };

    if (departure && arrival && date) {
      fetchOptions();
    }
  }, [departure, arrival, date]);

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'bus':
        return '🚌';
      case 'train':
        return '🚄';
      case 'airplane':
        return '✈️';
      default:
        return '🚗';
    }
  };

  const filteredOptions = selectedType === 'all'
    ? options
    : options.filter(opt => opt.type === selectedType);

  const handleSelect = (option: TransportOption) => {
    setSelectedOption(option.id);
    onSelectTransport(option);
  };

  return (
    <div className="transportation-search">
      <h3>대중교통 검색</h3>

      <div className="transport-filters">
        <button
          className={selectedType === 'all' ? 'active' : ''}
          onClick={() => setSelectedType('all')}
        >
          전체
        </button>
        <button
          className={selectedType === 'bus' ? 'active' : ''}
          onClick={() => setSelectedType('bus')}
        >
          🚌 버스
        </button>
        <button
          className={selectedType === 'train' ? 'active' : ''}
          onClick={() => setSelectedType('train')}
        >
          🚄 기차
        </button>
        <button
          className={selectedType === 'airplane' ? 'active' : ''}
          onClick={() => setSelectedType('airplane')}
        >
          ✈️ 비행기
        </button>
      </div>

      {loading ? (
        <div className="loading">검색 중...</div>
      ) : (
        <div className="transport-options">
          {filteredOptions.length === 0 ? (
            <p className="no-results">검색 결과가 없습니다.</p>
          ) : (
            filteredOptions.map(option => (
              <div
                key={option.id}
                className={`transport-card ${selectedOption === option.id ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                <div className="transport-header">
                  <span className="transport-icon">{getTransportIcon(option.type)}</span>
                  <span className="transport-company">{option.company}</span>
                  <span className="transport-price">{option.price.toLocaleString()}원</span>
                </div>
                <div className="transport-details">
                  <div className="time-info">
                    <div>
                      <strong>{option.departureTime}</strong>
                      <p>{option.departure}</p>
                    </div>
                    <div className="duration">
                      <span>→</span>
                      <p>{Math.floor(option.duration / 60)}시간 {option.duration % 60}분</p>
                    </div>
                    <div>
                      <strong>{option.arrivalTime}</strong>
                      <p>{option.arrival}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
