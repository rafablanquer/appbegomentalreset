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
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
            name: 'folders',
            type: 'array',
            label: 'Carpetas',
            labels: { singular: 'Carpeta', plural: 'Carpetas' },
            fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                { name: 'image', type: 'upload', relationTo: 'media' },
                {
                    name: 'items',
                    type: 'array',
                    label: 'Ítems',
                    fields: [
                        { name: 'title', type: 'text', required: true },
                        { name: 'description', type: 'textarea' },
                        { name: 'audio', type: 'upload', relationTo: 'media' },
                        { name: 'video', type: 'upload', relationTo: 'media' },
                        { name: 'youtubeUrl', type: 'text' },
                        { name: 'externalUrl', type: 'text' },
                    ],
                },
            ],
        },
        {
            name: 'items',
            type: 'array',
            label: 'Ítems (sin carpeta)',
            admin: { description: 'Ítems directos en la colección, sin pertenecer a una carpeta' },
            fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                { name: 'audio', type: 'upload', relationTo: 'media' },
                { name: 'video', type: 'upload', relationTo: 'media' },
                { name: 'youtubeUrl', type: 'text' },
                { name: 'externalUrl', type: 'text' },
            ],
        },
        ...slugField(),
    ],
}


