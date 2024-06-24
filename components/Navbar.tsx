import Link from "next/link"
import React from "react"
import { ModeToggle } from "./ModeToggle"

const Navbar = () => {
	return (
		<nav className="flex justify-between items-center py-[48px]">
			<Link href="/" className="font-bold leading-[24px] text-[24px] ">
				Jay<span className="text-primary">son.</span>
			</Link>

			<div className="flex items-center gap-[14px] text-[20px] leading-[20px]">
				{/* <Link href="/" className="">
					Blog
				</Link> */}
				{/* <Link href="/projects" className="">
					Projects
				</Link>
				<Link href="/about" className="">
					About
				</Link> */}
				<ModeToggle />
			</div>
		</nav>
	)
}

export default Navbar
