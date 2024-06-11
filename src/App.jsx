import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameComponent from './GameComponent';
import './Index.css';

const App = () => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    fetchRandomGame();
  }, []);

  const fetchRandomGame = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.rawg.io/api/games', {
        params: {
          key: 'b0c52191af464744bcb87b2aba2e9a8c', // Sua chave de API
          page_size: 1,
          page: Math.floor(Math.random() * 1000) + 1,
        },
      });
      setGame(response.data.results[0]);
    } catch (error) {
      console.error("Erro ao buscar jogo:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetGame = () => {
    setLives(3);
    fetchRandomGame();
  };

  return (
    <div className="container">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        game && (
          <GameComponent
            game={game}
            fetchRandomGame={fetchRandomGame}
            lives={lives}
            setLives={setLives}
            resetGame={resetGame}
          />
        )
      )}
    </div>
  );
};

export default App;
