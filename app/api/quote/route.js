import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // In production, these should be environment variables:
    // process.env.SMTP_HOST
    // process.env.SMTP_PORT
    // process.env.SMTP_USER
    // process.env.SMTP_PASS
    
    // For now, we will just simulate a successful processing or use a test account if configured
    
    console.log('Received Quote Request:', data);
    
    /* 
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"Astra Enterprises Website" <no-reply@astraenterprises.com>',
      to: 'your-email@example.com',
      subject: `New Quote Request from ${data.name}`,
      text: JSON.stringify(data, null, 2),
      html: `<p>New quote request details:</p><pre>${JSON.stringify(data, null, 2)}</pre>`
    });
    */

    return NextResponse.json({ success: true, message: 'Quote requested successfully' });
  } catch (error) {
    console.error('Error processing quote:', error);
    return NextResponse.json({ success: false, message: 'Failed to process quote' }, { status: 500 });
  }
}
