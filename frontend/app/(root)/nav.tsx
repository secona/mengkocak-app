"use client";

import Link from "next/link";

export function Nav() {
  const authToken = localStorage.getItem("auth");

  return (
    <div className="fixed z-20 w-full h-16 px-20 top-0 start-0 flex flex-row justify-between items-center bg-white shadow-lg shadow-gray-300">
      <h1>Mengkocak</h1>
      <div className="flex flex-row gap-5">
        {!authToken && (
          <>
            <Link href="register">Register</Link>
            <Link href="login">Log In</Link>
          </>
        )}
        {authToken && (
          <>
            <button
              onClick={() => {
                localStorage.removeItem("auth");
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
