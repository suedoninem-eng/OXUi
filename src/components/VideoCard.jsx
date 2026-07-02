import React, { useRef, useState, useEffect } from 'react';
import { IconPlay, IconMuted, IconVolume } from './Icons';

export default function VideoCard({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-play / pause based on intersection with viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {
              // Auto-play might be blocked by browser policy
            });
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      });
    }, { threshold: 0.5 }); // Play when 50% visible

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div className="via-mosaic-video-wrapper">
      <video 
        ref={videoRef}
        src={src}
        loop
        muted={isMuted}
        playsInline
        className="via-mosaic-video"
        onClick={togglePlay}
      />
      <button 
        className={`via-play-btn ${isPlaying ? 'playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {!isPlaying && <IconPlay />}
      </button>
      
      <button
        className="via-mute-btn"
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <IconMuted /> : <IconVolume />}
      </button>
    </div>
  );
}
