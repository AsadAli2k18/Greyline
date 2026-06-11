const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { sendAdminNotification, sendUserConfirmation } = require('./emailService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../client/build')));

// API Routes
app.get('/api/services', (req, res) => {
  res.json({
    services: [
      {
        id: 1,
        title: "Accounts & Bookkeeping",
        description: "Professional bookkeeping services to keep your financial records accurate and up-to-date.",
        icon: "📊",
        features: [
          "Monthly bookkeeping",
          "Quarterly VAT returns",
          "Annual accounts preparation",
          "Cloud accounting setup",
          "Real-time financial reporting",
          "Management accounts",
          "Financial statements"
        ]
      },
      {
        id: 2,
        title: "Tax Services",
        description: "Expert tax planning and compliance services to minimize your tax liability legally.",
        icon: "📋",
        features: [
          "Self-assessment tax returns",
          "Corporation tax returns",
          "Tax planning & advice",
          "HMRC correspondence",
          "Tax investigation support",
          "Capital gains tax",
          "Inheritance tax planning"
        ]
      }
    ]
  });
});

app.get('/api/testimonials', (req, res) => {
  res.json({
    testimonials: [
      {
        id: 1,
        name: "Oliver L",
        company: "Authority Agency",
        role: "CEO",
        text: "We've always got the information we need to make decisions quickly ... We've saved £10k in taxes since working with Greyline Accountants Ltd. They're not your usual accountant."
      },
      {
        id: 2,
        name: "Oren G",
        company: "Kurve",
        role: "Managing Director",
        text: "Rayhaan and his team have been the ideal and stack up as the top partner we've worked with on finance matters over our 14 years in business."
      },
      {
        id: 3,
        name: "Phaibion R",
        company: "Royal Energy",
        role: "CEO",
        text: "Everybody wants clarity. My stress levels have decreased and I'm able to operate at a higher level, the biz is performing much better as a result."
      },
      {
        id: 4,
        name: "Lauren H",
        company: "LBHPT",
        role: "Founder",
        text: "Greyline Accountants Ltd. takes the stress out of taxes and deals with it all in a professional and timely manner. Rayhaan is an expert at what he does and I'm grateful I found such a great company to look after my taxes for the foreseeable future"
      },
      {
        id: 5,
        name: "Dean C",
        company: "Latte",
        role: "Founder",
        text: "Working with Rayhaan & the team has been phenomenal. I've got clarity around my numbers and what they mean for my business. I've saved tax, and I've been guided towards what's best for me and my goals."
      }
    ]
  });
});

app.post('/api/contact', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      preferredContactMethod,
      businessName,
      companyRegistrationNumber,
      businessType,
      annualRevenue,
      monthlyTransactions,
      vatRegistered,
      hasEmployees,
      employeeCount,
      accountingSoftware,
      servicesRequired,
      requirements,
    } = req.body;

    const services = Array.isArray(servicesRequired)
      ? servicesRequired.filter((s) => typeof s === 'string' && s.trim())
      : typeof servicesRequired === 'string' && servicesRequired.trim()
        ? [servicesRequired.trim()]
        : [];

    if (
      !fullName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !preferredContactMethod ||
      !businessName?.trim() ||
      !businessType ||
      !annualRevenue ||
      !monthlyTransactions ||
      !vatRegistered ||
      !hasEmployees ||
      !accountingSoftware ||
      !requirements?.trim() ||
      services.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields.',
      });
    }

    if (hasEmployees === 'yes') {
      const ec = String(employeeCount ?? '').trim();
      if (ec === '' || Number.isNaN(Number(ec)) || Number(ec) < 0) {
        return res.status(400).json({
          success: false,
          message: 'Please enter a valid employee count.',
        });
      }
    }

    const formData = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      preferredContactMethod,
      businessName: businessName.trim(),
      companyRegistrationNumber: (companyRegistrationNumber || '').trim(),
      businessType,
      annualRevenue,
      monthlyTransactions,
      vatRegistered,
      hasEmployees,
      employeeCount: hasEmployees === 'yes' ? String(employeeCount).trim() : '',
      accountingSoftware,
      servicesRequired: services,
      requirements: requirements.trim(),
    };

    await sendAdminNotification('contact', formData);

    try {
      await sendUserConfirmation('contact', formData.email, formData);
      console.log('Contact form submission processed - both emails sent:', {
        fullName: formData.fullName,
        email: formData.email,
      });
    } catch (userEmailError) {
      console.error('Failed to send user confirmation email (admin was notified):', userEmailError);
      console.log('Contact form submission processed - admin notified, user email failed:', {
        email: formData.email,
      });
    }

    res.json({
      success: true,
      message:
        "Thanks for your enquiry ,  the next step is to book a quick call so we can understand your needs and provide the best solution.",
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    console.error('Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'development' 
        ? `Error: ${error.message}` 
        : 'An error occurred while processing your request. Please try again later.'
    });
  }
});

