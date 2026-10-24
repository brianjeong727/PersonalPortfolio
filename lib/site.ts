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

/** Looping recordings live in /public/recordings. Leave undefined to show a placeholder. */
export const RECORDINGS: Record<string, string | undefined> = {
  central: undefined,
  chaeum: undefined,
};
