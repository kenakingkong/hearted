import Link from "next/link"

const Header = () => {
  return (
    <nav className="w-full p-2 border-b-4 border-black flex justify-between items-center">
      <Link href="/collections" className="font-bold text-2xl">oomsoom</Link>
      <div className="border-2 border-black rounded-full h-6 w-6"></div>
    </nav>
  )
}

export default Header