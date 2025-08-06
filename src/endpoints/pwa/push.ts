// import webpush from "web-push";
import type { Payload } from "payload";

export default (payload: Payload) => ({
    path: "/push/subscribe",
    method: "post",
    handler: async (req: any, res: any) => {
        const sub = req.body; // { endpoint, keys:{p256dh,auth} }
        // TODO: Crear collection push_subscriptions
        // await payload.create({ collection: "push_subscriptions", data: { sub } });
        console.log('Push subscription:', sub);
        res.sendStatus(201);
    },
});
