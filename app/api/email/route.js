import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(request) {
  try {
    const { to, subject, html } = await request.json();

    if (!process.env.RESEND_API_KEY) {
      console.log('--- MOCK EMAIL SENT ---');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`HTML: ${html}`);
      console.log('-----------------------');
      return NextResponse.json({ success: true, message: 'Mock email sent' });
    }

    const data = await resend.emails.send({
      from: 'Astra NCR <hello@astrancr.co.uk>', // Replace with your verified domain
      to,
      subject,
      html
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
