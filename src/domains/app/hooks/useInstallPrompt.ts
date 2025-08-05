import { useEffect, useState } from "react";

export function useInstallPrompt() {
    const [deferred, setDeferred] = useState<any>(null);
    useEffect(() => {
        const onPrompt = (e: any) => { e.preventDefault(); setDeferred(e); };
        window.addEventListener("beforeinstallprompt", onPrompt);
        return () => window.removeEventListener("beforeinstallprompt", onPrompt);
    }, []);
    const promptInstall = async () => {
        if (!deferred) return false;
        deferred.prompt();
        const { outcome } = await deferred.userChoice;
        setDeferred(null);
        return outcome === "accepted";
    };
    return { canInstall: !!deferred, promptInstall };
}


// workbox.routing.registerRoute(
//     /\/api\/progreso$/,
//     new workbox.strategies.NetworkOnly({
//       plugins: [
//         new workbox.backgroundSync.BackgroundSyncPlugin("progresoQueue", {
//           maxRetentionTime: 24 * 60, // minutos
//         }),
//       ],
//     }),
//     "POST"
//   );


// webpush.setVapidDetails("mailto:soporte@tuapp.com", VAPID_PUBLIC, VAPID_PRIVATE);
// await webpush.sendNotification(subscription, JSON.stringify({
//   title: "Día 8 listo", body: "Continúa tu reto", url: "/reto-bmr"
// }));

// self.addEventListener("push", e => {
//     const data = e.data?.json() || {};
//     e.waitUntil(self.registration.showNotification(data.title || "Aviso", {
//       body: data.body, icon: "/icons/icon-192.png", badge: "/icons/badge-72.png", data: { url: data.url }
//     }));
//   });
//   self.addEventListener("notificationclick", e => {
//     e.notification.close();
//     e.waitUntil(clients.openWindow(e.notification.data?.url || "/"));
//   });