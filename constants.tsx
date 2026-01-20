
import { VideoItem, GuestbookEntry } from './types';

// TO MAKE THIS WORK: Paste your Google Apps Script Web App URL here
export const RSVP_BACKEND_URL = "https://script.google.com/macros/s/AKfycbxE0tpQu5v3tDl8iHy7PiTVeLsgOmvJsUdpcrU5X9z6aUxigNxdU_sI7l5ms_5HZ_WW/exec"; 

export const COLORS = {
  forest: '#064e3b',
  earth: '#111827',
  gold: '#d97706',
  ocean: '#0369a1',
};

export interface BookItem {
  title: string;
  author: string;
  description: string;
  category: string;
}

export const RECOMMENDED_BOOKS: BookItem[] = [
  {
    title: "Braiding Sweetgrass",
    author: "Robin Wall Kimmerer",
    description: "Indigenous wisdom, scientific knowledge, and the teachings of plants. Essential for understanding our reciprocal relationship with the Earth.",
    category: "Ecology"
  },
  {
    title: "The Secret Life of Plants",
    author: "Peter Tompkins",
    description: "An exploration of the physical, emotional, and spiritual relations between plants and man. A favorite of Krystina's for its radical empathy.",
    category: "Consciousness"
  },
  {
    title: "The Hidden Life of Trees",
    author: "Peter Wohlleben",
    description: "Explores the 'Wood Wide Web' and the social networks of forests that Krystina often referenced as the 'Earth Brain's' neural architecture.",
    category: "Science"
  },
  {
    title: "The Sri Guru Granth Sahib",
    author: "Various Gurus",
    description: "The central religious scripture of Sikhism, focusing on Ek Onkar and the absolute unity of all creation.",
    category: "Spirituality"
  },
  {
    title: "Silent Spring",
    author: "Rachel Carson",
    description: "A foundational text on the environmental impact of human agriculture and pesticides. The first alarm bell of the biocentric era.",
    category: "Agriculture"
  },
  {
    title: "The Overstory",
    author: "Richard Powers",
    description: "A novel about how trees bring disparate human lives together to address the destruction of the world's forests.",
    category: "Literature"
  },
  {
    title: "The Mushroom at the End of the World",
    author: "Anna Lowenhaupt Tsing",
    description: "On the possibility of life in capitalist ruins. Explores how life persists through collaboration in damaged landscapes.",
    category: "Philosophy"
  },
  {
    title: "Biocentrism",
    author: "Robert Lanza",
    description: "How life and consciousness are the keys to understanding the true nature of the universe.",
    category: "Science"
  },
  {
    title: "The One-Straw Revolution",
    author: "Masanobu Fukuoka",
    description: "An introduction to natural farming. Krystina saw this as the ultimate 'Agriculture Critique' solution.",
    category: "Agriculture"
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    description: "A psychological memoir on finding purpose in the face of suffering, aligning with Krystina's view on the power of the human brain.",
    category: "Psychology"
  }
];

