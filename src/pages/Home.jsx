import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Footer from "../components/Footer";

export default function Home() {

  const navigate = useNavigate();

  // ================= BACKGROUND (FADE IMAGES ONLY) =================
  const images = [
    "/bg1.jpeg",
    "/bg2.jpeg",
    "/bg3.jpeg",
    "/bg4.jpeg",
    "/bg5.jpeg",
    "/bg6.jpeg",
    "/bg7.jpeg",
    "/bg8.jpeg",
    "/bg9.jpeg",
    "/bg10.jpeg"
  ];

  const [bgIndex, setBgIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setBgIndex((p) => (p + 1) % images.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // ================= STATES =================
  const [menu, setMenu] = useState(null);
  const [login, setLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [aiOpen, setAiOpen] = useState(false);
const [aiInput, setAiInput] = useState("");
const [aiChat, setAiChat] = useState([]);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [materials, setMaterials] = useState([]);
  const [search, setSearch] = useState("");
  
  const [viewer, setViewer] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");
  const [uniIndex, setUniIndex] = useState(0);
const [showAllUniversities, setShowAllUniversities] = useState(false);
  // ================= STATES =================
const [gameStarted, setGameStarted] = useState(false);
const [score, setScore] = useState(0);
const [qIndex, setQIndex] = useState(0);
const [gameOver, setGameOver] = useState(false);
const [feedback, setFeedback] = useState("");

const [musicEnabled, setMusicEnabled] = useState(false);
const [musicIndex, setMusicIndex] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);

const audioRef = useRef(null);

const [viewMoreCategory, setViewMoreCategory] = useState(null);
const [expandedCategory, setExpandedCategory] = useState(null);

const [uploadTitle, setUploadTitle] = useState("");
const [uploadCategory, setUploadCategory] = useState("");
const [uploadFile, setUploadFile] = useState(null);

const [replyText, setReplyText] = useState({});
const [showAllComments, setShowAllComments] = useState(false);
const [shuffledQuestions, setShuffledQuestions] = useState([]);

const [filteredMaterials, setFilteredMaterials] = useState([]);
const [searchResults, setSearchResults] = useState([]);
const [activeMenuId, setActiveMenuId] = useState(null);

// ================= MUSIC TRACKS =================
const musicTracks = [
  { name: "common person", src: "/music/music1.mp3" },
  { name: "Shenseea-Hit-Run", src: "/music/music2.mp3" },
  { name: "AK-Songstress-Jonathan", src: "/music/music3.mp3" },

  // ================= ADDED 7 MORE =================
  { name: "Vitaa & Slimane - Avant toi", src: "/music/music4.mp3" },
  { name: "Tatiana-manoise-like you", src: "/music/music5.mp3" },
  { name: "jamaica-farewell-harry-belafonte", src: "/music/music6.mp3" },
  { name: "Focus Study Beats", src: "/music/music7.mp3" },
  { name: "Cyber Pulse", src: "/music/music8.mp3" },
  { name: "Rainy Mood LoFi", src: "/music/music9.mp3" },
  { name: "Victory Anthem", src: "/music/music10.mp3" }
];

// ================= QUESTIONS =================

const shuffleOptions = (question) => {
  return {
    ...question,
    options: [...question.options].sort(() => Math.random() - 0.5)
  };
};

const questions = [

  // ================= PHYSICS (25) =================
  { question: "What does E=mc² represent?", options: ["Electric force", "Energy-mass equivalence", "Magnetic field"], answer: "Energy-mass equivalence" },
  { question: "Which particle has no charge?", options: ["Electron", "Neutron", "Proton"], answer: "Neutron" },
  { question: "Unit of force?", options: ["Newton", "Joule", "Watt"], answer: "Newton" },
  { question: "Speed of light?", options: ["3×10^8 m/s", "3×10^6 m/s", "3×10^5 m/s"], answer: "3×10^8 m/s" },
  { question: "Momentum formula?", options: ["m×v", "F×d", "m×a"], answer: "m×v" },
  { question: "Unit of power?", options: ["Watt", "Volt", "Ampere"], answer: "Watt" },
  { question: "Acceleration due to gravity?", options: ["9.8 m/s²", "8 m/s²", "10 m/s²"], answer: "9.8 m/s²" },
  { question: "Wave-particle duality applies to?", options: ["Sound", "Light", "Heat"], answer: "Light" },
  { question: "SI unit of energy?", options: ["Joule", "Newton", "Watt"], answer: "Joule" },
  { question: "First law of motion?", options: ["Inertia", "F=ma", "Action-reaction"], answer: "Inertia" },
  { question: "Electric current unit?", options: ["Ampere", "Volt", "Ohm"], answer: "Ampere" },
  { question: "Work formula?", options: ["F×d", "m×v", "V×I"], answer: "F×d" },
  { question: "Ohm’s law?", options: ["V=IR", "P=IV", "F=ma"], answer: "V=IR" },
  { question: "Kinetic energy formula?", options: ["½mv²", "mgh", "mv"], answer: "½mv²" },
  { question: "Lens forms images using?", options: ["Light refraction", "Heat", "Sound"], answer: "Light refraction" },

  // ================= CHEMISTRY (25) =================
  { question: "pH < 7 means?", options: ["Base", "Acid", "Neutral"], answer: "Acid" },
  { question: "Avogadro number?", options: ["6.02×10^23", "3×10^8", "1.6×10^-19"], answer: "6.02×10^23" },
  { question: "Covalent bond involves?", options: ["Electron sharing", "Electron loss", "Protons"], answer: "Electron sharing" },
  { question: "Atomic number defines?", options: ["Protons", "Neutrons", "Electrons"], answer: "Protons" },
  { question: "Most electronegative element?", options: ["Fluorine", "Oxygen", "Chlorine"], answer: "Fluorine" },
  { question: "Oxidation is?", options: ["Loss of electrons", "Gain of electrons", "Neutral state"], answer: "Loss of electrons" },
  { question: "Catalyst does?", options: ["Speeds reaction", "Stops reaction", "Slows reaction"], answer: "Speeds reaction" },
  { question: "Periodic table arranged by?", options: ["Atomic number", "Mass", "Density"], answer: "Atomic number" },
  { question: "Hydrogen bond is?", options: ["Weak bond", "Metal bond", "Ionic bond"], answer: "Weak bond" },
  { question: "Gas law involves?", options: ["Volume", "Mass", "Density"], answer: "Volume" },
  { question: "Sodium symbol?", options: ["Na", "So", "Sd"], answer: "Na" },
  { question: "Water formula?", options: ["H2O", "CO2", "O2"], answer: "H2O" },
  { question: "pH 7 is?", options: ["Neutral", "Acid", "Base"], answer: "Neutral" },
  { question: "Electron charge?", options: ["Negative", "Positive", "Neutral"], answer: "Negative" },
  { question: "Group 18 elements are?", options: ["Noble gases", "Alkali metals", "Halogens"], answer: "Noble gases" },

  // ================= ECONOMICS (25) =================
  { question: "Inflation means?", options: ["Rising prices", "Falling prices", "Stable prices"], answer: "Rising prices" },
  { question: "Opportunity cost?", options: ["Next best alternative", "Total cost", "Profit"], answer: "Next best alternative" },
  { question: "GDP measures?", options: ["Total output", "Population", "Exports"], answer: "Total output" },
  { question: "Monopoly is?", options: ["Single seller", "Many sellers", "No buyers"], answer: "Single seller" },
  { question: "Demand law?", options: ["Price ↑ demand ↓", "No relation", "Price ↑ demand ↑"], answer: "Price ↑ demand ↓" },
  { question: "Supply law?", options: ["Price ↑ supply ↑", "Price ↑ supply ↓", "No relation"], answer: "Price ↑ supply ↑" },
  { question: "Elastic demand?", options: ["Highly responsive", "Fixed", "Zero change"], answer: "Highly responsive" },
  { question: "Fiscal policy controlled by?", options: ["Government", "Bank", "Market"], answer: "Government" },
  { question: "Scarcity means?", options: ["Limited resources", "Unlimited resources", "No demand"], answer: "Limited resources" },
  { question: "Recession is?", options: ["Economic decline", "Growth", "Boom"], answer: "Economic decline" },
  { question: "Currency inflation reduces?", options: ["Purchasing power", "Population", "Trade"], answer: "Purchasing power" },
  { question: "Interest rate set by?", options: ["Central bank", "Individuals", "Companies"], answer: "Central bank" },
  { question: "Exports mean?", options: ["Goods out", "Goods in", "Local trade"], answer: "Goods out" },
  { question: "Imports mean?", options: ["Goods in", "Goods out", "Savings"], answer: "Goods in" },
  { question: "Market equilibrium?", options: ["Supply = demand", "No supply", "No demand"], answer: "Supply = demand" },

  // ================= HISTORY (25) =================
  { question: "Who unified Germany?", options: ["Bismarck", "Hitler", "Napoleon"], answer: "Bismarck" },
  { question: "WWII ended in?", options: ["1945", "1918", "1939"], answer: "1945" },
  { question: "Cold War was between?", options: ["USA & USSR", "UK & France", "Germany & Italy"], answer: "USA & USSR" },
  { question: "Roman Empire capital?", options: ["Rome", "Athens", "Paris"], answer: "Rome" },
  { question: "Industrial Revolution began in?", options: ["Britain", "USA", "France"], answer: "Britain" },
  { question: "Columbus discovered America in?", options: ["1492", "1588", "1776"], answer: "1492" },
  { question: "French Revolution year?", options: ["1789", "1804", "1776"], answer: "1789" },
  { question: "Berlin Wall fell in?", options: ["1989", "1975", "1995"], answer: "1989" },
  { question: "League of Nations failed due to?", options: ["Lack of power", "Too strong", "War success"], answer: "Lack of power" },
  { question: "WWI started in?", options: ["1914", "1939", "1900"], answer: "1914" },
  { question: "Mahatma Gandhi led?", options: ["India independence", "USA war", "China reform"], answer: "India independence" },
  { question: "Egypt pyramids built for?", options: ["Pharaohs", "Soldiers", "Farmers"], answer: "Pharaohs" },
  { question: "US independence year?", options: ["1776", "1800", "1900"], answer: "1776" },
  { question: "Hitler ruled?", options: ["Germany", "France", "Italy"], answer: "Germany" },
  { question: "Ancient Olympics started in?", options: ["Greece", "Rome", "Egypt"], answer: "Greece" },

  // ================= SPACE (15) =================
  { question: "Largest planet?", options: ["Jupiter", "Earth", "Saturn"], answer: "Jupiter" },
  { question: "Earth galaxy?", options: ["Milky Way", "Andromeda", "Orion"], answer: "Milky Way" },
  { question: "First man on moon?", options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin"], answer: "Neil Armstrong" },
  { question: "NASA stands for?", options: ["National Aeronautics and Space Administration", "Space Agency", "Science Org"], answer: "National Aeronautics and Space Administration" },
  { question: "Black hole is?", options: ["Extreme gravity", "Star", "Planet"], answer: "Extreme gravity" },
  { question: "Red planet?", options: ["Mars", "Venus", "Jupiter"], answer: "Mars" },
  { question: "Sun is a?", options: ["Star", "Planet", "Comet"], answer: "Star" },
  { question: "Earth revolves around?", options: ["Sun", "Moon", "Mars"], answer: "Sun" },
  { question: "Light year measures?", options: ["Distance", "Time", "Speed"], answer: "Distance" },
  { question: "Milky Way type?", options: ["Spiral galaxy", "Star", "Planet"], answer: "Spiral galaxy" },

  // ================= BIOLOGY (15) =================
  { question: "Cell is?", options: ["Basic unit of life", "Organ", "Tissue"], answer: "Basic unit of life" },
  { question: "DNA stands for?", options: ["Deoxyribonucleic acid", "Dynamic nucleic acid", "Double nitrogen acid"], answer: "Deoxyribonucleic acid" },
  { question: "Human heart has?", options: ["4 chambers", "2 chambers", "3 chambers"], answer: "4 chambers" },
  { question: "Photosynthesis occurs in?", options: ["Chloroplast", "Mitochondria", "Nucleus"], answer: "Chloroplast" },
  { question: "Blood cells carry oxygen?", options: ["Red blood cells", "White blood cells", "Platelets"], answer: "Red blood cells" },
  { question: "Largest organ?", options: ["Skin", "Liver", "Heart"], answer: "Skin" },
  { question: "Genetics study of?", options: ["Heredity", "Energy", "Atoms"], answer: "Heredity" },
  { question: "Respiration produces?", options: ["Energy", "Water only", "Heat only"], answer: "Energy" },
  { question: "Plants absorb CO2 during?", options: ["Photosynthesis", "Respiration", "Digestion"], answer: "Photosynthesis" },
  { question: "Human brain controls?", options: ["All body functions", "Only movement", "Only breathing"], answer: "All body functions" },

  // ================= GEOGRAPHY (15) =================
  { question: "Largest ocean?", options: ["Pacific", "Atlantic", "Indian"], answer: "Pacific" },
  { question: "Largest desert?", options: ["Sahara", "Gobi", "Arctic"], answer: "Sahara" },
  { question: "Equator divides?", options: ["North & South", "East & West", "Land & sea"], answer: "North & South" },
  { question: "Highest mountain?", options: ["Everest", "K2", "Kilimanjaro"], answer: "Everest" },
  { question: "Kenya capital?", options: ["Nairobi", "Mombasa", "Kisumu"], answer: "Nairobi" },
  { question: "Africa largest country?", options: ["Algeria", "Nigeria", "Kenya"], answer: "Algeria" },
  { question: "River Nile flows into?", options: ["Mediterranean Sea", "Atlantic", "Indian Ocean"], answer: "Mediterranean Sea" },
  { question: "Rainforest largest?", options: ["Amazon", "Congo", "Sahara"], answer: "Amazon" },
  { question: "Earth surface mostly?", options: ["Water", "Land", "Ice"], answer: "Water" },
  { question: "Longitude lines measure?", options: ["East-West", "North-South", "Height"], answer: "East-West" },

  // ================= COMPUTER SCIENCE (10) =================
  { question: "CPU stands for?", options: ["Central Processing Unit", "Control Program Unit", "Central Power Unit"], answer: "Central Processing Unit" },
  { question: "HTML is used for?", options: ["Web structure", "Database", "AI"], answer: "Web structure" },
  { question: "RAM is?", options: ["Temporary memory", "Permanent storage", "CPU"], answer: "Temporary memory" },
  { question: "Binary system uses?", options: ["0 and 1", "2 and 3", "A and B"], answer: "0 and 1" },
  { question: "Internet is?", options: ["Global network", "Software", "Hardware"], answer: "Global network" },
  { question: "Python is?", options: ["Programming language", "Operating system", "Browser"], answer: "Programming language" },
  { question: "AI means?", options: ["Artificial Intelligence", "Auto Input", "Advanced Internet"], answer: "Artificial Intelligence" },
  { question: "Database stores?", options: ["Data", "Images only", "Code only"], answer: "Data" },
  { question: "HTTP is?", options: ["Web protocol", "Hardware", "Software"], answer: "Web protocol" },
  { question: "Keyboard is?", options: ["Input device", "Output device", "Storage"], answer: "Input device" }

];

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

// ================= START GAME =================
const startGame = () => {
  const shuffled = shuffleArray(questions).map(shuffleOptions);

  setShuffledQuestions(shuffled);
  setGameStarted(true);
  setScore(0);
  setQIndex(0);
  setGameOver(false);
  setFeedback("");

  setMusicEnabled(true);
  setMusicIndex(0);

  setTimeout(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, 100);
};

// ================= QUIT GAME =================
const quitGame = () => {
  setGameStarted(false);
  setGameOver(false);
  setFeedback("");

  setMusicEnabled(false);
  setIsPlaying(false);
  setMusicIndex(0);

  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }
};

// ================= NEXT TRACK =================
const nextTrack = () => {
  setMusicIndex((prev) => (prev + 1) % musicTracks.length);
};

// ================= MUSIC AUTO UPDATE =================
useEffect(() => {
  if (!musicEnabled) return;

  if (audioRef.current) {
    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true);
  }
}, [musicIndex]);

// ================= PLAY / PAUSE =================
const playMusic = () => {
  if (!audioRef.current) return;
  audioRef.current.play();
  setIsPlaying(true);
};

const pauseMusic = () => {
  if (!audioRef.current) return;
  audioRef.current.pause();
  setIsPlaying(false);
};

// ================= HANDLE ANSWER =================
const handleAnswer = (option) => {
  const current = shuffledQuestions[qIndex];

  if (option === current.answer) {
    setScore((prev) => prev + 1);
    setFeedback("✅ Correct!");
  } else {
    setFeedback(`❌ Wrong! Correct answer: ${current.answer}`);
  }

  setTimeout(() => {
    const next = qIndex + 1;

    if (next >= shuffledQuestions.length) {
      setGameOver(true);
      setGameStarted(false);
    } else {
      setQIndex(next);
      setFeedback("");
    }
  }, 1000);
};

  // ================= QUOTES SYSTEM =================
const quotes = [
  // ================= EDUCATION =================
  "Education is the most powerful weapon you can use to change the world. — Nelson Mandela",
  "An investment in knowledge pays the best interest. — Benjamin Franklin",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Intelligence plus character — that is the goal of true education. — Martin Luther King Jr.",
  "The roots of education are bitter, but the fruit is sweet. — Aristotle",

  // ================= LOVE & LIFE =================
  "Love is not about how much you say ‘I love you’, but how much you prove it is true.",
  "Where there is love there is life. — Mahatma Gandhi",
  "True love begins when nothing is expected in return.",
  "Life is short, and it is up to you to make it sweet. — Sarah Louise Delany",
  "The best thing to hold onto in life is each other. — Audrey Hepburn",

  // ================= SOCIETY =================
  "A nation’s strength lies in the unity of its people.",
  "We rise by lifting others. — Robert Ingersoll",
  "Justice cannot be for one side alone, but must be for both. — Eleanor Roosevelt",
  "Society grows great when old men plant trees whose shade they know they shall never sit in.",
  "Freedom is never given; it is won. — A. Philip Randolph",

  // ================= RELIGION / SPIRITUAL =================
  "Faith is taking the first step even when you don’t see the whole staircase. — Martin Luther King Jr.",
  "Do unto others as you would have them do unto you. — The Golden Rule",
  "God does not look at your appearance, He looks at your heart.",
  "Prayer is not asking. It is a longing of the soul. — Mahatma Gandhi",
  "Kindness is a language which the deaf can hear and the blind can see. — Mark Twain",

  // ================= ECONOMICS =================
  "Economy is the art of making the most of life.",
  "Inflation is taxation without legislation. — Milton Friedman",
  "The real price of anything is the amount of life you exchange for it. — Henry David Thoreau",
  "Wealth consists not in having great possessions, but in having few wants. — Epictetus",
  "Time is more valuable than money. You can get more money, but you cannot get more time.",

  // ================= INTELLECT / THINKING =================
  "The mind is not a vessel to be filled but a fire to be ignited. — Plutarch",
  "Knowledge speaks, but wisdom listens. — Jimi Hendrix",
  "The only true wisdom is in knowing you know nothing. — Socrates",
  "An intelligent person solves a problem. A wise person avoids it.",
  "Curiosity is the engine of achievement. — Sir Ken Robinson",

  // ================= SCIENCE / LOGIC =================
  "Science is not only a discipline of reason but also one of romance and passion. — Stephen Hawking",
  "If you can’t explain it simply, you don’t understand it well enough. — Albert Einstein",
  "Everything is theoretically impossible until it is done. — Robert A. Heinlein",
  "The important thing is not to stop questioning. — Albert Einstein",
  "Logic will get you from A to B. Imagination will take you everywhere. — Albert Einstein",

  // ================= MOTIVATION =================
  "Success is not final, failure is not fatal: it is the courage to continue that counts. — Winston Churchill",
  "Do not wait for opportunity. Create it.",
  "Hard work beats talent when talent doesn’t work hard.",
  "Dream big and dare to fail. — Norman Vaughan",
  "The future depends on what you do today. — Mahatma Gandhi",

  // ================= HISTORY / HUMANITY =================
  "Those who do not learn history are doomed to repeat it. — George Santayana",
  "History is written by the victors. — Winston Churchill",
  "A people without the knowledge of their past history is like a tree without roots. — Marcus Garvey",
  "Injustice anywhere is a threat to justice everywhere. — Martin Luther King Jr.",
  "Great men are not born great, they grow great.",
  "Education is the most powerful weapon which you can use to change the world.",
  "An investment in knowledge pays the best interest.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Live as if you were to die tomorrow. Learn as if you were to live forever.",
  "Knowledge is power, but applied knowledge is transformation.",
  "The expert in anything was once a beginner.",
  "Push yourself, because no one else is going to do it for you.",
  "Your future is created by what you do today, not tomorrow.",
  "Dream big. Start small. Act now.",

  // ================= WISDOM / GENERAL LIFE =================
  "Do what is right, not what is easy.",
  "Silence is sometimes the best answer.",
  "Patience is not the ability to wait, but the ability to keep a good attitude while waiting.",
  "Your life becomes better when you become better.",
  "Small steps every day lead to big results over time."
];

const [quoteIndex, setQuoteIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
  }, 5000); // 5 seconds

  return () => clearInterval(interval);
}, []);

  // comments (kept for compatibility)
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const [comments, setComments] = useState(
  JSON.parse(localStorage.getItem("comments")) || []
);

