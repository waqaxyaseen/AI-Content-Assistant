import { useState } from 'react'

interface OAuthPopupProps {
  provider: 'google' | 'facebook'
  onClose: () => void
  onSuccess: (data: any) => void
}

export default function OAuthPopup({ provider, onClose, onSuccess }: OAuthPopupProps) {
  const [step, setStep] = useState<'login' | 'authorize' | 'loading'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const providerConfig = {
    google: {
      name: 'Google',
      logo: (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      ),
      bgColor: 'bg-white',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      borderColor: 'border-gray-300'
    },
    facebook: {
      name: 'Facebook',
      logo: (
        <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      bgColor: 'bg-blue-600',
      buttonColor: 'bg-white hover:bg-gray-50',
      borderColor: 'border-blue-700'
    }
  }

  const config = providerConfig[provider]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!email || !password) {
      setError('Please enter your credentials')
      return
    }

    // For demo, accept any credentials
    setStep('authorize')
  }

  const handleAuthorize = () => {
    setStep('loading')

    // Simulate API call
    setTimeout(() => {
      onSuccess({
        provider,
        email,
        user: {
          firstName: config.name,
          lastName: 'User',
          email: email || `user@${provider}.com`,
          profilePicture: `https://ui-avatars.com/api/?name=${config.name}+User`
        }
      })
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className={`${provider === 'facebook' ? 'bg-blue-600' : 'bg-white border-b'} p-4 rounded-t-lg`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {config.logo}
              <h2 className={`text-lg font-semibold ${provider === 'facebook' ? 'text-white' : 'text-gray-900'}`}>
                Sign in with {config.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className={`${provider === 'facebook' ? 'text-white hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'login' && (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {provider === 'google' ? 'Email or phone' : 'Email or phone number'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={provider === 'google' ? 'Enter your email' : 'Email or phone number'}
                  autoFocus
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className={`w-full py-2 px-4 text-white rounded-lg ${
                  provider === 'google' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {provider === 'google' ? 'Next' : 'Log In'}
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  {provider === 'google' ? "Don't have an account? " : "Don't have an account? "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    {provider === 'google' ? 'Create account' : 'Sign up'}
                  </a>
                </p>
              </div>
            </form>
          )}

          {step === 'authorize' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  AI Content Assistant wants to access your {config.name} Account
                </h3>
                <p className="text-sm text-gray-600 mb-4">{email}</p>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">This will allow AI Content Assistant to:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700">See your primary email address</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700">See your personal info, including your public profile</span>
                    </li>
                  </ul>
                </div>

                <p className="text-xs text-gray-500">
                  By clicking Allow, you allow this app and {config.name} to use your information in accordance with their respective privacy policies.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAuthorize}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Allow
                </button>
              </div>
            </div>
          )}

          {step === 'loading' && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Signing you in...</p>
              <p className="text-sm text-gray-500 mt-2">Please wait while we authenticate with {config.name}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 'login' && (
          <div className="px-6 py-4 bg-gray-50 border-t rounded-b-lg">
            <p className="text-xs text-center text-gray-500">
              {provider === 'google'
                ? 'This is a demo simulation of Google OAuth. In production, this would redirect to accounts.google.com'
                : 'This is a demo simulation of Facebook OAuth. In production, this would redirect to facebook.com'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}