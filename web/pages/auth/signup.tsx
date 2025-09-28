import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useApp } from '../../contexts/AppContext'
import OAuthPopup from '../../components/OAuthPopup'

export default function SignUpPage() {
  const router = useRouter()
  const { signup, isLoading } = useApp()
  const [showOAuthPopup, setShowOAuthPopup] = useState<'google' | 'facebook' | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    plan: 'free',
    agreeToTerms: false
  })
  const [errors, setErrors] = useState<any>({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if a plan was selected from pricing page
    const plan = localStorage.getItem('selectedPlan')
    if (plan) {
      setSelectedPlan(plan)
      // Map plan names to lowercase
      const planMap: Record<string, string> = {
        'Free': 'free',
        'Starter': 'starter',
        'Professional': 'professional',
        'Enterprise': 'enterprise'
      }
      setFormData(prev => ({
        ...prev,
        plan: planMap[plan] || 'free'
      }))
      // Clear the selected plan from localStorage
      localStorage.removeItem('selectedPlan')
    }
  }, [])

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Call signup function from context (which handles the API call)
      const result = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        company: formData.company,
        plan: formData.plan
      })

      if (result.success) {
        // Check if the selected plan requires payment
        if (formData.plan && formData.plan !== 'free') {
          // Store plan for checkout page
          localStorage.setItem('upgradePlan', formData.plan)
          // Redirect to checkout for paid plans
          router.push('/checkout')
        } else {
          // Go directly to dashboard for free plan
          router.push('/dashboard')
        }
      } else {
        // Show specific error message
        if (result.error?.includes('already exists')) {
          setErrors({ email: 'This email is already registered. Please login or use a different email.' })
        } else {
          setErrors({ submit: result.error || 'Signup failed. Please try again.' })
        }
        setLoading(false)
      }
    } catch (err) {
      setErrors({ submit: 'An error occurred. Please try again.' })
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    setShowOAuthPopup(provider)
  }

  const handleOAuthSuccess = async (data: any) => {
    setLoading(true)
    setShowOAuthPopup(null)

    // Create user with OAuth data
    const mockUser = {
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      password: 'social-login-' + data.provider,
      company: ''
    }

    // Call signup with social provider data
    await signup(mockUser)

    // Store that this was a social login
    localStorage.setItem('loginMethod', data.provider)
    localStorage.setItem('socialUser', JSON.stringify(data.user))

    router.push('/dashboard')
  }

  return (
    <>
      <Head>
        <title>Sign Up - AI Content Assistant</title>
        <meta name="description" content="Create your AI Content Assistant account" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-4">
                <div className="flex justify-center items-center space-x-2 group cursor-pointer">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                    <span className="text-white font-bold text-xl">AI</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Content Assistant</span>
                </div>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Create Your Account</h1>
              <p className="text-gray-600 mt-2">
                Start creating amazing AI-powered content today
              </p>
              {selectedPlan && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">{selectedPlan} Plan Selected</span> -
                    {selectedPlan !== 'Free' ? ' Complete signup to proceed to payment' : ' Complete signup to get started'}
                  </p>
                </div>
              )}
            </div>

            {/* Display general errors */}
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company (Optional)
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Acme Inc."
                />
              </div>

              {/* Only show plan selection if user hasn't pre-selected a plan */}
              {!selectedPlan ? (
                <div>
                  <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-1">
                    Choose Your Plan
                  </label>
                  <select
                    id="plan"
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="free">Free - 10 generations/month</option>
                    <option value="starter">Starter - $19/month (50 generations)</option>
                    <option value="professional">Professional - $49/month (500 generations)</option>
                    <option value="enterprise">Enterprise - $149/month (Unlimited)</option>
                  </select>
                  {formData.plan !== 'free' && (
                    <p className="text-sm text-blue-600 mt-1">
                      You&apos;ll be redirected to payment after signup
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Selected Plan:</span> {selectedPlan}
                  </p>
                  {formData.plan !== 'free' && (
                    <p className="text-sm text-blue-600 mt-1">
                      You&apos;ll be redirected to payment after signup
                    </p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Min 8 characters"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Re-enter your password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded mt-0.5"
                />
                <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  disabled={loading}
                  className={`w-full inline-flex items-center justify-center py-2 px-4 border rounded-lg text-sm font-medium transition-colors ${
                    loading
                      ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {loading ? 'Signing up...' : 'Google'}
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={loading}
                  className={`w-full inline-flex items-center justify-center py-2 px-4 border rounded-lg text-sm font-medium transition-colors ${
                    loading
                      ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  {loading ? 'Signing up...' : 'Facebook'}
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>

            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showOAuthPopup && (
        <OAuthPopup
          provider={showOAuthPopup}
          onClose={() => setShowOAuthPopup(null)}
          onSuccess={handleOAuthSuccess}
        />
      )}
    </>
  )
}