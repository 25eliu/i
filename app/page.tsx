'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  // Your image URLs
  const originalImages = [
    { 
      url: '/images/image1.jpg',
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

  const [images, setImages] = useState(originalImages);
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentZoom, setCurrentZoom] = useState(15);
  const [isRevealed, setIsRevealed] = useState(false);
  const [randomPosition, setRandomPosition] = useState({ x: 50, y: 50 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Shuffle images on mount
  useEffect(() => {
    setMounted(true);
    // Shuffle the images randomly
    const shuffled = [...originalImages].sort(() => Math.random() - 0.5);
    setImages(shuffled);
    // Set initial random position
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
    setIsTransitioning(false);
    setRandomPosition({
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60
    });
  }, [currentImageIndex, mounted]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '01092025') {
      setAuthenticated(true);
      setShowError(false);
    } else {
      setShowError(true);
      setPassword('');
      // Clear error after 2 seconds
      setTimeout(() => setShowError(false), 2000);
    }
  };

const handleNextImage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      const nextIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(nextIndex);
      setIsTransitioning(false);
      // Reset imageLoaded to false so onLoad triggers again
      setImageLoaded(false);
    }, 300);
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

  if (!mounted) {
    return null;
  }

  // Password screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-10 max-w-md w-full transform transition-all duration-500 hover:scale-[1.02]">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4 animate-pulse">💝</div>
            <h2 className="text-3xl font-light text-gray-800 mb-3">Our Memories</h2>
            <p className="text-gray-500 text-sm font-light">Enter our special date to continue</p>
          </div>
          
          <input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                handlePasswordSubmit(e);
              }
            }}
            placeholder="MMDDYYYY"
            className={`w-full p-4 border-2 ${showError ? 'border-red-300' : 'border-gray-200'} rounded-2xl focus:border-purple-400 focus:outline-none transition-all duration-300 text-center text-lg font-light tracking-wider`}
            autoFocus
          />
          
          <div className={`h-6 mt-2 transition-all duration-300 ${showError ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-red-400 text-sm text-center font-light">
              Not quite right, try again 💕
            </p>
          </div>
          
          <button
            onClick={handlePasswordSubmit}
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white font-light py-4 rounded-2xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-lg tracking-wide mt-4"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  // Main game
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-800 mb-2 tracking-wide">Memories</h1>
          <p className="text-gray-500 font-light">Six months! :D</p>
        </div>

        <div className={`relative mb-8 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${isTransitioning ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`} style={{ height: '500px' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-3 border-purple-300 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                  <p className="text-gray-400 font-light">Loading memory...</p>
                </div>
              </div>
            )}
            
            <img
              key={`${currentImageIndex}-${Date.now()}`}  // CHANGE THIS LINE
              src={`${images[currentImageIndex].url}?t=${Date.now()}`}  // CHANGE THIS LINE
              alt="Memory"
              className="w-full h-full object-cover transition-all duration-700"
              style={{ 
                clipPath: getClipPath(),
                filter: imageLoaded ? 'none' : 'blur(20px)',
                opacity: imageLoaded ? 1 : 0
              }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}  // ADD THIS LINE
            />

            {/* Elegant gradient overlay for caption */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent h-32 transition-opacity duration-700 ${(isRevealed || currentZoom >= 80) ? 'opacity-100' : 'opacity-0'}`}>
              <p className="absolute bottom-6 left-0 right-0 text-white text-center font-light text-lg tracking-wide px-6">
                {images[currentImageIndex].caption}
              </p>
            </div>

            {/* Progress indicator */}
            <div className="absolute top-6 right-6">
              {/* <div className="bg-black/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-light">
                {currentImageIndex + 1} of {images.length}
              </div> */}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => !isRevealed && currentZoom < 100 && setCurrentZoom(Math.min(100, currentZoom + 20))}
              disabled={isRevealed || currentZoom >= 100}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-400 to-purple-500 disabled:from-gray-300 disabled:to-gray-400 text-white font-light py-4 rounded-2xl transition-all duration-300 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">Reveal More</span>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
            
            <button
              onClick={() => setIsRevealed(!isRevealed)}
              className={`group relative overflow-hidden ${isRevealed ? 'bg-gradient-to-r from-pink-400 to-rose-400' : 'bg-gradient-to-r from-green-400 to-emerald-400'} text-white font-light py-4 rounded-2xl transition-all duration-300`}
            >
              <span className="relative z-10">{isRevealed ? 'Hide' : 'Peek'}</span>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
          </div>
          
          <button
            onClick={handleNextImage}
            className="group w-full relative overflow-hidden bg-gradient-to-r from-indigo-400 to-purple-400 text-white font-light py-4 rounded-2xl transition-all duration-300"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Next
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
        </div>

        {/* Elegant progress bar */}
        {/* <div className="mt-8">
          <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${currentZoom}%` }}
            >
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md"></div>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-sm text-gray-400 font-light">Hidden</p>
            <p className="text-sm text-gray-600 font-light">{currentZoom}% revealed</p>
            <p className="text-sm text-gray-400 font-light">Revealed</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}