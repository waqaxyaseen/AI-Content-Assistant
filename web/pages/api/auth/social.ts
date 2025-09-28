import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { provider, accessToken } = req.body

  if (!provider) {
    return res.status(400).json({ error: 'Provider is required' })
  }

  // In production, you would:
  // 1. Validate the accessToken with the provider (Google/Facebook/LinkedIn)
  // 2. Get user info from the provider
  // 3. Create or update user in your database
  // 4. Generate JWT token

  // For demo, we'll simulate a successful social login
  const mockProviderData = {
    google: {
      id: 'google-user-123',
      email: 'user@gmail.com',
      firstName: 'Google',
      lastName: 'User',
      profilePicture: 'https://lh3.googleusercontent.com/a/default-user',
      verified: true
    },
    facebook: {
      id: 'fb-user-456',
      email: 'user@facebook.com',
      firstName: 'Facebook',
      lastName: 'User',
      profilePicture: 'https://graph.facebook.com/v12.0/me/picture',
      verified: true
    },
    linkedin: {
      id: 'linkedin-user-789',
      email: 'user@linkedin.com',
      firstName: 'LinkedIn',
      lastName: 'User',
      profilePicture: 'https://media.licdn.com/dms/image/default',
      verified: true
    }
  }

  const providerData = mockProviderData[provider as keyof typeof mockProviderData]

  if (!providerData) {
    return res.status(400).json({ error: 'Invalid provider' })
  }

  // Create user object
  const user = {
    id: providerData.id,
    email: providerData.email,
    firstName: providerData.firstName,
    lastName: providerData.lastName,
    profilePicture: providerData.profilePicture,
    plan: 'free',
    provider: provider,
    generationsUsed: 0,
    generationsLimit: 10,
    createdAt: new Date().toISOString()
  }

  // Generate mock JWT token
  const token = `jwt-${provider}-${Date.now()}`

  // Return success response
  res.status(200).json({
    success: true,
    user,
    token,
    message: `Successfully logged in with ${provider}`,
    isNewUser: Math.random() > 0.5 // Randomly determine if it's a new user
  })
}