'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  // Just replace these URLs with your image URLs
  const images = [
    { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800', caption: 'First date' },
    { url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800', caption: 'Sunset' },
    { url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800', caption: 'Our spot' },
    { url: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=800', caption: 'Coffee' },
    { url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800', caption: 'Adventure' },
    { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800', caption: '6 months' },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentZoom, setCurrentZoom] = useState(15);
  const [isRevealed, setIsRevealed] = useState(false);
  const [randomPosition, setRandomPosition] = useState({ x: 50, y: 50 });
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsRevealed(false);
    setCurrentZoom(15);
    setImageLoaded(false);
    setRandomPosition({
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60
    });
  }, [currentImageIndex]);

  const getClipPath = () => {
    if (isRevealed || !imageLoaded) return 'none';
    const size = currentZoom;
    const halfSize = size / 2;
    const left = Math.max(0, randomPosition.x - halfSize);
    const right = Math.min(100, randomPosition.x + halfSize);
    const top = Math.max(0, randomPosition.y - halfSize);
    const bottom = Math.min(100, randomPosition.y + halfSize);
    return `polygon(${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%)`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-2">Memory Game</h1>
        <p className="text-gray-600 text-center mb-6">Can you guess the memory?</p>

        <div className="relative mb-6 bg-gray-100 rounded-xl overflow-hidden h-96">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">Loading...</p>
            </div>
          )}
          
          <img
            src={images[currentImageIndex].url}
            alt="Memory"
            className="w-full h-full object-cover"
            style={{ clipPath: getClipPath() }}
            onLoad={() => setImageLoaded(true)}
          />

          {(isRevealed || currentZoom >= 80) && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-3">
              <p className="text-white text-center">{images[currentImageIndex].caption}</p>
            </div>
          )}

          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => !isRevealed && currentZoom < 100 && setCurrentZoom(Math.min(100, currentZoom + 20))}
              disabled={isRevealed || currentZoom >= 100}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg transition disabled:cursor-not-allowed"
            >
              Zoom Out
            </button>
            
            <button
              onClick={() => setIsRevealed(!isRevealed)}
              className={`${isRevealed ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'} text-white font-medium py-3 rounded-lg transition`}
            >
              {isRevealed ? 'Hide' : 'Reveal'}
            </button>
          </div>
          
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition"
          >
            Next Memory →
          </button>
        </div>

        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300" style={{ width: `${currentZoom}%` }} />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">{currentZoom}% revealed</p>
        </div>
      </div>
    </div>
  );
}