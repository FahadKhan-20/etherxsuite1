export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  // Token is stateless, so just return success
  res.json({ success: true, message: 'Logged out' });
}
