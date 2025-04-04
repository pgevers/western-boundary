import express from 'express';

const router = express.Router();

let cart = [];

// GET /api/cart - View cart
router.get('/', (req, res) => {
  res.json(cart);
});

// POST /api/cart - Add item to cart
router.post('/', (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Missing productId or quantity' });
  }

  // Add to cart (basic version — no merging items yet)
  cart.push({ productId, quantity });

  res.status(201).json({
    message: 'Item added to cart',
    cart,
  });
});

export default router;
