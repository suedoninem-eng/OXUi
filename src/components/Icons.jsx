import React from 'react';

export const IconGemini = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="gem-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4285F4"/>
        <stop offset="50%" stopColor="#9C27B0"/>
        <stop offset="100%" stopColor="#FF6D00"/>
      </linearGradient>
    </defs>
    <path d="M16 2C16 2 10 10 2 16C10 22 16 30 16 30C16 30 22 22 30 16C22 10 16 2 16 2Z" fill="url(#gem-g)"/>
  </svg>
)

export const IconClaude = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" fill="#CC785C"/>
    <text x="16" y="21" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">C</text>
  </svg>
)

export const IconSpark = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#E8C547"/>
  </svg>
)

export const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7L5.5 10.5L12 3.5" stroke="#E8C547" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const IconArrow = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M3 9H15M15 9L10 4M15 9L10 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const IconPlay = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <polygon points="8,5 19,12 8,19" fill="#E8C547"/>
  </svg>
)

export const IconVolume = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
)

export const IconMuted = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
)
