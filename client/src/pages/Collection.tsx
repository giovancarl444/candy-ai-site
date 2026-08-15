/* Saved collection route: a focused extension of the discovery grid with useful filtering and profile links. */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { BookmarkCheck, ChevronRight, Search, Sparkles } from "lucide-react";
import DiscoveryRouteShell from "@/components/DiscoveryRouteShell";
import { routeProfiles } from "@/lib/routeProfiles";

export default function Collection() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"All saved" | "New this week">("All saved");
  const selected = routeProfiles.slice(0, 4);
  const visible = useMemo(() => selected.filter(profile => (mode === "All saved" || profile.status === "New") && profile.name.toLowerCase().includes(query.toLowerCase())), [mode, query]);
  return <DiscoveryRouteShell active="collection" eyebrow="PERSONAL COLLECTION"><section className="collection-page"><header className="collection-intro"><div><p className="collection-kicker">YOUR SPACE</p><h1>Saved <span>characters</span></h1><p>Keep a private shortlist of profiles you want to revisit. Your collection stays focused, quick to scan, and ready when a conversation feels right.</p></div><div className="collection-stat"><BookmarkCheck size={19} /><strong>{selected.length}</strong><span>saved profiles</span></div></header><div className="collection-controls"><label><Search size={16} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search saved profiles" /></label><div>{(["All saved", "New this week"] as const).map(item => <button className={mode === item ? "active" : ""} onClick={() => setMode(item)} key={item}>{item}</button>)}</div></div>{visible.length ? <div className="collection-grid">{visible.map(profile => <Link href={`/profiles/${profile.slug}`} key={profile.slug} className="collection-card"><img src={profile.image} alt={`${profile.name} portrait`} /><div className="collection-card-gradient" /><span className="collection-status"><Sparkles size={10} />{profile.status}</span><div className="collection-card-copy"><h2>{profile.name} <span>{profile.age}</span></h2><p>{profile.tagline}</p><b>View profile <ChevronRight size={14} /></b></div></Link>)}</div> : <div className="collection-empty"><BookmarkCheck size={28} /><h2>No matches here</h2><p>Try a shorter search or browse the full discovery catalogue.</p><Link href="/">Discover characters</Link></div>}<footer className="collection-footer"><div><p>MAKE SPACE FOR WHAT CLICKS</p><h2>Find a profile that fits the moment.</h2></div><Link href="/">Return to discovery <ChevronRight size={16} /></Link></footer></section></DiscoveryRouteShell>;
}
