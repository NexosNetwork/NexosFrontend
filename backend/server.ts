import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { join } from 'path';
import shopifyRoutes from './routes/shopify';

// Load .env from project root, with debug logging
const envPath = join(process.cwd(), '.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });

// Debug environment variables
const clientId = process.env.SHOPIFY_CLIENT_ID;
console.log('Loaded environment variables:', {
  clientId: clientId ? clientId.substring(0, 8) + '...' : 'undefined',
  hasSecret: !!process.env.SHOPIFY_CLIENT_SECRET,
  cwd: process.cwd(),
  dirname: __dirname
});

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', shopifyRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 