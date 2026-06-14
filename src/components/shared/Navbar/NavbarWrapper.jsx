//nvabar ta jei jei route e dekabe seta set korchi
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";


export default function NavbarWrapper() {
  const pathname = usePathname();

  const showNavbarRoutes = [
    "/",
    "/all-collection",
    "/about",
    

  ];

  const shouldShowNavbar = showNavbarRoutes.includes(pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
    </>
  );
}