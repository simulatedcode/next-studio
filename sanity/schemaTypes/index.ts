import { type SchemaTypeDefinition } from 'sanity'
import { studioType } from './studio'
import { workType } from './work'
import { processType } from './process'
import { archiveType } from './archive'
import { authorType } from './author'
import { categoryType } from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [studioType, workType, processType, archiveType, authorType, categoryType],
}
