'use client'

import { useState, useEffect } from 'react'
import canUseDOM from '@/utilities/canUseDOM'

const FIRST_VISIT_KEY = 'neurodespertar-first-visit'

export const useFirstVisit = () => {
    const [isFirstVisit, setIsFirstVisit] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!canUseDOM) {
            setIsLoading(false)
            return
        }

        try {
            const hasVisited = localStorage.getItem(FIRST_VISIT_KEY)
            setIsFirstVisit(!hasVisited)
        } catch (error) {
            console.warn('Error accessing localStorage:', error)
            setIsFirstVisit(false)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const markAsVisited = () => {
        if (!canUseDOM) return

        try {
            localStorage.setItem(FIRST_VISIT_KEY, 'true')
            setIsFirstVisit(false)
        } catch (error) {
            console.warn('Error setting localStorage:', error)
        }
    }

    const resetFirstVisit = () => {
        if (!canUseDOM) return

        try {
            localStorage.removeItem(FIRST_VISIT_KEY)
            setIsFirstVisit(true)
        } catch (error) {
            console.warn('Error removing from localStorage:', error)
        }
    }

    return {
        isFirstVisit,
        isLoading,
        markAsVisited,
        resetFirstVisit,
    }
}