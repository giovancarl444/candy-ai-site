/* Editorial Discovery Console: dark app shell, image-led catalogue, local-first interactions, and user-owned media. */
import { useMemo, useRef, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import {
  BadgeCheck, Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, CircleHelp, Compass, Crown, FileImage,
  FileText, FolderOpen, Globe2, HeartHandshake, House, Image, LoaderCircle, LockKeyhole, Menu,
  MessageCircle, Paperclip, Play, Plus, Search, Sparkles, Trash2, Trophy, Upload, UserRound, UsersRound, X,
} from "lucide-react";

type CharacterCategory = "Spotlight" | "New" | "Stories";
type Character = { name: string; age: number; image: string; description: string; category: CharacterCategory; tag?: "Series" | "New"; play?: boolean };
type Experience = { title: string; action: string; image: string; style?: "featured" | "live" };

const characters: Character[] = [
  { name: "Eira", age: 24, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=760&q=88", description: "A thoughtful visual artist who always finds the brightest route home.", category: "Spotlight" },
  { name: "Micaela", age: 26, image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=760&q=88", description: "Your longtime friend with a curious take on everything around her.", category: "New", tag: "New" },
  { name: "Mona", age: 23, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=760&q=88", description: "A calm problem-solver who makes ordinary days feel a little lighter.", category: "Stories", tag: "Series" },
  { name: "Diana", age: 29, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=760&q=88", description: "A late-night photographer with a sharp eye for small details.", category: "Stories", tag: "Series" },
  { name: "Holly", age: 31, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=760&q=88", description: "Always up for a spontaneous road trip and a better playlist.", category: "Stories", tag: "Series" },
  { name: "Mila", age: 25, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=760&q=88", description: "The one who turns an afternoon catch-up into an adventure.", category: "Spotlight", tag: "Series", play: true },
  { name: "Noor", age: 24, image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=760&q=88", description: "A creative with bold style and even bolder music recommendations.", category: "Stories", tag: "Series" },
  { name: "Katrine", age: 27, image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=760&q=88", description: "A sunshine personality, the first to suggest making it a picnic.", category: "New", tag: "New" },
  { name: "Lea", age: 24, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=760&q=88", description: "Kind, curious, and always ready to hear the unexpected version.", category: "Spotlight", tag: "New" },
  { name: "Kenzie", age: 26, image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=760&q=88", description: "Your concert companion with a collection of impossible stories.", category: "Spotlight" },
  { name: "Coco", age: 22, image: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=760&q=88", description: "Her latest creative project is always more elaborate than the last.", category: "Stories", tag: "Series" },
  { name: "Veronica", age: 34, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=760&q=88", description: "A thoughtful host with a talent for finding hidden city corners.", category: "Spotlight", tag: "Series" },
  { name: "Billie", age: 23, image: "https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&w=760&q=88", description: "A curious collector of vintage cameras and colorful stories.", category: "New" },
  { name: "Mara", age: 28, image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=760&q=88", description: "A design-minded city guide with an easygoing conversation style.", category: "Stories", tag: "Series" },
  { name: "Madison", age: 25, image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=760&q=88", description: "A bookshop regular who is learning to make every day count.", category: "Spotlight", tag: "Series" },
  { name: "Olivia", age: 27, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=760&q=88", description: "An independent thinker with an analog camera in her tote bag.", category: "Stories", tag: "Series" },
  { name: "Yuna", age: 24, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=760&q=88", description: "An architecture student who knows the best places to watch clouds.", category: "New" },
  { name: "Renata", age: 33, image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=760&q=88", description: "An ambitious friend who never runs out of practical encouragement.", category: "Stories", tag: "Series" },
];

const banners = [
  { kicker: "LIMITED DISCOVERY", title: "Summer stories", action: "EXPLORE NOW" },
  { kicker: "EDITOR'S PICK", title: "Fresh faces", action: "MEET THE NEW" },
  { kicker: "WEEKEND EDITION", title: "Find your scene", action: "BROWSE NOW" },
];

const experiences: Experience[] = [
  { title: "Creators", action: "Chat now", image: "/manus-storage/creator-promo_8d3a9501.jpg" },
  { title: "Private room", action: "Unlock", image: "/manus-storage/private-room-promo_21967039.jpg", style: "featured" },
  { title: "Live rooms", action: "Join now", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=720&q=88", style: "live" },
  { title: "Today", action: "View today", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=720&q=88", style: "featured" },
  { title: "After hours", action: "See more", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=720&q=88" },
];

const primaryNav = [
  { label: "Home", icon: House }, { label: "Discover", icon: Compass }, { label: "Chat", icon: MessageCircle },
  { label: "Collection", icon: Image }, { label: "Create Character", icon: Sparkles }, { label: "My AI", icon: HeartHandshake }, { label: "Private Content", icon: LockKeyhole },
];

function CharacterCard({ character, saved, onSave, onOpen }: { character: Character; saved: boolean; onSave: () => void; onOpen: () => void }) {
  return <article className={`character-card ${saved ? "is-saved" : ""}`}>
    <img src={character.image} alt={`${character.name}, a featured profile`} loading="lazy" />
    <button className="card-hitbox" onClick={onOpen} aria-label={`View ${character.name}'s profile`} />
    <button className={`save-button ${saved ? "saved" : ""}`} onClick={onSave} aria-label={saved ? `Remove ${character.name} from saved` : `Save ${character.name}`}>{saved ? <BookmarkCheck size={16} fill="currentColor" /> : <Bookmark size={16} />}</button>
    {character.tag && <span className={`status-chip ${character.tag === "New" ? "fresh" : ""}`}>{character.tag === "Series" ? <Play size={9} fill="currentColor" /> : <Sparkles size={10} />} {character.tag}</span>}
    <div className="card-copy"><button className="profile-open" onClick={onOpen}><h3 className="card-title">{character.name} <span className="card-age">{character.age}</span></h3></button><p className="card-description">{character.description}</p>{character.play && <button className="play-chip" onClick={onOpen}><Play size={10} fill="currentColor" /> Play</button>}</div>
  </article>;
}

function ProfileDrawer({ character, saved, onClose, onSave, onChat }: { character: Character; saved: boolean; onClose: () => void; onSave: () => void; onChat: () => void }) {
  return <div className="profile-layer" role="dialog" aria-modal="true" aria-label={`${character.name} profile`}><button className="profile-backdrop" onClick={onClose} aria-label="Close profile" /><aside className="profile-drawer"><div className="profile-visual"><img src={character.image} alt="" /><div className="profile-visual-shade" /><button className="drawer-close" onClick={onClose} aria-label="Close profile"><X size={20} /></button>{character.tag && <span className="status-chip drawer-tag">{character.tag === "Series" ? <Play size={9} fill="currentColor" /> : <Sparkles size={10} />} {character.tag}</span>}</div><div className="drawer-content"><p className="drawer-eyebrow">CHARACTER SPOTLIGHT</p><h2>{character.name} <span>{character.age}</span></h2><p className="drawer-description">{character.description} This profile is ready for a light, conversational discovery flow.</p><div className="drawer-meta"><span><Sparkles size={14} /> {character.category}</span><span><Globe2 size={14} /> Available now</span></div><div className="drawer-actions"><button className="drawer-secondary" onClick={onSave}>{saved ? <BookmarkCheck size={17} fill="currentColor" /> : <Bookmark size={17} />}{saved ? "Saved" : "Save profile"}</button><button className="drawer-primary" onClick={onChat}><MessageCircle size={17} />Start chat</button></div></div></aside></div>;
}

function bytesToReadable(size: number) { return size < 1024 ? `${size} B` : size < 1024 * 1024 ? `${Math.round(size / 1024)} KB` : `${(size / (1024 * 1024)).toFixed(1)} MB`; }

function resolvedContentType(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  const extensionType = extension === "txt" ? "text/plain" : extension === "pdf" ? "application/pdf" : extension === "png" ? "image/png" : extension === "webp" ? "image/webp" : extension === "jpg" || extension === "jpeg" ? "image/jpeg" : "";
  const acceptedMime = ["image/jpeg", "image/png", "image/webp", "application/pdf", "text/plain"];
  return acceptedMime.includes(file.type) ? file.type : extensionType;
}

function FileLibrary({ open, onClose, isAuthenticated, loadingAuth, onSignIn, onActivity }: { open: boolean; onClose: () => void; isAuthenticated: boolean; loadingAuth: boolean; onSignIn: () => void; onActivity: (message: string) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const utils = trpc.useUtils();
  const fileQuery = trpc.files.list.useQuery(undefined, { enabled: open && isAuthenticated });
  const upload = trpc.files.upload.useMutation({ onSuccess: async () => { await utils.files.list.invalidate(); onActivity("File safely added to your library."); }, onError: error => onActivity(error.message) });
  const remove = trpc.files.remove.useMutation({ onSuccess: async () => { await utils.files.list.invalidate(); onActivity("File removed from your library."); }, onError: error => onActivity(error.message) });
  const handleFile = async (file?: File) => {
    if (!file) return;
    const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf", "text/plain"];
    const contentType = resolvedContentType(file);
    if (!allowed.includes(contentType)) return onActivity("Choose a JPG, PNG, WEBP, PDF, or TXT file.");
    if (file.size > 8 * 1024 * 1024) return onActivity("Choose a file smaller than 8 MB.");
    const content = await file.arrayBuffer();
    const binary = new Uint8Array(content).reduce((result, byte) => result + String.fromCharCode(byte), "");
    upload.mutate({ originalName: file.name, contentType, sizeBytes: file.size, base64Data: btoa(binary) });
  };
  if (!open) return null;
  return <div className="file-library-layer" role="dialog" aria-modal="true" aria-label="My file library"><button className="profile-backdrop" onClick={onClose} aria-label="Close file library" /><aside className="file-library-panel"><div className="file-library-head"><div><p>YOUR PRIVATE LIBRARY</p><h2>My files</h2></div><button onClick={onClose} aria-label="Close file library"><X size={20} /></button></div>{loadingAuth ? <div className="library-loading"><LoaderCircle size={22} className="spin" />Checking access…</div> : !isAuthenticated ? <div className="library-auth"><FolderOpen size={32} /><h3>Save files to your private library</h3><p>Sign in to upload, view, and manage your own images and documents.</p><button onClick={onSignIn}>Sign in to continue</button></div> : <><div className="library-upload"><div><Paperclip size={18} /><span>JPG, PNG, WEBP, PDF or TXT · up to 8 MB</span></div><button onClick={() => fileInputRef.current?.click()} disabled={upload.isPending}>{upload.isPending ? <><LoaderCircle size={16} className="spin" />Uploading</> : <><Upload size={16} />Upload file</>}</button><input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,application/pdf,text/plain" onChange={event => { void handleFile(event.target.files?.[0]); event.currentTarget.value = ""; }} /></div><div className="library-list">{fileQuery.isLoading ? <div className="library-loading"><LoaderCircle size={22} className="spin" />Loading your files…</div> : fileQuery.data?.length ? fileQuery.data.map(file => <article className="library-file" key={file.id}><a href={file.storageUrl} target="_blank" rel="noreferrer" className="file-preview" aria-label={`Open ${file.originalName}`}>{file.contentType.startsWith("image/") ? <img src={file.storageUrl} alt="" /> : file.contentType === "application/pdf" ? <FileText size={23} /> : <FileImage size={23} />}</a><div className="file-info"><a href={file.storageUrl} target="_blank" rel="noreferrer">{file.originalName}</a><span>{bytesToReadable(file.sizeBytes)} · {new Date(file.createdAt).toLocaleDateString()}</span></div><button className="file-remove" onClick={() => remove.mutate({ id: file.id })} disabled={remove.isPending} aria-label={`Remove ${file.originalName}`}><Trash2 size={16} /></button></article>) : <div className="library-empty"><FolderOpen size={27} /><h3>Your library is ready</h3><p>Upload a visual, document, or note to keep it in one place.</p></div>}</div></>}</aside></div>;
}

export default function Home() {
  const { loading: loadingAuth, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Discover");
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [showCookies, setShowCookies] = useState(true);
  const [savedProfiles, setSavedProfiles] = useState<string[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [activeBanner, setActiveBanner] = useState(0);
  const [experienceStart, setExperienceStart] = useState(0);
  const [activity, setActivity] = useState("");
  const [libraryOpen, setLibraryOpen] = useState(false);
  const visibleCharacters = useMemo(() => { const normalized = query.trim().toLowerCase(); const filtered = characters.filter(item => activeFilter === "All" || (activeFilter === "Saved" ? savedProfiles.includes(item.name) : item.category === activeFilter)); return normalized ? filtered.filter(item => `${item.name} ${item.description}`.toLowerCase().includes(normalized)) : filtered; }, [activeFilter, query, savedProfiles]);
  const visibleExperiences = useMemo(() => Array.from({ length: 4 }, (_, index) => experiences[(experienceStart + index) % experiences.length]), [experienceStart]);
  const toggleSaved = (name: string) => setSavedProfiles(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name]);
  const showActivity = (message: string) => { setActivity(message); window.setTimeout(() => setActivity(""), 2600); };
  const moveBanner = (direction: number) => setActiveBanner(current => (current + direction + banners.length) % banners.length);
  const moveExperiences = (direction: number) => setExperienceStart(current => (current + direction + experiences.length) % experiences.length);
  const goToCatalogue = (filter = "All") => { setActiveFilter(filter); document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const openLibrary = () => { setSidebarOpen(false); setLibraryOpen(true); };
  const selectNav = (label: string) => { setActiveSection(label); setSidebarOpen(false); if (label === "Collection") goToCatalogue("Saved"); if (label === "Discover" || label === "Home") goToCatalogue("All"); if (label === "Chat") showActivity("Choose a profile to begin a conversation."); };
  const banner = banners[activeBanner];
  const filters = ["All", "Spotlight", "New", "Stories", "Saved"];

  return <div className="app-shell"><header className="topbar"><button className="icon-button" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu"><Menu size={27} /></button><a className="brand" href="#discover" onClick={() => goToCatalogue("All")} aria-label="Discover home"><img src="/manus-storage/discover-symbol_9d1479e3.png" alt="" />discover<span className="brand-accent">.</span></a><nav className="top-nav" aria-label="Audience selection"><button className="active"><UsersRound size={15} /> Discover</button><button onClick={() => goToCatalogue("New")}><BadgeCheck size={15} /> Explore</button><button onClick={() => goToCatalogue("Spotlight")}><UserRound size={15} /> Connect</button></nav><div className="top-actions"><button className="button files-button" onClick={openLibrary}><FolderOpen size={14} /><span>My files</span></button>{isAuthenticated ? <button className="button button-primary" onClick={openLibrary}><Plus size={14} /><span className="create-label">Add a file</span></button> : <><button className="button button-primary" onClick={startLogin}><Plus size={14} /><span className="create-label">Create account</span></button><button className="button button-ghost" onClick={startLogin}>Log in</button></>}</div></header>
    {sidebarOpen && <button className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}<aside className={`sidebar ${sidebarOpen ? "open" : ""}`} aria-label="Main navigation"><nav className="side-nav">{primaryNav.map(({ label, icon: Icon }) => <button key={label} onClick={() => selectNav(label)} className={`side-item ${activeSection === label ? "active" : ""}`}><Icon size={16} />{label}{label === "Collection" && savedProfiles.length > 0 && <span className="saved-count">{savedProfiles.length}</span>}</button>)}<button className="side-item" onClick={openLibrary}><FolderOpen size={16} />My files</button><button className="side-item premium" onClick={() => showActivity("Premium options are ready for the next product pass.")}><Crown size={16} />Premium <span className="discount">-70%</span></button></nav><nav className="utility-nav"><button className="side-item"><Globe2 size={15} />English</button><button className="side-item"><MessageCircle size={15} />Discord</button><button className="side-item"><CircleHelp size={15} />Help Center</button><button className="side-item"><HeartHandshake size={15} />Contact Us</button><button className="side-item"><Trophy size={15} />Affiliate</button></nav><p className="legal">Legal Terms&nbsp;&nbsp;•&nbsp;&nbsp;Trust &amp; Safety</p></aside>
    <main className="main" id="discover"><div className="content-frame"><section className="season-banner" aria-label="Discovery promotion"><div className="season-shade" /><div className="banner-copy"><p className="banner-kicker">{banner.kicker}</p><h1 className="banner-title">{banner.title}</h1><button className="banner-cta" onClick={() => goToCatalogue(activeBanner === 1 ? "New" : "Spotlight")}>{banner.action}</button></div><button className="banner-arrow left" onClick={() => moveBanner(-1)} aria-label="Previous promotion"><ChevronLeft size={30} /></button><button className="banner-arrow right" onClick={() => moveBanner(1)} aria-label="Next promotion"><ChevronRight size={30} /></button><div className="banner-dots" aria-label="Promotion selection">{banners.map((item, index) => <button key={item.title} className={index === activeBanner ? "active" : ""} onClick={() => setActiveBanner(index)} aria-label={`Show ${item.title}`} />)}</div></section>
      <section className="section"><div className="section-title-row"><h2 className="section-heading"><span className="accent">New</span> Experiences</h2><div className="experience-nav"><button onClick={() => moveExperiences(-1)} aria-label="Previous experiences"><ChevronLeft size={17} /></button><button onClick={() => moveExperiences(1)} aria-label="Next experiences"><ChevronRight size={17} /></button></div></div><div className="experiences">{visibleExperiences.map((experience, index) => <article className={`experience-card ${experience.style === "featured" ? "featured" : ""}`} key={`${experience.title}-${index}`} style={{ backgroundImage: `url('${experience.image}')` }}>{experience.style === "live" && <span className="live-tag">LIVE</span>}<div className="experience-content">{experience.style === "live" ? <><h3 className="experience-title">{experience.title}</h3><button className="experience-button small" onClick={() => showActivity("Live rooms will be available in the next connected release.")}>{experience.action}</button></> : <button className="experience-button" onClick={() => showActivity(`${experience.title} is ready for a connected flow in the next release.`)}>{experience.action}</button>}</div></article>)}</div></section>
      <section className="section catalogue-heading" id="catalogue"><div className="catalogue-title-row"><h2 className="section-heading"><span className="accent">Discover</span> Characters</h2><button className="saved-summary" onClick={() => goToCatalogue("Saved")}><BookmarkCheck size={15} />{savedProfiles.length} saved</button></div><div className="filter-row"><label className="search-wrap"><Search size={16} /><input className="search-input" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search profiles" aria-label="Search profiles" /></label>{filters.map(filter => <button key={filter} className={`filter-chip ${activeFilter === filter ? "active" : ""}`} onClick={() => setActiveFilter(filter)}>{filter === "Saved" && <Bookmark size={13} />}{filter}</button>)}</div>{visibleCharacters.length > 0 ? <div className="character-grid">{visibleCharacters.map(character => <CharacterCard key={`${character.name}-${character.age}`} character={character} saved={savedProfiles.includes(character.name)} onSave={() => toggleSaved(character.name)} onOpen={() => setSelectedCharacter(character)} />)}</div> : <div className="empty-state"><Bookmark size={26} /><h3>No saved profiles yet</h3><p>Save a profile from the catalogue to build a personal collection.</p><button onClick={() => setActiveFilter("All")}>Browse all characters</button></div>}</section></div></main>
    <nav className="mobile-dock" aria-label="Mobile navigation"><button className={activeSection === "Home" || activeSection === "Discover" ? "active" : ""} onClick={() => { setActiveSection("Discover"); goToCatalogue("All"); }}><Compass size={19} /><span>Discover</span></button><button onClick={() => { setActiveSection("Collection"); goToCatalogue("Saved"); }}><BookmarkCheck size={19} /><span>Saved</span>{savedProfiles.length > 0 && <b>{savedProfiles.length}</b>}</button><button onClick={openLibrary}><FolderOpen size={20} /><span>Files</span></button><button onClick={() => setSidebarOpen(true)}><Menu size={20} /><span>Menu</span></button></nav>
    {showCookies && <aside className="cookie-card" aria-label="Cookie preferences"><div className="cookie-top"><h2 className="cookie-title">We use cookies</h2><Globe2 className="cookie-icon" size={22} /></div><p className="cookie-copy">To deliver and improve our services, analyze usage, and personalize your experience. <button onClick={() => showActivity("Cookie preference details are ready for a policy page.")}>Read more</button></p><button className="cookie-customize" onClick={() => showActivity("Cookie customization is ready for a connected settings page.")}><Sparkles size={14} /> Customize</button><div className="cookie-actions"><button className="reject" onClick={() => setShowCookies(false)}>Reject</button><button className="accept" onClick={() => setShowCookies(false)}>Accept</button></div></aside>}
    {selectedCharacter && <ProfileDrawer character={selectedCharacter} saved={savedProfiles.includes(selectedCharacter.name)} onClose={() => setSelectedCharacter(null)} onSave={() => toggleSaved(selectedCharacter.name)} onChat={() => { showActivity(`Conversation with ${selectedCharacter.name} is ready to connect.`); setSelectedCharacter(null); }} />}
    <FileLibrary open={libraryOpen} onClose={() => setLibraryOpen(false)} isAuthenticated={isAuthenticated} loadingAuth={loadingAuth} onSignIn={startLogin} onActivity={showActivity} />
    {activity && <div className="activity-toast" role="status"><Sparkles size={15} />{activity}<button onClick={() => setActivity("")} aria-label="Dismiss message"><X size={15} /></button></div>}
  </div>;
}
