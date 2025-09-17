const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Basic security and middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:3002', 
    'http://localhost:3001', 
    'http://localhost:3000',
    'https://portfolio-builder-frontend.vercel.app',
    'https://*.vercel.app'
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// In-memory storage for demo purposes
const users = [];
const portfolios = [];

// Simple JWT-like token generation
const generateToken = (userId) => {
  return `demo_token_${userId}_${Date.now()}`;
};

// Demo user data
const demoUser = {
  id: 'demo_user_1',
  username: 'demouser',
  email: 'demo@example.com',
  firstName: 'Demo',
  lastName: 'User',
  avatar: null,
  bio: 'This is a demo user for testing',
  isEmailVerified: true,
  preferences: {
    theme: 'light',
    emailNotifications: true,
    publicProfile: true
  },
  subscription: {
    plan: 'free',
    status: 'active'
  },
  createdAt: new Date(),
  lastLogin: new Date()
};

// Auth routes
app.post('/api/auth/register', (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;
  
  const newUser = {
    id: `user_${Date.now()}`,
    username,
    email,
    firstName,
    lastName,
    avatar: null,
    bio: '',
    isEmailVerified: false,
    preferences: {
      theme: 'light',
      emailNotifications: true,
      publicProfile: true
    },
    subscription: {
      plan: 'free',
      status: 'active'
    },
    createdAt: new Date(),
    lastLogin: new Date()
  };
  
  users.push(newUser);
  const token = generateToken(newUser.id);
  
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // For demo, accept any email/password combination
  const user = email === 'demo@example.com' ? demoUser : {
    id: `user_${Date.now()}`,
    username: email.split('@')[0],
    email,
    firstName: 'User',
    lastName: 'Demo',
    avatar: null,
    bio: '',
    isEmailVerified: true,
    preferences: {
      theme: 'light',
      emailNotifications: true,
      publicProfile: true
    },
    subscription: {
      plan: 'free',
      status: 'active'
    },
    createdAt: new Date(),
    lastLogin: new Date()
  };
  
  const token = generateToken(user.id);
  
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
});

app.post('/api/auth/logout', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'No token provided'
    });
  }
  
  res.status(200).json({
    status: 'success',
    data: demoUser
  });
});

// Portfolio routes
app.get('/api/portfolios', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      portfolios: [
        {
          id: 'demo_portfolio_1',
          title: 'My Demo Portfolio',
          description: 'This is a demo portfolio',
          template: 'professional',
          isPublic: true,
          slug: 'my-demo-portfolio',
          sections: [
            { type: 'hero', title: 'Welcome', content: 'Hello World' },
            { type: 'about', title: 'About Me', content: 'I am a developer' }
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    }
  });
});

