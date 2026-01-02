import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface CardProps {
    title: string
    image?: any
    description?: string
    href?: string
    date?: string
}

export default function Card({ title, image, description, href, date }: CardProps) {
    const cardContent = (
        <div className="group relative h-full overflow-hidden border border-black/5 bg-white p-4 transition-all hover:shadow-xl dark:border-white/5 dark:bg-zinc-900">
            {image && (
                <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                    <Image
                        src={urlFor(image).url()}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
            )}
            <div className="flex flex-col gap-1">
                {date && (
                    <time className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                        {new Intl.DateTimeFormat('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        }).format(new Date(date))}
                    </time>
                )}
                <h3 className="text-xl font-semibold text-black dark:text-white leading-tight">{title}</h3>
                {description && (
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
                )}
            </div>
        </div>
    )

    if (href) {
        return <Link href={href}>{cardContent}</Link>
    }

    return cardContent
}
