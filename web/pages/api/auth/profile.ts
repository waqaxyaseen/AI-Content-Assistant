import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Get token from Authorization header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = authHeader.substring(7) // Remove 'Bearer ' prefix

  try {
    // Verify token and get user info
    const decoded = db.verifyToken(token)

    // Get user from database
    const user = db.getUserById(decoded.id)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json({
      success: true,
      user
    })
  } catch (error: any) {
    console.error('Profile error:', error)

    if (error.message === 'Invalid token') {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    res.status(500).json({ error: 'Failed to fetch profile' })
  }
}