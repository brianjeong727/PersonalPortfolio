export const PROFILE = {
  name: "Brian Jeong",
  role: "Software engineer, Pittsburgh",
  bio: "Studying CS and Data Science at Pitt. Interning on PNC's ML Ops team. I like owning a system from the schema to the screen.",
  email: "bjj46@pitt.edu",
  links: [
    { label: "GitHub", href: "https://github.com/brianjeong727" },
    { label: "LinkedIn", href: "https://linkedin.com/in/brianjeong727" },
    { label: "Résumé", href: "/Brian-Jeong-Resume.pdf" },
  ],
};

export interface Recording {
  /** Short silent loop for the home page card. */
  teaser: string;
  /** The full edited reel for the case-study header. */
  full: string;
  poster: string;
}

/** Edited demo reels live in /public/recordings. Remove an entry to show a placeholder. */
export const RECORDINGS: Record<string, Recording | undefined> = {
  central: { teaser: "/recordings/central-teaser.mp4", full: "/recordings/central.mp4", poster: "/recordings/central.jpg" },
  chaeum: { teaser: "/recordings/chaeum-teaser.mp4", full: "/recordings/chaeum.mp4", poster: "/recordings/chaeum.jpg" },
};