app.post('/api/agency-profit-score/get-started', async (req, res) => {
  try {
    const { fullName, email, phone, role, agencyName, website, annualRevenue, teamSize } = req.body;
    
    // Validate required fields
    if (!fullName || !email || !phone || !role || !agencyName || !annualRevenue || !teamSize) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields.'
      });
    }

    const formData = { fullName, email, phone, role, agencyName, website, annualRevenue, teamSize };
    
    // Send email to admin (critical - must succeed)
    await sendAdminNotification('agency-profit-score', formData);
    
    // Send confirmation email to user (non-critical - log error but don't fail request)
    try {
      await sendUserConfirmation('agency-profit-score', email, formData);
      console.log('Get Started form submission processed - both emails sent:', { fullName, email, agencyName });
    } catch (userEmailError) {
      // Log the error but don't fail the request since admin was notified
      console.error('Failed to send user confirmation email (admin was notified):', userEmailError);
      console.log('Get Started form submission processed - admin notified, user email failed:', { fullName, email, agencyName });
    }
    
    res.json({
      success: true,
      message: "Form submitted successfully"
    });
  } catch (error) {
    console.error('Error processing get started form:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
});

// Debug endpoint to check SMTP configuration (development only)
app.get('/api/debug-smtp', (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ message: 'Not available in production' });
  }
  
  res.json({
    smtpConfigured: !!(process.env.SMTP_USER && process.env.SMTP_PASSWORD),
    smtpHost: process.env.SMTP_HOST || 'not set',
    smtpPort: process.env.SMTP_PORT || 'not set',
    smtpSecure: process.env.SMTP_SECURE || 'not set',
    smtpUser: process.env.SMTP_USER ? `${process.env.SMTP_USER.substring(0, 3)}***` : 'not set',
    smtpPassword: process.env.SMTP_PASSWORD ? '***set***' : 'not set'
  });
});

// Test endpoint to verify SMTP configuration
app.get('/api/test-email', async (req, res) => {
  try {
    const { sendAdminNotification } = require('./emailService');
    await sendAdminNotification('newsletter', { email: 'test@example.com' });
    res.json({
      success: true,
      message: 'Email test successful! Check your Mailtrap inbox.'
    });
  } catch (error) {
    console.error('Email test failed:', error);
    res.status(500).json({
      success: false,
      message: `Email test failed: ${error.message}`,
      details: process.env.NODE_ENV === 'development' ? {
        code: error.code,
        command: error.command,
        response: error.response
      } : undefined
    });
  }
});

app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required.'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    const formData = { email };
    
    // Send email to admin (critical - must succeed)
    await sendAdminNotification('newsletter', formData);
    
    // Send confirmation email to user (non-critical - log error but don't fail request)
    try {
      await sendUserConfirmation('newsletter', email, formData);
      console.log('Newsletter subscription processed - both emails sent:', { email });
    } catch (userEmailError) {
      // Log the error but don't fail the request since admin was notified
      console.error('Failed to send user confirmation email (admin was notified):', userEmailError);
      console.log('Newsletter subscription processed - admin notified, user email failed:', { email });
    }
    
    res.json({
      success: true,
      message: 'Thank you! Your subscription has been received!'
    });
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    if (error.code) console.error('Error code:', error.code);
    if (error.command) console.error('Error command:', error.command);
    if (error.response) console.error('Error response:', error.response);
    
    // Check for specific error types
    let errorMessage = 'An error occurred while processing your subscription. Please try again later.';
    if (error.message && error.message.includes('SMTP credentials')) {
      errorMessage = 'Email service is not configured. Please contact the administrator.';
    } else if (error.message && error.message.includes('Invalid login')) {
      errorMessage = 'Email authentication failed. Please check SMTP credentials.';
    } else if (process.env.NODE_ENV === 'development') {
      errorMessage = `Error: ${error.message}`;
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
});

