import { sanityFetch } from '@/sanity/lib/live'
import { ARCHIVE_QUERY } from '@/sanity/lib/queries'
import Link from 'next/link'

export default async function ArchivePage() {
    const { data: archives } = await sanityFetch({ query: ARCHIVE_QUERY })

    return (
        <div className="container mx-auto max-w-7xl px-6 py-24">
            <h1 className="mb-12 text-5xl font-bold tracking-tight text-black dark:text-white">Archive</h1>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-black/5 dark:border-white/5">
                            <th className="py-4 font-semibold uppercase text-xs tracking-wider text-zinc-500">Title</th>
                            <th className="py-4 font-semibold uppercase text-xs tracking-wider text-zinc-500">Published Date</th>
                            <th className="py-4 font-semibold uppercase text-xs tracking-wider text-zinc-500">Category</th>
                            <th className="py-4 font-semibold uppercase text-xs tracking-wider text-zinc-500">Artist Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {archives.map((item: any) => (
                            <tr key={item._id} className="border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group text-sm">
                                <td className="py-4">
                                    <Link href={`/archive/${item.slug}`} className="font-semibold text-black dark:text-white hover:underline underline-offset-4">
                                        {item.title}
                                    </Link>
                                </td>
                                <td className="py-4 text-zinc-500">
                                    {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                                </td>
                                <td className="py-4">
                                    <span className="text-zinc-500 uppercase tracking-wide text-xs">
                                        {item.categories && item.categories.length > 0 ? item.categories.join(', ') : '–'}
                                    </span>
                                </td>
                                <td className="py-4">
                                    {item.artistName ? (
                                        item.instagramUrl ? (
                                            <a
                                                href={item.instagramUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors flex items-center justify-end gap-1"
                                            >
                                                <span>{item.artistName}</span>
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.315 2c2.43 0 2.784.012 3.823.06 1.062.049 1.591.218 1.974.365.507.197.911.433 1.292.813.38.38.616.784.813 1.292.147.383.316.912.365 1.974.048 1.039.06 1.394.06 3.823s-.012 2.784-.06 3.823c-.049 1.062-.218 1.591-.365 1.974-.197.507-.433.911-.813 1.292-.38.38-.784.616-1.292.813-.383.147-.912.316-1.974.365-1.039.048-1.394.06-3.823.06s-2.784-.012-3.823-.06c-1.062-.049-1.591-.218-1.974-.365-.507-.197-.911-.433-1.292-.813-.38-.38-.616-.784-.813-1.292-.147-.383-.316-.912-.365-1.974-.048-1.039-.06-1.394-.06-3.823s.012-2.784.06-3.823c.049-1.062.218-1.591.365-1.974.197-.507.433-.911.813-1.292.38-.38.784-.616 1.292-.813.383-.147.912-.316 1.974-.365 1.039-.048 1.394-.06 3.823-.06zm0 2.235c-2.39 0-2.682.01-3.628.056-.913.042-1.41.196-1.741.325-.438.17-.75.372-1.079.701-.329.33-.531.641-.701 1.079-.13.331-.283.828-.325 1.741-.046.946-.056 1.238-.056 3.628s.01 2.682.056 3.628c.042.913.196 1.41.325 1.741.17.438.372.75.701 1.079.33.329.641.531 1.079.701.331.13.828.283 1.741.325.946.046 1.238.056 3.628.056s2.682-.01 3.628-.056c.913-.042 1.41-.196 1.741-.325.438-.17.75-.372 1.079-.701.329-.33.531-.641.701-1.079.13-.331.283-.828.325-1.741.046-.946.056-1.238.056-3.628s-.01-2.682-.056-3.628c-.042-.913-.196-1.41-.325-1.741-.17-.438-.372-.75-.701-1.079-.33-.329-.641-.531-1.079-.701-.331-.13-.828-.283-1.741-.325-.946-.046-1.238-.056-3.628-.056zm0 2.659c2.723 0 4.931 2.208 4.931 4.931s-2.208 4.931-4.931 4.931-4.931-2.208-4.931-4.931 2.208-4.931 4.931-4.931zm0 7.628c1.489 0 2.697-1.208 2.697-2.697s-1.208-2.697-2.697-2.697-2.697 1.208-2.697 2.697 1.208 2.697 2.697 2.697zm6.304-8.791c0 .536-.434.97-.97.97s-.97-.434-.97-.97.434-.97.97-.97.97.434.97.97z" /></svg>
                                            </a>
                                        ) : (
                                            <span className="text-zinc-500 uppercase tracking-wide text-xs">
                                                {item.artistName}
                                            </span>
                                        )
                                    ) : (
                                        <span className="text-zinc-300 dark:text-zinc-700">–</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {archives.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-8 text-zinc-600 dark:text-zinc-400 text-center">
                                    No archive items found. Add some in Sanity Studio!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
