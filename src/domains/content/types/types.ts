

export interface AudioTrack {
    id: number
    title: string
    description: string
    duration: string
    audioUrl: string
    completed?: boolean
    unlocked?: boolean
    day?: number
}

export interface SessionGroup {
    id: number
    day: number
    title: string
    shortTitle?: string
    description: string
    duration: string
    audioUrl: string
    completed: boolean
    unlocked: boolean
}
