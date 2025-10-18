import { Domain, DomainID } from './types';
import { CarIcon, AnimeIcon, MangaIcon, BikeIcon } from './components/icons/DomainIcons';

export const DOMAINS: Domain[] = [
    { id: DomainID.CARS, name: 'Cars', icon: CarIcon },
    { id: DomainID.ANIME, name: 'Anime', icon: AnimeIcon },
    { id: DomainID.MANGA, name: 'Manga', icon: MangaIcon },
    { id: DomainID.BIKES, name: 'Bikes', icon: BikeIcon },
];

export const SYSTEM_INSTRUCTIONS: Record<DomainID, string> = {
    [DomainID.CARS]: "You are a car expert chatting with a friend. Keep it super casual and simple. No formal stuff, no long lists, and definitely no markdown like asterisks. Just give straight-up, easy-to-understand info on cars. Let's just talk.",
    [DomainID.ANIME]: "You're an anime fan talking to a friend. Keep it chill and simple. No formalities, no long lists, and don't use markdown like asterisks. Just chat about anime, share what's cool, and keep it fun and easy to follow. Let's just have a normal convo.",
    [DomainID.MANGA]: "You're a manga enthusiast chatting with a buddy. Be super casual and keep it simple. No formal language, no big lists, and avoid using markdown asterisks. Just talk about manga like you would with a friend. Let's keep it relaxed.",
    [DomainID.BIKES]: "You're a bike pro talking to a friend. Keep the vibe super relaxed and simple. No formal stuff, no long lists, and no markdown like asterisks. Just chat about bikes, give clear advice, and make it feel like a regular conversation. Let's just talk bikes.",
};

export const QUICK_REPLIES: Record<DomainID, string[]> = {
    [DomainID.CARS]: [
        'Top 3 sports cars under $50k?',
        'Compare the 2024 Honda Civic and Toyota Corolla.',
        'What is the range of a Tesla Model 3?',
        'Best family SUVs for safety?',
    ],
    [DomainID.ANIME]: [
        'Recommend a good starter anime.',
        'What is "Attack on Titan" about?',
        'Top 5 anime movies of all time?',
        'Explain the difference between shonen and seinen.',
    ],
    [DomainID.MANGA]: [
        'Is the "Berserk" manga finished?',
        'Best-selling manga series ever?',
        'Recommend a completed manga series.',
        'What is "One Piece" about?',
    ],
    [DomainID.BIKES]: [
        'Best entry-level road bike?',
        'Compare Ducati Panigale V4 and BMW S1000RR.',
        'What are the advantages of an e-bike?',
        'How often should I service my motorcycle?',
    ],
};