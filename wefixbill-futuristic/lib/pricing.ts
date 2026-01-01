// Pricing configuration constants
export const PRICING_CONFIG = {
  // Success Fee Model Options
  successFee: {
    standard: {
      id: 'success-40',
      name: 'Standard Success Fee',
      feePercent: 40,
      capMonths: 24, // Cap at 24 months of savings
      description: 'Pay 40% of your first 2 years of savings',
      features: [
        'No upfront cost',
        'Pay only if we save you money',
        'One-time fee from savings',
        'No hidden charges',
      ],
    },
    flexible: {
      id: 'success-50',
      name: 'Flexible Payment',
      feePercent: 50,
      capMonths: 12, // Cap at 12 months of savings
      description: 'Pay 50% of your first year of savings with payment options',
      features: [
        'No upfront cost',
        'Pay only if we save you money',
        'Choose: pay upfront (10% off) or monthly',
        'Spread payments over 6 months',
      ],
      paymentOptions: {
        upfrontDiscount: 10, // 10% discount for upfront payment
        monthlyInstallments: 6, // 6 month payment plan
      },
    },
  },
  
  // Lifetime Plan Model
  lifetimePlan: {
    id: 'lifetime',
    name: 'Lifetime Plan',
    price: 99,
    description: 'One-time fee for lifetime bill monitoring and negotiation',
    savingsPromiseThreshold: 300, // $300/year minimum savings promise
    renegotiationCadence: 2, // Up to 2 times per year
    features: [
      'Lifetime bill monitoring',
      'Unlimited bill categories',
      'Up to 2 renegotiations per year per bill',
      'Automatic renewal alerts',
      'Price increase protection alerts',
      'Priority concierge support',
      'Savings promise: $300/year or fee waived',
    ],
  },
}

// Bill categories
export const BILL_CATEGORIES = [
  {
    id: 'internet',
    name: 'Internet',
    icon: '🌐',
    avgSavings: { min: 15, max: 45 },
    avgBill: 80,
  },
  {
    id: 'cable',
    name: 'Cable TV',
    icon: '📺',
    avgSavings: { min: 20, max: 60 },
    avgBill: 120,
  },
  {
    id: 'wireless',
    name: 'Wireless/Mobile',
    icon: '📱',
    avgSavings: { min: 15, max: 50 },
    avgBill: 100,
  },
  {
    id: 'utilities',
    name: 'Utilities',
    icon: '⚡',
    avgSavings: { min: 10, max: 35 },
    avgBill: 150,
  },
  {
    id: 'subscriptions',
    name: 'Subscriptions',
    icon: '🎬',
    avgSavings: { min: 5, max: 25 },
    avgBill: 50,
  },
  {
    id: 'insurance',
    name: 'Insurance',
    icon: '🛡️',
    avgSavings: { min: 20, max: 80 },
    avgBill: 200,
  },
  {
    id: 'security',
    name: 'Home Security',
    icon: '🏠',
    avgSavings: { min: 10, max: 30 },
    avgBill: 45,
  },
  {
    id: 'fitness',
    name: 'Gym/Fitness',
    icon: '💪',
    avgSavings: { min: 10, max: 25 },
    avgBill: 50,
  },
]

// Calculate savings and fees
export interface SavingsCalculation {
  monthlySavings: number
  annualSavings: number
  totalSavings: number // Over cap period
  fee: number
  netSavings: number
  feePercent: number
  months: number
}

export function calculateSuccessFee(
  monthlySavings: number,
  feePercent: number,
  capMonths: number
): SavingsCalculation {
  const annualSavings = monthlySavings * 12
  const totalSavings = monthlySavings * capMonths
  const fee = totalSavings * (feePercent / 100)
  const netSavings = totalSavings - fee
  
  return {
    monthlySavings,
    annualSavings,
    totalSavings,
    fee,
    netSavings,
    feePercent,
    months: capMonths,
  }
}

export function calculateLifetimePlanValue(
  monthlySavings: number,
  yearsOfService: number = 5
): {
  totalSavings: number
  planCost: number
  netSavings: number
  roi: number
  meetsSavingsPromise: boolean
} {
  const annualSavings = monthlySavings * 12
  const totalSavings = annualSavings * yearsOfService
  const planCost = PRICING_CONFIG.lifetimePlan.price
  const netSavings = totalSavings - planCost
  const roi = ((totalSavings - planCost) / planCost) * 100
  const meetsSavingsPromise = annualSavings >= PRICING_CONFIG.lifetimePlan.savingsPromiseThreshold
  
  return {
    totalSavings,
    planCost,
    netSavings,
    roi,
    meetsSavingsPromise,
  }
}

// Invoice calculation
export interface InvoiceBreakdown {
  totalSavings: number
  feeAmount: number
  upfrontAmount: number // With discount applied
  monthlyAmount: number // If paying in installments
  installments: number
  discount: number
  netSavings: number
}

export function calculateInvoice(
  monthlySavings: number,
  planType: 'success-40' | 'success-50' | 'lifetime'
): InvoiceBreakdown {
  if (planType === 'lifetime') {
    return {
      totalSavings: monthlySavings * 12,
      feeAmount: PRICING_CONFIG.lifetimePlan.price,
      upfrontAmount: PRICING_CONFIG.lifetimePlan.price,
      monthlyAmount: 0,
      installments: 0,
      discount: 0,
      netSavings: (monthlySavings * 12) - PRICING_CONFIG.lifetimePlan.price,
    }
  }
  
  const config = planType === 'success-40' 
    ? PRICING_CONFIG.successFee.standard 
    : PRICING_CONFIG.successFee.flexible
  
  const calc = calculateSuccessFee(monthlySavings, config.feePercent, config.capMonths)
  
  // Get payment options from flexible plan
  const flexibleConfig = PRICING_CONFIG.successFee.flexible
  const upfrontDiscount = planType === 'success-50' ? flexibleConfig.paymentOptions.upfrontDiscount : 0
  const installments = planType === 'success-50' ? flexibleConfig.paymentOptions.monthlyInstallments : 1
  
  const upfrontAmount = calc.fee * (1 - upfrontDiscount / 100)
  const monthlyAmount = calc.fee / installments
  
  return {
    totalSavings: calc.totalSavings,
    feeAmount: calc.fee,
    upfrontAmount,
    monthlyAmount,
    installments,
    discount: calc.fee - upfrontAmount,
    netSavings: calc.netSavings,
  }
}

// Providers by category
export const PROVIDERS: Record<string, string[]> = {
  internet: ['Xfinity', 'Spectrum', 'AT&T', 'Verizon Fios', 'Cox', 'Frontier', 'CenturyLink', 'Other'],
  cable: ['Xfinity', 'Spectrum', 'DirecTV', 'DISH', 'Cox', 'Optimum', 'Other'],
  wireless: ['Verizon', 'AT&T', 'T-Mobile', 'Sprint', 'US Cellular', 'Metro', 'Other'],
  utilities: ['Local Provider', 'Duke Energy', 'PG&E', 'Con Edison', 'FPL', 'Other'],
  subscriptions: ['Netflix', 'Hulu', 'Disney+', 'HBO Max', 'Spotify', 'Apple', 'Other'],
  insurance: ['State Farm', 'Geico', 'Progressive', 'Allstate', 'Liberty Mutual', 'Other'],
  security: ['ADT', 'Vivint', 'SimpliSafe', 'Ring', 'Other'],
  fitness: ['Planet Fitness', 'LA Fitness', 'Equinox', '24 Hour Fitness', 'Other'],
}

// US States
export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming',
]
