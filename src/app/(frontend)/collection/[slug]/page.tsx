import configPromise from '@payload-config'
import { getPayload } from 'payload'
import ProtectedRoute from '@/components/ProtectedRoute'
import { RouteProtection } from '@/utilities/membership'
import CollectionPanel from '@/domains/content/collection/components/CollectionPanel'

type Params = { params: Promise<{ slug: string }> }

function heroForCollection(slug: string | null | undefined): string {
  const key = (slug || '').toLowerCase()
  const map: Record<string, string> = {
    'respiraciones-conscientes': '/content/collectionRespiracionesConscientes/hero.png',
  }
  return map[key] || '/content/collectionRespiracionesConscientes/hero.png'
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'content-collections',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    pagination: false,
  })

  const collection = result.docs?.[0]
  if (!collection) return null

  const programs = [
    ...(collection.items || []).map((it: any, idx: number) => ({ id: idx + 1, title: String(it?.title || '') })),
  ]

  const heroPath = collection?.image && typeof collection.image === 'object' && collection.image?.url
    ? String(collection.image.url)
    : heroForCollection(collection.slug || '')

  return (
    <ProtectedRoute protection={RouteProtection.MEMBERSHIP}>
      <CollectionPanel
        title={String(collection.title || '')}
        description={String(collection.description || '')}
        keywords={[]}
        programs={programs}
        heroPath={heroPath}
        collection={collection}
      />
    </ProtectedRoute>
  )
}


