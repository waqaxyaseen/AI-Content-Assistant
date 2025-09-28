import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useApp } from '../contexts/AppContext'

export default function CheckoutPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useApp()
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    zip: ''
  })
  const [errors, setErrors] = useState<any>({})

  const plans = {
    'starter': {
      displayName: 'Starter',
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: ['50 AI generations/month', '5 templates', 'Email support']
    },
    'professional': {
      displayName: 'Professional',
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: ['500 AI generations/month', '50+ templates', 'Priority support', 'API access']
    },
    'enterprise': {
      displayName: 'Enterprise',
      monthlyPrice: 149,
      yearlyPrice: 1490,
      features: ['Unlimited generations', 'All features', 'Dedicated support', 'Custom training']
    }
  }

  useEffect(() => {
    // Get selected plan from localStorage (from signup or upgrade)
    const upgradePlan = localStorage.getItem('upgradePlan')
    const selectedPlanName = localStorage.getItem('selectedPlan')

    // Use upgradePlan first (from signup), then selectedPlan (from pricing page)
    const planKey = upgradePlan || selectedPlanName?.toLowerCase()

    if (planKey && plans[planKey as keyof typeof plans]) {
      const plan = plans[planKey as keyof typeof plans]
      setSelectedPlan({
        name: planKey,
        displayName: plan.displayName,
        ...plan
      })
      // Clear the stored plans
      localStorage.removeItem('upgradePlan')
      localStorage.removeItem('selectedPlan')
    } else {
      // If no plan selected, redirect to pricing
      router.push('/pricing')
    }

    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push('/auth/signup')
    }
  }, [isAuthenticated, router])

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(' ') : value
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '')
    }
    return v
  }

  const handleCardChange = (field: string, value: string) => {
    let formattedValue = value

    if (field === 'number') {
      formattedValue = formatCardNumber(value)
      if (formattedValue.replace(/\s/g, '').length > 16) return
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value)
      if (formattedValue.replace('/', '').length > 4) return
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/gi, '')
      if (formattedValue.length > 4) return
    } else if (field === 'zip') {
      formattedValue = value.replace(/[^0-9]/gi, '')
      if (formattedValue.length > 5) return
    }

    setCardDetails(prev => ({ ...prev, [field]: formattedValue }))

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }))
    }
  }

  const validatePayment = () => {
    const newErrors: any = {}

    if (paymentMethod === 'card') {
      if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length < 13) {
        newErrors.number = 'Valid card number required'
      }
      if (!cardDetails.name.trim()) {
        newErrors.name = 'Cardholder name required'
      }
      if (!cardDetails.expiry || cardDetails.expiry.length < 5) {
        newErrors.expiry = 'Valid expiry date required'
      } else {
        const [month, year] = cardDetails.expiry.split('/')
        const currentYear = new Date().getFullYear() % 100
        const currentMonth = new Date().getMonth() + 1
        if (parseInt(month) > 12 || parseInt(month) < 1) {
          newErrors.expiry = 'Invalid month'
        } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
          newErrors.expiry = 'Card expired'
        }
      }
      if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
        newErrors.cvv = 'CVV required'
      }
      if (!cardDetails.zip || cardDetails.zip.length < 5) {
        newErrors.zip = 'ZIP code required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePayment()) {
      return
    }

    setLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      // Store subscription details
      localStorage.setItem('subscription', JSON.stringify({
        plan: selectedPlan?.name,
        billingPeriod,
        startDate: new Date().toISOString(),
        nextBillingDate: new Date(Date.now() + (billingPeriod === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString(),
        amount: billingPeriod === 'monthly' ? selectedPlan?.monthlyPrice : selectedPlan?.yearlyPrice,
        paymentMethod: paymentMethod === 'card' ? `•••• ${cardDetails.number.slice(-4)}` : 'PayPal'
      }))

      // Clear selected plan
      localStorage.removeItem('selectedPlan')

      // Redirect to dashboard with success message
      router.push('/dashboard?payment=success')
    }, 2000)
  }

  const currentPrice = selectedPlan?.[billingPeriod === 'monthly' ? 'monthlyPrice' : 'yearlyPrice']
  const savings = billingPeriod === 'yearly' && selectedPlan ? (selectedPlan.monthlyPrice * 12 - selectedPlan.yearlyPrice) : 0

  return (
    <>
      <Head>
        <title>Checkout - AI Content Assistant</title>
        <meta name="description" content="Complete your purchase" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Content Assistant</span>
              </Link>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Secure Checkout</span>
                <span className="text-green-600">🔒 SSL Secured</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Information</h2>

                {/* Billing Period Toggle */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Billing Period</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setBillingPeriod('monthly')}
                      className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                        billingPeriod === 'monthly'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingPeriod('yearly')}
                      className={`py-3 px-4 rounded-lg border-2 transition-colors relative ${
                        billingPeriod === 'yearly'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      Yearly
                      {savings > 0 && (
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs py-1 px-2 rounded-full">
                          Save ${savings}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`py-3 px-4 rounded-lg border-2 transition-colors flex items-center justify-center space-x-2 ${
                        paymentMethod === 'card'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span>💳</span>
                      <span>Credit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`py-3 px-4 rounded-lg border-2 transition-colors flex items-center justify-center space-x-2 ${
                        paymentMethod === 'paypal'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span>💰</span>
                      <span>PayPal</span>
                    </button>
                  </div>
                </div>

                {/* Card Details Form */}
                {paymentMethod === 'card' ? (
                  <form onSubmit={handleSubmitPayment} className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) => handleCardChange('number', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.number ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.number && (
                        <p className="text-red-500 text-xs mt-1">{errors.number}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        id="cardName"
                        type="text"
                        value={cardDetails.name}
                        onChange={(e) => handleCardChange('name', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          id="expiry"
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) => handleCardChange('expiry', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.expiry ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="MM/YY"
                        />
                        {errors.expiry && (
                          <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          id="cvv"
                          type="text"
                          value={cardDetails.cvv}
                          onChange={(e) => handleCardChange('cvv', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.cvv ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="123"
                        />
                        {errors.cvv && (
                          <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <input
                          id="zip"
                          type="text"
                          value={cardDetails.zip}
                          onChange={(e) => handleCardChange('zip', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.zip ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="12345"
                        />
                        {errors.zip && (
                          <p className="text-red-500 text-xs mt-1">{errors.zip}</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-4 rounded-lg font-medium transition-colors ${
                        loading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {loading ? 'Processing...' : `Pay $${currentPrice}${billingPeriod === 'yearly' ? '/year' : '/month'}`}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <button
                      onClick={handleSubmitPayment}
                      disabled={loading}
                      className={`px-8 py-4 rounded-lg font-medium transition-colors ${
                        loading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-yellow-500 text-black hover:bg-yellow-600'
                      }`}
                    >
                      {loading ? 'Redirecting...' : 'Continue with PayPal'}
                    </button>
                    <p className="text-sm text-gray-600 mt-4">
                      You will be redirected to PayPal to complete your purchase
                    </p>
                  </div>
                )}

                {/* Security badges */}
                <div className="mt-8 pt-8 border-t flex items-center justify-center space-x-6">
                  <span className="text-sm text-gray-600">🔒 256-bit SSL Encryption</span>
                  <span className="text-sm text-gray-600">✓ PCI Compliant</span>
                  <span className="text-sm text-gray-600">🛡️ Money-back Guarantee</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                {selectedPlan && (
                  <>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{selectedPlan.displayName} Plan</span>
                        <span className="text-sm text-gray-600">{billingPeriod}</span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <ul className="space-y-2 text-sm text-gray-600">
                          {selectedPlan.features.map((feature: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${currentPrice}</span>
                      </div>
                      {savings > 0 && billingPeriod === 'yearly' && (
                        <div className="flex justify-between text-green-600">
                          <span>Annual Savings</span>
                          <span>-${savings}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xl font-bold pt-2 border-t">
                        <span>Total</span>
                        <span>
                          ${currentPrice}
                          <span className="text-sm font-normal text-gray-600">
                            /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">30-Day Money Back Guarantee</span>
                        <br />
                        Cancel anytime. No questions asked.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}