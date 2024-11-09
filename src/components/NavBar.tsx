import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import menuData from "../components/Header/menuData"; 
import { Menu } from "@/types/menu";
import { auth } from "../components/firebase";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const modifiedMenuData = isAuthenticated
    ? [
      // Remove "Sign In" and "Sign Up" and add "Profile"
      ...menuData.filter((item) => item.title !== "Sign In" && item.title !== "Sign Up"),
        {
          id: 48,
          title: "Profile",
          path: "/profile",
          newTab: false,
        },
      ]
    : menuData;

  return (
    <nav>
      <ul>
        {modifiedMenuData.map((menuItem) =>
          menuItem.submenu ? (
            <li key={menuItem.id}>
              <span>{menuItem.title}</span>
              <ul>
                {menuItem.submenu.map((subMenuItem) => (
                  <li key={subMenuItem.id}>
                    <Link href={subMenuItem.path}>
                      {subMenuItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={menuItem.id}>
              <Link href={menuItem.path}>{menuItem.title}</Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default Navbar;