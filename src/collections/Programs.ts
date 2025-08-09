import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import {
    FixedToolbarFeature,
    InlineToolbarFeature,
    HeadingFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Programs: CollectionConfig<'programs'> = {
    slug: 'programs',
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
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'richText',
            editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                ],
            }),
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'audios',
            type: 'array',
            label: 'Listado de audios',
            fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                { name: 'audio', type: 'upload', relationTo: 'media' },
                { name: 'externalUrl', type: 'text' },
                { name: 'durationSeconds', type: 'number' },
            ],
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: { position: 'sidebar' },
        },
        ...slugField(),
    ],
    versions: {
        drafts: {
            autosave: {
                interval: 100,
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
}


