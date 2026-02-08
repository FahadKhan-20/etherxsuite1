export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { emailOrPhone } = req.body;

  if (!emailOrPhone) {
    return res.status(400).json({ error: 'Email or phone required' });
  }

  // TODO: Implement actual OTP sending via Twilio or SendGrid
  // For now, generate a mock OTP
  const otp = Math.random().toString().slice(2, 8);

  console.log(`✉️ Mock OTP for ${emailOrPhone}: ${otp}`);

  // Store OTP in cache/database with expiry (10 minutes)
  // For demo, we'll just return success

  res.json({ success: true, message: `OTP sent to ${emailOrPhone}`, mock_otp: otp });
}
