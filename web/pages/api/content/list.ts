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

  const token = authHeader.substring(7)

  try {
    // Verify token and get user info
    const decoded = db.verifyToken(token)

    // Get user's content from database
    const content = db.getContentByUser(decoded.id)

    res.status(200).json({
      success: true,
      content
    })
  } catch (error: any) {
    console.error('Content list error:', error)

    if (error.message === 'Invalid token') {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    res.status(500).json({ error: 'Failed to fetch content' })
  }
}