app.post('/api/portfolios', (req, res) => {
  const portfolio = {
    id: `portfolio_${Date.now()}`,
    slug: req.body.title ? req.body.title.toLowerCase().replace(/\s+/g, '-') : `portfolio-${Date.now()}`,
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  portfolios.push(portfolio);
  
  res.status(201).json({
    status: 'success',
    data: {
      portfolio
    }
  });
});

app.put('/api/portfolios/:id', (req, res) => {
  const { id } = req.params;
  
  // Find and update portfolio
  const portfolioIndex = portfolios.findIndex(p => p.id === id);
  
  if (portfolioIndex === -1) {
    return res.status(404).json({
      status: 'error',
      message: 'Portfolio not found'
    });
  }
  
  portfolios[portfolioIndex] = {
    ...portfolios[portfolioIndex],
    ...req.body,
    updatedAt: new Date()
  };
  
  res.status(200).json({
    status: 'success',
    data: {
      portfolio: portfolios[portfolioIndex]
    }
  });
});

// Public portfolio routes (no auth required)
app.get('/api/public/portfolios/:slug', (req, res) => {
  const { slug } = req.params;
  
  // Mock public portfolio data
  const publicPortfolio = {
    id: 'demo_portfolio_public',
    title: `Portfolio: ${slug}`,
    description: 'This is a public demo portfolio',
    template: 'modern',
    isPublic: true,
    slug: slug,
    sections: [
      {
        type: 'hero',
        title: 'Welcome to My Portfolio',
        content: {
          name: 'John Doe',
          title: 'Full Stack Developer',
          description: 'Passionate developer creating amazing digital experiences',
          backgroundImage: '/api/placeholder/hero-bg.jpg'
        }
      },
      {
        type: 'about',
        title: 'About Me',
        content: {
          text: 'I am a full-stack developer with 5+ years of experience building web applications using modern technologies like React, Node.js, and Python.',
          skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL'],
          image: '/api/placeholder/profile.jpg'
        }
      },
      {
        type: 'projects',
        title: 'My Projects',
        content: {
          projects: [
            {
              title: 'E-commerce Platform',
              description: 'A full-featured online store built with React and Node.js',
              technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
              image: '/api/placeholder/project1.jpg',
              liveUrl: 'https://example.com',
              githubUrl: 'https://github.com/example/project'
            },
            {
              title: 'Task Management App',
              description: 'A collaborative task management application with real-time updates',
              technologies: ['Vue.js', 'Express', 'Socket.io', 'PostgreSQL'],
              image: '/api/placeholder/project2.jpg',
              liveUrl: 'https://example.com',
              githubUrl: 'https://github.com/example/project'
            }
          ]
        }
      },
      {
        type: 'contact',
        title: 'Get In Touch',
        content: {
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          social: {
            linkedin: 'https://linkedin.com/in/johndoe',
            github: 'https://github.com/johndoe',
            twitter: 'https://twitter.com/johndoe'
          }
        }
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  res.status(200).json({
    status: 'success',
    data: publicPortfolio
  });
});

app.get('/api/public/portfolios/:slug/download', (req, res) => {
  const { slug } = req.params;
  
  // Generate a standalone HTML file
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio: ${slug}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 100px 20px;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 10px;
        }
        
        .hero p {
            font-size: 1.2rem;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .section {
            padding: 80px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .section h2 {
            font-size: 2.5rem;
            text-align: center;
            margin-bottom: 50px;
            color: #2c3e50;
        }
        
        .about {
            background: #f8f9fa;
        }
        
        .projects {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 30px;
        }
        
        .project-card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            padding: 30px;
            transition: transform 0.3s ease;
        }
        
        .project-card:hover {
            transform: translateY(-5px);
        }
        
        .contact {
            background: #2c3e50;
            color: white;
            text-align: center;
        }
        
        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
            margin-top: 20px;
        }
        
        .skill-tag {
            background: #667eea;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }
            
            .section {
                padding: 60px 20px;
            }
            
            .section h2 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="hero">
        <h1>John Doe</h1>
        <p>Full Stack Developer</p>
        <p>Passionate developer creating amazing digital experiences</p>
    </div>
    
    <div class="section about">
        <h2>About Me</h2>
        <p style="text-align: center; font-size: 1.1rem; max-width: 800px; margin: 0 auto;">
            I am a full-stack developer with 5+ years of experience building web applications using modern technologies like React, Node.js, and Python.
        </p>
        <div class="skills">
            <span class="skill-tag">JavaScript</span>
            <span class="skill-tag">React</span>
            <span class="skill-tag">Node.js</span>
            <span class="skill-tag">Python</span>
            <span class="skill-tag">MongoDB</span>
            <span class="skill-tag">PostgreSQL</span>
        </div>
    </div>
    
    <div class="section">
        <h2>My Projects</h2>
        <div class="projects">
            <div class="project-card">
                <h3>E-commerce Platform</h3>
                <p>A full-featured online store built with React and Node.js</p>
                <div class="skills" style="justify-content: flex-start; margin-top: 15px;">
                    <span class="skill-tag">React</span>
                    <span class="skill-tag">Node.js</span>
                    <span class="skill-tag">MongoDB</span>
                    <span class="skill-tag">Stripe</span>
                </div>
            </div>
            <div class="project-card">
                <h3>Task Management App</h3>
                <p>A collaborative task management application with real-time updates</p>
                <div class="skills" style="justify-content: flex-start; margin-top: 15px;">
                    <span class="skill-tag">Vue.js</span>
                    <span class="skill-tag">Express</span>
                    <span class="skill-tag">Socket.io</span>
                    <span class="skill-tag">PostgreSQL</span>
                </div>
            </div>
        </div>
    </div>
    
    <div class="section contact">
        <h2>Get In Touch</h2>
        <p>Email: john.doe@example.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Location: San Francisco, CA</p>
        <p style="margin-top: 20px;">
            <a href="https://linkedin.com/in/johndoe" style="color: #74b9ff; margin: 0 10px;">LinkedIn</a>
            <a href="https://github.com/johndoe" style="color: #74b9ff; margin: 0 10px;">GitHub</a>
            <a href="https://twitter.com/johndoe" style="color: #74b9ff; margin: 0 10px;">Twitter</a>
        </p>
    </div>
    
    <footer style="background: #2c3e50; color: white; text-align: center; padding: 20px;">
        <p>&copy; ${new Date().getFullYear()} John Doe. All rights reserved.</p>
        <p style="margin-top: 10px; font-size: 0.9rem; opacity: 0.8;">
            Created with Portfolio Builder - <a href="${req.get('origin') || 'http://localhost:3002'}" style="color: #74b9ff;">Create your own</a>
        </p>
    </footer>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Disposition', `attachment; filename="${slug}-portfolio.html"`);
  res.send(htmlContent);
});

// AI route
app.post('/api/ai/generate-portfolio', (req, res) => {
  const { description } = req.body;
  
  // Mock AI response
  const mockPortfolio = {
    title: 'AI Generated Portfolio',
    description: `Based on your description: "${description}"`,
    template: 'modern',
    sections: [
      {
        type: 'hero',
        title: 'Welcome to My Portfolio',
        content: 'This portfolio was generated using AI based on your description.'
      },
      {
        type: 'about',
        title: 'About Me',
        content: 'I am a professional with experience in various technologies and domains.'
      },
      {
        type: 'projects',
        title: 'My Projects',
        projects: [
          {
            title: 'Project 1',
            description: 'A sample project showcasing my skills',
            technologies: ['React', 'Node.js', 'MongoDB']
          }
        ]
      }
    ]
  };
  
  res.status(200).json({
    status: 'success',
    data: {
      portfolio: mockPortfolio
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Demo API is running!',
    timestamp: new Date().toISOString(),
    features: ['Auth', 'Portfolios', 'AI Generation (Mock)']
  });
});

// Error handling
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Demo Portfolio Builder API Server Running!`);
  console.log(`📍 Environment: development`);
  console.log(`🌐 Port: ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(`💾 Database: In-Memory (Demo Mode)`);
  console.log(`⚡ Features: Auth, Portfolios, AI Generation`);
  console.log(`\n🎯 This is a demo version without MongoDB dependency`);
  console.log(`   User login details are stored in browser localStorage`);
  console.log(`   Backend accepts any email/password for testing`);
});
