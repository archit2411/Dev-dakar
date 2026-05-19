// Vercel serverless function — Wati WhatsApp chatbot reservation trigger
// Deploy at: api/send-reservation.js
// Set WATI_API_URL, WATI_API_TOKEN, OWNER_WHATSAPP in Vercel environment variables.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, date, time, guests, occasion, note } = req.body || {};

  if (!name || !phone || !date || !time || !guests) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Basic phone sanitisation — digits only, strip leading zeros / country code duplication
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  const WATI_API_URL   = process.env.WATI_API_URL;
  const WATI_API_TOKEN = process.env.WATI_API_TOKEN;
  const OWNER_NUMBER   = process.env.OWNER_WHATSAPP;

  if (!WATI_API_URL || !WATI_API_TOKEN) {
    return res.status(500).json({ error: 'Wati not configured' });
  }

  try {
    // Send template confirmation message to the customer
    const templateRes = await fetch(`${WATI_API_URL}/api/v1/sendTemplateMessage`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WATI_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        template_name:  'reservation_confirmation',
        broadcast_name: 'website_reservation',
        receivers: [{
          whatsappNumber: cleanPhone,
          customParams: [
            { name: '1', value: name },
            { name: '2', value: date },
            { name: '3', value: time },
            { name: '4', value: String(guests) },
            { name: '5', value: occasion || 'General' }
          ]
        }]
      })
    });

    const templateResult = await templateRes.json();
    if (!templateResult.result) {
      throw new Error(JSON.stringify(templateResult));
    }

    // Notify restaurant owner
    if (OWNER_NUMBER) {
      await fetch(`${WATI_API_URL}/api/v1/sendSessionMessage/${OWNER_NUMBER}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WATI_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messageText: [
            '🔔 *New Reservation!*',
            `👤 ${name}`,
            `📞 ${phone}`,
            `📅 ${date} at ${time}`,
            `👥 ${guests} guests`,
            `🎉 ${occasion || 'N/A'}`,
            note ? `📝 ${note}` : ''
          ].filter(Boolean).join('\n')
        })
      });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Wati API error:', err.message);
    res.status(500).json({ error: 'Failed to send reservation message' });
  }
}
