import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { emailOrPhone, otp } = req.body;

  if (!emailOrPhone || !otp) {
    return res.status(400).json({ error: 'Email/phone and OTP required' });
  }

  // TODO: Verify actual OTP from database/cache
  // For demo, accept any OTP with correct length
  if (otp.length !== 6) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  try {
    // Find or create user
    const isEmail = emailOrPhone.includes('@');
    const column = isEmail ? 'email' : 'phone';
    // Mock user creation for demo
    const userId = uuidv4();
    const user = {
      id: userId,
      name: isEmail ? emailOrPhone.split('@')[0] : 'User',
      [isEmail ? 'email' : 'phone']: emailOrPhone,
    };

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email || '', phone: user.phone || '' },
      process.env.JWT_SECRET || 'dev-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ error: 'OTP verification failed' });
  }
}
