import React, { useState, useRef } from 'react';
import { WaveDivider } from './WaveDivider';
import { Volume2, VolumeX } from 'lucide-react';

interface HeroSectionProps {
  videoSrc?: string;
  thumbnailSrc?: string;
  overlayTextSrc?: string;
  logoSrc?: string;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  videoSrc = '/assets/hero-video.mp4',
  thumbnailSrc = '/assets/video-thumbnail.jpg',
  overlayTextSrc = '/assets/hero-text-transparent.png',
  logoSrc = '/assets/hero-logo-perfect.png',
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Handle Mouse Enter - Hover to Play Video
  const handleMouseEnter = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.log('Video play error on hover:', err);
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
          setIsPlaying(true);
        }
      });
  };

  // Handle Mouse Leave - Return to Image Stage
  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  // Handle Video Ended - Return to Image Stage once video is done
  const handleVideoEnded = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const scrollToNext = () => {
    const el = document.getElementById('new-launch') || document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full bg-[#1b052d] overflow-hidden ${className}`}
    >
      <div className="relative w-full max-w-[1920px] mx-auto min-h-[500px] sm:min-h-[650px] lg:min-h-[780px] flex flex-col justify-between items-center group cursor-pointer pb-16 sm:pb-24">

        {/* Stage 1: Static Thumbnail Image */}
        <img
          src={thumbnailSrc}
          alt="Hero Video Thumbnail"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-0 ${isPlaying ? 'opacity-0' : 'opacity-100'
            }`}
        />

        {/* Stage 2: Video Clip */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={thumbnailSrc}
          muted={isMuted}
          playsInline
          preload="metadata"
          onEnded={handleVideoEnded}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-0 ${isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* Subtle Vignette Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b052d]/50 via-transparent to-[#1b052d]/80 z-10 pointer-events-none" />

        {/* Top Right Mute/Unmute Audio Toggle */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30">
          <button
            onClick={toggleMute}
            className="p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/30 backdrop-blur-md text-white shadow-lg transition-all cursor-pointer"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            title={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
          </button>
        </div>

        {/* Hero Overlays */}
        <div className="relative z-20 flex-1 w-full flex flex-col items-center justify-center text-center px-4 pt-10 sm:pt-16 pb-12 pointer-events-none">

          {/* Logo on Top */}
          <div className="mb-4 sm:mb-6 flex justify-center">
            <img
              src={logoSrc}
              alt="Parachute Advansed Hydra Curls"
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain select-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
            />
          </div>

          {/* Hero Transparent Text Overlay */}
          <div className="w-full flex justify-center px-2 mb-4 sm:mb-6">
            <img
              src={overlayTextSrc}
              alt="Pure ingredients. Real results. Every drop matters."
              className="w-full max-w-[340px] sm:max-w-[500px] md:max-w-[680px] lg:max-w-[800px] h-auto object-contain mx-auto select-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] transform transition-transform duration-500 group-hover:scale-102"
            />
          </div>

          {/* Subtle Wavy Line Accent */}
          <div className="mt-2 sm:mt-4 flex justify-center w-full">
            <img
              src="/assets/Line 33.svg"
              alt="Wavy accent line"
              className="w-44 sm:w-64 md:w-88 lg:w-96 h-auto object-contain mx-auto select-none opacity-90 drop-shadow-[0_0_12px_#00d2ff]"
            />
          </div>

          {/* Scroll Down Bounce Icon */}
          <div className="mt-4 sm:mt-6 pointer-events-auto">
            <button
              onClick={scrollToNext}
              className="p-2 text-[#00d2ff] hover:text-white transition-all animate-bounce cursor-pointer flex flex-col items-center gap-1 group/btn"
              aria-label="Scroll to next section"
            >
              <img
                src="/assets/icon-park-outline_down.svg"
                alt="Scroll Down"
                className="w-5 h-5 sm:w-6 sm:h-6 object-contain brightness-200 transition-transform group-hover/btn:scale-125"
              />
            </button>
          </div>

        </div>

        {/* Cyan Wave Divider sitting flush at the bottom boundary */}
        <WaveDivider src="/assets/Rectangle 140.jpg" alt="Cyan Curl Line Wave Divider" />

      </div>
    </section>
  );
};