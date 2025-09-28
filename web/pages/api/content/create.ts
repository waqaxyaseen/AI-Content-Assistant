import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Get token from Authorization header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = authHeader.substring(7)
  const { type, title, content, status } = req.body

  // Validate input
  if (!type || !title || !content) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // Verify token and get user info
    const decoded = db.verifyToken(token)

    // Check user's generation limit
    const user = db.getUserById(decoded.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (user.generationsLimit !== -1 && user.generationsUsed >= user.generationsLimit) {
      return res.status(403).json({
        error: 'Generation limit reached. Please upgrade your plan.',
        generationsUsed: user.generationsUsed,
        generationsLimit: user.generationsLimit
      })
    }

    // Create content in database
    const newContent = db.createContent({
      userId: decoded.id,
      type,
      title,
      content,
      status
    })

    res.status(201).json({
      success: true,
      content: newContent,
      generationsUsed: user.generationsUsed + 1,
      generationsLimit: user.generationsLimit
    })
  } catch (error: any) {
    console.error('Content creation error:', error)

    if (error.message === 'Invalid token') {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    res.status(500).json({ error: 'Failed to create content' })
  }
}