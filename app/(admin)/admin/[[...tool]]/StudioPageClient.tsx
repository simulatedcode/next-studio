"use client"

import dynamicComponent from 'next/dynamic'

const Studio = dynamicComponent(() => import('./Studio'), {
    ssr: false,
    loading: () => (
        <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
            <div className="text-sm font-medium text-zinc-500 animate-pulse">
                Initializing Studio...
            </div>
        </div>
    )
})

export default function StudioPageClient() {
    return <Studio />
}
