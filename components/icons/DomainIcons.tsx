import React from 'react';

export const CarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7s-1.3.3-1.8.7C9.3 8.6 8 10 8 10s-2.7.6-4.5.8C2.7 11.1 2 11.9 2 12.8V16c0 .6.4 1 1 1h2"/>
        <path d="M8 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
        <path d="M16 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
        <path d="M9 11v-1"/>
        <path d="M15 11v-1"/>
    </svg>
);

export const AnimeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.3 14.3a4.5 4.5 0 0 0-6.6 0"/>
        <path d="M8 9.5s-1.5 1.5-3 0"/>
        <path d="M16 9.5s1.5 1.5 3 0"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
    </svg>
);

export const MangaIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z"/>
        <path d="M8 2v20"/>
        <path d="M8 10h12"/>
    </svg>
);

export const BikeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5.5" cy="17.5" r="3.5" />
        <circle cx="18.5" cy="17.5" r="3.5" />
        <path d="M9 17.5h5.5l-1.9-4.2-1.1-.9-2.3.9-.7 2.1Z" />
        <path d="m11.5 11.5 3-3-1-2-3 2.5" />
    </svg>
);