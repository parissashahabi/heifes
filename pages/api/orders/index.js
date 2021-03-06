import nc from 'next-connect';
import Order from '../../../models/order';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
    onError,
});
handler.use(isAuth);

handler.post(async (req, res) => {
    await db.connect();
    const newOrder = new Order({
        ...req.body,
        customer: req.customer._id,
        trackingCode: Math.floor(100000 + Math.random() * 900000),
    });
    const order = await newOrder.save();
    res.status(201).send(order);
});

export default handler;