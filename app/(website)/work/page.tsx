import { sanityFetch } from '@/sanity/lib/live'
import { WORK_QUERY } from '@/sanity/lib/queries'
import Card from '@/components/Card'

export default async function WorkPage() {
    const { data: works } = await sanityFetch({ query: WORK_QUERY })

    return (
        <div className="container mx-auto max-w-7xl px-6 py-24">
            <h1 className="mb-12 text-5xl font-bold tracking-tight text-black dark:text-white">Work</h1>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {works.map((work: any) => (
                    <Card
                        key={work._id}
                        title={work.title}
                        image={work.mainImage}
                        date={work.publishedAt}
                        description={work.content ? "View project details" : undefined}
                        href={`/work/${work.slug}`}
                    />
                ))}
                {works.length === 0 && (
                    <p className="col-span-full text-zinc-600 dark:text-zinc-400">No work items found. Add some in Sanity Studio!</p>
                )}
            </div>
        </div>
    )
}
