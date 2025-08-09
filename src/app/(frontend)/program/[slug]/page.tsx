import { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import ProgramPanel from '@/domains/content/program/components/ProgramPanel'
import RichText from '@/components/RichText'
import ProtectedRoute from '@/components/ProtectedRoute'
import { RouteProtection } from '@/utilities/membership'

type Params = { params: Promise<{ slug: string }> }

function secondsToClock(total?: number | null): string {
  const sec = typeof total === 'number' && total > 0 ? total : 0
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}


export default async function ProgramPage({ params }: Params) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'programs',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    pagination: false,
  })

  const program = result.docs?.[0]
  if (!program) {
    return null
  }

  console.log("program", program)
  const activities = (program.audios || []).map((a: any, idx: number) => {
    const media = a?.audio && typeof a.audio === 'object' ? a.audio : null
    const audioUrl = media?.url || a?.externalUrl || ''
    return {
      id: idx + 1,
      title: String(a?.title || `Audio ${idx + 1}`),
      description: String(a?.description || ''),
      duration: secondsToClock(a?.durationSeconds),
      audioUrl,
    }
  })

  const heroPath = program?.image && typeof program.image === 'object' && program.image?.url
    ? String(program.image.url)
    : undefined

  const descriptionNode = program?.description ? (
    <RichText data={program.description as any} enableGutter={false} enableProse={false} />
  ) : undefined

  return (
    <ProtectedRoute protection={RouteProtection.MEMBERSHIP}>
      <ProgramPanel
        title={String(program.title || '')}
        description={descriptionNode}
        keywords={[]}
        activities={activities}
        heroPath={heroPath}
      />
    </ProtectedRoute>
  )
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `${slug} · Programa`,
  }
}


