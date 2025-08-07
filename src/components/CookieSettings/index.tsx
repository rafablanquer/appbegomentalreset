'use client'

import React from 'react'

export function CookieSettingsButton() {
    const handleResetCookies = () => {
        localStorage.removeItem('cookie-consent')
        window.location.reload()
    }

    return (
        <button
            onClick={handleResetCookies}
            className="text-white hover:text-gray-300 text-sm"
        >
            Configurar Cookies
        </button>
    )
}