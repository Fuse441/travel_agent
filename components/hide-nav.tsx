/* eslint-disable prettier/prettier */
"use client";

import { usePathname } from "next/navigation";

const HIDE_NAVBAR_PATHS = ["/login", "/register"];

export default function HideNavbarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (HIDE_NAVBAR_PATHS.includes(pathname)) return null;

  return <>{children}</>;
}
