import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone } = req.body;

  if (!name || (!email && !phone)) {
    return res.status(400).json({ error: 'Name and email/phone required' });
  }

  try {
    // Mock user creation for demo
    const userId = uuidv4();
    // In production, insert into database
    res.status(201).json({
      success: true,
      userId,
      message: 'User created successfully',
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
}
