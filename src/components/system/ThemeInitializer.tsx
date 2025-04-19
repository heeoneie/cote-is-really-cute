'use client';

import { useEffect } from 'react';

export default function ThemeInitializer() {
  useEffect(() => {
    const systemDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    if (systemDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, []);

  return null;
}
