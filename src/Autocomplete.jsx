import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Autocomplete = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const clickedSuggestionRef = useRef(false); // Referência para controlar o clique na sugestão

  useEffect(() => {
    if (!clickedSuggestionRef.current) {
      if (value) {
        fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    } else {
      clickedSuggestionRef.current = false; // Resetar a referência após o clique na sugestão
    }
  }, [value]);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get('https://api.rawg.io/api/games', {
        params: {
          key: 'b0c52191af464744bcb87b2aba2e9a8c', // Sua chave de API
          search: value,
          page_size: 5,
        },
      });
      setSuggestions(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
    }
  };

  const handleSuggestionClick = (suggestionName) => {
    clickedSuggestionRef.current = true; // Marcar que uma sugestão foi clicada
    onChange({ target: { value: suggestionName } });
    setSuggestions([]); // Limpar as sugestões ao clicar em uma
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Procure um jogo..."
        className="autocomplete-input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion.name)}>
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
