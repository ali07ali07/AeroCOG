const express = require('express');
const next = require('next');
const payu = require('payu'); // Ensure you have the PayU package installed

// Initialize the Next.js app
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Create an Express server
const server = express();

// Middleware to parse JSON requests
server.use(express.json());

// Define your API routes
server.post('/api/payu/initiate', async (req, res) => {
  try {
    const { firstname, email, amount, productinfo, txnid, phone } = req.body;

    // Validate required fields
    if (!firstname || !email || !amount || !productinfo || !txnid) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Define PayU Merchant Credentials
    const key = process.env.PAYU_KEY;
    const salt = process.env.PAYU_SALT;

    // Prepare the payload
    const payload = {
      key,               // Merchant Key
      txnid,             // Transaction ID (Unique for every transaction)
      amount,            // Transaction Amount
      productinfo,       // Product Description
      firstname,         // Customer's First Name
      email,             // Customer's Email
      phone,             // Customer's Phone (optional)
      surl: `${process.env.NEXT_PUBLIC_BASE_URL}/success`, // Success URL
      furl: `${process.env.NEXT_PUBLIC_BASE_URL}/failure`, // Failure URL
      curl: `${process.env.NEXT_PUBLIC_BASE_URL}/failure`, // Cancel URL
    };

    // Generate the hash
    const hash = payu.hash(payload, salt);
    payload.hash = hash;

    // Return the payload for client-side submission to PayU
    res.status(200).json({ payload });
  } catch (error) {
    console.error('Error in /payu/initiate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve static and dynamic Next.js pages
server.all('*', (req, res) => {
  return handle(req, res); // Pass all requests to Next.js handler
});

// Start the server
app.prepare().then(() => {
  server.listen(5000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:5000');
  });
});
