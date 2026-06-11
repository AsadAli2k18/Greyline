/** Content for individual service pages (/services/:slug). */

const processSteps = [
  { title: 'Submit your query', text: 'Tell us what you need through our website enquiry form.' },
  { title: 'Review of your requirements', text: 'We assess your situation and confirm how we can help.' },
  { title: 'Initial consultation', text: 'We gather the information needed to scope the work clearly.' },
  { title: 'Setup and onboarding', text: 'We agree timelines, systems access, and responsibilities.' },
  { title: 'Ongoing delivery and support', text: 'We deliver the service and remain available for questions.' },
];

const services = [
  {
    slug: 'bookkeeping',
    category: 'Accounting Services',
    title: 'Bookkeeping',
    heroDescription:
      'Reliable bookkeeping so your records stay accurate, organised, and ready for tax, reporting, and decisions.',
    problems: [
      'Transactions spread across bank feeds, spreadsheets, and paper; hard to reconcile',
      'Unclear categorisation and gaps that show up only at year-end or VAT time',
      'Limited time to keep ledgers current while running the business day to day',
      'Reports that do not reflect where cash and profit really stand',
    ],
    solutions: [
      'Consistent recording and coding of income and expenses to agreed standards',
      'Regular bank and control account reconciliations so balances stay trustworthy',
      'Clear period summaries you can use for decisions, funding, or HMRC',
      'A tidy handover to year-end, VAT, or management reporting without rework',
    ],
    included: [
      'Recording of transactions',
      'Bank and credit card reconciliations',
      'Maintenance of accurate financial records',
      'Monthly or periodic summaries',
    ],
    audience: ['SMEs', 'Sole traders', 'Shop and retail businesses', 'Professional practices'],
    icon: '\u{1F4CB}',
  },
  {
    slug: 'management-accounts',
    category: 'Accounting Services',
    title: 'Management Accounts',
    heroDescription:
      'Regular management accounts that give you a clear view of performance between year-ends.',
    problems: [
      'Relying on bank balance alone to judge performance between formal accounts',
      'Margins and overheads shifting without a clear monthly or quarterly picture',
      'Directors and investors asking for numbers that are not yet prepared',
      'Limited visibility before big spends, hiring, or pricing changes',
    ],
    solutions: [
      'Timely profit and loss and balance sheet snapshots aligned to your reporting cycle',
      'Trend commentary in plain language, not just figures on a page',
      'Support to link numbers to cash, stock, debtors, and creditors where relevant',
      'A bridge from bookkeeping data to decisions between statutory year-ends',
    ],
    included: [
      'Monthly or quarterly reports',
      'Profit & loss overview',
      'Basic financial insights',
      'Support to interpret the numbers',
    ],
    audience: ['Growing limited companies', 'SMEs with multiple revenue streams', 'Owner-managers', 'Boards needing regular oversight'],
    icon: '\u{1F4CA}',
  },
  {
    slug: 'year-end-accounts',
    category: 'Accounting Services',
    title: 'Year-End Accounts',
    heroDescription:
      'Year-end statutory accounts prepared with care and filed on time where required.',
    problems: [
      'Deadlines from Companies House and HMRC converging with limited internal capacity',
      'Prior-year adjustments or disclosure issues resurfacing under scrutiny',
      'Uncertainty about FRS and filing requirements for your entity type',
      'Pressure to finalise numbers while still closing off the year',
    ],
    solutions: [
      'Preparation of statutory accounts consistent with applicable reporting standards',
      'Coordination with corporation tax and filings where we also act for you',
      'Clear explanation of figures and filings before submission',
      'Support with follow-up queries from authorities or stakeholders',
    ],
    included: [
      'Preparation of statutory accounts',
      'Compliance with UK requirements',
      'Submission to Companies House (where applicable)',
      'Support with follow-up queries',
    ],
    audience: ['Limited companies', 'Charities and CICs (where applicable)', 'Subsidiaries', 'Businesses preparing first statutory filings'],
    icon: '\u{1F4C4}',
  },
  {
    slug: 'corporation-tax',
    category: 'Tax Services',
    title: 'Corporation Tax',
    heroDescription:
      'Corporation tax computations and filings handled efficiently for limited companies.',
    problems: [
      'Complexity around reliefs, losses brought forward, and timing of claims',
      'Risk of misstating profits subject to tax after year-end adjustments',
      'Uncertainty on payment dates and interest if estimates or payments slip',
      'Changing rules and rates needing interpretation each year',
    ],
    solutions: [
      'Robust CT computation from your accounts and supporting schedules',
      'CT600 preparation and electronic submission within required timeframes',
      'Review of capital allowances, group issues, and other areas where relevant',
      'Clear communication of liability, payments, and documentation retained for audit trail',
    ],
    included: [
      'Tax computation',
      'CT600 preparation and submission',
      'Review of reliefs and timing where relevant',
      'Practical tax efficiency considerations',
    ],
    audience: ['UK resident companies', 'Groups and single entities', 'Companies with property or investment income', 'First-time filers'],
    icon: '\u{1F4BC}',
  },
  {
    slug: 'personal-tax-returns',
    category: 'Tax Services',
    title: 'Personal Tax Returns',
    heroDescription:
      'Self-assessment support for individuals and sole traders: clear, accurate, and on time.',
    problems: [
      'Multiple income sources: employment, self-employment, dividends, property',
      'Uncertainty over allowances, reliefs, and what must be declared',
      'Missing UTR deadlines, payments on account, or HMRC correspondence',
      'Sole trader records not aligned with self-assessment figures',
    ],
    solutions: [
      'Gathering and checking income, expenses, and capital gains information',
      'Preparation of the return with a plain-English summary of tax position',
      'Electronic filing to HMRC and confirmation of amounts due',
      'Guidance on payments, payments on account, and record-keeping for next year',
    ],
    included: [
      'Self-assessment preparation',
      'Income and allowances review',
      'Submission to HMRC',
      'Guidance on payments and deadlines',
    ],
    audience: ['Sole traders', 'Company directors', 'Landlords', 'Individuals with investment or foreign income'],
    icon: '\u{1F4DD}',
  },
  {
    slug: 'vat-returns',
    category: 'Tax Services',
    title: 'VAT Returns',
    heroDescription:
      'VAT preparation and submissions so you stay compliant without the stress.',
    problems: [
      'Partial exemption, reverse charge, or cross-border supplies adding complexity',
      'Reconciling VAT to sales and purchases before each filing window',
      'Making Tax Digital requirements for record-keeping and submission',
      'Penalty risk if errors repeat or submissions are late',
    ],
    solutions: [
      'Review of VAT periods, schemes (e.g. cash vs accrual), and rates applied',
      'Preparation and submission of returns through compliant software links',
      'Checks between bookkeeping and VAT boxes before filing',
      'Ongoing answers on VAT treatment as your business changes',
    ],
    included: [
      'VAT calculation and preparation',
      'Review of transactions',
      'Submission to HMRC',
      'Ongoing VAT support and questions',
    ],
    audience: ['VAT-registered businesses', 'E-commerce and services exporters', 'Partially exempt sectors', 'Businesses moving to or from registration'],
    icon: '\u{1F4E7}',
  },
  {
    slug: 'tax-planning',
    category: 'Tax Services',
    title: 'Tax Planning',
    heroDescription:
      'Forward-looking tax planning for owners and businesses: sensible, compliant, and explained clearly.',
    problems: [
      'Major events ahead (sale, investment, or restructuring) without a clear tax picture',
      'Overlap between personal and company tax positions for owners',
      'Reliefs and allowances not reviewed until after the fact',
      'Need for proportionate planning that matches risk appetite and compliance',
    ],
    solutions: [
      'Structured review of structure, timing, and documented advice where appropriate',
      'Identification of relevant reliefs, elections, and interaction with accounts',
      'Coordination with year-end, payroll, and property tax where relevant',
      'Written summaries in plain English to support decisions',
    ],
    included: [
      'Review of structure and timing',
      'Identification of relevant reliefs and allowances',
      'Coordination with your year-end and compliance cycle',
      'Plain-English recommendations',
    ],
    audience: ['Business owners', 'High earners', 'Families with property or investments', 'Companies planning transactions'],
    icon: '\u{1F3AF}',
  },
  {
    slug: 'company-formation',
    category: 'Business Services',
    title: 'Company Formation',
    heroDescription:
      'Get your limited company set up correctly from day one with straightforward guidance.',
    problems: [
      'Choosing share structure, officers, and SIC codes without clear guidance',
      'Uncertainty about PSC registers, authentication codes, and first filings',
      'Need to align company setup with bank account, VAT, and payroll timing',
      'Risk of avoidable rejections or corrections at Companies House',
    ],
    solutions: [
      'Step-by-step support through incorporation and first confirmation statement planning',
      'Explanation of roles, share capital, and ongoing filing calendar',
      'Introduction to corporation tax, PAYE, and VAT registration where relevant',
      'Clear handover so bookkeeping and compliance start on the right footing',
    ],
    included: [
      'Company registration support',
      'Companies House filing guidance',
      'Initial setup and next steps explained',
      'Introduction to ongoing compliance obligations',
    ],
    audience: ['First-time founders', 'Sole traders incorporating', 'New subsidiaries', 'Partners setting up a trading vehicle'],
    icon: '\u{1F3E2}',
  },
  {
    slug: 'payroll',
    category: 'Business Services',
    title: 'Payroll',
    heroDescription:
      'Payroll processing and RTI submissions so your team is paid accurately and on time.',
    problems: [
      'PAYE, NI, pensions, and statutory pay rules changing and easy to get wrong',
      'Late or incorrect RTI submissions affecting employees and HMRC records',
      'Year-end P60/P11D workload colliding with other deadlines',
      'Growing headcount without in-house payroll expertise',
    ],
    solutions: [
      'Reliable pay runs with payslips and deductions calculated correctly',
      'RTI submissions on schedule and aligned to your software',
      'Support for starters, leavers, and benefits in kind where agreed',
      'Year-end packs and answers when HMRC or staff ask questions',
    ],
    included: [
      'Employee payroll processing',
      'Payslip generation',
      'RTI submissions',
      'Handling statutory deductions',
    ],
    audience: ['Employers with PAYE schemes', 'Growing SMEs', 'Directors on payroll', 'Businesses adding staff or contractors on payroll'],
    icon: '\u{1F465}',
  },
  {
    slug: 'registered-address',
    category: 'Business Services',
    title: 'Registered Address',
    heroDescription:
      'A professional registered office address and mail handling where offered as part of our services.',
    problems: [
      'Using a home address on the public register for privacy or credibility reasons',
      'Mail from Companies House and HMRC going astray or unopened',
      'Need for a consistent address for banks, clients, and contracts',
      'Uncertainty about what is included in forwarding and turnaround times',
    ],
    solutions: [
      'Use of an agreed business address for registration where terms allow',
      'Mail handling and forwarding according to a clear service description',
      'Renewal expectations and contact points set out up front',
      'Coordination with company secretarial and filing reminders where offered',
    ],
    included: [
      'Use of business address for registration (where agreed)',
      'Mail handling and forwarding arrangements',
      'Clear terms and renewal expectations',
    ],
    audience: ['New and existing limited companies', 'Overseas businesses with a UK entity', 'Home-based founders', 'Professionals needing a stable public address'],
    icon: '\u{2709}',
  },
  {
    slug: 'business-advisory',
    category: 'Advisory',
    title: 'Business Advisory',
    heroDescription:
      'Practical advice on finances, structure, and next steps without the jargon.',
    problems: [
      'Growth or contraction changing cash, funding, and staffing needs quickly',
      'Decisions made without timely numbers or scenario thinking',
      'Gap between ambition and what the current financial picture can support',
      'Need for an independent sounding board outside day-to-day operations',
    ],
    solutions: [
      'Structured review of performance, risks, and priorities against your goals',
      'Recommendations on reporting, controls, and next steps you can act on',
      'Support for planning conversations with funders, landlords, or partners where relevant',
      'Follow-up touchpoints agreed so advice turns into progress',
    ],
    included: [
      'Structured review of your numbers and priorities',
      'Recommendations aligned to your stage of business',
      'Support for planning and decision-making',
      'Ongoing access for agreed follow-ups',
    ],
    audience: ['SME owners', 'Scaling businesses', 'Family-run companies', 'Founders planning exit or investment'],
    icon: '\u{1F4A1}',
  },
];

export const SERVICE_SLUGS = services.map((s) => s.slug);

export const servicesNavGroups = [
  {
    label: 'Accounting Services',
    items: [
      { slug: 'bookkeeping', title: 'Bookkeeping' },
      { slug: 'management-accounts', title: 'Management Accounts' },
      { slug: 'year-end-accounts', title: 'Year-End Accounts' },
    ],
  },
  {
    label: 'Tax Services',
    items: [
      { slug: 'corporation-tax', title: 'Corporation Tax' },
      { slug: 'personal-tax-returns', title: 'Personal Tax Returns' },
      { slug: 'vat-returns', title: 'VAT Returns' },
      { slug: 'tax-planning', title: 'Tax Planning' },
    ],
  },
  {
    label: 'Business Services',
    items: [
      { slug: 'company-formation', title: 'Company Formation' },
      { slug: 'payroll', title: 'Payroll' },
      { slug: 'registered-address', title: 'Registered Address' },
    ],
  },
  {
    label: 'Advisory',
    items: [{ slug: 'business-advisory', title: 'Business Advisory' }],
  },
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug) || null;
}

export function getAllServices() {
  return services;
}

export { processSteps };
