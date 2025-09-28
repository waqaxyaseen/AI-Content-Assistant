import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { firstName, lastName, email, password, company, plan } = req.body

  // Validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      error: 'Missing required fields',
      fields: {
        firstName: !firstName,
        lastName: !lastName,
        email: !email,
        password: !password
      }
    })
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  // Password validation
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' })
  }

  try {
    // Create user in database
    const result = await db.createUser({
      firstName,
      lastName,
      email,
      password,
      company,
      plan
    })

    res.status(201).json({
      success: true,
      user: result.user,
      token: result.token,
      message: 'Account created successfully'
    })
  } catch (error: any) {
    // Handle specific errors
    if (error.message === 'User already exists') {
      return res.status(400).json({ error: 'User with this email already exists' })
    }

    console.error('Signup error:', error)
    res.status(500).json({ error: 'Failed to create account. Please try again.' })
  }
}