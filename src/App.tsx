import React, { useState } from 'react';
import { TravelInputForm } from './components/TravelInputForm';
import { TransportationSearch } from './components/TransportationSearch';
import { GoogleMapView } from './components/GoogleMapView';
import { RecommendationsPanel } from './components/RecommendationsPanel';
import { PreferencesForm } from './components/PreferencesForm';
import { TravelInput, TransportOption, Recommendation, UserPreferences, Location } from './types';
import { geocodeAddress } from './services/api';
import './App.css';

function App() {
  const [step, setStep] = useState<'input' | 'preferences' | 'results'>('input');
  const [travelInput, setTravelInput] = useState<TravelInput | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>({
    interests: [],
    foodPreferences: [],
    budget: 'medium'
  });
  const [selectedTransport, setSelectedTransport] = useState<TransportOption | null>(null);
  const [selectedPlaces, setSelectedPlaces] = useState<Recommendation[]>([]);
  const [originLocation, setOriginLocation] = useState<Location | null>(null);
  const [destinationLocation, setDestinationLocation] = useState<Location | null>(null);

  const handleTravelSearch = async (input: TravelInput) => {
    setTravelInput(input);

    // Geocode addresses
    const origin = await geocodeAddress(input.departure);
    const destination = await geocodeAddress(input.arrival);

    setOriginLocation(origin);
    setDestinationLocation(destination);
    setStep('preferences');
  };

  const handlePreferencesSubmit = (prefs: UserPreferences) => {
    setPreferences(prefs);
    setStep('results');
  };

  const handleSelectTransport = (transport: TransportOption) => {
    setSelectedTransport(transport);
  };

  const handleSelectPlace = (place: Recommendation) => {
    setSelectedPlaces(prev => {
      const exists = prev.find(p => p.id === place.id);
      if (exists) {
        return prev.filter(p => p.id !== place.id);
      }
      return [...prev, place];
    });
  };

  const handleBackToInput = () => {
    setStep('input');
    setTravelInput(null);
    setSelectedTransport(null);
    setSelectedPlaces([]);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>✈️ 여행 개인화 앱</h1>
        <p>대중교통 연계 및 맞춤 여행 계획</p>
      </header>

      <main className="app-main">
        {step === 'input' && (
          <div className="step-container">
            <TravelInputForm onSearch={handleTravelSearch} />
          </div>
        )}

        {step === 'preferences' && (
          <div className="step-container">
            <button className="back-button" onClick={handleBackToInput}>
              ← 돌아가기
            </button>
            <PreferencesForm onSubmit={handlePreferencesSubmit} />
          </div>
        )}

        {step === 'results' && travelInput && originLocation && destinationLocation && (
          <div className="results-container">
            <button className="back-button" onClick={handleBackToInput}>
              ← 새로운 검색
            </button>

            <div className="trip-summary">
              <h2>여행 정보</h2>
              <div className="summary-grid">
                <div className="summary-item">
                  <strong>출발:</strong> {travelInput.departure}
                </div>
                <div className="summary-item">
                  <strong>도착:</strong> {travelInput.arrival}
                </div>
                <div className="summary-item">
                  <strong>출발 시간:</strong> {new Date(travelInput.departureTime).toLocaleString('ko-KR')}
                </div>
                <div className="summary-item">
                  <strong>여행 기간:</strong> {travelInput.duration}일
                </div>
              </div>
            </div>

            <div className="results-grid">
              <div className="left-panel">
                <TransportationSearch
                  departure={travelInput.departure}
                  arrival={travelInput.arrival}
                  date={travelInput.departureTime}
                  onSelectTransport={handleSelectTransport}
                />

                <RecommendationsPanel
                  destination={travelInput.arrival}
                  preferences={preferences}
                  onSelectPlace={handleSelectPlace}
                />
              </div>

              <div className="right-panel">
                <GoogleMapView
                  origin={originLocation}
                  destination={destinationLocation}
                  waypoints={selectedPlaces.map(p => p.location)}
                />

                {selectedPlaces.length > 0 && (
                  <div className="selected-places">
                    <h3>선택한 장소 ({selectedPlaces.length})</h3>
                    <ul>
                      {selectedPlaces.map(place => (
                        <li key={place.id}>
                          <span>{place.type === 'attraction' ? '🏛️' : '🍴'}</span>
                          <span>{place.name}</span>
                          <button onClick={() => handleSelectPlace(place)}>제거</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
