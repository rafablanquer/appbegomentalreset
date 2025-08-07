import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Neurodespertar - Bego Mental Reset",
        short_name: "Neurodespertar",
        description: "Activa tu mente. Dirige tu día desde el primer pensamiento.",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#f5f5dc",
        theme_color: "#8b7355",
        icons: [
            {
                src: "/apple-touch-icon-57x57.png",
                sizes: "57x57",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "/apple-touch-icon-72x72.png",
                sizes: "72x72",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "/apple-touch-icon-76x76.png",
                sizes: "76x76",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "/apple-touch-icon-114x114.png",
                sizes: "114x114",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "/apple-touch-icon-120x120.png",
                sizes: "120x120",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "/apple-touch-icon-144x144.png",
                sizes: "144x144",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "/apple-touch-icon-152x152.png",
                sizes: "152x152",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "/apple-touch-icon-180x180.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "/favicon.ico",
                sizes: "32x32",
                type: "image/x-icon",
                purpose: "any"
            },
        ],
        scope: "/",
        categories: ["health", "lifestyle", "medical"],
        prefer_related_applications: false,
        display_override: ["standalone"],
        lang: "es"
    }
}
