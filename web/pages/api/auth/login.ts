import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    // Authenticate user with database
    const result = await db.loginUser(email, password)

    res.status(200).json({
      success: true,
      user: result.user,
      token: result.token,
      message: 'Login successful'
    })
  } catch (error: any) {
    // Handle authentication errors
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    console.error('Login error:', error)
    res.status(500).json({ error: 'Failed to login. Please try again.' })
  }
}