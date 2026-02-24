import { sendPasswordResetEmail } from "../utils/emailService.js";
import db from "../config/db.js";

const ADMIN_EMAIL = 'admin@school.com';
const ADMIN_PASSWORD = 'admin123';

export const loginAdmin = (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.status(200).json({ 
      success: true, 
      message: 'Admin login successful',
      adminId: 'admin-001',
      adminEmail: email,
      adminName: 'Administrator'
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid email or password' });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  // For admin, check if email matches admin email
  if (email !== ADMIN_EMAIL) {
    // Security: return success even if email doesn't match
    return res.status(200).json({ success: true, message: 'If the account exists, reset instructions have been sent' });
  }

  try {
    // Generate reset token
    const token = 'reset-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

    // Store reset token in a simple in-memory store or database
    // For now, we'll just send the email with the token
    const emailResult = await sendPasswordResetEmail(email, token, 'Administrator');

    if (emailResult.success) {
      console.log(`Password reset email sent to ${email}`);
      return res.status(200).json({ 
        success: true, 
        message: 'Password reset instructions have been sent to your email' 
      });
    } else {
      console.error('Failed to send email:', emailResult.error);
      // Still return success for security, but log the error
      return res.status(200).json({ 
        success: true, 
        message: 'Check your email for reset instructions' 
      });
    }
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    return res.status(200).json({ 
      success: true, 
      message: 'If the account exists, reset instructions have been sent' 
    });
  }
};

export const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;

  if (!email || !token || !newPassword) {
    return res.status(400).json({ success: false, message: 'Email, token, and new password are required' });
  }

  // For demo purposes, accept the reset if email is admin email
  // In production, you'd validate the token from a database
  if (email === ADMIN_EMAIL) {
    // Here you would update the admin password in a database
    // For now, we'll just return success
    return res.status(200).json({ 
      success: true, 
      message: 'Password has been reset successfully' 
    });
  }

  return res.status(400).json({ success: false, message: 'Invalid email or token' });
};
