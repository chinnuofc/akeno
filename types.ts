
export enum Role {
  USER = 'user',
  MODEL = 'model',
}

export interface Message {
  role: Role;
  content: string;
}

export enum DomainID {
    CARS = 'cars',
    ANIME = 'anime',
    MANGA = 'manga',
    BIKES = 'bikes',
}

export interface Domain {
    id: DomainID;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
}
