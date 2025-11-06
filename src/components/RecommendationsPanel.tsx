import React, { useState, useEffect } from 'react';
import { Recommendation, UserPreferences } from '../types';
import { getRecommendations } from '../services/api';

interface RecommendationsPanelProps {
  destination: string;
  preferences: UserPreferences;
  onSelectPlace: (place: Recommendation) => void;
}

export const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({
  destination,
  preferences,
  onSelectPlace
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'attraction' | 'restaurant'>('all');

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const results = await getRecommendations(destination, preferences);
        setRecommendations(results);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (destination) {
      fetchRecommendations();
    }
  }, [destination, preferences]);

  const filteredRecommendations = filter === 'all'
    ? recommendations
    : recommendations.filter(rec => rec.type === filter);

  const getTypeIcon = (type: string) => {
    return type === 'attraction' ? '🏛️' : '🍴';
  };

  return (
    <div className="recommendations-panel">
      <h3>맞춤 추천</h3>

      <div className="rec-filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          전체
        </button>
        <button
          className={filter === 'attraction' ? 'active' : ''}
          onClick={() => setFilter('attraction')}
        >
          🏛️ 관광지
        </button>
        <button
          className={filter === 'restaurant' ? 'active' : ''}
          onClick={() => setFilter('restaurant')}
        >
          🍴 맛집
        </button>
      </div>

      {loading ? (
        <div className="loading">추천 장소를 찾는 중...</div>
      ) : (
        <div className="recommendations-grid">
          {filteredRecommendations.length === 0 ? (
            <p className="no-results">추천 결과가 없습니다.</p>
          ) : (
            filteredRecommendations.map(rec => (
              <div
                key={rec.id}
                className="recommendation-card"
                onClick={() => onSelectPlace(rec)}
              >
                <div className="rec-header">
                  <span className="rec-icon">{getTypeIcon(rec.type)}</span>
                  <h4>{rec.name}</h4>
                </div>
                <div className="rec-rating">
                  {'⭐'.repeat(Math.round(rec.rating))} {rec.rating}
                </div>
                <p className="rec-description">{rec.description}</p>
                <div className="rec-tags">
                  {rec.tags.map((tag, idx) => (
                    <span key={idx} className="tag">#{tag}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
