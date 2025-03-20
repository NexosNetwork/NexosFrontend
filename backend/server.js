import express from 'express';
import cors from 'cors';
import shopifyRoutes from './routes/shopify.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', shopifyRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 