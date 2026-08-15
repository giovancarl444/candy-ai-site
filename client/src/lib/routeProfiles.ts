/* Route-level profile model for the editorial discovery pages. */
export type RouteProfile = {
  slug: string;
  name: string;
  age: number;
  category: string;
  image: string;
  gallery: string[];
  tagline: string;
  about: string;
  details: string[];
  status: "New" | "Series" | "Spotlight";
};

export const routeProfiles: RouteProfile[] = [
  {
    slug: "eira", name: "Eira", age: 24, category: "Spotlight", status: "Spotlight",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1100&q=90",
    gallery: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=720&q=86", "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=720&q=86", "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=720&q=86"],
    tagline: "A thoughtful visual artist who finds the brightest route home.",
    about: "Eira carries a calm, observant energy. Her idea of a good evening is a fresh playlist, a long walk through a familiar neighborhood, and an unexpected conversation that changes the way she sees the city.",
    details: ["Studio afternoons & bookstore stops", "Slow conversations with sharp observations", "A saved list of night-walk playlists"],
  },
  {
    slug: "micaela", name: "Micaela", age: 26, category: "New", status: "New",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1100&q=90",
    gallery: ["https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=720&q=86", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=720&q=86", "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=720&q=86"],
    tagline: "Your longtime friend with a curious take on everything around her.",
    about: "Micaela is the friend who keeps a travel-sized notebook close by. She notices the tiny shifts in a room and turns them into stories that make everyday plans feel more memorable.",
    details: ["Early riser, late idea collector", "Makes a plan but always leaves room for a detour", "Soft spot for coastal escapes"],
  },
  {
    slug: "mona", name: "Mona", age: 23, category: "Stories", status: "Series",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1100&q=90",
    gallery: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=720&q=86", "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=720&q=86", "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=720&q=86"],
    tagline: "A calm problem-solver who makes ordinary days feel lighter.",
    about: "Mona brings a grounded point of view to any conversation. She is observant, practical, and quietly funny—the sort of person who can make a complicated day feel manageable in a few thoughtful sentences.",
    details: ["A reliable co-pilot for a busy week", "Loves low-stakes creative challenges", "Collects local recommendations"],
  },
  {
    slug: "lea", name: "Lea", age: 24, category: "Spotlight", status: "New",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1100&q=90",
    gallery: ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=720&q=86", "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=720&q=86", "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=720&q=86"],
    tagline: "Kind, curious, and always ready to hear the unexpected version.",
    about: "Lea balances a warm presence with an appetite for new ideas. She is happiest when a simple question turns into a bigger, more imaginative conversation.",
    details: ["A question-first conversation style", "Quiet confidence and bright perspective", "Always looking for the next good story"],
  },
];

export function getRouteProfile(slug?: string) {
  return routeProfiles.find(profile => profile.slug === slug);
}
