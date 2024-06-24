import { fullBlog } from "@/app/lib/interface"
import { client, urlFor } from "@/app/lib/sanity"
import { PortableText } from "next-sanity"
import Image from "next/image"

export const revalidate = 30

async function getData(slug: string) {
	const query = `*[_type == 'blog' && slug.current == '${slug}'] {
  "currentSlug" : slug.current,
    title,
    content,
    titleImage
}[0]`

	const data = await client.fetch(query)
	return data
}

const BlogArticle = async ({ params }: { params: { slug: string } }) => {
	const data: fullBlog = await getData(params.slug)

	return (
		<div className="mt-6">
			<h1 className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
				{data.title}
			</h1>
			<Image
				src={urlFor(data.titleImage).url()}
				width={800}
				height={800}
				alt="Image title"
				priority
				className="mt-8 h-[200px] md:h-[400px] object-cover"
			/>

			<div className="mt-16 prose prose-blue prose-md dark:prose-invert">
				<PortableText value={data.content} />
			</div>
		</div>
	)
}

export default BlogArticle
