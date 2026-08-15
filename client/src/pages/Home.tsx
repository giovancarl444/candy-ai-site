/* Editorial Discovery Console: a dark app-shell, image-led catalogue, and coral activation cues. */
import { useMemo, useState } from "react";
import {
  BadgeCheck, ChevronLeft, ChevronRight, CircleHelp, Compass, Crown, Globe2,
  HeartHandshake, House, Image, LockKeyhole, Menu, MessageCircle, Play,
  Plus, Search, Sparkles, Trophy, UserRound, UsersRound, X
} from "lucide-react";

type Character = {
  name: string;
  age: number;
  image: string;
  description: string;
  tag?: "Series" | "New";
  play?: boolean;
};

const characters: Character[] = [
  { name: "Eira", age: 24, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=760&q=88", description: "A thoughtful visual artist who always finds the brightest route home." },
  { name: "Micaela", age: 26, image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=760&q=88", description: "Your longtime friend with a curious take on everything around her.", tag: "New" },
  { name: "Mona", age: 23, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=760&q=88", description: "A calm problem-solver who makes ordinary days feel a little lighter.", tag: "Series" },
  { name: "Diana", age: 29, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=760&q=88", description: "A late-night photographer with a sharp eye for small details.", tag: "Series" },
  { name: "Holly", age: 31, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=760&q=88", description: "Always up for a spontaneous road trip and a better playlist.", tag: "Series" },
  { name: "Mila", age: 25, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=760&q=88", description: "The one who turns an afternoon catch-up into an adventure.", tag: "Series", play: true },
  { name: "Noor", age: 24, image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=760&q=88", description: "A creative with bold style and even bolder music recommendations.", tag: "Series" },
  { name: "Katrine", age: 27, image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=760&q=88", description: "A sunshine personality, the first to suggest making it a picnic.", tag: "Series" },
  { name: "Lea", age: 24, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=760&q=88", description: "Kind, curious, and always ready to hear the unexpected version.", tag: "New" },
  { name: "Kenzie", age: 26, image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=760&q=88", description: "Your concert companion with a collection of impossible stories." },
  { name: "Coco", age: 22, image: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=760&q=88", description: "Her latest creative project is always more elaborate than the last.", tag: "Series" },
  { name: "Veronica", age: 34, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=760&q=88", description: "A thoughtful host with a talent for finding hidden city corners.", tag: "Series" },
  { name: "Billie", age: 23, image: "https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&w=760&q=88", description: "A curious collector of vintage cameras and colorful stories." },
  { name: "Mara", age: 28, image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=760&q=88", description: "A design-minded city guide with an easygoing conversation style.", tag: "Series" },
  { name: "Madison", age: 25, image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=760&q=88", description: "A bookshop regular who is learning to make every day count.", tag: "Series" },
  { name: "Olivia", age: 27, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=760&q=88", description: "An independent thinker with an analog camera in her tote bag.", tag: "Series" },
  { name: "Yuna", age: 24, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=760&q=88", description: "An architecture student who knows the best places to watch clouds." },
  { name: "Renata", age: 33, image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=760&q=88", description: "An ambitious friend who never runs out of practical encouragement.", tag: "Series" },
];

const primaryNav = [
  { label: "Home", icon: House }, { label: "Discover", icon: Compass }, { label: "Chat", icon: MessageCircle },
  { label: "Collection", icon: Image }, { label: "Create Character", icon: Sparkles }, { label: "My AI", icon: HeartHandshake },
  { label: "Private Content", icon: LockKeyhole },
];

function CharacterCard({ character }: { character: Character }) {
  return <article className="character-card">
    <img src={character.image} alt={`${character.name}, a featured profile`} loading="lazy" />
    {character.tag && <span className={`status-chip ${character.tag === "New" ? "fresh" : ""}`}>{character.tag === "Series" ? <Play size={9} fill="currentColor" /> : <Sparkles size={10} />} {character.tag}</span>}
    <div className="card-copy">
      <h3 className="card-title">{character.name} <span className="card-age">{character.age}</span></h3>
      <p className="card-description">{character.description}</p>
      {character.play && <button className="play-chip" aria-label={`Play ${character.name}'s story`}><Play size={10} fill="currentColor" /> Play</button>}
    </div>
  </article>;
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Discover");
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [showCookies, setShowCookies] = useState(true);

  const visibleCharacters = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return characters;
    return characters.filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(normalized));
  }, [query]);

  const selectNav = (label: string) => { setActiveSection(label); setSidebarOpen(false); };
  const filters = ["All", "Private Content", "Caucasian", "Latina", "Asian"];

  return <div className="app-shell">
    <header className="topbar">
      <button className="icon-button" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu"><Menu size={27} /></button>
      <a className="brand" href="#discover" aria-label="Discover home"><img src="/manus-storage/discover-symbol_9d1479e3.png" alt="" />discover<span className="brand-accent">.</span></a>
      <nav className="top-nav" aria-label="Audience selection">
        <button className="active"><UsersRound size={15} /> Discover</button><button><BadgeCheck size={15} /> Explore</button><button><UserRound size={15} /> Connect</button>
      </nav>
      <div className="top-actions"><button className="button button-primary"><Plus size={14} />Create account</button><button className="button button-ghost">Log in</button></div>
    </header>

    {sidebarOpen && <button className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`} aria-label="Main navigation">
      <nav className="side-nav">
        {primaryNav.map(({ label, icon: Icon }) => <button key={label} onClick={() => selectNav(label)} className={`side-item ${activeSection === label ? "active" : ""}`}><Icon size={16} />{label}</button>)}
        <button className="side-item premium" onClick={() => selectNav("Premium")}><Crown size={16} />Premium <span className="discount">-70%</span></button>
      </nav>
      <nav className="utility-nav">
        <button className="side-item"><Globe2 size={15} />English</button><button className="side-item"><MessageCircle size={15} />Discord</button><button className="side-item"><CircleHelp size={15} />Help Center</button><button className="side-item"><HeartHandshake size={15} />Contact Us</button><button className="side-item"><Trophy size={15} />Affiliate</button>
      </nav>
      <p className="legal">Legal Terms&nbsp;&nbsp;•&nbsp;&nbsp;Trust &amp; Safety</p>
    </aside>

    <main className="main" id="discover"><div className="content-frame">
      <section className="season-banner" aria-label="Summer discovery promotion">
        <div className="season-shade" /><div className="banner-copy"><p className="banner-kicker">LIMITED DISCOVERY</p><h1 className="banner-title">Summer stories</h1><button className="banner-cta">EXPLORE NOW</button></div>
        <button className="banner-arrow left" aria-label="Previous promotion"><ChevronLeft size={30} /></button><button className="banner-arrow right" aria-label="Next promotion"><ChevronRight size={30} /></button>
      </section>

      <section className="section"><h2 className="section-heading"><span className="accent">New</span> Experiences</h2><div className="experiences">
        <article className="experience-card" style={{ backgroundImage: "url('/manus-storage/creator-promo_8d3a9501.jpg')" }}><div className="experience-content"><button className="experience-button">Chat now</button></div></article>
        <article className="experience-card featured" style={{ backgroundImage: "url('/manus-storage/private-room-promo_21967039.jpg')" }}><div className="experience-content"><button className="experience-button small">Unlock</button></div></article>
        <article className="experience-card" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=720&q=88')" }}><span className="live-tag">LIVE</span><div className="experience-content"><h3 className="experience-title">Live rooms</h3></div></article>
        <article className="experience-card featured" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=720&q=88')" }}><div className="experience-content"><button className="experience-button small">View today</button></div></article>
      </div></section>

      <section className="section catalogue-heading"><h2 className="section-heading"><span className="accent">Discover</span> Characters</h2><div className="filter-row"><label className="search-wrap"><Search size={16} /><input className="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search profiles" /></label>{filters.map((filter) => <button key={filter} className={`filter-chip ${activeFilter === filter ? "active" : ""}`} onClick={() => setActiveFilter(filter)}>{filter === "Private Content" && <LockKeyhole size={13} />}{filter}</button>)}</div>
        <div className="character-grid">{visibleCharacters.map((character) => <CharacterCard key={`${character.name}-${character.age}`} character={character} />)}</div>
      </section>
    </div></main>

    {showCookies && <aside className="cookie-card" aria-label="Cookie preferences"><div className="cookie-top"><h2 className="cookie-title">We use cookies</h2><Globe2 className="cookie-icon" size={22} /></div><p className="cookie-copy">To deliver and improve our services, analyze usage, and personalize your experience. <button>Read more</button></p><button className="cookie-customize"><Sparkles size={14} /> Customize</button><div className="cookie-actions"><button className="reject" onClick={() => setShowCookies(false)}>Reject</button><button className="accept" onClick={() => setShowCookies(false)}>Accept</button></div></aside>}
  </div>;
}
