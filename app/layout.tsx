import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Jayson Romero Blogs",
	description: "Jayson Romero Blogs, All about technology, hobbies and Foods.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<main className="max-w-[1140px] w-full px-[30px] mx-auto md:px-[45px] lg:px-[112px]">
						<Navbar />
						{children}
					</main>
				</ThemeProvider>
			</body>
		</html>
	)
}
