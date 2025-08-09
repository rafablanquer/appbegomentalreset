import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const ContentCollections: CollectionConfig<'content-collections'> = {
    slug: 'content-collections',
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticated,
        update: authenticated,
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'updatedAt'],
    },
    fields: [
        { name: 'title', type: 'text', required: true },
        {
            name: 'items',
            type: 'array',
            label: 'Ítems',
            fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'intro', type: 'textarea' },
                {
                    name: 'video',
                    type: 'upload',
                    relationTo: 'media',
                },
                { name: 'youtubeUrl', type: 'text' },
                { name: 'externalUrl', type: 'text' },
            ],
        },
        ...slugField(),
    ],
}


