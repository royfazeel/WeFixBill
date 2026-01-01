// Mock data for frontend simulation

export interface CaseResult {
  id: string
  category: string
  provider: string
  oldBill: number
  newBill: number
  monthlySavings: number
  annualSavings: number
  story: string
  location: string
  date: string
}

export const CASE_RESULTS: CaseResult[] = [
  {
    id: '1',
    category: 'internet',
    provider: 'Xfinity',
    oldBill: 129,
    newBill: 79,
    monthlySavings: 50,
    annualSavings: 600,
    story: 'Family of four was paying premium rates for a 3-year-old plan. We negotiated a new promotional rate with the same speeds.',
    location: 'Austin, TX',
    date: '2024-01',
  },
  {
    id: '2',
    category: 'cable',
    provider: 'Spectrum',
    oldBill: 185,
    newBill: 125,
    monthlySavings: 60,
    annualSavings: 720,
    story: 'Cable bundle was bloated with unused channels. Restructured to a leaner package with all the essentials.',
    location: 'Denver, CO',
    date: '2024-02',
  },
  {
    id: '3',
    category: 'wireless',
    provider: 'Verizon',
    oldBill: 240,
    newBill: 175,
    monthlySavings: 65,
    annualSavings: 780,
    story: 'Family plan with 4 lines was on an outdated unlimited plan. Migrated to current promo with autopay discount.',
    location: 'Phoenix, AZ',
    date: '2024-01',
  },
  {
    id: '4',
    category: 'insurance',
    provider: 'State Farm',
    oldBill: 280,
    newBill: 195,
    monthlySavings: 85,
    annualSavings: 1020,
    story: 'Home and auto bundle was due for review. Applied new discounts and adjusted coverage to match actual needs.',
    location: 'Chicago, IL',
    date: '2024-03',
  },
  {
    id: '5',
    category: 'utilities',
    provider: 'Duke Energy',
    oldBill: 175,
    newBill: 145,
    monthlySavings: 30,
    annualSavings: 360,
    story: 'Enrolled in budget billing and qualified for energy efficiency rebates that the customer didn\'t know existed.',
    location: 'Charlotte, NC',
    date: '2024-02',
  },
  {
    id: '6',
    category: 'internet',
    provider: 'AT&T',
    oldBill: 95,
    newBill: 55,
    monthlySavings: 40,
    annualSavings: 480,
    story: 'Customer was paying for 1Gbps but only needed 300Mbps. Right-sized the plan and locked in a 2-year rate.',
    location: 'Dallas, TX',
    date: '2024-01',
  },
  {
    id: '7',
    category: 'subscriptions',
    provider: 'Multiple',
    oldBill: 85,
    newBill: 45,
    monthlySavings: 40,
    annualSavings: 480,
    story: 'Identified 3 unused streaming services and negotiated annual rates on the keepers for significant discounts.',
    location: 'Seattle, WA',
    date: '2024-03',
  },
  {
    id: '8',
    category: 'security',
    provider: 'ADT',
    oldBill: 55,
    newBill: 35,
    monthlySavings: 20,
    annualSavings: 240,
    story: 'Long-time customer had no loyalty discount. Secured a retention offer with equipment upgrade included.',
    location: 'Miami, FL',
    date: '2024-02',
  },
]

export interface Testimonial {
  id: string
  name: string
  location: string
  quote: string
  savings: string
  category: string
  rating: number
  avatar?: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    location: 'Austin, TX',
    quote: 'I was skeptical, but they saved me $50/month on my internet. The process was completely hands-off. Highly recommend!',
    savings: '$600/year',
    category: 'Internet',
    rating: 5,
  },
  {
    id: '2',
    name: 'James K.',
    location: 'Denver, CO',
    quote: 'Saved on both cable and phone. Total savings over $1,200 this year. Wish I found this service sooner!',
    savings: '$1,200/year',
    category: 'Cable & Wireless',
    rating: 5,
  },
  {
    id: '3',
    name: 'Maria L.',
    location: 'Phoenix, AZ',
    quote: 'The lifetime plan is a no-brainer. They renegotiate my bills twice a year and I never have to think about it.',
    savings: '$85/month',
    category: 'Insurance',
    rating: 5,
  },
  {
    id: '4',
    name: 'David R.',
    location: 'Seattle, WA',
    quote: 'Professional, transparent, and effective. They explained every step and delivered real results.',
    savings: '$40/month',
    category: 'Subscriptions',
    rating: 5,
  },
  {
    id: '5',
    name: 'Jennifer T.',
    location: 'Chicago, IL',
    quote: 'The monitoring feature caught a price increase I would have missed. They renegotiated before I even noticed!',
    savings: '$720/year',
    category: 'Cable',
    rating: 5,
  },
]

