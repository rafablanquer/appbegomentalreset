import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const MembershipPayments: CollectionConfig<'membership-payments'> = {
    slug: 'membership-payments',
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticated,
        update: authenticated,
    },
    admin: {
        defaultColumns: ['user', 'stripeInvoiceId', 'amount', 'status', 'createdAt'],
        useAsTitle: 'stripeInvoiceId',
    },
    fields: [
        { name: 'user', type: 'relationship', relationTo: 'users', required: true },
        { name: 'stripeInvoiceId', type: 'text' },
        { name: 'stripeSubscriptionId', type: 'text' },
        { name: 'amount', type: 'number' },
        { name: 'currency', type: 'text', defaultValue: 'eur' },
        { name: 'status', type: 'text' },
        { name: 'periodStart', type: 'date' },
        { name: 'periodEnd', type: 'date' },
        { name: 'raw', type: 'json' },
    ],
}


