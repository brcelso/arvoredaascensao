import { useCallback, useEffect, useState } from 'react';

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

  const handleBallClick = (index) => {
    const nextColorIndex = (colors.indexOf(ballColors[index]) + 1) % colors.length;
    const updatedColors = [...ballColors];
    updatedColors[index] = colors[nextColorIndex];
    setBallColors(updatedColors);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ballColors', JSON.stringify(updatedColors));
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedColors = localStorage.getItem('ballColors');
      if (storedColors) {
        setBallColors(JSON.parse(storedColors));
      }
    }
  }, []);

  return (
    <div style={{ backgroundColor: '#333', color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>
      <h1>Árvore da Vida</h1>
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





