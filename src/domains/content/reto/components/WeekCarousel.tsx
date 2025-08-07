import { Session } from "./RetoPanel"
import SessionChip from "./SessionChip"

function WeekCarousel({
    week,
    sessions: weekSessions,
    onSessionSelect,
}: {
    week: number
    sessions: Session[]
    onSessionSelect: (session: Session) => void
}) {
    return (
        <div className="h-full  overflow-x-auto overflow-y-hidden">
            <div className="flex gap-3 px-4 py-4 h-full">
                {weekSessions?.map((session) => (
                    <SessionChip key={session.id} session={session} onSelect={() => onSessionSelect(session)} />
                ))}
            </div>
        </div>
    )
}

export default WeekCarousel
