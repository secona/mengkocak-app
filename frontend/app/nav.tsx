import Link from "next/link";

export function Nav() {
  return (
    <div className="fixed z-20 w-full h-16 px-20 top-0 start-0 flex flex-row justify-between items-center bg-white shadow-lg shadow-gray-300">
      <h1>Mengkocak</h1>
      <Link href="login">
        Log In
      </Link>
    </div>
  )
}
