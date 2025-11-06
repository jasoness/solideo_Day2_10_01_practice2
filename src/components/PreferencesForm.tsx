import React, { useState } from 'react';
import { UserPreferences } from '../types';

interface PreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void;
}

export const PreferencesForm: React.FC<PreferencesFormProps> = ({ onSubmit }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    interests: [],
    foodPreferences: [],
    budget: 'medium'
  });

  const interestOptions = [
    '자연', '해변', '문화', '역사', '쇼핑', '야경', '가족', '로맨틱'
  ];

  const foodOptions = [
    '한식', '중식', '일식', '양식', '해산물', '면요리', '현지음식', '디저트'
  ];

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleFoodToggle = (food: string) => {
    setPreferences(prev => ({
      ...prev,
      foodPreferences: prev.foodPreferences.includes(food)
        ? prev.foodPreferences.filter(f => f !== food)
        : [...prev.foodPreferences, food]
    }));
  };

  const handleBudgetChange = (budget: 'low' | 'medium' | 'high') => {
    setPreferences(prev => ({ ...prev, budget }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <div className="preferences-form">
      <h3>여행 취향 선택</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label>관심사</label>
          <div className="options-grid">
            {interestOptions.map(interest => (
              <button
                key={interest}
                type="button"
                className={`option-btn ${preferences.interests.includes(interest) ? 'selected' : ''}`}
                onClick={() => handleInterestToggle(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label>음식 취향</label>
          <div className="options-grid">
            {foodOptions.map(food => (
              <button
                key={food}
                type="button"
                className={`option-btn ${preferences.foodPreferences.includes(food) ? 'selected' : ''}`}
                onClick={() => handleFoodToggle(food)}
              >
                {food}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label>예산</label>
          <div className="budget-options">
            <button
              type="button"
              className={`budget-btn ${preferences.budget === 'low' ? 'selected' : ''}`}
              onClick={() => handleBudgetChange('low')}
            >
              💰 저렴
            </button>
            <button
              type="button"
              className={`budget-btn ${preferences.budget === 'medium' ? 'selected' : ''}`}
              onClick={() => handleBudgetChange('medium')}
            >
              💰💰 보통
            </button>
            <button
              type="button"
              className={`budget-btn ${preferences.budget === 'high' ? 'selected' : ''}`}
              onClick={() => handleBudgetChange('high')}
            >
              💰💰💰 고급
            </button>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          추천 받기
        </button>
      </form>
    </div>
  );
};
