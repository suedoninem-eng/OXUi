import React, { useRef, useState, useEffect } from 'react';
import { IconPlay, IconMuted, IconVolume } from './Icons';

export default function VideoCard({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-play / pause + lazy src based on intersection with viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (videoRef.current) {
            // Lazy: só atribui o src quando entra na tela DE FATO (coordenadas reais)
            const rect = videoRef.current.getBoundingClientRect();
            // Verifica se está dentro da largura da janela, pois o scroll é horizontal
            if (rect.left < window.innerWidth && rect.right > 0) {
              if (!videoRef.current.src || videoRef.current.src === window.location.href) {
                videoRef.current.src = src;
                videoRef.current.load();
              }
              videoRef.current.play().then(() => {
                setIsPlaying(true);
              }).catch(() => {});
            }
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      });
    }, { threshold: 0.5, rootMargin: '0px' });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [src]);

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
        preload="none"
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
