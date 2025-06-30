import React, { useEffect, useState } from 'react';

interface Glyph {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;
  symbol: string;
}

export default function FloatingGlyphs() {
  const [glyphs, setGlyphs] = useState<Glyph[]>([]);

  useEffect(() => {
    const jsSymbols = ['{', '}', ';'];
    
    const initialGlyphs: Glyph[] = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 24 + Math.random() * 16,
      speed: 0.2 + Math.random() * 0.3,
      direction: Math.random() * Math.PI * 2,
      symbol: jsSymbols[i % jsSymbols.length]
    }));

    setGlyphs(initialGlyphs);

    const animateGlyphs = () => {
      setGlyphs(prevGlyphs => 
        prevGlyphs.map(glyph => {
          let newX = glyph.x + Math.cos(glyph.direction) * glyph.speed;
          let newY = glyph.y + Math.sin(glyph.direction) * glyph.speed;
          let newDirection = glyph.direction;

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth - 50) {
            newDirection = Math.PI - glyph.direction;
            newX = Math.max(0, Math.min(window.innerWidth - 50, newX));
          }
          if (newY <= 0 || newY >= window.innerHeight - 50) {
            newDirection = -glyph.direction;
            newY = Math.max(0, Math.min(window.innerHeight - 50, newY));
          }

          return {
            ...glyph,
            x: newX,
            y: newY,
            direction: newDirection
          };
        })
      );
    };

    const interval = setInterval(animateGlyphs, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {glyphs.map(glyph => (
        <div
          key={glyph.id}
          className="absolute text-gray-400 font-mono transition-all duration-1000 ease-in-out hover:scale-110 hover:opacity-60"
          style={{
            left: `${glyph.x}px`,
            top: `${glyph.y}px`,
            fontSize: `${glyph.size}px`,
            opacity: 0.3,
            transform: 'translateZ(0)', // Hardware acceleration
          }}
        >
          {glyph.symbol}
        </div>
      ))}
    </div>
  );
}