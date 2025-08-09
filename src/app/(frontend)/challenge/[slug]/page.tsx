import ProtectedRoute from '@/components/ProtectedRoute'
import { RouteProtection } from '@/utilities/membership'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import RetoPanel from '@/domains/content/reto/components/RetoPanel'

type Params = { params: Promise<{ slug: string }> }

export default async function ChallengePage({ params }: Params) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'challenges',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    pagination: false,
  })

  const challenge = result.docs?.[0]
  if (!challenge) return null

  const sessions = (challenge.days || []).map((d: any, idx: number) => ({
    id: idx + 1,
    day: Number(d?.dayNumber || idx + 1),
    title: String(d?.title || `Día ${idx + 1}`),
    description: String(d?.note || ''),
    duration: '',
    audioUrl: typeof d?.audio === 'object' && d.audio?.url ? String(d.audio.url) : '',
    completed: false,
    unlocked: true,
  }))

  const pathInstructions = '/content/reto21dias/hero.png'

  return (
    <ProtectedRoute protection={RouteProtection.MEMBERSHIP}>
      <RetoPanel sessions={sessions} pathInstructions={pathInstructions} title={String(challenge.title || '')} description={String(challenge.description || '')} />
    </ProtectedRoute>
  )
}
