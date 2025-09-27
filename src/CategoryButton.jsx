import React from 'react';
import { ODS_DATA } from './data';

function CategoryButton({ odsId, onSelect, isCorrect, isSelected }) {
  const ods = ODS_DATA.find(o => o.id === odsId);
  
  // Define a classe CSS com base no feedback
  const buttonClass = isSelected 
    ? (isCorrect ? 'correct' : 'incorrect') 
    : '';

  return (
    <button 
      className={`category-button ${buttonClass}`} 
      onClick={() => onSelect(odsId)}
      style={{'--ods-color': ods.color}}
    >
      <span className="ods-id">{ods.id}</span>
      <span className="ods-name">{ods.name}</span>
    </button>
  );
}

export default CategoryButton;