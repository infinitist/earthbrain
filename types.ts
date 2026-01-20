
export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  youtubeId: string;
  category: 'Philosophy' | 'Memorial' | 'Legacy' | 'Healing' | 'Transformation';
  keyQuotes?: string[];
  transcript?: string;
}

export interface RSVPData {
  name: string;
  email: string;
  attending: 'memorial' | 'celebration' | 'both' | 'no';
  guests: number;
  message: string;
}

export interface RSVPRecord extends RSVPData {
  id: string;
  timestamp: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  date: string;
  message: string;
}
