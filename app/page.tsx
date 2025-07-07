'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  // Just replace these URLs with your image URLs
const images = [
  { 
    url: '/images/image1.jpg',  // Note: starts with / not ./
    caption: 'First Date' 
  },
  { 
    url: '/images/image2.jpg', 
    caption: 'My 500 lbs Life' 
  },
  { 
    url: '/images/image3.jpg', 
    caption: 'Beach Day' 
  },
  // ... more images
];

  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentZoom, setCurrentZoom] = useState(15);
  const [isRevealed, setIsRevealed] = useState(false);
  const [randomPosition, setRandomPosition] = useState({ x: 50, y: 50 });
  const [imageLoaded, setImageLoaded] = useState(false);
  //const [isClient, setIsClient] = useState(false);

  // This ensures we only run on the client
  useEffect(() => {
    setMounted(true);
    // Set initial random position only on client
    setRandomPosition({
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    setIsRevealed(false);
    setCurrentZoom(15);
    setImageLoaded(false);
    setRandomPosition({
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60
    });
  }, [currentImageIndex]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Change 'ourdate' to whatever password you want
    if (password === '01092025') {
      setAuthenticated(true);
      setShowError(false);
    } else {
      setShowError(true);
      setPassword('');
    }
  };

  const getClipPath = () => {
    if (isRevealed || !imageLoaded || !mounted) return 'none';
    const size = currentZoom;
    const halfSize = size / 2;
    const left = Math.max(0, randomPosition.x - halfSize);
    const right = Math.min(100, randomPosition.x + halfSize);
    const top = Math.max(0, randomPosition.y - halfSize);
    const bottom = Math.min(100, randomPosition.y + halfSize);
    return `polygon(${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%)`;
  };

  // Don't render until client-side
  if (!mounted) {
    return null;
  }

  // Password screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter Password</h2>
            <p className="text-gray-600 text-sm">when</p>
          </div>
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handlePasswordSubmit(e);
              }
            }}
            placeholder="Enter password..."
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition mb-4"
            autoFocus
          />
          
          {showError && (
            <p className="text-red-500 text-sm text-center mb-4">
              Incorrect password. Try again! 💕
            </p>
          )}
          
          <button
            onClick={handlePasswordSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium py-3 rounded-lg hover:shadow-lg transition"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  // Main game
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-2">Memories</h1>
        <p className="text-gray-600 text-center mb-6"></p>

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
            Next →
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