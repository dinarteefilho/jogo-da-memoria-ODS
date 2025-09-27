import React, { useState, useEffect } from 'react';
import './App.css';

// 1. ADICIONAMOS AS CORES OFICIAIS DOS ODS
const ODS_PAIRS = [
  { id: 1, label: 'Água Potável e Saneamento', value: 'ODS 6', color: '#26BDE2' },
  { id: 2, label: 'Energia Limpa e Acessível', value: 'ODS 7', color: '#FCC30B' },
  { id: 3, label: 'Ação Contra a Mudança Global do Clima', value: 'ODS 13', color: '#3F7E44' },
  { id: 4, label: 'Educação de Qualidade', value: 'ODS 4', color: '#C5192D' },
];

function createCards() {
  let cards = [];
  ODS_PAIRS.forEach(pair => {
    // 2. PASSAMOS A COR PARA OS CARDS QUANDO SÃO CRIADOS
    cards.push({ id: pair.id + 'a', content: pair.label, ods: pair.value, color: pair.color, flipped: false, matched: false });
    cards.push({ id: pair.id + 'b', content: pair.value, ods: pair.value, color: pair.color, flipped: false, matched: false });
  });
  // Shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function App() {
  const [cards, setCards] = useState(createCards());
  const [flipped, setFlipped] = useState([]);
  const [lock, setLock] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (flipped.length === 2) {
      setLock(true);
      const [first, second] = flipped;
      if (first.ods === second.ods && first.id !== second.id) {
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.ods === first.ods ? { ...card, matched: true, flipped: true } : card
          ));
          setFlipped([]);
          setLock(false);
        }, 600);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            flipped.some(f => f.id === card.id) ? { ...card, flipped: false } : card
          ));
          setFlipped([]);
          setLock(false);
        }, 900);
      }
    }
  }, [flipped]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setWon(true);
    }
  }, [cards]);

  function handleClick(card) {
    if (lock || card.flipped || card.matched || flipped.length === 2) return;
    
    setCards(prev => prev.map(c =>
      c.id === card.id ? { ...c, flipped: true } : c
    ));
    setFlipped(prev => [...prev, card]);
  }

  function restart() {
    setCards(createCards());
    setFlipped([]);
    setLock(false);
    setWon(false);
  }

  return (
    <div className="App">
      <h1>Jogo da Memória ODS</h1>
      <p>Encontre os pares: Nome e Número referente ao ODS.</p>
      <div className="game-board">
        {cards.map(card => (
          <div
            key={card.id}
            className={`card ${card.flipped ? 'flipped' : ''}`}
            onClick={() => handleClick(card)}
          >
            <div className="card-inner">
              <div className="card-front"></div>
              {/* 3. APLICAMOS A COR DINAMICAMENTE NO FUNDO DO CARD */}
              <div className="card-back" style={{ backgroundColor: card.color }}>
                {card.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      {won && (
        <div className="win-message">
          <h2>Parabéns! Você venceu!</h2>
          <button onClick={restart}>Jogar Novamente</button>
        </div>
      )}

      {/* ASSINATURA ADICIONADA AQUI */}
      <footer>
        <p>Desenvolvido por Dinarte Filho</p>
      </footer>

    </div>
  );
}

export default App;