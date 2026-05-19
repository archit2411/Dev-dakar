// Vercel serverless function — Instagram Basic Display API proxy
// Deploy at: api/instagram.js
// Set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID in Vercel environment variables.
// Long-lived tokens expire in 60 days — set up a weekly cron to refresh via /refresh_access_token.

export default async function handler(req, res) {
  const TOKEN   = process.env.INSTAGRAM_ACCESS_TOKEN;
  const USER_ID = process.env.INSTAGRAM_USER_ID;

  if (!TOKEN || !USER_ID) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  try {
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
    const url = `https://graph.instagram.com/${USER_ID}/media?fields=${fields}&limit=9&access_token=${TOKEN}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Instagram API returned ${response.status}`);

    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    // Cache for 1 hour — Instagram posts don't change that fast
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');
    res.status(200).json(data);
  } catch (err) {
    console.error('Instagram API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch Instagram feed' });
  }
}
