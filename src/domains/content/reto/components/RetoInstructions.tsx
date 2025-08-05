"use client"

import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function RetoInstructions() {
    return (
        <main className="h-[100dvh] flex flex-col bg-white">
            {/* Header */}
            <header className="flex items-center justify-between px-4 h-12 border-b bg-white">
                <Link href="/reto-bmr" className="w-8 h-8 flex items-center justify-center">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <h1 className="font-semibold text-gray-800">Instrucciones del Reto</h1>
                <div className="w-8" />
            </header>

            {/* PDF Viewer */}
            <div className="flex-1">
                <iframe
                    src="/Reto-BMR.pdf#page=1&zoom=page-fit"
                    className="w-full h-full border-0"
                    title="Instrucciones del reto BMR"
                />
            </div>
        </main>
    )
}
