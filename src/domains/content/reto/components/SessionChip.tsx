import { Session } from "./RetoPanel";
import {
    Check,
    Lock,
    Clock,
} from "lucide-react"

function SessionChip({ session, onSelect }: { session: Session; onSelect: () => void }) {
    const getStatusIcon = () => {
        if (session.completed) return <Check className="w-4 h-4 text-green-600" />
        if (!session.unlocked) return <Lock className="w-4 h-4 text-gray-400" />
        return <Clock className="w-4 h-4 text-purple-600" />
    }

    const getStatusColor = () => {
        if (session.completed) return "border-green-200 bg-green-50"
        if (!session.unlocked) return "border-gray-200 bg-gray-50"
        return "border-purple-200 bg-white hover:bg-purple-50"
    }

    return (
        <button
            onClick={session.unlocked ? onSelect : undefined}
            className={`snap-start shrink-0 w-64 h-24 rounded-2xl border p-3 text-left transition-all ${getStatusColor()} ${!session.unlocked ? "cursor-not-allowed" : "hover:shadow-md"
                }`}
            disabled={!session.unlocked}
        >
            <div className="flex items-start justify-between mb-1">
                <div className="text-sm font-medium line-clamp-1 text-gray-800">{session.shortTitle}</div>
                {getStatusIcon()}
            </div>
            <div className="text-xs text-gray-500">{session.duration}</div>
            <div className="text-xs text-purple-600 font-medium">Día {session.day}</div>
        </button>
    )
}

export default SessionChip