const [email, setEmail] = useState("");


  // ================= UNIVERSITIES DATA =================
  const universities = [
  { name: "University of Tokyo", link: "https://www.u-tokyo.ac.jp", logo: "https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_Tokyo_logo.svg", country: "Japan" },
  { name: "Harvard University", link: "https://www.harvard.edu", logo: "https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg", country: "USA" },
  { name: "University of Cape Town", link: "https://www.uct.ac.za", logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/UCT_logo.svg", country: "South Africa" },
  { name: "ETH Zurich", link: "https://ethz.ch", logo: "https://upload.wikimedia.org/wikipedia/commons/9/99/ETH_Zurich_Logo_black.svg", country: "Switzerland" },
  { name: "University of Melbourne", link: "https://www.unimelb.edu.au", logo: "https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_Melbourne_coat_of_arms.svg", country: "Australia" },
  { name: "Stanford University", link: "https://www.stanford.edu", logo: "https://upload.wikimedia.org/wikipedia/en/b/b7/Stanford_University_seal_2003.svg", country: "USA" },
  { name: "University of Nairobi", link: "https://www.uonbi.ac.ke", logo: "https://upload.wikimedia.org/wikipedia/en/7/7f/University_of_Nairobi_logo.png", country: "Kenya" },
  { name: "University of Toronto", link: "https://www.utoronto.ca", logo: "https://upload.wikimedia.org/wikipedia/en/0/04/Utoronto_coa.svg", country: "Canada" },
  { name: "Tsinghua University", link: "https://www.tsinghua.edu.cn", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Tsinghua_University_Logo.svg", country: "China" },
  { name: "University of Oxford", link: "https://www.ox.ac.uk", logo: "https://upload.wikimedia.org/wikipedia/en/7/7e/Oxford-University-Circlet.svg", country: "UK" },

  { name: "Massachusetts Institute of Technology", link: "https://www.mit.edu", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg", country: "USA" },
  { name: "Imperial College London", link: "https://www.imperial.ac.uk", logo: "https://upload.wikimedia.org/wikipedia/en/3/3a/Imperial_College_London_crest.svg", country: "UK" },
  { name: "University of Sydney", link: "https://www.sydney.edu.au", logo: "https://upload.wikimedia.org/wikipedia/en/9/9e/University_of_Sydney_coat_of_arms.svg", country: "Australia" },
  { name: "Peking University", link: "https://www.pku.edu.cn", logo: "https://upload.wikimedia.org/wikipedia/en/1/1d/Peking_University_seal.svg", country: "China" },
  { name: "University of Chicago", link: "https://www.uchicago.edu", logo: "https://upload.wikimedia.org/wikipedia/en/0/07/University_of_Chicago_seal.svg", country: "USA" },
  { name: "National University of Singapore", link: "https://www.nus.edu.sg", logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/NUS_coat_of_arms.svg", country: "Singapore" },
  { name: "UCL", link: "https://www.ucl.ac.uk", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8b/UCL_logo.svg", country: "UK" },
  { name: "Seoul National University", link: "https://www.snu.ac.kr", logo: "https://upload.wikimedia.org/wikipedia/en/0/08/Seoul_National_University_Logo.svg", country: "South Korea" },
  { name: "California Institute of Technology", link: "https://www.caltech.edu", logo: "https://upload.wikimedia.org/wikipedia/en/e/e0/Caltech_seal.svg", country: "USA" },
  { name: "University of Cambridge", link: "https://www.cam.ac.uk", logo: "https://upload.wikimedia.org/wikipedia/en/8/8a/University_of_Cambridge_coat_of_arms.svg", country: "UK" },

  { name: "Princeton University", link: "https://www.princeton.edu", logo: "https://upload.wikimedia.org/wikipedia/en/1/1b/Princeton_University_Shield.svg", country: "USA" },
  { name: "Yale University", link: "https://www.yale.edu", logo: "https://upload.wikimedia.org/wikipedia/en/4/47/Yale_University_Shield_1.svg", country: "USA" },
  { name: "Columbia University", link: "https://www.columbia.edu", logo: "https://upload.wikimedia.org/wikipedia/en/5/5f/Columbia_University_shield.svg", country: "USA" },
  { name: "University of Edinburgh", link: "https://www.ed.ac.uk", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/University_of_Edinburgh_logo.svg", country: "UK" },
  { name: "King's College London", link: "https://www.kcl.ac.uk", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Kings_College_London_logo.svg", country: "UK" },
  { name: "University of Manchester", link: "https://www.manchester.ac.uk", logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/University_of_Manchester_logo.svg", country: "UK" },
  { name: "University of Hong Kong", link: "https://www.hku.hk", logo: "https://upload.wikimedia.org/wikipedia/en/4/4a/HKU_Logo.svg", country: "Hong Kong" },
  { name: "McGill University", link: "https://www.mcgill.ca", logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/McGill_University_CoA.svg", country: "Canada" },
  { name: "University of British Columbia", link: "https://www.ubc.ca", logo: "https://upload.wikimedia.org/wikipedia/en/5/5f/UBC_CoA.svg", country: "Canada" },
  { name: "Australian National University", link: "https://www.anu.edu.au", logo: "https://upload.wikimedia.org/wikipedia/en/6/65/Australian_National_University_crest.svg", country: "Australia" },

  { name: "University of Queensland", link: "https://www.uq.edu.au", logo: "https://upload.wikimedia.org/wikipedia/en/9/9a/UQ_logo.svg", country: "Australia" },
  { name: "Monash University", link: "https://www.monash.edu", logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Monash_University_logo.svg", country: "Australia" },
  { name: "University of Amsterdam", link: "https://www.uva.nl", logo: "https://upload.wikimedia.org/wikipedia/en/7/7c/Universiteit_van_Amsterdam_logo.svg", country: "Netherlands" },
  { name: "Leiden University", link: "https://www.universiteitleiden.nl", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Leiden_University_logo.svg", country: "Netherlands" },
  { name: "KU Leuven", link: "https://www.kuleuven.be", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/KU_Leuven_logo.svg", country: "Belgium" },
  { name: "University of Copenhagen", link: "https://www.ku.dk", logo: "https://upload.wikimedia.org/wikipedia/en/5/5f/University_of_Copenhagen_logo.svg", country: "Denmark" },
  { name: "Technical University of Munich", link: "https://www.tum.de", logo: "https://upload.wikimedia.org/wikipedia/en/5/5f/TUM_Logo.svg", country: "Germany" },
  { name: "LMU Munich", link: "https://www.lmu.de", logo: "https://upload.wikimedia.org/wikipedia/en/6/6e/LMU_Munich_logo.svg", country: "Germany" },
  { name: "Heidelberg University", link: "https://www.uni-heidelberg.de", logo: "https://upload.wikimedia.org/wikipedia/en/6/6c/Heidelberg_University_logo.svg", country: "Germany" },
  { name: "Sorbonne University", link: "https://www.sorbonne-universite.fr", logo: "https://upload.wikimedia.org/wikipedia/en/6/6c/Sorbonne_University_logo.svg", country: "France" },

  { name: "University of Zurich", link: "https://www.uzh.ch", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/University_of_Zurich_logo.svg", country: "Switzerland" },
  { name: "University of Oslo", link: "https://www.uio.no", logo: "https://upload.wikimedia.org/wikipedia/en/5/5f/University_of_Oslo_logo.svg", country: "Norway" },
  { name: "Stockholm University", link: "https://www.su.se", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/Stockholm_University_logo.svg", country: "Sweden" },
  { name: "University of Helsinki", link: "https://www.helsinki.fi", logo: "https://upload.wikimedia.org/wikipedia/en/5/5c/University_of_Helsinki_logo.svg", country: "Finland" },
  { name: "University of Barcelona", link: "https://www.ub.edu", logo: "https://upload.wikimedia.org/wikipedia/en/6/6c/University_of_Barcelona_logo.svg", country: "Spain" },
  { name: "University of Madrid", link: "https://www.ucm.es", logo: "https://upload.wikimedia.org/wikipedia/en/5/5f/UCM_logo.svg", country: "Spain" },
  { name: "University of Milan", link: "https://www.unimi.it", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/University_of_Milan_logo.svg", country: "Italy" },
  { name: "Sapienza University of Rome", link: "https://www.uniroma1.it", logo: "https://upload.wikimedia.org/wikipedia/en/5/5f/Sapienza_logo.svg", country: "Italy" },
  { name: "University of São Paulo", link: "https://www.usp.br", logo: "https://upload.wikimedia.org/wikipedia/en/6/6c/USP_logo.svg", country: "Brazil" },
  { name: "University of Buenos Aires", link: "https://www.uba.ar", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/UBA_logo.svg", country: "Argentina" },

  { name: "University of Johannesburg", link: "https://www.uj.ac.za", logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/UJ_logo.svg", country: "South Africa" },
  { name: "Makerere University", link: "https://www.mak.ac.ug", logo: "https://upload.wikimedia.org/wikipedia/en/6/6c/Makerere_logo.svg", country: "Uganda" },
  { name: "Cairo University", link: "https://cu.edu.eg", logo: "https://upload.wikimedia.org/wikipedia/en/5/5f/Cairo_University_logo.svg", country: "Egypt" },
  { name: "University of Ghana", link: "https://www.ug.edu.gh", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/University_of_Ghana_logo.svg", country: "Ghana" },
  { name: "University of Lagos", link: "https://www.unilag.edu.ng", logo: "https://upload.wikimedia.org/wikipedia/en/6/6c/University_of_Lagos_logo.svg", country: "Nigeria" },
  { name: "University of Ibadan", link: "https://www.ui.edu.ng", logo: "https://upload.wikimedia.org/wikipedia/en/5/5f/University_of_Ibadan_logo.svg", country: "Nigeria" },
  { name: "American University of Beirut", link: "https://www.aub.edu.lb", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/AUB_logo.svg", country: "Lebanon" },
  { name: "University of Delhi", link: "https://www.du.ac.in", logo: "https://upload.wikimedia.org/wikipedia/en/6/6c/University_of_Delhi_logo.svg", country: "India" },
  { name: "Indian Institute of Technology Bombay", link: "https://www.iitb.ac.in", logo: "https://upload.wikimedia.org/wikipedia/en/5/5f/IIT_Bombay_logo.svg", country: "India" },
  { name: "University of Indonesia", link: "https://www.ui.ac.id", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/University_of_Indonesia_logo.svg", country: "Indonesia" }
];

 

  // ================= ROTATE UNIVERSITIES =================
  useEffect(() => {
    const uniTimer = setInterval(() => {
      setUniIndex((p) => (p + 3) % universities.length);
    }, 4000);

    return () => clearInterval(uniTimer);
  }, []);

  // ================= LOAD FROM ADMIN =================
  useEffect(() => {
  fetchMaterials();
}, []);
   const fetchMaterials = async () => {
  const { data, error } = await supabase
    .from("materials")
    .select("*")
    .order("created_at", { ascending: false });

  if (!error) {
    setMaterials(data);
  } else {
    console.log(error);
  }
};

  // ================= LOGIN =================
  const handleLogin = () => {
    if (user === "admin" && pass === "1234") {
      navigate("/admin-dashboard");
    } else {
      alert("Wrong credentials");
    }
  };

  // ================= OPEN FILE (WORKS WITH ADMIN URL) =================
 const openFile = (url) => {
  setViewer(url + "#toolbar=0");
};
  // ================= DOWNLOAD (FORCED WORKING) =================
  const downloadFile = async (url, title) => {
  const response = await fetch(url);
  const blob = await response.blob();

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = title || "file.pdf";
  link.click();
};

// ================= SHARE FILE =================
const shareFile = async (file) => {
  if (!file?.id) {
    alert("Missing file ID");
    return;
  }

  const url = `${window.location.origin}/notes/${file.id}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: file.title,
        text: `📚 ${file.title} - Global Study Hub`,
        url
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  } catch (err) {
    console.log(err);
  }
};

// ================= CATEGORIES =================
const categories = [
  "MATHEMATICS AND PURE SCIENCES",
  "ENGINEERING",
  "ICT",
  "TECHNICAL",
  "HUMAN RESOURCE",
  "HEALTH SCIENCES"
];

  // ================= FILTER =================
  const baseList = activeCategory
  ? materials.filter(m => m.category === activeCategory)
  : materials;

const filtered = filteredMaterials.length > 0
  ? filteredMaterials
  : baseList;

  

  const handleSearchSubmit = () => {
  if (!search.trim()) {
    setSearchResults([]);
    return;
  }

  const results = materials.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  setSearchResults(results);
};

  useEffect(() => {
  const results = materials.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  setFilteredMaterials(results);
}, [search]);

  const handleSearchClick = (file) => {
    openFile(file);
    setSearch("");
  };

  const visibleUniversities = showAllUniversities
  ? universities
  : [
      universities[uniIndex % universities.length],
      universities[(uniIndex + 1) % universities.length],
      universities[(uniIndex + 2) % universities.length]
    ];

  // ================= CATEGORY SCROLL =================
 const handleCategoryClick = (cat) => {
  setActiveCategory(cat);
  setExpandedCategory(null);

  setTimeout(() => {
    const el = document.getElementById(cat);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 50);
};


  // ================= LOAD COMMENTS =================
useEffect(() => {
  fetchComments();
}, []);

const fetchComments = async () => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .order("created_at", { ascending: false });

  if (!error && data) {
    setComments(data);
  } else {
    setComments([]);
    console.log(error);
  }
};

// ================= ADD COMMENT =================
const addComment = async () => {
  if (!text) return;

  await supabase.from("comments").insert([
    {
      name: name || "Anonymous",
      email,
      text,
      time: new Date().toLocaleString()
    }
  ]);

  setText("");
  setName("");
  setEmail("");
  fetchComments();
};

// ================= ADD REPLY (LOCAL ONLY) =================
const addReply = (commentId, reply) => {
  if (!reply) return;

  const updated = comments.map(c => {
    if (c.id === commentId) {
      return {
        ...c,
        replies: [
          ...(c.replies || []),
          {
            id: Date.now(),
            text: reply,
            name: name || "Anonymous",
            time: new Date().toLocaleString()
          }
        ]
      };
    }
    return c;
  });

  setComments(updated);
};

// ================= DELETE COMMENT =================
const deleteComment = async (id) => {
  await supabase.from("comments").delete().eq("id", id);
  fetchComments();
};

// ================= DELETE REPLY =================
const deleteReply = (commentId, replyId) => {
  const updated = comments.map(c => {
    if (c.id === commentId) {
      return {
        ...c,
        replies: (c.replies || []).filter(r => r.id !== replyId)
      };
    }
    return c;
  });

  setComments(updated);
};


const sendAI = async () => {
  if (!aiInput.trim()) return;

  const userMessage = aiInput;

  setAiChat([...aiChat, { role: "You", text: userMessage }]);
  setAiInput("");

  const res = await fetch("http://localhost:5000/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await res.json();

  setAiChat(prev => [
    ...prev,
    { role: "AI", text: data.reply }
  ]);
};






  // ================= UI =================
  return (
    <div>

      {/* ================= STUDOCU LAYOUT START ================= */}
<div style={{ display: "flex", minHeight: "100vh", background: "#f5f6f8" }}>

  {/* ================= LEFT SIDEBAR ================= */}
  <aside style={{
    width: "260px",
    background: "white",
    borderRight: "1px solid #eee",
    padding: "20px",
    position: "sticky",
    top: 0,
    height: "100vh"
  }}>

    <div style={{ textAlign: "center", marginBottom: 20 }}>
      <img src="/logo.jpeg" style={{ width: 50 }} />
      <h3>GLOBAL STUDY HUB</h3>
      <p style={{ fontSize: 12, color: "gray" }}>Guest user</p>
    </div>

    <button
  onClick={() => {
  document.getElementById("upload-section")?.scrollIntoView({
    behavior: "smooth"
  });
}}
  style={{
    width: "100%",
    padding: 10,
    background: "#1e90ff",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  }}
>
  + New Upload
</button>

    <div style={{ marginTop: 30, fontSize: 14 }}>
      <p>🏠 Home</p>
      <p>📚 My Library</p>
      <p>🧠 AI Notes</p>
      <p
  style={{ cursor: "pointer" }}
  onClick={() => setAiOpen(true)}
>
  💬 Ask AI
</p>
      <p>🧪 AI Quiz</p>
      <p>🕘 Recent</p>
    </div>

    {aiOpen && (
  <div style={{
    marginTop: 20,
    padding: 10,
    background: "#f5f6f8",
    borderRadius: 10,
    height: "300px",
    display: "flex",
    flexDirection: "column"
  }}>

    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <b>AI Tutor</b>
      <button onClick={() => setAiOpen(false)}>X</button>
    </div>

    {/* CHAT MESSAGES */}
    <div style={{
      flex: 1,
      overflowY: "auto",
      marginTop: 10,
      fontSize: 12
    }}>
      {aiChat.map((msg, i) => (
        <div key={i}>
          <b>{msg.role}:</b> {msg.text}
        </div>
      ))}
    </div>

    {/* INPUT */}
    <input
      value={aiInput}
      onChange={(e) => setAiInput(e.target.value)}
      placeholder="Ask something..."
      style={{ marginTop: 10, padding: 5 }}
    />

    <button onClick={sendAI}>
      Send
    </button>

  </div>
)}




    {/* ================= QUOTES INSIDE SIDEBAR ================= */}
<div style={{
  marginTop: 25,
  padding: 20,
  background: "#f5f6f8",
  borderRadius: 10,
  fontSize: 15,
  color: "#0710ca",
  lineHeight: "1.5",
  borderLeft: "3px solid #1e90ff"
}}>
  <b style={{ color: "#d30d0d" }}>💡 Daily Quote</b>
  <p style={{ marginTop: 8 }}>
    {quotes[quoteIndex]}
  </p>
</div>

  </aside>

  {/* ================= MAIN CONTENT ================= */}
  <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>

  {/* TOP SEARCH + FILTER BAR */}
  <div style={{
    background: "white",
    padding: "12px 20px",
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 100
  }}>

    <div style={{ display: "flex", flex: 1, gap: 10, alignItems: "center" }}>

  <input
    placeholder="Search by keyword..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      flex: 1,
      padding: 10,
      borderRadius: 20,
      border: "1px solid #ddd"
    }}
  />

  <button
    onClick={handleSearchSubmit}
    style={{
      padding: "10px 15px",
      border: "none",
      background: "#1e90ff",
      color: "white",
      borderRadius: 20,
      cursor: "pointer"
    }}
  >
    Search
  </button>

  </div>

  {searchResults.length > 0 && (
  <div style={{
    position: "absolute",
    background: "white",
    width: "300px",
    maxHeight: "250px",
    overflowY: "auto",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    zIndex: 9999
  }}>

    {searchResults.map((item, i) => (
      <div
        key={i}
        onClick={() => {
          handleCategoryClick(item.category); // scroll to category
          setSearchResults([]); // close dropdown
          setSearch("");
        }}
        style={{
          padding: "10px",
          cursor: "pointer",
          borderBottom: "1px solid #eee"
        }}
      >
        <b>{item.title}</b>
        <div style={{ fontSize: 12, color: "gray" }}>
          {item.category}
        </div>
      </div>
    ))}

  </div>
)}


  <div style={{ position: "relative", display: "inline-block" }}>
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    style={{
      marginLeft: "10px",
      background: "transparent",
      border: "none",
      fontSize: "22px",
      cursor: "pointer"
    }}
  >
    ⋮
  </button>

  {menuOpen && (
    <div style={{
      position: "absolute",
      right: 0,
      top: "30px",
      background: "white",
      border: "1px solid #ddd",
      borderRadius: "6px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      zIndex: 9999,
      width: "140px"
    }}>

      <button
        onClick={() => {
          setLogin(true);
          setMenuOpen(false);
        }}
        style={{
          width: "100%",
          padding: "10px",
          border: "none",
          background: "none",
          cursor: "pointer",
          textAlign: "left"
        }}
      >
        🔐 Admin Login
      </button>

    </div>
  )}
</div>


  
    

    {/* CATEGORY FILTER */}
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => handleCategoryClick(c)}
          style={{
            padding: "8px 12px",
            borderRadius: "20px",
            border: "1px solid #ddd",
            background: activeCategory === c ? "#1e90ff" : "white",
            color: activeCategory === c ? "white" : "black",
            cursor: "pointer"
          }}
        >
          {c}
        </button>
      ))}
    </div>
  </div>

  {/* ================= BIG EXPLORE BANNER ================= */}
<div
  style={{
    width: "100%",
    padding: "40px 20px",
    background: "linear-gradient(135deg, #1e90ff, #00d4ff)",
    color: "white",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }}
>
  <h1
    style={{
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "10px",
      letterSpacing: "1px"
    }}
  >
    EXPLORE DIFFERENT STUDY MATERIALS
  </h1>

  <p
    style={{
      fontSize: "14px",
      opacity: 0.9,
      maxWidth: "600px"
    }}
  >
    Access study materials across science, engineering, ICT, health, and more
  </p>
</div>

{/* ================= CONTENT AREA ================= */}
<div style={{ flex: 1, overflowY: "auto" }}>

  {/* ================= YOUR MATERIALS ================= */}
  {categories.map((cat) => {
    const items = filtered.filter((m) => m.category === cat);
    const isOpen = expandedCategory === cat;
    const visibleItems = isOpen ? items : items.slice(0, 5);

    return (
      <section
        id={cat}
        key={cat}
        style={{ padding: "20px" }}
      >
        <h2 style={{ color: "#1e90ff" }}>{cat}</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "15px"
          }}
        >
          {visibleItems.map((m) => (
            <div
              key={m.id}
              style={{
                background: "white",
                borderRadius: 12,
                padding: 15
              }}
            >
              {/* TITLE */}
              <h3>{m.title}</h3>

              {/* ================= ACTION BUTTONS ================= */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "10px",
                  flexWrap: "wrap"
                }}
              >
                <button
                  onClick={() => openFile(m.file_url)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: "#1e90ff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  📖 Read
                </button>

                <button
                  onClick={() =>
                    downloadFile(m.file_url, m.title)
                  }
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  ⬇ Download
                </button>

                <button
                  onClick={() => shareFile(m)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: "#6f42c1",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  🔗 Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= VIEW MORE ================= */}
        {items.length > 5 && (
          <button
            onClick={() =>
              setExpandedCategory(isOpen ? null : cat)
            }
            style={{
              marginTop: "15px",
              padding: "8px 12px",
              border: "none",
              background: "#1e90ff",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            {isOpen
              ? "Show Less"
              : `View More (${items.length - 5})`}
          </button>
        )}
      </section>
    );
  })}

</div>

</main>
</div> {/* CLOSES FLEX LAYOUT WRAPPER */}
      

      {/* ================= TRY YOUR INTELLIGENCE GAME ================= */}
<div style={{
  marginTop: 40,
  padding: "60px 20px",
  background: "linear-gradient(135deg, #141e30, #243b55)",
  color: "white",
  textAlign: "center"
}}>

  <h1 style={{ fontSize: 40, color: "#00d4ff" }}>
    🧠 TRY YOUR INTELLIGENCE
  </h1>

  <p style={{ maxWidth: 700, margin: "auto", opacity: 0.8 }}>
    Relax your mind, challenge your brain, and test your knowledge across science, history, space, technology, politics, nature, and human life. Answer 5 correct questions and prove you are a GENIUS with high IQ.
  </p>

  {/* START BUTTON */}
  {!gameStarted && !gameOver && (
    <button onClick={startGame} style={{
      marginTop: 20,
      padding: "12px 20px",
      fontSize: 18,
      background: "#00d4ff",
      border: "none",
      cursor: "pointer"
    }}>
      Start Challenge
    </button>
  )}

  {/* GAME AREA */}
  {gameStarted && (
    <div style={{
      marginTop: 30,
      background: "rgba(255,255,255,0.1)",
      padding: 30,
      borderRadius: 20,
      maxWidth: 700,
      marginLeft: "auto",
      marginRight: "auto"
    }}>

      <h2>{shuffledQuestions[qIndex]?.question}</h2>

{shuffledQuestions[qIndex]?.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => handleAnswer(opt)}
          style={{
            display: "block",
            width: "100%",
            margin: 10,
            padding: 10,
            background: "#1e90ff",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          {opt}
        </button>
      ))}

      <p style={{ marginTop: 10 }}>{feedback}</p>

      <p>Score: {score}</p>

      <button onClick={quitGame} style={{
        marginTop: 10,
        background: "red",
        color: "white",
        padding: 10,
        border: "none"
      }}>
        Quit
      </button>

    </div>
  )}

  {/* GAME OVER */}
  {gameOver && (
    <div style={{ marginTop: 30 }}>
      <h2>Game Over 🎯</h2>
      <p>Your Score: {score}</p>

      {score >= 5 && (
        <h3 style={{ color: "#00ff88" }}>
          🏆 Genius Level IQ Achieved!
        </h3>
      )}

      <button onClick={startGame} style={{
        padding: 10,
        background: "#00d4ff",
        border: "none"
      }}>
        Try Again
      </button>
    </div>
  )}

     {/* ================= MUSIC CONTROLS ================= */}



      {musicEnabled && (
  <div style={{
    marginTop: 20,
    display: "flex",
    gap: 10,
    justifyContent: "center",
    alignItems: "center"
  }}>

    {/* SONG NAME */}
    <div style={{ color: "#00d4ff", marginRight: 10 }}>
      🎵 {musicTracks[musicIndex].name}
    </div>

    {/* PLAY / PAUSE */}
    <button
      onClick={() => {
        if (!audioRef.current) return;

        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }}
    >
      {isPlaying ? "⏸ Pause" : "▶ Play"}
    </button>

    {/* NEXT */}
    <button
      onClick={() => {
        setMusicIndex((prev) => (prev + 1) % musicTracks.length);
      }}
    >
      ⏭ Next
    </button>

    {/* SELECT MUSIC */}
    <select
      value={musicIndex}
      onChange={(e) => setMusicIndex(Number(e.target.value))}
    >
      {musicTracks.map((track, i) => (
        <option key={i} value={i}>
          {track.name}
        </option>
      ))}
    </select>

  </div>
)}

</div>

      {/* ================= STUDENT UPLOAD BAR ================= */}
<div id="upload-section" style={{
  background: "linear-gradient(90deg, #141e30, #243b55)",
  padding: "40px 20px",
  color: "white",
  textAlign: "center",
  borderRadius: 10
}}>

  <h2 style={{ color: "#00d4ff" }}>
    🌍 Share Study Materials
  </h2>

  <p style={{ maxWidth: 700, margin: "auto", opacity: 0.8 }}>
    Upload notes, PDFs, and learning materials to help other students.
  </p>

  {/* INPUTS */}
  <div style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 20
  }}>

    {/* TITLE */}
    <input
      placeholder="Material Title"
      value={uploadTitle}
      onChange={(e) => setUploadTitle(e.target.value)}
      style={{ padding: 10, width: 200 }}
    />

    {/* CATEGORY */}
    <select
      value={uploadCategory}
      onChange={(e) => setUploadCategory(e.target.value)}
      style={{ padding: 10 }}
    >
      <option value="">Select Category</option>
      {categories.map(c => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>

    {/* FILE */}
    <input
      type="file"
      onChange={(e) => setUploadFile(e.target.files[0])}
      style={{ padding: 10 }}
    />

    {/* UPLOAD BUTTON */}
    <button
     onClick={async () => {
  if (!uploadTitle || !uploadCategory || !uploadFile) return;

  const fileName = `${Date.now()}-${uploadFile.name}`;

  // 1. Upload file to Supabase Storage
  const { error: uploadError } = await supabase
    .storage
    .from("materials-files")
    .upload(fileName, uploadFile);

  if (uploadError) {
    console.log(uploadError);
    return;
  }

  // 2. Get public URL
  const { data } = supabase
    .storage
    .from("materials-files")
    .getPublicUrl(fileName);

  // 3. Save to database
  const { error: dbError } = await supabase
    .from("materials")
    .insert([
      {
        title: uploadTitle,
        category: uploadCategory,
        file_url: data.publicUrl
      }
    ]);

  if (dbError) {
    console.log(dbError);
    return;
  }

  // 4. Refresh UI
  fetchMaterials();

  // 5. Reset inputs
  setUploadTitle("");
  setUploadCategory("");
  setUploadFile(null);
}} 
      style={{
        background: "#00d4ff",
        color: "black",
        padding: "10px 20px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      SHARE MATERIAL
    </button>

  </div>
</div>

      


      {/* ================= UNIVERSITIES DISCOVERY BAR ================= */}
<div style={{
  background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
  padding: "25px",
  marginTop: "30px",
  color: "white",
  textAlign: "center"
}}>

  <h2 style={{
    marginBottom: "15px",
    color: "#00d4ff",
    letterSpacing: "1px"
  }}>
    🌍 EXPLORE UNIVERSITIES ACROSS THE WORLD WHERE YOU CAN STUDY
  </h2>

  <p style={{ fontSize: "14px", opacity: 0.8 }}>
    Apply and study from top institutions globally — click to visit official sites
  </p>

  {/* ================= UNIVERSITY GRID ================= */}
  <div style={{
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  }}>

    {(showAllUniversities
      ? universities
      : [
          universities[uniIndex % universities.length],
          universities[(uniIndex + 1) % universities.length],
          universities[(uniIndex + 2) % universities.length]
        ]
    ).map((uni, i) => (
      <a
        key={i}
        href={uni.link}
        target="_blank"
        rel="noreferrer"
        style={{
          background: "white",
          color: "black",
          padding: "20px",
          borderRadius: "12px",
          width: "250px",
          textDecoration: "none",
          boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
          transition: "0.3s"
        }}
      >

        <img
          src={uni.logo}
          style={{
            width: "60px",
            height: "60px",
            objectFit: "contain"
          }}
        />

        <h3 style={{ margin: "10px 0" }}>
          {uni.name}
        </h3>

        <p style={{ color: "gray" }}>
          {uni.country}
        </p>

        <button style={{
          marginTop: "10px",
          padding: "8px 12px",
          background: "#1e90ff",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}>
          Visit & Apply
        </button>

      </a>
    ))}

  </div>

  {/* ================= VIEW MORE BUTTON ================= */}
  <button
    onClick={() => setShowAllUniversities(!showAllUniversities)}
    style={{
      marginTop: "25px",
      padding: "10px 20px",
      background: "#00d4ff",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    {showAllUniversities ? "Show Less" : "View All Universities"}
  </button>

</div>

      {/* ================= COMMENTS SECTION ================= */}
<div style={{
  background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  padding: "60px 20px",
  color: "white"
}}>

  <h2 style={{
    textAlign: "center",
    color: "#00d4ff",
    marginBottom: 10
  }}>
    💬 SHARE YOUR THOUGHTS WITH THE COMMUNITY
  </h2>

  <p style={{
    textAlign: "center",
    maxWidth: 700,
    margin: "auto",
    marginBottom: 30,
    opacity: 0.8
  }}>
    Join the conversation. Share ideas, feedback, and learning experiences with students across the world.
  </p>

  {/* INPUT FORM */}
  <div style={{
    maxWidth: 700,
    margin: "auto",
    background: "rgba(255,255,255,0.05)",
    padding: 20,
    borderRadius: 10
  }}>

    <input
      placeholder="Your Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      style={{ width: "100%", padding: 10, marginBottom: 10 }}
    />

    <input
      placeholder="Email (optional)"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      style={{ width: "100%", padding: 10, marginBottom: 10 }}
    />

    <textarea
      placeholder="Write your comment..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      style={{ width: "100%", padding: 10, height: 120 }}
    />

    <button onClick={addComment}>
      SEND COMMENT
    </button>

  </div>

  {/* COMMENTS DISPLAY */}
  <div style={{
    maxWidth: 800,
    margin: "40px auto 0"
  }}>

    {comments.length === 0 ? (
      <p style={{ textAlign: "center", opacity: 0.7 }}>
        No comments yet. Be the first to share!
      </p>
    ) : (
      (showAllComments ? comments : comments.slice(0, 5)).map(c => (
        <div key={c.id} style={{
          background: "white",
          color: "black",
          padding: 15,
          borderRadius: 8,
          marginBottom: 15,
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
        }}>

          {/* HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <b>{c.name}</b>
            <small>{c.time}</small>
          </div>

          <p style={{ marginTop: 10 }}>{c.text}</p>

          {c.email && (
            <small style={{ color: "gray" }}>📧 {c.email}</small>
          )}

          {/* DELETE COMMENT (ONLY OWNER) */}
          {c.name === name && (
            <button
              onClick={() => deleteComment(c.id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                marginTop: 10,
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          )}

          {/* ================= REPLIES ================= */}
          <div style={{ marginTop: 15, paddingLeft: 20 }}>

            {c.replies?.map(r => (
              <div key={r.id} style={{
                background: "#f1f1f1",
                padding: 8,
                marginTop: 5,
                borderRadius: 5,
                position: "relative"
              }}>

                <b>{r.name}</b>
                <p style={{ margin: 0 }}>{r.text}</p>
                <small>{r.time}</small>

                {/* DELETE REPLY (ONLY OWNER) */}
                {r.name === name && (
                  <button
                    onClick={() => deleteReply(c.id, r.id)}
                    style={{
                      position: "absolute",
                      right: 5,
                      top: 5,
                      background: "red",
                      color: "white",
                      border: "none",
                      fontSize: 10,
                      cursor: "pointer"
                    }}
                  >
                    X
                  </button>
                )}

              </div>
            ))}

            {/* REPLY INPUT */}
            <div style={{ marginTop: 10 }}>
              <input
                placeholder="Write a reply..."
                value={replyText[c.id] || ""}
                onChange={(e) =>
                  setReplyText({
                    ...replyText,
                    [c.id]: e.target.value
                  })
                }
                style={{ padding: 5, width: "70%" }}
              />

              <button
                onClick={() => {
                  addReply(c.id, replyText[c.id]);
                  setReplyText({
                    ...replyText,
                    [c.id]: ""
                  });
                }}
                style={{
                  marginLeft: 5,
                  padding: 5,
                  background: "#00d4ff",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Reply
              </button>
            </div>

          </div>

        </div>
      ))
    )}

  </div>

  {/* SEE MORE BUTTON */}
  {comments.length > 5 && !showAllComments && (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <button
        onClick={() => setShowAllComments(true)}
        style={{
          padding: "10px 15px",
          background: "#00d4ff",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        See More Comments ({comments.length - 5})
      </button>
    </div>
  )}

</div>
      
      {/* ================= STUDOCU LAYOUT END ================= */}


      {/* ================= PROFESSIONAL FOOTER ================= */}
<Footer />
      
      {/* ================= VIEWER ================= */}
      {viewer && (
  <div style={{
    position: "fixed",
    inset: 0,
    background: "black",
    display: "flex",
    flexDirection: "column",
    zIndex: 999999
  }}>

    <div style={{
      background: "#1e90ff",
      color: "white",
      padding: 10,
      display: "flex",
      justifyContent: "space-between"
    }}>
      <span>PDF Viewer</span>

      <button onClick={() => setViewer(null)}>
        Close
      </button>
    </div>

    <iframe
      src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(viewer)}`}
      style={{
        flex: 1,
        width: "100%",
        border: "none",
        background: "white"
      }}
    />

  </div>
)}

      {musicEnabled && (
  <audio
    ref={audioRef}
    src={musicTracks[musicIndex].src}
  />
)}

      {/* ================= LOGIN ================= */}
{login && (
  <div style={{
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  }}>
    
    <div style={{
      background: "white",
      padding: "25px",
      borderRadius: "10px",
      width: "300px",
      position: "relative",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
    }}>

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setLogin(false)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
          padding: "4px 8px",
          borderRadius: "4px"
        }}
      >
        X
      </button>

      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
        Admin Login
      </h2>

      {/* USERNAME */}
      <input
        placeholder="Username"
        onChange={(e) => setUser(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPass(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}
      />

      {/* LOGIN BUTTON */}
      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          background: "#1e90ff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Login
      </button>

    </div>
  </div>
)}

</div>
  );
}