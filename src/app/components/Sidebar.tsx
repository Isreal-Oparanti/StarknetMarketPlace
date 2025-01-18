
// src/app/components/Sidebar.tsx
"use client";

import Link from "next/link";

export const Sidebar = () => (
  <aside className="w-64 bg-gray-800 h-screen fixed">
    <nav className="flex flex-col space-y-4 p-6 text-white">
      <Link href="/">Home</Link>
      <Link href="/models">Model Listing</Link>
      <Link href="/profile">Profile</Link>
    </nav>
  </aside>
);
