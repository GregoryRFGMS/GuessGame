import React, { useState } from 'react';
import Autocomplete from './Autocomplete';

const GameComponent = ({ game, fetchRandomGame, lives, setLives, resetGame }) => {
  const [guess, setGuess] = useState('');
  const [hint, setHint] = useState('');

  const handleInputChange = (e) => {
    setGuess(e.target.value);
  };

  const handleGuess = () => {
    if (guess.toLowerCase() === game.name.toLowerCase()) {
      alert('Você acertou!');
      fetchRandomGame();
      setGuess('');
      setHint('');
    } else {
      setLives((prevLives) => prevLives - 1);
      if (lives - 1 === 0) {
        alert('Você perdeu todas as suas vidas!');
        resetGame();
      } else {
        alert('Tente novamente!');
      }
    }
  };

  const giveHint = () => {
    setHint(`Gênero: ${game.genres.map(genre => genre.name).join(', ')}`);
  };

  return (
    <div className="game-container">
      <img src={game.background_image} alt="Game" className="game-image" />
      <h3>Advinhe o nome do jogo</h3>
      <Autocomplete value={guess} onChange={handleInputChange} />
      <div className="buttons">
        <button className="hint-button" onClick={giveHint}>Dicas</button>
        <button className="guess-button" onClick={handleGuess}>Adivinhar</button>
      </div>
      {hint && <p className="hint">{hint}</p>}
      <div className="lives">
        {Array.from({ length: lives }).map((_, index) => (
          <span key={index} className="heart">❤️</span>
        ))}
      </div>
      <p>Vidas restantes: {lives}</p>
    </div>
  );
};

export default GameComponent;
