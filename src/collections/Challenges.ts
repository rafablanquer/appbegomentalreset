import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const Challenges: CollectionConfig<'challenges'> = {
    slug: 'challenges',
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
            name: 'days',
            type: 'array',
            label: 'Días',
            labels: {
                singular: 'Día',
                plural: 'Días',
            },
            fields: [
                { name: 'dayNumber', type: 'number', required: true },
                { name: 'title', type: 'text' },
                { name: 'note', type: 'textarea' },
                { name: 'audio', type: 'upload', relationTo: 'media' },
                { name: 'video', type: 'upload', relationTo: 'media' },
                { name: 'youtubeUrl', type: 'text' },
                { name: 'externalUrl', type: 'text' },
            ],
        },
        ...slugField(),
    ],
    versions: {
        drafts: {
            autosave: { interval: 100 },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
}


