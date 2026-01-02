/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 */

import StudioPageClient from './StudioPageClient'

export const dynamic = 'force-static'

export { viewport } from 'next-sanity/studio'

export function generateStaticParams() {
    return [{ tool: [] }]
}

export default function StudioPage() {
    return <StudioPageClient />
}
