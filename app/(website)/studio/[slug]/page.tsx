import { sanityFetch } from "@/sanity/lib/live"
import { STUDIO_ITEM_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { PortableText } from "@/components/PortableText"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ViewCounter } from "@/components/ViewCounter"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

export async function generateStaticParams() {
  const items = await client.fetch<Array<{ slug: string }>>(
    groq`*[_type == "studio" && defined(slug.current)]{ "slug": slug.current }`
  )

  return items.map((item) => ({
    slug: item.slug,
  }))
}

export default async function StudioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await sanityFetch({
    query: STUDIO_ITEM_QUERY,
    params: { slug },
  })

  if (!item?.data) {
    notFound()
  }

  const { title, mainImage, content, body } = item.data

  return (
    <article className="container mx-auto max-w-full">
      {mainImage && (
        <div className="relative mb-12 aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={urlFor(mainImage).url()}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h1>
        <div className="mb-8">
          <ViewCounter slug={slug} collectionName="studio-views" />
        </div>
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          {content && <PortableText value={content} />}
          {body && <PortableText value={body} />}
        </div>

      </div>
    </article>
  )
}
