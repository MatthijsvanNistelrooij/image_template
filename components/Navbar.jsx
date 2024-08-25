import Link from "next/link"
import React from "react"
import {
  AiFillBook,
  AiFillHome,
  AiFillRobot,
  AiTwotoneHome,
  AiOutlineHome,
} from "react-icons/ai"

const Navbar = () => {
  return (
    <div className="w-full flex flex-row justify-between text-2xl p-5 bg-gray-800 text-white lg:px-60">
      <Link href={"/"}>
        <AiTwotoneHome />
      </Link>

      <div className="flex flex-row gap-4">
        <Link href={"/images"}>
          <AiFillRobot />
        </Link>
        <Link href={"/posts"}>
          <AiFillBook />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
