import { sanityFetch } from "@/sanity/lib/live"
import { WORK_ITEM_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { PortableText } from "@/components/PortableText"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ViewCounter } from "@/components/ViewCounter"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

export async function generateStaticParams() {
    const items = await client.fetch<Array<{ slug: string }>>(
        groq`*[_type == "work" && defined(slug.current)]{ "slug": slug.current }`
    )

    return items.map((item) => ({
        slug: item.slug,
    }))
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = await sanityFetch({
        query: WORK_ITEM_QUERY,
        params: { slug },
    })

    if (!project?.data) {
        notFound()
    }

    const { title, mainImage, content, body } = project.data

    return (
        <article className="container mx-auto max-w-4xl px-4 py-24">
            {mainImage && (
                <div className="relative mb-12 aspect-video overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
                    <Image
                        src={urlFor(mainImage).url()}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                {title}
            </h1>
            <div className="mb-8">
                <ViewCounter slug={slug} collectionName="work-views" />
            </div>
            <div className="prose prose-zinc max-w-none dark:prose-invert">
                {content && <PortableText value={content} />}
                {body && <PortableText value={body} />}
            </div>
        </article>
    )
}
