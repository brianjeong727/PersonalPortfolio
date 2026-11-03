"use client";

import { useEffect } from "react";

/** Sets the page's background tint for a case study. */
export default function Tint({ value }: { value: string }) {
  useEffect(() => {
    document.body.dataset.tint = value;
    return () => {
      delete document.body.dataset.tint;
    };
  }, [value]);
  return null;
}