export const VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: 'Shaheed Sant Jarnail Singh Khalsa Bindranwale Ji - Monalisa Smile',
    thumbnail: 'https://img.youtube.com/vi/QpIGJuRk_XE/hqdefault.jpg',
    youtubeId: 'QpIGJuRk_XE',
    category: 'Legacy',
    keyQuotes: ["The spirit of the Khalsa is the spirit of freedom and ultimate truth."],
    transcript: "A deep meditation on the legacy of Sikh warriors and the frequency of sovereignty."
  },
  {
    id: 'v2',
    title: 'Nov 16/2022 - The Power of Mantra and The Truth of Eck On Kar',
    thumbnail: 'https://img.youtube.com/vi/zG-O8_m_U0E/hqdefault.jpg',
    youtubeId: 'zG-O8_m_U0E',
    category: 'Philosophy',
    keyQuotes: ["Eck On Kar means one singular reality vibrating through all forms."],
    transcript: "Exploring the sound-frequency of creation and how mantra aligns the Earth Brain."
  },
  {
    id: 'v3',
    title: 'Letter to Gur Sikh Piyareon',
    thumbnail: 'https://img.youtube.com/vi/9_N7fRkG88Y/hqdefault.jpg',
    youtubeId: '9_N7fRkG88Y',
    category: 'Legacy',
    keyQuotes: ["To my beloved community: the path of the soul is the path of service."],
    transcript: "A heartfelt letter addressing the spiritual community and the mission of the movement."
  },
  {
    id: 'v4',
    title: 'OUR EARTH BRAIN intro 08 Nov, 2022',
    thumbnail: 'https://img.youtube.com/vi/vF7XzU8K9mY/hqdefault.jpg',
    youtubeId: 'vF7XzU8K9mY',
    category: 'Philosophy',
    keyQuotes: ["Welcome to the realization that you are the planet thinking of itself."],
    transcript: "The foundational introduction to the Our Earth Brain movement and its core tenets."
  },
  {
    id: 'v5',
    title: 'An Invitation for Participation in Transformation',
    thumbnail: 'https://img.youtube.com/vi/8p_uG9n1v58/hqdefault.jpg',
    youtubeId: '8p_uG9n1v58',
    category: 'Transformation',
    keyQuotes: ["The time for observation has passed; the time for transformation is now."],
    transcript: "A call to action for all global citizens to participate in the biocentric shift."
  },
  {
    id: 'v6',
    title: 'What Next? The Global Vote: Black and White Will Unite',
    thumbnail: 'https://img.youtube.com/vi/u8b7t8H7_V4/hqdefault.jpg',
    youtubeId: 'u8b7t8H7_V4',
    category: 'Transformation',
    keyQuotes: ["When we remove the visual sugar, we find the structural truth."],
    transcript: "Explaining the strategy behind the Black and White movement and the 'Global Vote'."
  },
  {
    id: 'v7',
    title: '8 Minutes and 46 Seconds To Breathe Love Back Into The World',
    thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg',
    youtubeId: 'ScMzIvxBSi4',
    category: 'Healing',
    keyQuotes: ["8:46 is the breath of a world trying to remember how to live."],
    transcript: "A powerful spoken word and visual meditation on justice, breath, and global healing."
  },
  {
    id: 'v8',
    title: 'Second version 8:46',
    thumbnail: 'https://img.youtube.com/vi/n3A6A0G89S4/hqdefault.jpg',
    youtubeId: 'n3A6A0G89S4',
    category: 'Healing',
    keyQuotes: ["Reclaiming the breath of the biosphere, second by second."],
    transcript: "An alternative edit of the 8:46 meditation with refined visual cues."
  },
  {
    id: 'v9',
    title: 'First Version - 8:46',
    thumbnail: 'https://img.youtube.com/vi/Rya6JF_uf7E/hqdefault.jpg',
    youtubeId: 'Rya6JF_uf7E',
    category: 'Healing',
    keyQuotes: ["Let the Earth breathe through you."],
    transcript: "The original raw iteration of the 8:46 movement's call to silence and breath."
  },
  {
    id: 'v10',
    title: 'NAACP Journey for Justice. Day Two',
    thumbnail: 'https://img.youtube.com/vi/O5V4z-R1mK8/hqdefault.jpg',
    youtubeId: 'O5V4z-R1mK8',
    category: 'Transformation',
    keyQuotes: ["Justice is the correction of the biological frequency of a system."],
    transcript: "Krystina's field recordings and insights during the NAACP march for justice."
  },
  {
    id: 'v11',
    title: 'NAACP Journey for Justice. Day One',
    thumbnail: 'https://img.youtube.com/vi/S7bW-R8Nn7A/hqdefault.jpg',
    youtubeId: 'S7bW-R8Nn7A',
    category: 'Transformation',
    keyQuotes: ["Starting the walk toward a unified Earth consciousness."],
    transcript: "Opening reflections from the beginning of the Journey for Justice."
  },
  {
    id: 'v12',
    title: 'NAACP Journey for Justice. Day Three',
    thumbnail: 'https://img.youtube.com/vi/E6N4B8_N8C8/hqdefault.jpg',
    youtubeId: 'E6N4B8_N8C8',
    category: 'Transformation',
    keyQuotes: ["The momentum of the Earth cannot be stopped by silos."],
    transcript: "Deepening realizations on the third day of the historic march."
  },
  {
    id: 'v13',
    title: 'PSA 1 Spread the Good News to Decrease the Spread',
    thumbnail: 'https://img.youtube.com/vi/G-Sj-y8_72Q/hqdefault.jpg',
    youtubeId: 'G-Sj-y8_72Q',
    category: 'Healing',
    keyQuotes: ["Good news is the immune system of the mind."],
    transcript: "Using positive frequency to combat the viral spread of fear and sickness."
  },
  {
    id: 'v14',
    title: 'PSA 3: Americans',
    thumbnail: 'https://img.youtube.com/vi/N0_rQ8nS8t8/hqdefault.jpg',
    youtubeId: 'N0_rQ8nS8t8',
    category: 'Transformation',
    keyQuotes: ["Reclaiming the soul of the people from the corporate silos."],
    transcript: "A message to the American people about biocentric sovereignty and local power."
  },
  {
    id: 'v15',
    title: 'Today is IT',
    thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg',
    youtubeId: 'ScMzIvxBSi4',
    category: 'Philosophy',
    keyQuotes: ["The present moment is the only portal to the Earth's true brain."],
    transcript: "A meditation on the immediacy of action and the power of the Now."
  },
  {
    id: 'v16',
    title: 'PSA 2: Our Elders',
    thumbnail: 'https://img.youtube.com/vi/G-Sj-y8_72Q/hqdefault.jpg',
    youtubeId: 'G-Sj-y8_72Q',
    category: 'Legacy',
    keyQuotes: ["Our elders are the deep-time memory of the planetary organ."],
    transcript: "Honoring the wisdom of the older generations and their role in the Earth Brain."
  },
  {
    id: 'v17',
    title: 'Second version of PSA 1: Spread the Good News to Decrease the...',
    thumbnail: 'https://img.youtube.com/vi/v9v6M9-z_Xk/hqdefault.jpg',
    youtubeId: 'v9v6M9-z_Xk',
    category: 'Healing',
    keyQuotes: ["Frequency is infectious; choose the good news."],
    transcript: "A refined version of PSA 1 focusing on the mechanics of mental immunity."
  },
  {
    id: 'v18',
    title: 'Spread This to Decrease the Spread of CoVid-19',
    thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg',
    youtubeId: 'ScMzIvxBSi4',
    category: 'Healing',
    keyQuotes: ["The ultimate vaccine is the alkaline frequency of Joy."],
    transcript: "Practical and spiritual advice for navigating the pandemic through biocentric health."
  },
  {
    id: 'v19',
    title: 'The Strongest Being I Know',
    thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg',
    youtubeId: 'ScMzIvxBSi4',
    category: 'Philosophy',
    keyQuotes: ["Strength is not found in power, but in the ability to surrender to the Earth's flow."],
    transcript: "A tribute to the resilient spirit of the Earth and those who embody her strength."
  },
  {
    id: 'v20',
    title: 'An Invitation in Thanksgiving',
    thumbnail: 'https://img.youtube.com/vi/8p_uG9n1v58/hqdefault.jpg',
    youtubeId: '8p_uG9n1v58',
    category: 'Philosophy',
    keyQuotes: ["Gratitude is the vibration that opens the heart to the planetary mind."],
    transcript: "A message of thanksgiving and an invitation to live in perpetual gratitude for the Earth."
  }
];

export const GUESTBOOK_MOCK: GuestbookEntry[] = [
  {
    id: 'g1',
    name: 'Mandeep Singh',
    date: 'Jan 15, 2026',
    message: 'Krystina, your vision for the Khalsa and the Earth gave us all a higher purpose. Your voice is eternal.'
  },
  {
    id: 'g2',
    name: 'Elena Rodriguez',
    date: 'Jan 18, 2026',
    message: 'The way she spoke about water and stepwells changed my entire approach to humanitarian work.'
  },
  {
    id: 'g3',
    name: 'Dr. Julian Thorne',
    date: 'Jan 20, 2026',
    message: 'A true visionary. Her critique of modern agriculture is the most profound I have encountered in twenty years of study.'
  }
];
