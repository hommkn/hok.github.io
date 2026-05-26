/**
 * BeadSnap Creem Webhook Handler
 * Deployed to Cloudflare Workers — receives Creem payment events.
 */

// Verify Creem webhook signature using HMAC-SHA256
async function verifySignature(body, signature, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sigBytes = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
  const computedSig = Array.from(new Uint8Array(sigBytes))
    .map(b => b.toString(16).padStart(2, '0')).join('');
  return computedSig === signature;
}

export default {
  async fetch(request, env) {
    // Only accept POST
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const body = await request.text();
    const signature = request.headers.get('creem-signature');

    if (!signature || !env.CREEM_WEBHOOK_SECRET) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Verify signature
    const valid = await verifySignature(body, signature, env.CREEM_WEBHOOK_SECRET);
    if (!valid) {
      return new Response('Invalid signature', { status: 403 });
    }

    // Parse event
    let event;
    try {
      event = JSON.parse(body);
    } catch {
      return new Response('Invalid JSON', { status: 400 });
    }

    const eventType = event.type || 'unknown';
    console.log(`[Creem] ${eventType}`, JSON.stringify(event));

    // Handle checkout.completed — send email notification
    if (eventType === 'checkout.completed' && env.NOTIFY_EMAIL) {
      const checkout = event.data;
      try {
        await sendNotification(env.NOTIFY_EMAIL, checkout);
      } catch (err) {
        console.error('Email notification failed:', err);
      }
    }

    return new Response('OK', { status: 200 });
  }
};

// Send email notification via Resend (or any email API)
async function sendNotification(toEmail, checkout) {
  const customerEmail = checkout.customer?.email || 'unknown';
  const amount = checkout.amount ? `$${(checkout.amount / 100).toFixed(2)}` : 'unknown';

  const html = [
    '<h2>New BeadSnap Pro Pattern Purchase</h2>',
    '<table>',
    `<tr><td><strong>Customer:</strong></td><td>${customerEmail}</td></tr>`,
    `<tr><td><strong>Amount:</strong></td><td>${amount}</td></tr>`,
    `<tr><td><strong>Checkout ID:</strong></td><td>${checkout.id || 'N/A'}</td></tr>`,
    `<tr><td><strong>Product:</strong></td><td>Pro Pattern ($5 one-time)</td></tr>`,
    '</table>',
    '<p>View all payments in <a href="https://www.creem.io/dashboard">Creem Dashboard</a>.</p>'
  ].join('');

  // Try Resend first, fall back to fetch
  if (typeof Resend !== 'undefined') {
    const resend = new Resend(env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'BeadSnap <noreply@beadsnap.app>',
      to: toEmail,
      subject: `New BeadSnap Pro Pattern sale — ${amount}`,
      html
    });
  } else {
    // Generic fetch-based email sending — replace with your provider
    console.log('Email notification:', { to: toEmail, subject: `New BeadSnap Pro Pattern sale — ${amount}` });
  }
}
