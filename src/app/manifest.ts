import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Neurodespertar - Bego Mental Reset",
        short_name: "Neurodespertar",
        description: "Activa tu mente. Dirige tu día desde el primer pensamiento.",
        start_url: "/",
        display: "standalone",
        background_color: "#f5f5dc",
        theme_color: "#8b7355",
        icons: [
            {
                src: "/apple-touch-icon-180x180.png",
                sizes: "180x180",
                type: "image/png",
            },
            {
                src: "/apple-touch-icon-152x152.png",
                sizes: "152x152",
                type: "image/png",
            },
            {
                src: "/favicon.ico",
                sizes: "32x32",
                type: "image/x-icon",
            },
        ],
        scope: "/",
        categories: ["health", "education"],
        prefer_related_applications: false
    }
}