app.post('/api/agency-profit-score', (req, res) => {
  const { answers } = req.body;
  
  // Calculate scores based on answers
  const calculateScore = (answers) => {
    let totalScore = 0;
    const categoryScores = {
      profitVisibility: 0,
      revenuePipeline: 0,
      cashFlow: 0,
      operations: 0,
      aiReadiness: 0
    };

    // Map questions to categories
    const categoryMapping = {
      1: 'profitVisibility', 3: 'profitVisibility', 11: 'profitVisibility',
      9: 'revenuePipeline', 12: 'revenuePipeline', 13: 'revenuePipeline',
      2: 'cashFlow', 17: 'cashFlow', 4: 'cashFlow',
      5: 'operations', 8: 'operations', 10: 'operations', 18: 'operations',
      16: 'aiReadiness', 15: 'aiReadiness', 19: 'aiReadiness'
    };

    const questions = [
      { id: 1, options: ["Daily", "Weekly", "Monthly", "Quarterly", "Rarely"] },
      { id: 2, options: ["Yes, always", "Mostly", "Sometimes", "Rarely", "Never"] },
      { id: 3, options: ["Very confident", "Somewhat confident", "Neutral", "Not very confident", "Not confident at all"] },
      { id: 4, options: ["Yes, always", "Mostly", "Sometimes", "Rarely", "Never"] },
      { id: 5, options: ["Based on clear financial data", "Based on gut feeling and data", "Mostly gut feeling", "Based on immediate need", "I'm not sure"] },
      { id: 6, options: ["Yes, well-defined", "Somewhat defined", "Basic strategy", "Informal approach", "No strategy"] },
      { id: 7, options: ["Weekly", "Monthly", "Quarterly", "Annually", "Only when I ask"] },
      { id: 8, options: ["Yes, fully integrated", "Yes, basic use", "Partially", "No, but planning to", "No"] },
      { id: 9, options: ["Very clear, 12+ months", "Clear, 6-12 months", "Somewhat clear, 3-6 months", "Unclear, less than 3 months", "No visibility"] },
      { id: 10, options: ["Yes, fully automated", "Mostly automated", "Partially automated", "Manual", "No reporting"] },
      { id: 11, options: ["Real-time tracking", "Monthly reviews", "Quarterly reviews", "Annual reviews", "Don't track"] },
      { id: 12, options: ["Yes, detailed 12+ months", "Yes, 6-12 months", "Yes, 3-6 months", "Basic forecast", "No forecast"] },
      { id: 13, options: ["Monthly", "Quarterly", "Semi-annually", "Annually", "Never"] },
      { id: 14, options: ["Yes, well-defined", "Some KPIs", "Basic metrics", "Informal tracking", "No KPIs"] },
      { id: 15, options: ["Very proactive", "Somewhat proactive", "Reactive", "Very reactive", "Passive"] },
      { id: 16, options: ["Yes, extensively", "Yes, some tools", "Planning to", "Considering", "No"] },
      { id: 17, options: ["Very clear, 12+ months", "Clear, 6-12 months", "Somewhat clear, 3-6 months", "Unclear", "No forecast"] },
      { id: 18, options: ["Yes, regular structured reviews", "Yes, informal reviews", "Occasionally", "Rarely", "Never"] },
      { id: 19, options: ["Very confident", "Somewhat confident", "Neutral", "Not very confident", "Not confident"] },
      { id: 20, options: ["Always", "Mostly", "Sometimes", "Rarely", "Never"] }
    ];

    Object.keys(answers).forEach(qId => {
      const category = categoryMapping[qId] || 'operations';
      const question = questions.find(q => q.id === parseInt(qId));
      if (question) {
        const answerIndex = question.options.indexOf(answers[qId]);
        const score = (4 - answerIndex) * 20; // Convert to 0-80 scale
        categoryScores[category] += score;
      }
    });

    // Calculate averages
    Object.keys(categoryScores).forEach(cat => {
      const count = Object.keys(categoryMapping).filter(k => categoryMapping[k] === cat).length;
      if (count > 0) {
        categoryScores[cat] = Math.round(categoryScores[cat] / count);
      }
    });

    // Calculate overall score
    totalScore = Math.round(
      (categoryScores.profitVisibility + 
       categoryScores.revenuePipeline + 
       categoryScores.cashFlow + 
       categoryScores.operations + 
       categoryScores.aiReadiness) / 5
    );

    return {
      totalScore,
      categoryScores,
      potentialImpact: Math.round(totalScore * 1300) // Example calculation
    };
  };

  const scoreData = calculateScore(answers);
  
  // In a real application, you would save this data to a database
  console.log('Agency Profit Score submission:', { answers, scoreData });
  
  res.json(scoreData);
});

// Catch all handler: send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
