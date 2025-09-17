import { Request, Response } from 'express';
import { AppError, catchAsync } from '../middleware/errorMiddleware';

// AI Portfolio Generation (Mock implementation for now)
export const generatePortfolioWithAI = catchAsync(async (req: Request, res: Response) => {
  const { description, preferences } = req.body;

  if (!description) {
    throw new AppError('Description is required for AI generation', 400);
  }

  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock AI response - in a real app, this would call OpenAI API
  const aiResponse = {
    template: detectTemplate(description),
    title: extractTitle(description),
    sections: generateSections(description),
    skills: extractSkills(description),
    projectIdeas: generateProjectIdeas(description),
    colorScheme: generateColorScheme(description),
    content: generateContent(description)
  };

  res.status(200).json({
    status: 'success',
    data: {
      generatedPortfolio: aiResponse,
      prompt: description
    }
  });
});

// Helper functions for AI generation
function detectTemplate(description: string): string {
  const desc = description.toLowerCase();
  
  if (desc.includes('developer') || desc.includes('programming') || desc.includes('coding')) {
    return 'developer';
  }
  if (desc.includes('designer') || desc.includes('creative') || desc.includes('design')) {
    return 'designer';
  }
  if (desc.includes('business') || desc.includes('corporate') || desc.includes('professional')) {
    return 'professional';
  }
  if (desc.includes('minimal') || desc.includes('clean') || desc.includes('simple')) {
    return 'minimal';
  }
  if (desc.includes('creative') || desc.includes('artistic') || desc.includes('unique')) {
    return 'creative';
  }
  
  return 'modern';
}

function extractTitle(description: string): string {
  // Look for patterns like "I am...", "My name is...", etc.
  const nameMatch = description.match(/(?:i am|i'm|my name is)\s+([a-zA-Z\s]+)/i);
  if (nameMatch) {
    return nameMatch[1].trim();
  }
  
  // Look for professional titles
  const titleMatch = description.match(/(?:a|an)\s+(developer|designer|engineer|manager|consultant|freelancer|student)/i);
  if (titleMatch) {
    return `${titleMatch[1].charAt(0).toUpperCase() + titleMatch[1].slice(1)} Portfolio`;
  }
  
  return 'My Portfolio';
}

function generateSections(description: string): string[] {
  const desc = description.toLowerCase();
  const sections = ['hero', 'about'];
  
  if (desc.includes('experience') || desc.includes('work') || desc.includes('job')) {
    sections.push('experience');
  }
  
  if (desc.includes('project') || desc.includes('portfolio') || desc.includes('work')) {
    sections.push('projects');
  }
  
  if (desc.includes('education') || desc.includes('university') || desc.includes('degree') || desc.includes('student')) {
    sections.push('education');
  }
  
  if (desc.includes('skill') || desc.includes('technology') || desc.includes('tool')) {
    sections.push('skills');
  }
  
  sections.push('contact');
  
  return sections;
}

function extractSkills(description: string): string[] {
  const desc = description.toLowerCase();
  const skillKeywords = [
    'javascript', 'typescript', 'react', 'vue', 'angular', 'node.js', 'python', 'java',
    'html', 'css', 'sass', 'tailwind', 'bootstrap', 'figma', 'photoshop', 'illustrator',
    'ui/ux', 'design', 'marketing', 'writing', 'photography', 'video editing',
    'project management', 'leadership', 'communication', 'problem solving'
  ];
  
  const detectedSkills = skillKeywords.filter(skill => 
    desc.includes(skill.toLowerCase()) || desc.includes(skill.replace('.js', ''))
  );
  
  // Add some default skills based on template type
  if (desc.includes('developer') || desc.includes('programming')) {
    detectedSkills.push('Problem Solving', 'Team Collaboration', 'Version Control');
  }
  if (desc.includes('designer')) {
    detectedSkills.push('Creative Thinking', 'User Research', 'Prototyping');
  }
  
  return detectedSkills.length > 0 ? detectedSkills : ['Communication', 'Problem Solving', 'Team Work'];
}

function generateProjectIdeas(description: string): string[] {
  const desc = description.toLowerCase();
  const projects = [];
  
  if (desc.includes('web') || desc.includes('website')) {
    projects.push('Web Application', 'Responsive Website');
  }
  if (desc.includes('mobile') || desc.includes('app')) {
    projects.push('Mobile Application');
  }
  if (desc.includes('design')) {
    projects.push('UI/UX Design Project', 'Brand Identity Design');
  }
  if (desc.includes('business') || desc.includes('startup')) {
    projects.push('Business Solution', 'Product Strategy');
  }
  if (desc.includes('data') || desc.includes('analytics')) {
    projects.push('Data Analysis Project', 'Dashboard Creation');
  }
  
  return projects.length > 0 ? projects : ['Personal Project', 'Professional Work', 'Creative Solution'];
}

function generateColorScheme(description: string): any {
  const desc = description.toLowerCase();
  
  // Default color schemes based on description
  if (desc.includes('creative') || desc.includes('artistic')) {
    return {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#45B7D1'
    };
  }
  if (desc.includes('professional') || desc.includes('business')) {
    return {
      primary: '#2C3E50',
      secondary: '#3498DB',
      accent: '#E74C3C'
    };
  }
  if (desc.includes('minimal') || desc.includes('clean')) {
    return {
      primary: '#2D3748',
      secondary: '#4A5568',
      accent: '#9F7AEA'
    };
  }
  
  // Default modern scheme
  return {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#F59E0B'
  };
}

function generateContent(description: string): any {
  return {
    hero: {
      title: extractTitle(description),
      subtitle: 'Professional Portfolio',
      description: 'Welcome to my portfolio showcasing my skills and experience.'
    },
    about: {
      text: `Based on your description: "${description.substring(0, 100)}..." I am passionate about creating meaningful solutions and delivering high-quality work.`
    }
  };
}
