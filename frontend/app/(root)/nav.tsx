"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isLoggedIn, logout } from "./actions";

export function Nav() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoggedIn(await isLoggedIn());
    })()
  }, [])

  return (
    <div className="fixed z-20 w-full h-16 px-20 top-0 start-0 flex flex-row justify-between items-center bg-white shadow-lg shadow-gray-300">
      <div className="flex flex-row gap-5">
        <h1 className="border-r-black border-r-[1px] pr-5 pointer-events-none uppercase font-bold">Mengkocak</h1>
        <Link href="my/jokes">My Jokes</Link>
      </div>
      <div className="flex flex-row gap-5">
        {!loggedIn && (
          <>
            <Link href="register">Register</Link>
            <Link href="login">Log In</Link>
          </>
        )}
        {loggedIn && (
          <>
            <button
              onClick={async () => {
                await logout();
                window.location.reload();
              }}
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  )
}
