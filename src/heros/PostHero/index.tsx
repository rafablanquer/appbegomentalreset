import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, publishedAt, title } = post

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center">
      {/* Imagen de fondo hero */}
      {heroImage && typeof heroImage !== 'string' && (
        <>
          <Media fill priority imgClassName="object-cover" resource={heroImage} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
        </>
      )}

      {/* Contenido centrado con caja elegante */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">

              {/* Categorías */}
              {categories && categories.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map((category, index) => {
                      if (typeof category === 'object' && category !== null) {
                        const { title: categoryTitle } = category
                        const titleToUse = categoryTitle || 'Sin categoría'

                        return (
                          <span
                            key={index}
                            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm px-4 py-2 rounded-full uppercase tracking-wide font-medium shadow-lg"
                          >
                            {titleToUse}
                          </span>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              )}

              {/* Título */}
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {title}
              </h1>

              {/* Fecha sin label */}
              {publishedAt && (
                <div className="flex justify-center">
                  <time
                    dateTime={publishedAt}
                    className="text-gray-600 font-medium text-lg bg-gray-100 px-4 py-2 rounded-full"
                  >
                    {formatDateTime(publishedAt)}
                  </time>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
