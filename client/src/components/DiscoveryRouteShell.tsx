/* Shared editorial route chrome that preserves the approved discovery shell across detail pages. */
import { Link, useLocation } from "wouter";
import { BookmarkCheck, ChevronLeft, Compass, FolderOpen, HeartHandshake, House, Image, Menu, MessageCircle, Sparkles } from "lucide-react";
import { ReactNode, useState } from "react";

type DiscoveryRouteShellProps = { active: "profile" | "collection" | "chat"; children: ReactNode; eyebrow?: string };

export default function DiscoveryRouteShell({ active, children, eyebrow }: DiscoveryRouteShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const nav = [
    { label: "Home", icon: House, href: "/" }, { label: "Discover", icon: Compass, href: "/" },
    { label: "Chat", icon: MessageCircle, href: "/chat/eira", section: "chat" }, { label: "Collection", icon: Image, href: "/collection", section: "collection" },
    { label: "Create Character", icon: Sparkles, href: "/" }, { label: "My AI", icon: HeartHandshake, href: "/" }, { label: "My files", icon: FolderOpen, href: "/" },
  ];
  return <div className="route-shell">
    <header className="route-topbar"><button className="route-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Menu size={23} /></button><Link href="/" className="route-brand"><span className="route-brand-mark">♡</span>discover<span>.</span></Link><div className="route-crumb"><button onClick={() => setLocation("/")}><ChevronLeft size={16} />Back to discover</button>{eyebrow && <span>{eyebrow}</span>}</div><div className="route-top-actions"><Link href="/collection" className="route-collection-link"><BookmarkCheck size={15} />Saved</Link><Link href="/" className="route-return-link">Browse</Link></div></header>
    {menuOpen && <button className="route-scrim" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}
    <aside className={`route-sidebar ${menuOpen ? "is-open" : ""}`}>{nav.map(({ label, icon: Icon, href, section }) => <Link href={href} key={label} onClick={() => setMenuOpen(false)} className={`route-side-item ${active === section || (active === "profile" && label === "Discover") ? "active" : ""}`}><Icon size={16} />{label}</Link>)}</aside>
    <main className="route-main">{children}</main>
    <nav className="route-mobile-nav"><Link href="/"><Compass size={18} />Discover</Link><Link href="/collection" className={active === "collection" ? "active" : ""}><BookmarkCheck size={18} />Saved</Link><Link href="/chat/eira" className={active === "chat" ? "active" : ""}><MessageCircle size={18} />Chat</Link><button onClick={() => setMenuOpen(true)}><Menu size={19} />Menu</button></nav>
  </div>;
}
