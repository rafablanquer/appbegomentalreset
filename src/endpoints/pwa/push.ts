// import webpush from "web-push";
import type { Payload } from "payload";

export default (payload: Payload) => ({
    path: "/push/subscribe",
    method: "post",
    handler: async (req, res) => {
        const sub = req.body; // { endpoint, keys:{p256dh,auth} }
        await payload.create({ collection: "push_subscriptions", data: { sub } });
        res.sendStatus(201);
    },
});
