'use client'

import { useEffect, useState } from 'react'
import { db } from '@/app/lib/firebase/client'
import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore'
import { Eye } from 'lucide-react'

interface ViewCounterProps {
    slug: string
    collectionName?: string
}

export function ViewCounter({ slug, collectionName = 'views' }: ViewCounterProps) {
    const [views, setViews] = useState<number | null>(null)

    useEffect(() => {
        if (!slug) return

        const docRef = doc(db, collectionName, slug)

        // Increment view count if not already incremented in this session
        const incrementView = async () => {
            const sessionKey = `viewed-${collectionName}-${slug}`
            if (sessionStorage.getItem(sessionKey)) return

            try {
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    await updateDoc(docRef, {
                        count: increment(1)
                    })
                } else {
                    await setDoc(docRef, {
                        count: 1
                    })
                }
                sessionStorage.setItem(sessionKey, 'true')
            } catch (error) {
                console.error("Error incrementing view count:", error)
            }
        }

        incrementView()

        // Listen for changes
        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                setViews(doc.data().count)
            }
        })

        return () => unsubscribe()
    }, [slug, collectionName])

    if (views === null) return null

    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700">
            <Eye className="h-3.5 w-3.5 text-zinc-500" />
            <span className="text-xs font-semibold tabular-nums text-zinc-600 dark:text-zinc-400">
                {views.toLocaleString()} <span className="font-normal opacity-70">views</span>
            </span>
        </div>
    )
}
