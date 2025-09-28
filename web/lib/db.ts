import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

// Database file paths
const DB_DIR = path.join(process.cwd(), 'database')
const USERS_DB = path.join(DB_DIR, 'users.json')
const CONTENT_DB = path.join(DB_DIR, 'content.json')
const SUBSCRIPTIONS_DB = path.join(DB_DIR, 'subscriptions.json')

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Initialize database files
function initDB() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true })
  }

  if (!fs.existsSync(USERS_DB)) {
    fs.writeFileSync(USERS_DB, JSON.stringify([]))
  }

  if (!fs.existsSync(CONTENT_DB)) {
    fs.writeFileSync(CONTENT_DB, JSON.stringify([]))
  }

  if (!fs.existsSync(SUBSCRIPTIONS_DB)) {
    fs.writeFileSync(SUBSCRIPTIONS_DB, JSON.stringify([]))
  }
}

// User type
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string // hashed
  company?: string
  plan: 'free' | 'starter' | 'professional' | 'enterprise'
  generationsUsed: number
  generationsLimit: number
  createdAt: string
  lastLogin?: string
}

// Content type
export interface Content {
  id: string
  userId: string
  type: string
  title: string
  content: string
  status: 'draft' | 'published' | 'scheduled'
  createdAt: string
  updatedAt: string
}

// Subscription type
export interface Subscription {
  id: string
  userId: string
  plan: string
  billingPeriod: 'monthly' | 'yearly'
  amount: number
  status: 'active' | 'cancelled' | 'expired'
  startDate: string
  nextBillingDate: string
  paymentMethod?: string
}

// Database functions
export class Database {
  constructor() {
    initDB()
  }

  // Read JSON file
  private readJSON(filepath: string): any[] {
    try {
      const data = fs.readFileSync(filepath, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      return []
    }
  }

  // Write JSON file
  private writeJSON(filepath: string, data: any[]) {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
  }

  // User operations
  async createUser(userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    company?: string
    plan?: string
  }) {
    const users = this.readJSON(USERS_DB)

    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    // Set plan limits
    const planLimits = {
      free: 10,
      starter: 50,
      professional: 500,
      enterprise: -1 // unlimited
    }

    const plan = (userData.plan?.toLowerCase() || 'free') as keyof typeof planLimits

    // Create new user
    const newUser: User = {
      id: uuidv4(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
      company: userData.company || '',
      plan: plan,
      generationsUsed: 0,
      generationsLimit: planLimits[plan],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }

    users.push(newUser)
    this.writeJSON(USERS_DB, users)

    // Generate token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Return user without password
    const { password, ...userWithoutPassword } = newUser
    return { user: userWithoutPassword, token }
  }

  async loginUser(email: string, password: string) {
    const users = this.readJSON(USERS_DB)
    const user = users.find(u => u.email === email)

    if (!user) {
      throw new Error('Invalid credentials')
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new Error('Invalid credentials')
    }

    // Update last login
    user.lastLogin = new Date().toISOString()
    this.writeJSON(USERS_DB, users)

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return { user: userWithoutPassword, token }
  }

  getUserById(userId: string) {
    const users = this.readJSON(USERS_DB)
    const user = users.find(u => u.id === userId)
    if (user) {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    }
    return null
  }

  getUserByEmail(email: string) {
    const users = this.readJSON(USERS_DB)
    const user = users.find(u => u.email === email)
    if (user) {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    }
    return null
  }

  updateUser(userId: string, updates: Partial<User>) {
    const users = this.readJSON(USERS_DB)
    const userIndex = users.findIndex(u => u.id === userId)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    // Don't allow updating password directly
    delete updates.password
    delete updates.id

    users[userIndex] = { ...users[userIndex], ...updates }
    this.writeJSON(USERS_DB, users)

    const { password, ...userWithoutPassword } = users[userIndex]
    return userWithoutPassword
  }

  // Content operations
  createContent(contentData: {
    userId: string
    type: string
    title: string
    content: string
    status?: 'draft' | 'published' | 'scheduled'
  }) {
    const contents = this.readJSON(CONTENT_DB)

    const newContent: Content = {
      id: uuidv4(),
      userId: contentData.userId,
      type: contentData.type,
      title: contentData.title,
      content: contentData.content,
      status: contentData.status || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    contents.push(newContent)
    this.writeJSON(CONTENT_DB, contents)

    // Update user's generation count
    const users = this.readJSON(USERS_DB)
    const userIndex = users.findIndex(u => u.id === contentData.userId)
    if (userIndex !== -1) {
      users[userIndex].generationsUsed++
      this.writeJSON(USERS_DB, users)
    }

    return newContent
  }

  getContentByUser(userId: string) {
    const contents = this.readJSON(CONTENT_DB)
    return contents.filter(c => c.userId === userId)
  }

  getAllContent() {
    return this.readJSON(CONTENT_DB)
  }

  // Subscription operations
  createSubscription(subData: {
    userId: string
    plan: string
    billingPeriod: 'monthly' | 'yearly'
    amount: number
    paymentMethod?: string
  }) {
    const subscriptions = this.readJSON(SUBSCRIPTIONS_DB)

    const newSubscription: Subscription = {
      id: uuidv4(),
      userId: subData.userId,
      plan: subData.plan,
      billingPeriod: subData.billingPeriod,
      amount: subData.amount,
      status: 'active',
      startDate: new Date().toISOString(),
      nextBillingDate: new Date(
        Date.now() + (subData.billingPeriod === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000
      ).toISOString(),
      paymentMethod: subData.paymentMethod
    }

    subscriptions.push(newSubscription)
    this.writeJSON(SUBSCRIPTIONS_DB, subscriptions)

    // Update user's plan
    const users = this.readJSON(USERS_DB)
    const userIndex = users.findIndex(u => u.id === subData.userId)
    if (userIndex !== -1) {
      users[userIndex].plan = subData.plan.toLowerCase() as any

      // Update generation limits based on plan
      const planLimits = {
        starter: 50,
        professional: 500,
        enterprise: -1
      }
      users[userIndex].generationsLimit = planLimits[subData.plan.toLowerCase() as keyof typeof planLimits] || 10

      this.writeJSON(USERS_DB, users)
    }

    return newSubscription
  }

  getSubscriptionByUser(userId: string) {
    const subscriptions = this.readJSON(SUBSCRIPTIONS_DB)
    return subscriptions.find(s => s.userId === userId && s.status === 'active')
  }

  // Get all users (for admin view)
  getAllUsers() {
    const users = this.readJSON(USERS_DB)
    return users.map(({ password, ...user }) => user)
  }

  // Get database stats
  getStats() {
    const users = this.readJSON(USERS_DB)
    const contents = this.readJSON(CONTENT_DB)
    const subscriptions = this.readJSON(SUBSCRIPTIONS_DB)

    return {
      totalUsers: users.length,
      totalContent: contents.length,
      activeSubscriptions: subscriptions.filter(s => s.status === 'active').length,
      usersByPlan: users.reduce((acc, user) => {
        acc[user.plan] = (acc[user.plan] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    }
  }

  // Verify JWT token
  verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET) as { id: string; email: string }
    } catch (error) {
      throw new Error('Invalid token')
    }
  }
}

// Export singleton instance
const db = new Database()
export default db