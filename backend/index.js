import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';
import cors from 'cors';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
console.log('✅ .env loaded');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
  });
  
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);


sequelize.authenticate()
  .then(() => {
    console.log('✅ PostgreSQL connected successfully!');
  })
  .catch(err => {
    console.error('❌ DB connection failed:', err);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

