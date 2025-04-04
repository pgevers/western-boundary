
import express from 'express';

const router = express.Router();

let orders = []; // mock in-memory order list

// POST /api/orders - Submit an order
router.post('/', (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ message: 'Cart is empty or invalid' });
  }

  const newOrder = {
    id: orders.length + 1,
    items: cartItems,
    createdAt: new Date(),
  };

  orders.push(newOrder);

  res.status(201).json({
    message: 'Order placed!',
    order: newOrder,
  });
});

// GET /api/orders - View all orders (for testing)
router.get('/', (req, res) => {
  res.json(orders);
});

export default router;
