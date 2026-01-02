import { sanityFetch } from '@/sanity/lib/live'
import { PROCESS_QUERY } from '@/sanity/lib/queries'
import Card from '@/components/Card'

export default async function ProcessPage() {
    const { data: processes } = await sanityFetch({ query: PROCESS_QUERY })

    return (
        <div className="container mx-auto max-w-7xl px-6 py-24">
            <h1 className="mb-12 text-5xl font-bold tracking-tight text-black dark:text-white">Process</h1>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {processes.map((process: any) => (
                    <Card
                        key={process._id}
                        title={process.title}
                        image={process.mainImage}
                        date={process.publishedAt}
                        href={`/process/${process.slug}`}
                        description={process.content ? "Explore the process" : undefined}
                    />
                ))}
                {processes.length === 0 && (
                    <p className="col-span-full text-zinc-600 dark:text-zinc-400">No process items found. Add some in Sanity Studio!</p>
                )}
            </div>
        </div>
    )
}
