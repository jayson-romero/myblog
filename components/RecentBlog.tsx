import { recentBlog } from "@/app/lib/interface"
import { client, urlFor } from "@/app/lib/sanity"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

export const revalidate = 30

async function getData() {
	const query = `
  *[_type == "blog"] | order(_createdAt desc)[0...4] {
  title,
    smallDescription,
    "currrentSlug": slug.current,
    titleImage,
    "createdAt": _createdAt
}`

	const data = await client.fetch(query)
	return data
}

const RecentBlog = async () => {
	const data: recentBlog[] = await getData()

	return (
		<div>
			<p className="text-[24px] font-semibold tracking-tight py-[32px] leading-[32px]">
				Recent blog posts
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] mt-5">
				{data.map((blog, idx) => (
					<Card
						className={`${idx == 0 ? "lg:row-span-2 " : "lg:flex lg:justify-start lg:items-center lg:gap-5"} ${idx == 3 ? "lg:col-span-2 " : ""} `}
						key={blog.currrentSlug}
					>
						<Image
							src={urlFor(blog.titleImage).url()}
							alt="image"
							width={500}
							height={500}
							className={`  ${idx == 1 ? "lg:w-[50%] lg:h-full " : "lg:h-[228px]  "} ${idx == 2 ? "lg:h-full lg:w-[50%]" : "lg:h-[228px]"} object-cover h-[200px] md:h-[240px] `}
						/>
						<CardContent className="">
							<p className="text-primary text-[14px] font-semibold py-[12px]">
								{new Date(blog.createdAt).toDateString()}
							</p>
							<h3 className="pb-[8px] text-[18px] font-semibold leading-[28px] line-clamp-1">
								{blog.title}
							</h3>
							<p className="text-[16px] leading-[24px] text-gray-600 dark:text-gray-300 line-clamp-3">
								{blog.smallDescription}
							</p>
							<Button asChild className="w-full mt-7">
								<Link href={`/blog/${blog.currrentSlug}`}>Read More</Link>
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}

export default RecentBlog
