import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "88az0w6y"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = "2024-01-01"

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production" && !process.env.SANITY_API_READ_TOKEN,
}

// Client for public queries (no token needed for public content)
export const client = createClient(sanityConfig)

// Client with token for authenticated requests (server-side only)
export const serverClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper for fetching data (uses token if available for server-side fetching)
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  // Use serverClient with token if available (for draft content or private datasets)
  const fetchClient = process.env.SANITY_API_READ_TOKEN ? serverClient : client
  
  return fetchClient.fetch<T>(query, params, {
    next: {
      revalidate: 0,
      tags,
    },
  })
}
