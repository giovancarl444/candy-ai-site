/* Bespoke local conversation view: preserves the editorial discovery composition without claiming a live messaging service. */
import { FormEvent, useMemo, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { ChevronRight, Image as ImageIcon, MoreHorizontal, Paperclip, Send, Sparkles, WandSparkles } from "lucide-react";
import DiscoveryRouteShell from "@/components/DiscoveryRouteShell";
import { getRouteProfile, routeProfiles } from "@/lib/routeProfiles";

type ChatMessage = { id: number; author: "profile" | "visitor"; text: string; time: string };

const profileReplies = [
  "That has a lovely kind of momentum. Tell me the part you keep thinking about.",
  "I like the way you framed that. What made it stand out to you?",
  "That sounds like the beginning of a very good story.",
];

export default function Conversation() {
  const [, params] = useRoute("/chat/:slug");
  const [, setLocation] = useLocation();
  const profile = getRouteProfile(params?.slug);
  if (!profile) return <DiscoveryRouteShell active="chat" eyebrow="CONVERSATION"><section className="route-unavailable"><Sparkles size={28} /><p>CONVERSATION NOT AVAILABLE</p><h1>Select a profile to begin a conversation.</h1><Link href="/">Return to discovery</Link></section></DiscoveryRouteShell>;
  const [draft, setDraft] = useState("");
  const [notice, setNotice] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, author: "profile", text: `Hi, I’m ${profile.name}. What is one detail from your day that you want to keep?`, time: "Now" },
  ]);
  const [isReplying, setIsReplying] = useState(false);
  const prompts = useMemo(() => ["Tell me a small win from today.", "What are you curious about lately?", "Recommend a soundtrack for a late walk."], []);
  const sendMessage = (value: string) => {
    const text = value.trim();
    if (!text || isReplying) return;
    setMessages(current => [...current, { id: Date.now(), author: "visitor", text, time: "Now" }]);
    setDraft(""); setIsReplying(true);
    window.setTimeout(() => {
      setMessages(current => [...current, { id: Date.now() + 1, author: "profile", text: profileReplies[current.length % profileReplies.length], time: "Now" }]);
      setIsReplying(false);
    }, 700);
  };
  const showNotice = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 2300); };
  const submit = (event: FormEvent) => { event.preventDefault(); sendMessage(draft); };
  return <DiscoveryRouteShell active="chat" eyebrow="CONVERSATION"><section className="chat-page">
    <aside className="chat-threads"><div className="chat-thread-title"><div><p>INBOX</p><h2>Conversations</h2></div><button onClick={() => showNotice("Choose a profile from the conversation list to begin.")} aria-label="Create a conversation"><Sparkles size={16} /></button></div><div className="chat-thread-list">{routeProfiles.map(candidate => <button key={candidate.slug} className={candidate.slug === profile.slug ? "active" : ""} onClick={() => setLocation(`/chat/${candidate.slug}`)}><img src={candidate.image} alt="" /><span><b>{candidate.name}</b><small>{candidate.slug === profile.slug ? "Active now" : "Continue the story"}</small></span>{candidate.slug === profile.slug && <i />}</button>)}</div><p className="chat-demo-note"><WandSparkles size={13} />Local demonstration replies</p></aside>
    <div className="chat-conversation"><header className="chat-header"><Link href={`/profiles/${profile.slug}`}><img src={profile.image} alt="" /><span><b>{profile.name} <small>{profile.age}</small></b><em><i /> Available now</em></span></Link><button onClick={() => showNotice("Conversation tools are being prepared for the next release.")} aria-label="More conversation options"><MoreHorizontal size={20} /></button></header><div className="chat-intro"><span><Sparkles size={13} /></span><p>Start from something real. A small observation is enough.</p></div><div className="chat-stream">{messages.map(message => <article className={`chat-bubble ${message.author}`} key={message.id}>{message.author === "profile" && <img src={profile.image} alt="" />}<div><p>{message.text}</p><time>{message.time}</time></div></article>)}{isReplying && <article className="chat-bubble profile typing"><img src={profile.image} alt="" /><div><span /><span /><span /></div></article>}</div><div className="chat-prompts">{prompts.map(prompt => <button onClick={() => sendMessage(prompt)} disabled={isReplying} key={prompt}>{prompt}</button>)}</div><form className="chat-composer" onSubmit={submit}><button type="button" onClick={() => showNotice("Attachments can be added once conversation history is connected.")} aria-label="Attach a file"><Paperclip size={18} /></button><textarea value={draft} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(draft); } }} placeholder={`Message ${profile.name}…`} rows={1} /><button className="chat-send" type="submit" disabled={!draft.trim() || isReplying} aria-label="Send message"><Send size={17} /></button></form></div>
    <aside className="chat-details"><div className="chat-details-avatar"><img src={profile.image} alt="" /><span><i /> available</span></div><h2>{profile.name} <span>{profile.age}</span></h2><p>{profile.tagline}</p><Link href={`/profiles/${profile.slug}`}>View profile <ChevronRight size={15} /></Link><div className="chat-details-divider" /><div className="chat-detail-row"><ImageIcon size={15} /><span><b>Visual stories</b><small>12 scenes to explore</small></span></div><div className="chat-detail-row"><Sparkles size={15} /><span><b>Conversation style</b><small>Thoughtful &amp; curious</small></span></div></aside>
    {notice && <div className="chat-notice" role="status"><Sparkles size={14} />{notice}</div>}
  </section></DiscoveryRouteShell>;
}
