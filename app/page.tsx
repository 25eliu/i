'use client';

import { useState, useEffect } from 'react';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

export default function Home() {
  // Your image URLs
  const originalImages = [
    { 
      url: '/images/image1.jpg',
      caption: "First Date! If you didn't dm me like 8 months ago none of this would have happened. Thank you for going on that date w me and paying for the ice skating :). This has genuinely been some of the best 6 months of my life." 
    },
    { 
      url: '/images/image2.jpg', 
      caption: "My 500 lbs Life! It's crazy how you're about to work here and I really wanna go to PJ with you more, not just because I like working out but it would be cool to have spending time with you in my daily routine." 
    },
    { 
      url: '/images/image3.JPG', 
      caption: 'Beach Day! We definetly need to hit the beach again this summer and this day was a lot of fun. Also this picture of you smiling super cute.' 
    },
    { 
      url: '/images/image4.jpg', 
      caption: 'always hitting my starfish :(' 
    },
    { 
      url: '/images/image5.JPG', 
      caption: 'Your Birthday! Thank you for inviting me to your lil birthday celebration. It was really funny to meet gordon and PRETEND to be yk.' 
    },
    { 
      url: '/images/image6.jpg', 
      caption: 'just wow' 
    },
    { 
      url: '/images/image7.PNG', 
      caption: "Such a good pfp, your smile is amazing and I love how you look in this picture."
    },
    { 
      url: '/images/image8.jpg', 
      caption: 'kind of random but u just look so elegant here and always' 
    },
    { 
      url: '/images/image9.jpg', 
      caption: "Prom(Anthony's house edition)! you looked really amazing in this dress btw and thanks for putting up with going to a school's dance where you knew nobody. I feel like you go out of your way for me a lot and I really appreciate it. (and you don't have to)"
    },
    { 
      url: '/images/image10.jpg', 
      caption: 'your lil RBF!dw you look intimdating at first but you are actually the sweetest person ever and I hope your new friends and people you meet will see that too.' 
    },
    { 
      url: '/images/image11.jpg', 
      caption: "The classic park across from the library. I like that jacket on you and i'm gonna miss spending time with you here" 
    },
    { 
      url: '/images/image13.jpg', 
      caption: "Your comfy ass bed! My teddy is so much better than that fatass bear. " 
    },
    {
      url: '/images/image14.jpg',
      caption: "Valentines Day! That was the first time i made flowers for anyone and im happy it was for you."
    },
        {
      url: '/images/image15.JPG',
      caption: "idk random cute photo. I hope you like this lil game that i made. "
    },
        {
      url: '/images/image16.JPG',
      caption: "yo my skin was so much worse in this photo. anyways i truly feel lucky everyday that i get to spend time with you"
    },
        {
      url: '/images/image17.JPG',
      caption: "ig story classic, i just noticed how weird ur elbow looks in this photo, but u look cute tho :)"
    },
        {
      url: '/images/image18.jpg',
      caption: "Academy of Science Date! whoah this was so long ago, thank you for this and many more amazing suggestions/ideas"
    },
        {
      url: '/images/image19.jpg',
      caption: "this doesnt even need a caption tbh"
    },
        {
      url: '/images/image20.jpg',
      caption: "One of my fav mirror photos of us, i feel like we look good together, ngl u carry"
    },
        {
      url: '/images/image21.jpg',
      caption: "tuff fit, also this sounds stupid but like when u get a little upset or banter when i ragebait you"
    },
        {
      url: '/images/image22.jpg',
      caption: "Seal Point! I love your hair :) and you also smell rly nice"
    },
        {
      url: '/images/image23.jpg',
      caption: "pjcc! I like how you went up even though you had your parka on (my bad). Thank you for joining me in my routine and hobbies and making it more fun."
    },
        {
      url: '/images/image24.jpg',
      caption: "laurens senior night! Ur genuinely such a good friend and supporter of others and its crazy how much you go out of your way to make others happy."
    },
        {
      url: '/images/image25.jpg',
      caption: "SMHS Prom! Ur a phone addict how do you always have it on in these photos lmao"
    },
        {
      url: '/images/image26.JPG',
      caption: "I really like this photo of us. u look super cute"
    },
        {
      url: '/images/image27.jpg',
      caption: "cuteeee"
    },
        {
      url: '/images/image28.jpg',
      caption: "I like our little arts and crafts adventures (even though im kinda suck), but ur good at it and always make it enjoyable"
    },
        {
      url: '/images/image29.jpg',
      caption: "AHS Prom (Andrews house edition)! Thank you for being super chill with my friends, its so nice being able to hangout w both you and them"
    },
        {
      url: '/images/image30.JPG',
      caption: "the recreation :D i like how ur always in like this silly and laughing mood doing the stupidest shit"
    },
    {
      url: '/images/image31.jpg',
      caption: "This day was rly fun for the most part, it was very mormon of us to go to the party and not drink and still have a good time"
    },
    {
      url: '/images/image32.jpg',
      caption: "Downtown if very nice even if its repeitive, I like how we can just walk around and talk about anything and everything"
    },
    {
      url: '/images/image33.jpg',
      caption: "idk wtf is going on but i really like how your always laughing at smthn stupid and i can be myself around you"
    },
    {
      url: '/images/image34.jpg',
      caption: "tissue strat (doesnt work i swear), also ur eyes are so pretty"
    },
        {
      url: '/images/image35.jpg',
      caption: "ur tail! i promise i wont become a furry at berk. but if i do u gotta join me"
    },
        {
      url: '/images/image36.jpg',
      caption: "crashing the date! i feel like we should be very proud of ourselves getting sanj and lauren together"
    },
    {
      url: '/images/image37.png',
      caption: "just wow"
    },
    {
      url: '/images/image38.jpg',
      caption: "this photo is amazing. cant believe they let u graduate tho.."
    },
    {
      url: '/images/image39.jpg',
      caption: "Thanks for inviting me! clueless look but in a cute way"
    },
    {
      url: '/images/image40.JPG',
      caption: "Addrienes crib! dont cry :( idk what to do when u do so ima just hug u. everything will be okay"
    },
        {
      url: '/images/image41.jpg',
      caption: "prob the best photobooth of us, also u storing everything from me is super sweet and caring"
    },
        {
      url: '/images/image42.JPG',
      caption: "so when r u gonna buy me this dress?"
    },
    {
      url: '/images/image43.JPG',
      caption: "honestly random thought but im just so happy i can be your boyfriend"
    },
    {
      url: '/images/image44.PNG',
      caption: "hehe, ill always prioritize u"
    },
    {
      url: '/images/image45.jpg',
      caption: "2 man! this was a fun day i cant wait for camping"
    },
    {
      url: '/images/image46.jpg',
      caption: "where it all began 2 years ago, so what are your swim times?"
    },
        {
      url: '/images/image47.jpg',
      caption: "someone doesnt know how to lie on a bed. i wanna cuddle w u while watching squid game so bad rn"
    },
        {
      url: '/images/image48.jpg',
      caption: "ur so cute, thanks for making everything ur around smell good btw"
    },
    {
      url: '/images/image49.JPG',
      caption: "Clay Date! amazing idea as usual, i love when u suggest something to do :), since u dont like picking options ill b the picker and u can be the suggester!"
    },
    {
      url: '/images/image50.jpg',
      caption: "random ass photo but i rly like how u match my vibe"
    },
    {
      url: '/images/image51.JPG',
      caption: "i stand by this"
    },
    
    {
      url: '/images/image52.JPG',
      caption: "holy guacamole typea photo"
    },
    
    {
      url: '/images/image53.JPG',
      caption: "a rising racist, i like how i can have no filter around u and vice veresa"
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
            <h2 className="text-3xl font-light text-gray-800 mb-3">E+I</h2>
            <p className="text-gray-500 text-sm font-light">Date</p>
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
    <div className={`${quicksand.className} min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex items-center justify-center p-4`}>
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-800 mb-2 tracking-wide">Memories</h1>
          <p className="text-gray-500 font-light">Six months! :D</p>
        </div>

        <div className={`relative mb-8 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${isTransitioning ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`} style={{ height: '400px', maxHeight: '50vh' }}>
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
              src={`${images[currentImageIndex].url}?t=${Date.now()}`}  
              alt="Memory"
              className="w-full h-full object-cover transition-all duration-700"
              style={{ 
                clipPath: getClipPath(),
                filter: imageLoaded ? 'none' : 'blur(20px)',
                opacity: imageLoaded ? 1 : 0
              }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}  
            />

            {/* Elegant gradient overlay for caption */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent h-32 transition-opacity duration-100 ${(isRevealed || currentZoom >= 80) ? 'opacity-100' : 'opacity-0'}`}>
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