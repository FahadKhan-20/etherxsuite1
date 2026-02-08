export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Mock user for demo
    const user = {
      id: 'demo-id',
      name: 'Demo User',
      email: 'demo@example.com',
      phone: '1234567890',
    };
    res.json({ user });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
}
