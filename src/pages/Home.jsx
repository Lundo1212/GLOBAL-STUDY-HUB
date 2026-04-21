import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

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
  const [menu, setMenu] = useState(false);
  const [login, setLogin] = useState(false);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [materials, setMaterials] = useState([]);
  const [search, setSearch] = useState("");
  const [viewer, setViewer] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");
  const [uniIndex, setUniIndex] = useState(0);
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

// ================= MUSIC TRACKS =================
const musicTracks = [
  { name: "Calm Focus", src: "/music/music1.mp3" },
  { name: "Brain Boost", src: "/music/song2.mp3" },
  { name: "Deep Thinking", src: "/music/song3.mp3" }
];

// ================= QUESTIONS =================
const questions = [

  // ================= PHYSICS =================
  { question: "What does E=mc² represent?", options: ["Energy-mass equivalence", "Electric force", "Magnetic field"], answer: "Energy-mass equivalence" },
  { question: "Which particle has no charge?", options: ["Electron", "Proton", "Neutron"], answer: "Neutron" },
  { question: "Unit of force?", options: ["Newton", "Joule", "Watt"], answer: "Newton" },
  { question: "Speed of light?", options: ["3×10^8 m/s", "3×10^6 m/s", "3×10^5 m/s"], answer: "3×10^8 m/s" },
  { question: "Momentum formula?", options: ["m×v", "F×d", "m×a"], answer: "m×v" },
  { question: "Unit of power?", options: ["Watt", "Volt", "Ampere"], answer: "Watt" },
  { question: "Acceleration due to gravity?", options: ["9.8 m/s²", "10 m/s", "8 m/s²"], answer: "9.8 m/s²" },
  { question: "Wave-particle duality applies to?", options: ["Light", "Sound", "Heat"], answer: "Light" },
  { question: "SI unit of energy?", options: ["Joule", "Newton", "Watt"], answer: "Joule" },
  { question: "First law of motion?", options: ["Inertia", "F=ma", "Action-reaction"], answer: "Inertia" },

  // ================= CHEMISTRY =================
  { question: "pH < 7 means?", options: ["Acid", "Base", "Neutral"], answer: "Acid" },
  { question: "Avogadro number?", options: ["6.02×10^23", "3×10^8", "1.6×10^-19"], answer: "6.02×10^23" },
  { question: "Electron sharing bond?", options: ["Covalent", "Ionic", "Metallic"], answer: "Covalent" },
  { question: "Atomic number defines?", options: ["Protons", "Neutrons", "Electrons"], answer: "Protons" },
  { question: "Strongest intermolecular force?", options: ["Hydrogen bond", "Van der Waals", "Dipole"], answer: "Hydrogen bond" },
  { question: "Oxidation is?", options: ["Loss of electrons", "Gain of electrons", "Neutral"], answer: "Loss of electrons" },
  { question: "Catalyst does?", options: ["Speeds reaction", "Stops reaction", "Slows reaction"], answer: "Speeds reaction" },
  { question: "Periodic table arranged by?", options: ["Atomic number", "Mass", "Density"], answer: "Atomic number" },
  { question: "Most electronegative element?", options: ["Fluorine", "Oxygen", "Chlorine"], answer: "Fluorine" },
  { question: "Gas law involves temperature, pressure and?", options: ["Volume", "Mass", "Energy"], answer: "Volume" },

  // ================= ECONOMICS =================
  { question: "Inflation means?", options: ["Rising prices", "Falling prices", "Stable"], answer: "Rising prices" },
  { question: "Opportunity cost?", options: ["Next best alternative", "Total cost", "Profit"], answer: "Next best alternative" },
  { question: "GDP measures?", options: ["Total output", "Population", "Exports"], answer: "Total output" },
  { question: "Monopoly?", options: ["Single seller", "Many sellers", "No seller"], answer: "Single seller" },
  { question: "Demand law?", options: ["Price ↑ demand ↓", "Price ↑ demand ↑", "No relation"], answer: "Price ↑ demand ↓" },
  { question: "Supply law?", options: ["Price ↑ supply ↑", "Price ↑ supply ↓", "No relation"], answer: "Price ↑ supply ↑" },
  { question: "Elastic demand?", options: ["Highly responsive", "Fixed", "Zero"], answer: "Highly responsive" },
  { question: "Fiscal policy controlled by?", options: ["Government", "Bank", "Market"], answer: "Government" },
  { question: "Scarcity means?", options: ["Limited resources", "Unlimited", "No demand"], answer: "Limited resources" },
  { question: "Recession means?", options: ["Economic decline", "Growth", "Stability"], answer: "Economic decline" },

  // ================= HISTORY =================
  { question: "Who unified Germany?", options: ["Bismarck", "Hitler", "Napoleon"], answer: "Bismarck" },
  { question: "Napoleon was from?", options: ["France", "Italy", "Spain"], answer: "France" },
  { question: "WWII ended in?", options: ["1945", "1939", "1918"], answer: "1945" },
  { question: "Cold War was between?", options: ["USA & USSR", "UK & Germany", "France & Italy"], answer: "USA & USSR" },
  { question: "Roman Empire capital?", options: ["Rome", "Athens", "Paris"], answer: "Rome" },
  { question: "Industrial Revolution began in?", options: ["Britain", "USA", "Germany"], answer: "Britain" },
  { question: "Who discovered America?", options: ["Columbus", "Cook", "Magellan"], answer: "Columbus" },
  { question: "French Revolution year?", options: ["1789", "1776", "1804"], answer: "1789" },
  { question: "Berlin Wall fell in?", options: ["1989", "1975", "1995"], answer: "1989" },
  { question: "League of Nations failed due to?", options: ["Lack of power", "Too strong", "War success"], answer: "Lack of power" },

  // ================= POLITICS =================
  { question: "Democracy means?", options: ["Rule by people", "Rule by king", "Rule by army"], answer: "Rule by people" },
  { question: "UN headquarters?", options: ["New York", "London", "Paris"], answer: "New York" },
  { question: "Constitution defines?", options: ["Laws & governance", "Culture", "Religion"], answer: "Laws & governance" },
  { question: "Veto power is?", options: ["Reject decision", "Accept law", "Create law"], answer: "Reject decision" },
  { question: "Separation of powers?", options: ["Branches of govt", "Army rule", "Single authority"], answer: "Branches of govt" },

  // ================= SPACE =================
  { question: "Largest planet?", options: ["Jupiter", "Saturn", "Earth"], answer: "Jupiter" },
  { question: "Earth's galaxy?", options: ["Milky Way", "Andromeda", "Orion"], answer: "Milky Way" },
  { question: "First man on moon?", options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin"], answer: "Neil Armstrong" },
  { question: "NASA stands for?", options: ["National Aeronautics and Space Administration", "Space Agency", "Science Org"], answer: "National Aeronautics and Space Administration" },
  { question: "Black hole is?", options: ["Extreme gravity", "Star", "Planet"], answer: "Extreme gravity" },

  // ================= CULTURE / MUSIC =================
  { question: "Reggae originated in?", options: ["Jamaica", "USA", "Brazil"], answer: "Jamaica" },
  { question: "King of Pop?", options: ["Michael Jackson", "Elvis", "Drake"], answer: "Michael Jackson" },
  { question: "Afrobeats origin?", options: ["West Africa", "USA", "Europe"], answer: "West Africa" },
  { question: "Film industry of India?", options: ["Bollywood", "Hollywood", "Nollywood"], answer: "Bollywood" },
  { question: "Nollywood is from?", options: ["Nigeria", "Kenya", "South Africa"], answer: "Nigeria" },

  // ================= BIBLE =================
  { question: "Who built the ark?", options: ["Noah", "Moses", "David"], answer: "Noah" },
  { question: "Who led Israelites out of Egypt?", options: ["Moses", "Joseph", "David"], answer: "Moses" },
  { question: "Who betrayed Jesus?", options: ["Judas", "Peter", "John"], answer: "Judas" },
  { question: "Where was Jesus born?", options: ["Bethlehem", "Nazareth", "Jerusalem"], answer: "Bethlehem" },
  { question: "Who killed Goliath?", options: ["David", "Saul", "Solomon"], answer: "David" },
  { question: "Strongest man?", options: ["Samson", "David", "Moses"], answer: "Samson" },
  { question: "First book?", options: ["Genesis", "Exodus", "Psalms"], answer: "Genesis" },
  { question: "Disciples count?", options: ["12", "10", "7"], answer: "12" },
  { question: "Who interpreted dreams?", options: ["Joseph", "Daniel", "Jacob"], answer: "Joseph" },
  { question: "Lion’s den?", options: ["Daniel", "Elijah", "Samuel"], answer: "Daniel" }

];

// ================= START GAME =================
const startGame = () => {
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
  const current = questions[qIndex];

  if (option === current.answer) {
    setScore((prev) => prev + 1);
    setFeedback("✅ Correct!");
  } else {
    setFeedback(`❌ Wrong! Correct answer: ${current.answer}`);
  }

  setTimeout(() => {
    const next = qIndex + 1;

    if (next >= questions.length) {
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
    {
      name: "University of Nairobi",
      link: "https://www.uonbi.ac.ke",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/7f/University_of_Nairobi_logo.png",
      country: "Kenya"
    },
    {
      name: "Massachusetts Institute of Technology",
      link: "https://www.mit.edu",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg",
      country: "USA"
    },
    {
      name: "University of Oxford",
      link: "https://www.ox.ac.uk",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/7e/Oxford-University-Circlet.svg",
      country: "UK"
    },
    {
      name: "University of Cape Town",
      link: "https://www.uct.ac.za",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/UCT_logo.svg",
      country: "South Africa"
    },
    {
      name: "University of Toronto",
      link: "https://www.utoronto.ca",
      logo: "https://upload.wikimedia.org/wikipedia/en/0/04/Utoronto_coa.svg",
      country: "Canada"
    }
  ];

 

  // ================= ROTATE UNIVERSITIES =================
  useEffect(() => {
    const uniTimer = setInterval(() => {
      setUniIndex((p) => (p + 1) % universities.length);
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
  const openFile = (file) => {
    if (!file) return;
    setViewer(file);
  };

  // ================= DOWNLOAD (FORCED WORKING) =================
  const downloadFile = (file, name) => {
    const a = document.createElement("a");
    a.href = file;
    a.download = name || "document.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
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
  const filtered = activeCategory
    ? materials.filter(m => m.category === activeCategory)
    : materials;

  // ================= SEARCH SUGGESTIONS =================
  const searchResults = search
    ? materials.filter(m =>
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.category.toLowerCase().includes(search.toLowerCase())
      )
    : [];

    const handleSearchSubmit = () => {
  if (!search) return;

  const match = materials.find(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  if (match) {
    openFile(match.file_url);
    setSearch("");
  } else {
    alert("No matching document found");
  }
};

  const handleSearchClick = (file) => {
    openFile(file);
    setSearch("");
  };

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


  // ================= UI =================
  return (
    <div>

      {/* ================= TOP BAR ================= */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 15,
        background: "black",
        color: "blue",
        position: "sticky",
        top: 0,
        zIndex: 9999
      }}>

        <div style={{ display: "flex", gap: 10 }}>
          <img src="/logo.jpeg" style={{ width: 35 }} />
          <h2>GLOBAL-STUDY-HUB</h2>
        </div>

        <button onClick={() => setMenu(!menu)}>⋮</button>

        {menu && (
          <div style={{ position: "absolute", right: 10, top: 60 }}>
            <button onClick={() => setLogin(true)}>Login</button>
          </div>
        )}

      </div>

      {/* ================= HERO BACKGROUND ================= */}
      <section style={{ height: "100vh", position: "relative" }}>

        {/* FADE BACKGROUND */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${images[bgIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "opacity 0.5s ease-in-out",
            
            opacity: fade ? 1 : 0
          }}
        />

         {/* DARK OVERLAY */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)"
        }} />

        

        {/* CONTENT */}
        <div style={{
          position: "relative",
          color: "white",
          textAlign: "center",
          paddingTop: 100
        }}>

          <h1 style={{
  color: "#00d4ff",
  fontSize: "48px",
  fontWeight: "bold",
  textShadow: "0 0 10px rgba(3, 38, 166, 0.9)"
}}>
  WELCOME TO STUDY HUB
</h1>
          <p>Join students, learners, and educators from every corner of the world in a powerful knowledge-sharing community where education has no limits. Discover, upload, and access high-quality notes, textbooks, past papers, tutorials, and research materials instantly. Whether you’re preparing for exams, mastering a new skill, or exploring advanced topics, StudyHub connects you to a global library of learning resources designed to help you succeed, grow, and stay ahead academically—anytime, anywhere.
</p>

          {/* ================= SEARCH ================= */}
          <div style={{ position: "relative", maxWidth: 500, margin: "auto" }}>

  <div style={{ display: "flex" }}>
    <input
      placeholder="Search documents..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ flex: 1, padding: 10 }}
    />

    <button
      onClick={handleSearchSubmit}
      style={{
        padding: "10px 15px",
        background: "#1e90ff",
        color: "white",
        border: "none",
        cursor: "pointer"
      }}
    >
      Search
    </button>
  </div>

            {search && (
              <div style={{
                background: "white",
                color: "black",
                position: "absolute",
                width: "100%",
                zIndex: 999
              }}>
                {searchResults.map(m => (
                  <div
                    key={m.id}
                    style={{ padding: 10, cursor: "pointer" }}
                    onClick={() => handleSearchClick(m.file_url)}
                                         
                  >
                    {m.title}
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* ================= QUICK CATEGORY ================= */}
          <div style={{ marginTop: 20 }}>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => handleCategoryClick(c)}
                style={{ margin: 5, padding: 8, background: "#ebeff0ee", color: "blue", fontFamily: "Georgia, serif"}}
              >
                {c}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ================= FLOATING QUOTE (INSIDE HERO) ================= */}
<div style={{
  position: "absolute",
  bottom: "80px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "70%",
  maxWidth: "700px",
  padding: "20px 30px",
  borderRadius: "60px",
  textAlign: "center",
  color: "white",
  fontSize: "18px",
  fontStyle: "italic",
  backdropFilter: "blur(12px)",
  background: "rgba(29, 27, 27, 0.91)",
  border: "1px solid rgba(172, 19, 19, 0.9)",
  boxShadow: "0 10px 40px rgba(200, 219, 219, 0.89)",
  transition: "all 0.8s ease"
}}>
  ✨ "{quotes[quoteIndex]}"
</div>

      {/* ================= EXPLORE BAR ================= */}
<div style={{
  background: "linear-gradient(90deg, #1e90ff, #00d4ff)",
  color: "white",
  textAlign: "center",
  padding: "18px 10px",
  fontSize: "18px",
  fontWeight: "600",
  letterSpacing: "1px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
}}>
  📚 Explore different study materials based on course, unit, and institution across the world 🌍
</div>



      {/* ================= MATERIALS ================= */}
{categories.map(cat => {
  const items = filtered.filter(m => m.category === cat);

  const isOpen = expandedCategory === cat;

  const visibleItems = isOpen ? items : items.slice(0, 5);

  return (
    <section
      id={cat}
      key={cat}
      style={{ padding: 30, background: "#201e18" }}
    >

      <h2 style={{ color: "#1e90ff" }}>{cat}</h2>

      {/* MATERIAL LIST */}
      {visibleItems.map(m => (
        <div
          key={m.id}
          style={{
            background: "white",
            margin: 10,
            padding: 10,
            borderRadius: 5
          }}
        >
          <h3>{m.title}</h3>

          <button onClick={() => openFile(m.file_url)}>
            Read
          </button>

          <button onClick={() => downloadFile(m.file_url, m.title)}>
            Download
          </button>
        </div>
      ))}

      {/* VIEW MORE BUTTON */}
      {items.length > 5 && (
        <button
          onClick={() =>
            setExpandedCategory(isOpen ? null : cat)
          }
          style={{
            marginTop: 10,
            padding: "10px 15px",
            background: "#1e90ff",
            color: "white",
            border: "none",
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

      <h2>{questions[qIndex].question}</h2>

      {questions[qIndex].options.map((opt, i) => (
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
<div style={{
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
    🌍 EXPLORE UNIVERSITIES ACROSS THE WORLD
  </h2>

  <p style={{ fontSize: "14px", opacity: 0.8 }}>
    Apply and study from top institutions globally — click to visit official sites
  </p>

  <div style={{
    marginTop: "20px",
    display: "flex",
    justifyContent: "center"
  }}>

    <a
      href={universities[uniIndex].link}
      target="_blank"
      rel="noreferrer"
      style={{
        background: "white",
        color: "black",
        padding: "20px",
        borderRadius: "12px",
        width: "300px",
        textDecoration: "none",
        boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
        transition: "0.3s"
      }}
    >

      <img
        src={universities[uniIndex].logo}
        style={{
          width: "60px",
          height: "60px",
          objectFit: "contain"
        }}
      />

      <h3 style={{ margin: "10px 0" }}>
        {universities[uniIndex].name}
      </h3>

      <p style={{ color: "gray" }}>
        {universities[uniIndex].country}
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

  </div>
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
      
      {/* ================= PROFESSIONAL FOOTER ================= */}
<footer style={{
  background: "linear-gradient(135deg, #000000, #0f2027, #203a43)",
  color: "white",
  padding: "60px 20px",
  marginTop: "40px"
}}>

  {/* TOP QUOTE */}
  <div style={{
    textAlign: "center",
    marginBottom: "40px"
  }}>
    <h2 style={{
      color: "#00d4ff",
      marginBottom: "10px"
    }}>
      🌍 Empowering Global Learning
    </h2>

    <p style={{
      maxWidth: "700px",
      margin: "auto",
      fontSize: "16px",
      opacity: 0.85
    }}>
      “Education is the most powerful weapon you can use to change the world.”
      — Let knowledge flow freely across borders, connecting minds, inspiring
      innovation, and shaping the future of generations to come.
    </p>
  </div>

  {/* MAIN GRID */}
  <div style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "30px",
    maxWidth: "1100px",
    margin: "auto"
  }}>

    {/* ABOUT */}
    <div style={{ flex: "1 1 250px" }}>
      <h3 style={{ color: "#00d4ff" }}>STUDY HUB</h3>
      <p style={{ fontSize: "14px", opacity: 0.8 }}>
        A global platform where students share knowledge, explore resources,
        and grow together academically. From lecture notes to advanced research,
        everything you need is here.
      </p>
    </div>

    {/* QUICK LINKS */}
    <div style={{ flex: "1 1 200px" }}>
      <h4 style={{ color: "#00d4ff" }}>Quick Links</h4>
      <ul style={{ listStyle: "none", padding: 0, fontSize: "14px" }}>
        <li style={{ marginBottom: 5, cursor: "pointer" }}>Home</li>
        <li style={{ marginBottom: 5, cursor: "pointer" }}>Categories</li>
        <li style={{ marginBottom: 5, cursor: "pointer" }}>Upload</li>
        <li style={{ marginBottom: 5, cursor: "pointer" }}>Comments</li>
      </ul>
    </div>

    {/* CONTACT */}
    <div style={{ flex: "1 1 250px" }}>
      <h4 style={{ color: "#00d4ff" }}>Contact</h4>
      <p style={{ fontSize: "14px", opacity: 0.8 }}>
        📧 support@studyhub.com <br />
        📞 +254 797 742 966<br />
        🌍 Global Access Platform
      </p>
    </div>

    {/* SOCIAL MEDIA */}
    <div style={{ flex: "1 1 200px" }}>
      <h4 style={{ color: "#00d4ff" }}>Connect With Us</h4>

      <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
        <span style={{ fontSize: "20px", cursor: "pointer" }}>🌐</span>
        <span style={{ fontSize: "20px", cursor: "pointer" }}>📘</span>
        <span style={{ fontSize: "20px", cursor: "pointer" }}>🐦</span>
        <span style={{ fontSize: "20px", cursor: "pointer" }}>📸</span>
      </div>

      <p style={{ fontSize: "13px", marginTop: "10px", opacity: 0.7 }}>
        Follow us for updates, new materials, and global opportunities.
      </p>
    </div>

  </div>

  {/* DIVIDER */}
  <div style={{
    borderTop: "1px solid rgba(255,255,255,0.2)",
    margin: "40px 0"
  }} />

  {/* BOTTOM BAR */}
  <div style={{
    textAlign: "center",
    fontSize: "13px",
    opacity: 0.7
  }}>
    © {new Date().getFullYear()} Study Hub — All Rights Reserved <br />
    Designed & Developed by <span style={{ color: "#00d4ff" }}>David Kivinda</span>
  </div>

</footer>
      
      {/* ================= VIEWER ================= */}
      {viewer && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "black",
          zIndex: 999999
        }}>
          <button onClick={() => setViewer(null)}>Close</button>
          <iframe src={viewer} style={{ width: "100%", height: "100%" }} />
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
          background: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{ background: "white", padding: 20 }}>
            <input placeholder="user" onChange={e => setUser(e.target.value)} />
            <input type="password" onChange={e => setPass(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      )}

    </div>
  );
}