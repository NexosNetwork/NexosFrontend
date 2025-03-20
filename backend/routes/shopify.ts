import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

interface ShopifyQuery {
  code?: string;
  shop?: string;
  state?: string;
}

router.get('/auth/shopify/callback', 
  async (req: Request<{}, {}, {}, ShopifyQuery>, res: Response): Promise<void> => {
    try {
      const { code, shop, state } = req.query;
      console.log('1. Received OAuth callback:', { code, shop, state });

      if (!code || !shop) {
        console.error('2. Missing required parameters');
        res.status(400).send('Missing required parameters');
        return;
      }

      // Verify environment variables
      console.log('3. Checking environment variables:', {
        hasClientId: !!process.env.SHOPIFY_CLIENT_ID,
        hasClientSecret: !!process.env.SHOPIFY_CLIENT_SECRET,
        clientIdMatches: process.env.SHOPIFY_CLIENT_ID === 'e4d0ca0347ddc5854ece301b1390c132'
      });

      const tokenUrl = `https://${shop}/admin/oauth/access_token`;
      console.log('4. Token URL:', tokenUrl);

      const requestBody = {
        client_id: process.env.SHOPIFY_CLIENT_ID,
        client_secret: process.env.SHOPIFY_CLIENT_SECRET,
        code: code
      };
      
      // Add more detailed logging
      console.log('Debug request:', {
        env_vars_present: {
          SHOPIFY_CLIENT_ID: !!process.env.SHOPIFY_CLIENT_ID,
          SHOPIFY_CLIENT_SECRET: !!process.env.SHOPIFY_CLIENT_SECRET
        },
        request_body_present: {
          client_id: !!requestBody.client_id,
          client_secret: !!requestBody.client_secret,
          code: !!requestBody.code
        },
        // Log partial values to verify correctness
        client_id_start: requestBody.client_id?.substring(0, 8),
        client_secret_start: requestBody.client_secret?.substring(0, 8),
        // Log lengths to verify no whitespace issues
        client_id_length: requestBody.client_id?.length,
        client_secret_length: requestBody.client_secret?.length
      });

      try {
        const response = await fetch(tokenUrl, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          // Log what's actually being sent
          body: JSON.stringify(requestBody, null, 2)
        });

        const responseText = await response.text();
        console.log('6. Response status:', response.status);
        console.log('7. Response headers:', Object.fromEntries(response.headers));
        console.log('8. Response body:', responseText);

        if (!response.ok) {
          throw new Error(`Shopify API error (${response.status}): ${responseText}`);
        }

        try {
          const data = JSON.parse(responseText);
          console.log('9. Successfully parsed response');
          res.redirect(`http://localhost:4200/dashboard?token=${data.access_token}`);
        } catch (parseError) {
          console.error('10. JSON parse error:', parseError);
          throw new Error('Invalid JSON response from Shopify');
        }
      } catch (fetchError) {
        console.error('11. Fetch error:', fetchError);
        throw fetchError;
      }
    } catch (error) {
      console.error('12. Final error handler:', error);
      res.status(500).send(error instanceof Error ? error.message : 'Internal server error');
    }
  }
);

export default router; 