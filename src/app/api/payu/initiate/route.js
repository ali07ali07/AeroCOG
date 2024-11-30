import crypto from 'crypto';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    let body;

    // Parse the JSON body
    try {
      body = await req.json();
    } catch (error) {
      console.error("Invalid JSON input:", error);
      return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
    }

    const { firstname, email, amount, productinfo, txnid, phone } = body;

    // Validate required fields
    if (!firstname || !email || !amount || !productinfo || !txnid) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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

    // Construct the string for hash generation
    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
    
    // Generate the hash using SHA-512
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');
    payload.hash = hash;

    // Return the payload for client-side submission to PayU
    return NextResponse.json({ payload }, { status: 200 });
  } catch (error) {
    console.error("Error in /payu/initiate:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
