import { useCallback, useEffect, useState } from 'react';
const { connect } = require('./db.js');

const colors = [
  '#FF0000', // Vermelho
  '#FFA500', // Laranja
  '#FFFF00', // Amarelo
  '#008000', // Verde
  '#00FFFF', // Aqua
  '#800080', // Roxo
  '#FF69B4', // Rosa
];

export default function Home() {
  const [ballColors, setBallColors] = useState(Array(100).fill(colors[0]));
  const [selectedPage, setSelectedPage] = useState('');

  const handleBallClick = (index) => {
    const nextColorIndex = (colors.indexOf(ballColors[index]) + 1) % colors.length;
    const updatedColors = [...ballColors];
    updatedColors[index] = colors[nextColorIndex];
    setBallColors(updatedColors);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${selectedPage}BallColors`, JSON.stringify(updatedColors));
    }
  };

  const resetColors = () => {
    const resetColors = Array(100).fill(colors[0]);
    setBallColors(resetColors);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${selectedPage}BallColors`, JSON.stringify(resetColors));
    }
  };

  const handleSelectChange = (event) => {
    setSelectedPage(event.target.value);
    if (typeof window !== 'undefined') {
      const storedColors = localStorage.getItem(`${event.target.value}BallColors`);
      if (storedColors) {
        setBallColors(JSON.parse(storedColors));
      } else {
        resetColors();
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedColors = localStorage.getItem(`${selectedPage}BallColors`);
      if (storedColors) {
        setBallColors(JSON.parse(storedColors));
      }
    }
  }, [selectedPage]);

  useEffect(() => {
    async function fetchData() {
      const db = await connect();
      // Agora você pode usar 'db' para interagir com o banco de dados
    }
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#333', color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>
      <h1>Árvore da Vida</h1>
      <button onClick={resetColors}>Resetar Cores</button>
      <select value={selectedPage} onChange={handleSelectChange}>
        <option value="">Selecione uma página</option>
        <option value="page1">Página 1</option>
        <option value="page2">Página 2</option>
        <option value="page3">Página 3</option>
        {/* Adicione mais opções conforme necessário */}
      </select>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px' }}>
        {Array.from({ length: 100 }).map((_, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '10px',
              backgroundColor: 'black',
              padding: '10px',
              cursor: 'pointer',
              border: '2px solid white',
            }}
            onClick={() => handleBallClick(index)}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: ballColors[index],
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}




