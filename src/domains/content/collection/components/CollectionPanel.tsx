'use client'
import Image from 'next/image'
import type React from 'react'

type CollectionPanelProps = {
    title: string
    description?: React.ReactNode | string
    keywords: string[]
    programs: Array<{ id: number | string; title: string }>
    heroPath?: string
    collection?: any
}

const CollectionPanel = ({ title, description, heroPath, programs }: CollectionPanelProps) => {
    return (
        <div className="bg-[rgb(255,250,239)] min-h-screen">
            {/* Header tipo hero como ProgramPanel */}
            <section aria-label="Portada" className="relative">
                <div
                    className="relative w-full"
                    style={{ height: '46vh', minHeight: '340px', maxHeight: '520px' }}
                >
                    {heroPath ? (
                        <Image src={heroPath} alt="Portada de la colección" fill priority className="object-cover" />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-b from-neutral-300 to-neutral-500" />
                    )}

                    {/* Degradado para legibilidad del texto */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/70" />

                    {/* Difuminado inferior para fundir con el fondo */}
                    <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
                        style={{
                            WebkitMaskImage:
                                'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)',
                            maskImage:
                                'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)',
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, var(--background) 100%)',
                        }}
                    />

                    {/* Textos superpuestos */}
                    <div className="absolute inset-0 flex items-end">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6">
                            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold drop-shadow-md">
                                {title}
                            </h1>
                            {description ? (
                                typeof description === 'string' ? (
                                    <p className="mt-2 text-white/90 text-sm sm:text-base md:text-lg max-w-3xl">
                                        {description}
                                    </p>
                                ) : (
                                    <div className="mt-2 text-white/90 text-sm sm:text-base md:text-lg max-w-3xl">
                                        {description}
                                    </div>
                                )
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contenido principal */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-12">
                <section aria-label="Programas" className="mt-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
                        {programs.map((program) => (
                            <div
                                key={program.id}
                                className="relative bg-[rgba(174,188,162,0.9)] border border-[#7C8F74] rounded-3xl p-5 sm:p-6 md:p-7 shadow-lg transition-transform duration-300 cursor-pointer min-h-[120px] sm:min-h-[130px] flex items-center justify-center hover:-translate-y-0.5 hover:shadow-xl"
                            >
                                <h2
                                    className="text-center text-base sm:text-lg font-semibold text-neutral-800 leading-snug mx-auto [max-width:16ch] sm:[max-width:18ch] md:[max-width:20ch]"
                                    style={{
                                        display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                        maxWidth: '25vw'
                                    }}
                                >
                                    {program.title}
                                </h2>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default CollectionPanel