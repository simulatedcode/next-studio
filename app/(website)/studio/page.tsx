import { sanityFetch } from '@/sanity/lib/live'
import { STUDIO_QUERY } from '@/sanity/lib/queries'
import Card from '@/components/Card'

export default async function StudioPage() {
    const { data: studios } = await sanityFetch({ query: STUDIO_QUERY })

    return (
        <div className="container mx-auto max-w-7xl px-6 py-24">
            <h1 className="mb-12 text-5xl font-bold tracking-tight text-black dark:text-white">Studio</h1>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {studios.map((studio: any) => (
                    <Card
                        key={studio._id}
                        title={studio.title}
                        image={studio.mainImage}
                        date={studio.publishedAt}
                        href={`/studio/${studio.slug}`}
                        description={studio.content ? "View studio details" : undefined}
                    />
                ))}
                {studios.length === 0 && (
                    <p className="col-span-full text-zinc-600 dark:text-zinc-400">No studio items found. Add some in Sanity Studio!</p>
                )}
            </div>
        </div>
    )
}
