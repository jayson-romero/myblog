import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { simpleBlogCard } from "./lib/interface"
import { client, urlFor } from "./lib/sanity"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import RecentBlog from "@/components/RecentBlog"

export const revalidate = 30

async function getData() {
	const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
  title,
    smallDescription,
    "currrentSlug": slug.current,
    titleImage,
    "createdAt": _createdAt
  }`

	const data = await client.fetch(query)
	return data
}

export default async function Home() {
	const data: simpleBlogCard[] = await getData()

	return (
		<div>
			<h1 className="text-[72px] md:text-[160px] lg:text-[190px] font-bold tracking-tight border-y-2 border-primary text-center">
				THE BLOG
			</h1>

			<RecentBlog />

			<p className="text-[24px]  font-semibold tracking-tight py-[32px] leading-[32px]">
				All blog posts
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] mt-5">
				{data.map((post, idx) => (
					<Card key={idx}>
						<Image
							src={urlFor(post.titleImage).url()}
							alt="image"
							width={500}
							height={500}
							className="h-[200px] md:h-[240px] object-cover"
						/>
						<CardContent className="mt-5">
							<p className="text-primary font-semibold pt-[14px]">
								{new Date(post.createdAt).toDateString()}
							</p>
							<h3 className="py-[12px] text-[24px] font-semibold leading-[32px] line-clamp-1">
								{post.title}
							</h3>
							<p className="text-[16px] leading-[24px] text-gray-600 dark:text-gray-300 line-clamp-2">
								{post.smallDescription}
							</p>
							<Button asChild className="w-full mt-7">
								<Link href={`/blog/${post.currrentSlug}`}>Read More</Link>
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}
