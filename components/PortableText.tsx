import { PortableText as PortableTextComponent } from '@portabletext/react'

const components = {
    block: {
        h1: ({ children }: any) => <h1 className="mb-4 text-4xl font-bold">{children}</h1>,
        h2: ({ children }: any) => <h2 className="mb-3 text-3xl font-bold">{children}</h2>,
        h3: ({ children }: any) => <h3 className="mb-2 text-2xl font-bold">{children}</h3>,
        normal: ({ children }: any) => <p className="mb-4 text-zinc-600 dark:text-zinc-400">{children}</p>,
    },
}

export function PortableText({ value }: { value: any }) {
    return <PortableTextComponent value={value} components={components} />
}
