import { createClient } from "next-sanity"
import ImageUrlBuilder from "@sanity/image-url"

export const client = createClient({
	apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
	dataset: process.env.NEXT_PUBLIC_DATASET,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	useCdn: false,
})

const builder = ImageUrlBuilder(client)

export function urlFor(source: any) {
	return builder.image(source)
}
