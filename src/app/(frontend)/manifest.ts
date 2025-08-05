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
                src: "/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
        scope: "/",
        screenshots: [
            { src: "/screenshots/home.png", sizes: "1242x2688", type: "image/png", form_factor: "narrow" }
        ],
        categories: ["health", "education"],
        prefer_related_applications: false
    }
}
