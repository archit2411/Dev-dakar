// Vercel serverless function — Google Places API proxy
// Deploy at: api/reviews.js
// Never expose GOOGLE_PLACES_API_KEY in frontend code.

export default async function handler(req, res) {
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;
  const API_KEY  = process.env.GOOGLE_PLACES_API_KEY;

  if (!PLACE_ID || !API_KEY) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  try {
    const fields = 'name,rating,reviews,user_ratings_total';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=${fields}&key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Places API returned ${response.status}`);

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Places API status: ${data.status}`);
    }

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');
    res.status(200).json({
      rating:  data.result.rating,
      total:   data.result.user_ratings_total,
      reviews: (data.result.reviews || []).slice(0, 6)
    });
  } catch (err) {
    console.error('Reviews API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}
