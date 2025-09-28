import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get database statistics
    const stats = db.getStats()
    const users = db.getAllUsers()
    const content = db.getAllContent()

    res.status(200).json({
      success: true,
      stats,
      users: users.slice(0, 10), // Return first 10 users
      content: content.slice(0, 10), // Return first 10 content items
      totalUsers: users.length,
      totalContent: content.length
    })
  } catch (error: any) {
    console.error('Admin stats error:', error)
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
}