export interface FAQItem {
  question: string
  answer: string
  category?: string
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How does the success fee work?',
    answer: 'With our success fee model, you only pay if we successfully reduce your bill. Our fee is a percentage of your savings. If we don\'t save you money, you pay nothing.',
    category: 'pricing',
  },
  {
    question: 'What is the Lifetime Plan?',
    answer: 'The Lifetime Plan is a one-time $99 payment that gives you access to our bill monitoring and negotiation services forever. We\'ll renegotiate your bills up to twice per year and alert you to any price increases or expiring promotions.',
    category: 'pricing',
  },
  {
    question: 'What types of bills can you negotiate?',
    answer: 'We negotiate internet, cable TV, wireless/mobile plans, utilities (where applicable), streaming subscriptions, insurance, home security, and gym memberships. If it\'s a recurring bill, we can likely help.',
    category: 'services',
  },
  {
    question: 'Do you need my login credentials?',
    answer: 'No, we never need your login credentials. We work through official customer service channels using a Letter of Authorization that you sign, which gives us permission to negotiate on your behalf.',
    category: 'process',
  },
  {
    question: 'How long does the negotiation take?',
    answer: 'Most negotiations are completed within 1-2 weeks. Complex cases or providers with longer wait times may take up to 3-4 weeks. We\'ll keep you updated throughout the process.',
    category: 'process',
  },
  {
    question: 'What if my provider won\'t lower my bill?',
    answer: 'If we\'re unable to negotiate savings, you pay nothing under our success fee model. With the Lifetime Plan, we\'ll continue monitoring and try again when better opportunities arise (new promotions, contract renewals, etc.).',
    category: 'pricing',
  },
  {
    question: 'Is my information secure?',
    answer: 'Absolutely. We use bank-level encryption and never store sensitive payment information. Your data is only used for negotiation purposes and is never sold to third parties.',
    category: 'security',
  },
  {
    question: 'What is the Savings Promise?',
    answer: 'With our Lifetime Plan, we promise to save you at least $300 per year across your bills. If we don\'t achieve this threshold, your fee will be waived or refunded according to our refund policy.',
    category: 'pricing',
  },
  {
    question: 'Can I cancel at any time?',
    answer: 'The Lifetime Plan is a one-time purchase with no recurring fees. For success fee arrangements, there\'s no commitment—you only pay when we deliver savings.',
    category: 'billing',
  },
  {
    question: 'How does bill monitoring work?',
    answer: 'After initial negotiation, we track your billing cycles and provider promotions. We\'ll alert you when your rate is about to increase, when new promotions become available, or when it\'s time to renegotiate.',
    category: 'services',
  },
]

export interface MonitoringAlert {
  id: string
  type: 'renewal' | 'increase' | 'promo' | 'renegotiate'
  title: string
  message: string
  date: Date
  category: string
  provider: string
  priority: 'high' | 'medium' | 'low'
}

export const MOCK_MONITORING_ALERTS: MonitoringAlert[] = [
  {
    id: '1',
    type: 'renewal',
    title: 'Contract Renewal Coming Up',
    message: 'Your Xfinity promotional rate expires in 45 days. We\'ll start renegotiation soon.',
    date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    category: 'internet',
    provider: 'Xfinity',
    priority: 'high',
  },
  {
    id: '2',
    type: 'promo',
    title: 'New Promotion Available',
    message: 'Verizon is offering a $20/month loyalty discount. We can apply this to your account.',
    date: new Date(),
    category: 'wireless',
    provider: 'Verizon',
    priority: 'medium',
  },
  {
    id: '3',
    type: 'increase',
    title: 'Price Increase Detected',
    message: 'Spectrum raised rates by $5/month. We\'re working to offset or remove this increase.',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    category: 'cable',
    provider: 'Spectrum',
    priority: 'high',
  },
  {
    id: '4',
    type: 'renegotiate',
    title: 'Scheduled Renegotiation',
    message: 'It\'s time for your bi-annual rate review. We\'ll contact your provider this week.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    category: 'utilities',
    provider: 'Duke Energy',
    priority: 'medium',
  },
]

// Aggregate stats for social proof
export const AGGREGATE_STATS = {
  totalSaved: 2847523,
  customersHelped: 15847,
  averageSavings: 47,
  successRate: 94,
  billsNegotiated: 28934,
}

// Assistant chat responses
export const ASSISTANT_RESPONSES: Record<string, string> = {
  'how do fees work': 'We offer two pricing models:\n\n1. **Success Fee**: You only pay if we save you money. Our fee is a percentage of your savings (40% or 50% depending on the plan).\n\n2. **Lifetime Plan**: A one-time $99 fee for lifetime monitoring and up to 2 renegotiations per year per bill.\n\nNo savings = no fee. It\'s that simple!',
  
  'what bills qualify': 'We can negotiate most recurring bills:\n\n• Internet & Cable\n• Wireless/Mobile plans\n• Utilities (electric, gas, water)\n• Streaming subscriptions\n• Insurance (home, auto, renters)\n• Home security systems\n• Gym memberships\n\nIf you have a recurring bill, we can likely help!',
  
  'do you need my login': 'No, we never need your login credentials! We use a Letter of Authorization (LOA) that you sign, which gives us permission to negotiate on your behalf through official customer service channels. Your account security is never compromised.',
  
  'how authorization works': 'The authorization process is simple:\n\n1. You provide basic account info (name, address, account number)\n2. You sign our digital Letter of Authorization\n3. This LOA is legally binding and allows us to speak with your provider\n4. We handle all negotiations\n5. You approve any changes before implementation',
  
  'how long does it take': 'Most negotiations complete in 1-2 weeks. Some providers have longer wait times, so complex cases may take 3-4 weeks. We keep you updated at every step.',
  
  'is it safe': 'Absolutely! We use bank-level encryption for all data. We never store payment information and never access your accounts directly. Your data is only used for negotiation and is never sold.',
  
  'what if you cant save': 'If we can\'t negotiate savings, you pay nothing. That\'s our promise. With our success fee model, no savings means no fee. Period.',
  
  default: 'I\'d be happy to help! You can ask me about:\n\n• How our fees work\n• What bills we can negotiate\n• The authorization process\n• How long negotiations take\n• Our security practices\n\nWhat would you like to know?',
}
