import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Professional Form Sections
const SECTIONS = [
  { id: 1, title: 'Personal Information', icon: '👤' },
  { id: 2, title: 'Professional Summary', icon: '📋' },
  { id: 3, title: 'Skills & Expertise', icon: '⚡' },
  { id: 4, title: 'Work Experience', icon: '💼' },
  { id: 5, title: 'Education & Training', icon: '🎓' },
  { id: 6, title: 'Projects Portfolio', icon: '🚀' },
  { id: 7, title: 'Certifications', icon: '🏆' },
  { id: 8, title: 'Additional Information', icon: '✨' }
];

const PortfolioCreationForm: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedTemplate = searchParams.get('template') || 'modern';
  const [showPreview, setShowPreview] = useState(false);

  const [currentSection, setCurrentSection] = useState(1);
  const [newCompetency, setNewCompetency] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [newTechnicalSkill, setNewTechnicalSkill] = useState({ name: '', category: '', proficiency: '', yearsExperience: '' });
  const [newSoftSkill, setNewSoftSkill] = useState({ skill: '', level: '', description: '' });
  const [newTool, setNewTool] = useState({ name: '', proficiency: '', category: '' });
  const [newLanguage, setNewLanguage] = useState({ language: '', proficiency: '', certification: '' });
  const [newResponsibility, setNewResponsibility] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  const [newMetric, setNewMetric] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [newActivity, setNewActivity] = useState('');
  const [newAcademicProject, setNewAcademicProject] = useState('');
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      professionalTitle: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      country: '',
      linkedinUrl: '',
      githubUrl: '',
      portfolioUrl: '',
      professionalSummary: ''
    },
    professionalSummary: {
      careerObjective: '',
      valueProposition: '',
      yearsExperience: '',
      industryFocus: [] as string[],
      coreCompetencies: [] as string[],
      professionalPhilosophy: '',
      careerHighlights: [] as string[],
      targetRole: '',
      availabilityStatus: '',
      salaryExpectation: '',
      preferredWorkStyle: ''
    },
    skills: {
      technicalSkills: [] as Array<{ category: string; skills: Array<{ name: string; proficiency: string; yearsExperience: string }> }>,
      softSkills: [] as Array<{ skill: string; level: string; description: string }>,
      tools: [] as Array<{ name: string; proficiency: string; category: string }>,
      languages: [] as Array<{ language: string; proficiency: string; certification: string }>
    },
    workExperience: [] as Array<{
      company: string;
      position: string;
      location: string;
      startDate: string;
      endDate: string;
      current: boolean;
      employmentType: string;
      responsibilities: string[];
      achievements: string[];
      technologies: string[];
      keyMetrics: string[];
      teamSize: string;
      reportingTo: string;
      directReports: string;
    }>,
    education: [] as Array<{
      institution: string;
      degreeType: string;
      fieldOfStudy: string;
      location: string;
      startDate: string;
      endDate: string;
      currentlyEnrolled: boolean;
      gpa: string;
      honors: string;
      relevantCoursework: string[];
      activities: string[];
      academicProjects: string[];
      description: string;
    }>,
    projects: [],
    certifications: [],
    additionalInfo: {
      awards: [],
      publications: [],
      volunteerWork: [],
      interests: [],
      references: 'Available upon request'
    }
  });

  const nextSection = () => {
    if (currentSection < SECTIONS.length) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const portfolioData = { ...formData, template: selectedTemplate };
    console.log('Professional Portfolio Data:', portfolioData);
    
    // Save portfolio data to localStorage for preview
    localStorage.setItem('portfolioPreviewData', JSON.stringify(portfolioData));
    
    // Show the portfolio preview
    setShowPreview(true);
  };

  // Section 1: Personal Information
  const renderPersonalInfoSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
          <input
            type="text"
            value={formData.personalInfo.firstName}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, firstName: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
          <input
            type="text"
            value={formData.personalInfo.lastName}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, lastName: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Title *</label>
        <input
          type="text"
          value={formData.personalInfo.professionalTitle}
          onChange={(e) => setFormData({
            ...formData,
            personalInfo: { ...formData.personalInfo, professionalTitle: e.target.value }
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Senior Software Engineer, Product Manager, UX Designer"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, email: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={formData.personalInfo.phone}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, phone: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
          <input
            type="text"
            value={formData.personalInfo.city}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, city: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">State/Province</label>
          <input
            type="text"
            value={formData.personalInfo.state}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, state: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
          <input
            type="text"
            value={formData.personalInfo.country}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, country: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn Profile</label>
          <input
            type="url"
            value={formData.personalInfo.linkedinUrl}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, linkedinUrl: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub Profile</label>
          <input
            type="url"
            value={formData.personalInfo.githubUrl}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, githubUrl: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://github.com/yourusername"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Portfolio Website</label>
          <input
            type="url"
            value={formData.personalInfo.portfolioUrl}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, portfolioUrl: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://yourportfolio.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Summary *</label>
        <textarea
          value={formData.personalInfo.professionalSummary}
          onChange={(e) => setFormData({
            ...formData,
            personalInfo: { ...formData.personalInfo, professionalSummary: e.target.value }
          })}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="A compelling 2-3 sentence summary of your professional background, key strengths, and career goals..."
          required
        />
        <p className="text-sm text-gray-500 mt-1">This will be the first thing employers see. Make it impactful!</p>
      </div>
    </div>
  );

  // Section 2: Professional Summary & Career Objectives
  const renderProfessionalSummarySection = () => {
    const addCompetency = () => {
      if (newCompetency.trim() && !formData.professionalSummary.coreCompetencies.includes(newCompetency.trim())) {
        setFormData({
          ...formData,
          professionalSummary: {
            ...formData.professionalSummary,
            coreCompetencies: [...formData.professionalSummary.coreCompetencies, newCompetency.trim()]
          }
        });
        setNewCompetency('');
      }
    };

    const removeCompetency = (competency: string) => {
      setFormData({
        ...formData,
        professionalSummary: {
          ...formData.professionalSummary,
          coreCompetencies: formData.professionalSummary.coreCompetencies.filter(c => c !== competency)
        }
      });
    };

    const addHighlight = () => {
      if (newHighlight.trim() && !formData.professionalSummary.careerHighlights.includes(newHighlight.trim())) {
        setFormData({
          ...formData,
          professionalSummary: {
            ...formData.professionalSummary,
            careerHighlights: [...formData.professionalSummary.careerHighlights, newHighlight.trim()]
          }
        });
        setNewHighlight('');
      }
    };

    const removeHighlight = (highlight: string) => {
      setFormData({
        ...formData,
        professionalSummary: {
          ...formData.professionalSummary,
          careerHighlights: formData.professionalSummary.careerHighlights.filter(h => h !== highlight)
        }
      });
    };

    return (
      <div className="space-y-8">
        {/* Career Objective */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Career Objective / Professional Goal *
          </label>
          <textarea
            value={formData.professionalSummary.careerObjective}
            onChange={(e) => setFormData({
              ...formData,
              professionalSummary: { ...formData.professionalSummary, careerObjective: e.target.value }
            })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="A clear, specific statement about your career direction and what you aim to achieve in your next role..."
            required
          />
          <p className="text-sm text-blue-600 mt-2">
            💡 <strong>Tip:</strong> Be specific about the role you're targeting and how you plan to contribute value.
          </p>
        </div>

        {/* Value Proposition */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Value Proposition *
          </label>
          <textarea
            value={formData.professionalSummary.valueProposition}
            onChange={(e) => setFormData({
              ...formData,
              professionalSummary: { ...formData.professionalSummary, valueProposition: e.target.value }
            })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What unique value do you bring to employers? Highlight your key strengths, achievements, and differentiators..."
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Focus on measurable achievements and specific skills that set you apart from other candidates.
          </p>
        </div>

        {/* Experience and Industry Focus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Years of Experience *
            </label>
            <select
              value={formData.professionalSummary.yearsExperience}
              onChange={(e) => setFormData({
                ...formData,
                professionalSummary: { ...formData.professionalSummary, yearsExperience: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select experience level</option>
              <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
              <option value="Mid-Level (3-5 years)">Mid-Level (3-5 years)</option>
              <option value="Senior Level (6-10 years)">Senior Level (6-10 years)</option>
              <option value="Expert Level (10+ years)">Expert Level (10+ years)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Target Role *
            </label>
            <input
              type="text"
              value={formData.professionalSummary.targetRole}
              onChange={(e) => setFormData({
                ...formData,
                professionalSummary: { ...formData.professionalSummary, targetRole: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Senior React Developer, Product Manager, UI/UX Designer"
              required
            />
          </div>
        </div>

        {/* Core Competencies */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Core Competencies *
          </label>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newCompetency}
              onChange={(e) => setNewCompetency(e.target.value)}
              placeholder="Add a core competency (e.g., Strategic Planning, Team Leadership)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCompetency())}
            />
            <button
              type="button"
              onClick={addCompetency}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.professionalSummary.coreCompetencies.map((competency, index) => (
              <span
                key={index}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200"
              >
                {competency}
                <button
                  type="button"
                  onClick={() => removeCompetency(competency)}
                  className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Add 5-8 key competencies that align with your target role (e.g., Leadership, Strategic Planning, Data Analysis).
          </p>
        </div>

        {/* Career Highlights */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Career Highlights
          </label>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              placeholder="Add a career highlight (e.g., Led team of 15, Increased revenue by 40%)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
            />
            <button
              type="button"
              onClick={addHighlight}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              Add
            </button>
          </div>
          <div className="space-y-2 mb-2">
            {formData.professionalSummary.careerHighlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3"
              >
                <span className="text-green-800">{highlight}</span>
                <button
                  type="button"
                  onClick={() => removeHighlight(highlight)}
                  className="text-green-600 hover:text-green-800 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Include quantifiable achievements that demonstrate your impact (e.g., revenue growth, team size, project outcomes).
          </p>
        </div>

        {/* Professional Philosophy & Work Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Professional Philosophy
            </label>
            <textarea
              value={formData.professionalSummary.professionalPhilosophy}
              onChange={(e) => setFormData({
                ...formData,
                professionalSummary: { ...formData.professionalSummary, professionalPhilosophy: e.target.value }
              })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your approach to work, leadership style, or core values that guide your professional decisions..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Work Style
            </label>
            <select
              value={formData.professionalSummary.preferredWorkStyle}
              onChange={(e) => setFormData({
                ...formData,
                professionalSummary: { ...formData.professionalSummary, preferredWorkStyle: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select work style</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
        </div>

        {/* Availability & Expectations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Availability Status
            </label>
            <select
              value={formData.professionalSummary.availabilityStatus}
              onChange={(e) => setFormData({
                ...formData,
                professionalSummary: { ...formData.professionalSummary, availabilityStatus: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select availability</option>
              <option value="Immediately available">Immediately available</option>
              <option value="Available in 2 weeks">Available in 2 weeks</option>
              <option value="Available in 1 month">Available in 1 month</option>
              <option value="Currently employed, open to opportunities">Currently employed, open to opportunities</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Salary Expectation (Optional)
            </label>
            <input
              type="text"
              value={formData.professionalSummary.salaryExpectation}
              onChange={(e) => setFormData({
                ...formData,
                professionalSummary: { ...formData.professionalSummary, salaryExpectation: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., $80,000 - $100,000, Competitive, Negotiable"
            />
          </div>
        </div>

        {/* Success Metrics Preview */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Profile Strength</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Career Objective</span>
              <span className={`text-sm font-semibold ${formData.professionalSummary.careerObjective ? 'text-green-600' : 'text-red-600'}`}>
                {formData.professionalSummary.careerObjective ? '✓ Complete' : '✗ Missing'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Value Proposition</span>
              <span className={`text-sm font-semibold ${formData.professionalSummary.valueProposition ? 'text-green-600' : 'text-red-600'}`}>
                {formData.professionalSummary.valueProposition ? '✓ Complete' : '✗ Missing'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Core Competencies</span>
              <span className={`text-sm font-semibold ${formData.professionalSummary.coreCompetencies.length >= 3 ? 'text-green-600' : 'text-yellow-600'}`}>
                {formData.professionalSummary.coreCompetencies.length} added (3+ recommended)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Career Highlights</span>
              <span className={`text-sm font-semibold ${formData.professionalSummary.careerHighlights.length >= 2 ? 'text-green-600' : 'text-yellow-600'}`}>
                {formData.professionalSummary.careerHighlights.length} added (2+ recommended)
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Section 3: Skills & Expertise Assessment
  const renderSkillsAssessmentSection = () => {
    const addTechnicalSkill = () => {
      if (newTechnicalSkill.name.trim() && newTechnicalSkill.category.trim()) {
        // Check if category exists, if not create it
        const existingCategoryIndex = formData.skills.technicalSkills.findIndex(
          cat => cat.category === newTechnicalSkill.category
        );

        if (existingCategoryIndex >= 0) {
          // Add skill to existing category
          const updatedCategories = [...formData.skills.technicalSkills];
          updatedCategories[existingCategoryIndex].skills.push({
            name: newTechnicalSkill.name,
            proficiency: newTechnicalSkill.proficiency,
            yearsExperience: newTechnicalSkill.yearsExperience
          });
          setFormData({
            ...formData,
            skills: { ...formData.skills, technicalSkills: updatedCategories }
          });
        } else {
          // Create new category with skill
          setFormData({
            ...formData,
            skills: {
              ...formData.skills,
              technicalSkills: [
                ...formData.skills.technicalSkills,
                {
                  category: newTechnicalSkill.category,
                  skills: [{
                    name: newTechnicalSkill.name,
                    proficiency: newTechnicalSkill.proficiency,
                    yearsExperience: newTechnicalSkill.yearsExperience
                  }]
                }
              ]
            }
          });
        }
        setNewTechnicalSkill({ name: '', category: '', proficiency: '', yearsExperience: '' });
      }
    };

    const removeTechnicalSkill = (categoryIndex: number, skillIndex: number) => {
      const updatedCategories = [...formData.skills.technicalSkills];
      updatedCategories[categoryIndex].skills.splice(skillIndex, 1);
      
      // Remove category if no skills left
      if (updatedCategories[categoryIndex].skills.length === 0) {
        updatedCategories.splice(categoryIndex, 1);
      }
      
      setFormData({
        ...formData,
        skills: { ...formData.skills, technicalSkills: updatedCategories }
      });
    };

    const addSoftSkill = () => {
      if (newSoftSkill.skill.trim()) {
        setFormData({
          ...formData,
          skills: {
            ...formData.skills,
            softSkills: [...formData.skills.softSkills, { ...newSoftSkill }]
          }
        });
        setNewSoftSkill({ skill: '', level: '', description: '' });
      }
    };

    const removeSoftSkill = (index: number) => {
      setFormData({
        ...formData,
        skills: {
          ...formData.skills,
          softSkills: formData.skills.softSkills.filter((_, i) => i !== index)
        }
      });
    };

    const addTool = () => {
      if (newTool.name.trim()) {
        setFormData({
          ...formData,
          skills: {
            ...formData.skills,
            tools: [...formData.skills.tools, { ...newTool }]
          }
        });
        setNewTool({ name: '', proficiency: '', category: '' });
      }
    };

    const removeTool = (index: number) => {
      setFormData({
        ...formData,
        skills: {
          ...formData.skills,
          tools: formData.skills.tools.filter((_, i) => i !== index)
        }
      });
    };

    const addLanguage = () => {
      if (newLanguage.language.trim()) {
        setFormData({
          ...formData,
          skills: {
            ...formData.skills,
            languages: [...formData.skills.languages, { ...newLanguage }]
          }
        });
        setNewLanguage({ language: '', proficiency: '', certification: '' });
      }
    };

    const removeLanguage = (index: number) => {
      setFormData({
        ...formData,
        skills: {
          ...formData.skills,
          languages: formData.skills.languages.filter((_, i) => i !== index)
        }
      });
    };

    return (
      <div className="space-y-8">
        {/* Technical Skills */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Skills *</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Skill name"
              value={newTechnicalSkill.name}
              onChange={(e) => setNewTechnicalSkill({ ...newTechnicalSkill, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Category (e.g., Frontend, Backend)"
              value={newTechnicalSkill.category}
              onChange={(e) => setNewTechnicalSkill({ ...newTechnicalSkill, category: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={newTechnicalSkill.proficiency}
              onChange={(e) => setNewTechnicalSkill({ ...newTechnicalSkill, proficiency: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Proficiency Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            <input
              type="text"
              placeholder="Years experience"
              value={newTechnicalSkill.yearsExperience}
              onChange={(e) => setNewTechnicalSkill({ ...newTechnicalSkill, yearsExperience: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="button"
            onClick={addTechnicalSkill}
            className="w-full md:w-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
          >
            Add Technical Skill
          </button>

          {/* Display Technical Skills by Category */}
          <div className="mt-6 space-y-4">
            {formData.skills.technicalSkills.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg p-4 border border-purple-100">
                <h4 className="font-semibold text-purple-800 mb-3">{category.category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center justify-between bg-purple-50 rounded-lg p-3">
                      <div>
                        <span className="font-medium text-purple-900">{skill.name}</span>
                        <div className="text-sm text-purple-600">
                          {skill.proficiency} • {skill.yearsExperience} years
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTechnicalSkill(categoryIndex, skillIndex)}
                        className="text-purple-600 hover:text-purple-800 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Soft Skills & Leadership *</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Soft skill"
              value={newSoftSkill.skill}
              onChange={(e) => setNewSoftSkill({ ...newSoftSkill, skill: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <select
              value={newSoftSkill.level}
              onChange={(e) => setNewSoftSkill({ ...newSoftSkill, level: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Proficiency Level</option>
              <option value="Developing">Developing</option>
              <option value="Proficient">Proficient</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            <input
              type="text"
              placeholder="Brief description/example"
              value={newSoftSkill.description}
              onChange={(e) => setNewSoftSkill({ ...newSoftSkill, description: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button
            type="button"
            onClick={addSoftSkill}
            className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
          >
            Add Soft Skill
          </button>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {formData.skills.softSkills.map((skill, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-green-100">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium text-green-900">{skill.skill}</span>
                    <div className="text-sm text-green-600">{skill.level}</div>
                    {skill.description && (
                      <div className="text-xs text-gray-600 mt-1">{skill.description}</div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSoftSkill(index)}
                    className="text-green-600 hover:text-green-800 font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Technologies */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tools & Technologies</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Tool/Technology name"
              value={newTool.name}
              onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <select
              value={newTool.proficiency}
              onChange={(e) => setNewTool({ ...newTool, proficiency: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Proficiency Level</option>
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            <input
              type="text"
              placeholder="Category (e.g., Design, DevOps)"
              value={newTool.category}
              onChange={(e) => setNewTool({ ...newTool, category: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button
            type="button"
            onClick={addTool}
            className="w-full md:w-auto px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
          >
            Add Tool
          </button>

          <div className="mt-4 flex flex-wrap gap-2">
            {formData.skills.tools.map((tool, index) => (
              <div key={index} className="bg-white rounded-lg p-3 border border-orange-100 flex items-center gap-2">
                <div>
                  <span className="font-medium text-orange-900">{tool.name}</span>
                  <div className="text-xs text-orange-600">
                    {tool.proficiency} • {tool.category}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeTool(index)}
                  className="text-orange-600 hover:text-orange-800 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Language"
              value={newLanguage.language}
              onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <select
              value={newLanguage.proficiency}
              onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Proficiency Level</option>
              <option value="Basic">Basic</option>
              <option value="Conversational">Conversational</option>
              <option value="Fluent">Fluent</option>
              <option value="Native">Native</option>
            </select>
            <input
              type="text"
              placeholder="Certification (optional)"
              value={newLanguage.certification}
              onChange={(e) => setNewLanguage({ ...newLanguage, certification: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button
            type="button"
            onClick={addLanguage}
            className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
          >
            Add Language
          </button>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {formData.skills.languages.map((lang, index) => (
              <div key={index} className="bg-white rounded-lg p-3 border border-indigo-100">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium text-indigo-900">{lang.language}</span>
                    <div className="text-sm text-indigo-600">{lang.proficiency}</div>
                    {lang.certification && (
                      <div className="text-xs text-gray-600 mt-1">{lang.certification}</div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="text-indigo-600 hover:text-indigo-800 font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Summary Dashboard */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Profile Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formData.skills.technicalSkills.reduce((total, cat) => total + cat.skills.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Technical Skills</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{formData.skills.softSkills.length}</div>
              <div className="text-sm text-gray-600">Soft Skills</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{formData.skills.tools.length}</div>
              <div className="text-sm text-gray-600">Tools & Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{formData.skills.languages.length}</div>
              <div className="text-sm text-gray-600">Languages</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Section 4: Work Experience & Achievements
  const renderWorkExperienceSection = () => {
    const addWorkExperience = () => {
      setFormData({
        ...formData,
        workExperience: [
          ...formData.workExperience,
          {
            company: '',
            position: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            employmentType: '',
            responsibilities: [],
            achievements: [],
            technologies: [],
            keyMetrics: [],
            teamSize: '',
            reportingTo: '',
            directReports: ''
          }
        ]
      });
    };

    const removeWorkExperience = (index: number) => {
      setFormData({
        ...formData,
        workExperience: formData.workExperience.filter((_, i) => i !== index)
      });
    };

    const updateWorkExperience = (index: number, field: string, value: any) => {
      const updated = [...formData.workExperience];
      updated[index] = { ...updated[index], [field]: value };
      setFormData({ ...formData, workExperience: updated });
    };

    const addArrayItem = (expIndex: number, arrayField: string, value: string) => {
      if (value.trim()) {
        const updated = [...formData.workExperience];
        const currentExp = updated[expIndex];
        const currentArray = currentExp[arrayField as keyof typeof currentExp] as string[];
        
        updated[expIndex] = {
          ...updated[expIndex],
          [arrayField]: [...currentArray, value.trim()]
        };
        setFormData({ ...formData, workExperience: updated });
        
        // Reset the appropriate state
        if (arrayField === 'responsibilities') setNewResponsibility('');
        if (arrayField === 'achievements') setNewAchievement('');
        if (arrayField === 'technologies') setNewTechnology('');
        if (arrayField === 'keyMetrics') setNewMetric('');
      }
    };

    const removeArrayItem = (expIndex: number, arrayField: string, itemIndex: number) => {
      const updated = [...formData.workExperience];
      const currentExp = updated[expIndex];
      const currentArray = [...(currentExp[arrayField as keyof typeof currentExp] as string[])];
      currentArray.splice(itemIndex, 1);
      
      updated[expIndex] = {
        ...updated[expIndex],
        [arrayField]: currentArray
      };
      setFormData({ ...formData, workExperience: updated });
    };

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Professional Work Experience</h2>
            <p className="text-gray-600 mt-1">Add your work history starting with the most recent position</p>
          </div>
          <button
            type="button"
            onClick={addWorkExperience}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-md"
          >
            + Add Position
          </button>
        </div>

        {formData.workExperience.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8zM8 14v.01M12 14v.01M16 14v.01" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No work experience added yet</h3>
            <p className="text-gray-500 mb-4">Click "Add Position" to add your first work experience</p>
          </div>
        ) : (
          <div className="space-y-8">
            {formData.workExperience.map((experience, expIndex) => (
              <div key={expIndex} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Position {expIndex + 1}
                    {experience.position && ` - ${experience.position}`}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeWorkExperience(expIndex)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Remove
                  </button>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) => updateWorkExperience(expIndex, 'company', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Google, Microsoft, Startup Inc."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
                    <input
                      type="text"
                      value={experience.position}
                      onChange={(e) => updateWorkExperience(expIndex, 'position', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Senior Software Engineer, Product Manager"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={experience.location}
                      onChange={(e) => updateWorkExperience(expIndex, 'location', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City, State/Country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Employment Type</label>
                    <select
                      value={experience.employmentType}
                      onChange={(e) => updateWorkExperience(expIndex, 'employmentType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Team Size</label>
                    <input
                      type="text"
                      value={experience.teamSize}
                      onChange={(e) => updateWorkExperience(expIndex, 'teamSize', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 5-10 people"
                    />
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date *</label>
                    <input
                      type="month"
                      value={experience.startDate}
                      onChange={(e) => updateWorkExperience(expIndex, 'startDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Date {experience.current ? '(Current Position)' : '*'}
                    </label>
                    <input
                      type="month"
                      value={experience.endDate}
                      onChange={(e) => updateWorkExperience(expIndex, 'endDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={experience.current}
                      required={!experience.current}
                    />
                  </div>
                  <div className="flex items-center pt-8">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={experience.current}
                        onChange={(e) => {
                          updateWorkExperience(expIndex, 'current', e.target.checked);
                          if (e.target.checked) {
                            updateWorkExperience(expIndex, 'endDate', '');
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Current Position</span>
                    </label>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Key Responsibilities *
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newResponsibility}
                      onChange={(e) => setNewResponsibility(e.target.value)}
                      placeholder="Add a key responsibility"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem(expIndex, 'responsibilities', newResponsibility))}
                    />
                    <button
                      type="button"
                      onClick={() => addArrayItem(expIndex, 'responsibilities', newResponsibility)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {experience.responsibilities.map((responsibility, respIndex) => (
                      <div key={respIndex} className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                        <span className="text-blue-900">• {responsibility}</span>
                        <button
                          type="button"
                          onClick={() => removeArrayItem(expIndex, 'responsibilities', respIndex)}
                          className="text-blue-600 hover:text-blue-800 font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Key Achievements & Impact *
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newAchievement}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      placeholder="Add a quantifiable achievement"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem(expIndex, 'achievements', newAchievement))}
                    />
                    <button
                      type="button"
                      onClick={() => addArrayItem(expIndex, 'achievements', newAchievement)}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {experience.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                        <span className="text-green-900">🏆 {achievement}</span>
                        <button
                          type="button"
                          onClick={() => removeArrayItem(expIndex, 'achievements', achIndex)}
                          className="text-green-600 hover:text-green-800 font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Include metrics when possible (e.g., "Increased sales by 25%", "Led team of 8 developers")
                  </p>
                </div>

                {/* Technologies Used */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Technologies & Tools Used
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      placeholder="Add a technology or tool"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem(expIndex, 'technologies', newTechnology))}
                    />
                    <button
                      type="button"
                      onClick={() => addArrayItem(expIndex, 'technologies', newTechnology)}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 border border-purple-200">
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeArrayItem(expIndex, 'technologies', techIndex)}
                          className="ml-2 text-purple-600 hover:text-purple-800 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Key Performance Metrics
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newMetric}
                      onChange={(e) => setNewMetric(e.target.value)}
                      placeholder="Add a performance metric"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem(expIndex, 'keyMetrics', newMetric))}
                    />
                    <button
                      type="button"
                      onClick={() => addArrayItem(expIndex, 'keyMetrics', newMetric)}
                      className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
                    >
                      Add
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {experience.keyMetrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
                        <span className="text-orange-900">📊 {metric}</span>
                        <button
                          type="button"
                          onClick={() => removeArrayItem(expIndex, 'keyMetrics', metricIndex)}
                          className="text-orange-600 hover:text-orange-800 font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Include specific numbers and percentages (e.g., "Budget: $2M", "Conversion rate: 15%")
                  </p>
                </div>

                {/* Reporting Structure */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Reporting To</label>
                    <input
                      type="text"
                      value={experience.reportingTo}
                      onChange={(e) => updateWorkExperience(expIndex, 'reportingTo', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., VP Engineering, Product Director"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Direct Reports</label>
                    <input
                      type="text"
                      value={experience.directReports}
                      onChange={(e) => updateWorkExperience(expIndex, 'directReports', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 3 Senior Developers, 2 Junior Developers"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience Summary */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{formData.workExperience.length}</div>
              <div className="text-sm text-gray-600">Positions Added</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formData.workExperience.reduce((total, exp) => total + exp.achievements.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {[...new Set(formData.workExperience.flatMap(exp => exp.technologies))].length}
              </div>
              <div className="text-sm text-gray-600">Unique Technologies</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Section 5: Education & Academic Background
  const renderEducationSection = () => {
    const addEducation = () => {
      setFormData({
        ...formData,
        education: [
          ...formData.education,
          {
            institution: '',
            degreeType: '',
            fieldOfStudy: '',
            location: '',
            startDate: '',
            endDate: '',
            currentlyEnrolled: false,
            gpa: '',
            honors: '',
            relevantCoursework: [],
            activities: [],
            academicProjects: [],
            description: ''
          }
        ]
      });
    };

    const removeEducation = (index: number) => {
      const updated = formData.education.filter((_, i) => i !== index);
      setFormData({ ...formData, education: updated });
    };

    const updateEducation = (index: number, field: string, value: any) => {
      const updated = [...formData.education];
      updated[index] = { ...updated[index], [field]: value };
      setFormData({ ...formData, education: updated });
    };

    const updateEducationArray = (educationIndex: number, arrayField: string, itemIndex: number, value: string) => {
      const updated = [...formData.education];
      const currentArray = [...(updated[educationIndex][arrayField as keyof typeof updated[0]] as string[])];
      currentArray[itemIndex] = value;
      updated[educationIndex] = {
        ...updated[educationIndex],
        [arrayField]: currentArray
      };
      setFormData({ ...formData, education: updated });
    };

    const addEducationArrayItem = (educationIndex: number, arrayField: string, value: string) => {
      if (value.trim()) {
        const updated = [...formData.education];
        const currentArray = [...(updated[educationIndex][arrayField as keyof typeof updated[0]] as string[])];
        currentArray.push(value.trim());
        updated[educationIndex] = {
          ...updated[educationIndex],
          [arrayField]: currentArray
        };
        setFormData({ ...formData, education: updated });
        
        // Reset the appropriate state
        if (arrayField === 'relevantCoursework') setNewCourse('');
        if (arrayField === 'activities') setNewActivity('');
        if (arrayField === 'academicProjects') setNewAcademicProject('');
      }
    };

    const removeEducationArrayItem = (educationIndex: number, arrayField: string, itemIndex: number) => {
      const updated = [...formData.education];
      const currentArray = [...(updated[educationIndex][arrayField as keyof typeof updated[0]] as string[])];
      currentArray.splice(itemIndex, 1);
      updated[educationIndex] = {
        ...updated[educationIndex],
        [arrayField]: currentArray
      };
      setFormData({ ...formData, education: updated });
    };

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Education & Academic Background</h2>
            <p className="text-gray-600 mt-1">Add your educational qualifications and academic achievements</p>
          </div>
          <button
            type="button"
            onClick={addEducation}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-md"
          >
            + Add Education
          </button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Education Section Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• List degrees in reverse chronological order (most recent first)</li>
            <li>• Include relevant coursework, honors, and academic achievements</li>
            <li>• Add GPA if 3.5 or higher, or if you're a recent graduate</li>
            <li>• Include relevant certifications and continuing education</li>
          </ul>
        </div>

        {formData.education.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No education added yet</h3>
            <p className="text-gray-500 mb-4">Click "Add Education" to add your first educational qualification</p>
          </div>
        ) : (
          <div className="space-y-8">
            {formData.education.map((education, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Education {index + 1}
                    {education.degreeType && education.fieldOfStudy && ` - ${education.degreeType} in ${education.fieldOfStudy}`}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution Name *
                    </label>
                    <input
                      type="text"
                      value={education.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Stanford University, MIT, Harvard"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Degree Type *
                    </label>
                    <select
                      value={education.degreeType}
                      onChange={(e) => updateEducation(index, 'degreeType', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Degree Type</option>
                      <option value="High School Diploma">High School Diploma</option>
                      <option value="Associate's Degree">Associate's Degree</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="Doctoral Degree">Doctoral Degree</option>
                      <option value="Professional Degree">Professional Degree</option>
                      <option value="Certificate">Certificate</option>
                      <option value="Diploma">Diploma</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Field of Study *
                    </label>
                    <input
                      type="text"
                      value={education.fieldOfStudy}
                      onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Computer Science, Business Administration"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={education.location}
                      onChange={(e) => updateEducation(index, 'location', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Boston, MA"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="month"
                      value={education.startDate}
                      onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="month"
                        value={education.endDate}
                        onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                        disabled={education.currentlyEnrolled}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                      <label className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={education.currentlyEnrolled}
                          onChange={(e) => updateEducation(index, 'currentlyEnrolled', e.target.checked)}
                          className="mr-1"
                        />
                        Current
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GPA (Optional)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4.0"
                      value={education.gpa}
                      onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 3.75"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Honors & Awards
                    </label>
                    <input
                      type="text"
                      value={education.honors}
                      onChange={(e) => updateEducation(index, 'honors', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Magna Cum Laude, Dean's List"
                    />
                  </div>
                </div>

                {/* Relevant Coursework */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Relevant Coursework
                  </label>
                  <div className="space-y-2">
                    {education.relevantCoursework.map((course, courseIndex) => (
                      <div key={courseIndex} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={course}
                          onChange={(e) => updateEducationArray(index, 'relevantCoursework', courseIndex, e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Course name"
                        />
                        <button
                          type="button"
                          onClick={() => removeEducationArrayItem(index, 'relevantCoursework', courseIndex)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newCourse}
                        onChange={(e) => setNewCourse(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Add relevant course"
                        onKeyPress={(e) => e.key === 'Enter' && addEducationArrayItem(index, 'relevantCoursework', newCourse)}
                      />
                      <button
                        type="button"
                        onClick={() => addEducationArrayItem(index, 'relevantCoursework', newCourse)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Activities & Organizations */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Activities & Organizations
                  </label>
                  <div className="space-y-2">
                    {education.activities.map((activity, activityIndex) => (
                      <div key={activityIndex} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={activity}
                          onChange={(e) => updateEducationArray(index, 'activities', activityIndex, e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Activity or organization"
                        />
                        <button
                          type="button"
                          onClick={() => removeEducationArrayItem(index, 'activities', activityIndex)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newActivity}
                        onChange={(e) => setNewActivity(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Add activity or organization"
                        onKeyPress={(e) => e.key === 'Enter' && addEducationArrayItem(index, 'activities', newActivity)}
                      />
                      <button
                        type="button"
                        onClick={() => addEducationArrayItem(index, 'activities', newActivity)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Academic Projects */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Academic Projects
                  </label>
                  <div className="space-y-2">
                    {education.academicProjects.map((project, projectIndex) => (
                      <div key={projectIndex} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={project}
                          onChange={(e) => updateEducationArray(index, 'academicProjects', projectIndex, e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Academic project"
                        />
                        <button
                          type="button"
                          onClick={() => removeEducationArrayItem(index, 'academicProjects', projectIndex)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newAcademicProject}
                        onChange={(e) => setNewAcademicProject(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Add academic project"
                        onKeyPress={(e) => e.key === 'Enter' && addEducationArrayItem(index, 'academicProjects', newAcademicProject)}
                      />
                      <button
                        type="button"
                        onClick={() => addEducationArrayItem(index, 'academicProjects', newAcademicProject)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Description
                  </label>
                  <textarea
                    value={education.description}
                    onChange={(e) => updateEducation(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional details about your education, thesis, special programs, etc."
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education Summary */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-4">📊 Education Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {formData.education.length}
              </div>
              <div className="text-sm text-gray-600">Total Degrees</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {formData.education.length > 0 ? 
                  ['High School Diploma', 'Certificate', 'Diploma', 'Associate\'s Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'Professional Degree', 'Doctoral Degree']
                    .reduce((highest, current) => {
                      const hasCurrentLevel = formData.education.some(edu => edu.degreeType === current);
                      return hasCurrentLevel ? current.split(' ')[0] : highest;
                    }, 'None') : 'None'
                }
              </div>
              <div className="text-sm text-gray-600">Highest Level</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {formData.education.reduce((total, edu) => total + edu.relevantCoursework.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Coursework Added</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {formData.education.reduce((total, edu) => total + edu.activities.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Activities</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Placeholder sections
  const renderPlaceholderSection = (sectionName: string) => (
    <div className="text-center py-12">
      <div className="mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">{SECTIONS[currentSection - 1]?.icon}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{sectionName}</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          This professional-grade section is being developed to meet industry standards. 
          It will include comprehensive fields for job market requirements.
        </p>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
        <p className="text-sm text-blue-700">
          <strong>Coming soon:</strong> Advanced {sectionName.toLowerCase()} fields with validation, 
          industry-specific requirements, and ATS optimization.
        </p>
      </div>
    </div>
  );

  // Render current section
  const renderCurrentSection = () => {
    switch (currentSection) {
      case 1: return renderPersonalInfoSection();
      case 2: return renderProfessionalSummarySection();
      case 3: return renderSkillsAssessmentSection();
      case 4: return renderWorkExperienceSection();
      case 5: return renderEducationSection();
      case 6: return renderPlaceholderSection('Projects Portfolio & Case Studies');
      case 7: return renderPlaceholderSection('Certifications & Licenses');
      case 8: return renderPlaceholderSection('Additional Professional Information');
      default: return renderPlaceholderSection('Professional Section');
    }
  };

  // Portfolio Preview Component
  const renderPortfolioPreview = () => {
    const currentData = { ...formData, template: selectedTemplate };
    
    // Download portfolio as PDF
    const downloadPortfolioPDF = async () => {
      const element = document.getElementById('portfolio-content');
      if (!element) return;
      
      // Show loading state
      const button = document.getElementById('download-btn');
      if (button) {
        button.textContent = 'Generating PDF...';
        button.setAttribute('disabled', 'true');
      }
      
      try {
        // Configure html2canvas for better quality
        const canvas = await html2canvas(element, {
          useCORS: true,
          allowTaint: true,
          background: '#ffffff',
          height: element.scrollHeight,
          width: element.scrollWidth
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Calculate dimensions to fit A4
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasAspectRatio = canvas.height / canvas.width;
        const pdfAspectRatio = pdfHeight / pdfWidth;
        
        let finalWidth, finalHeight;
        if (canvasAspectRatio > pdfAspectRatio) {
          finalHeight = pdfHeight;
          finalWidth = finalHeight / canvasAspectRatio;
        } else {
          finalWidth = pdfWidth;
          finalHeight = finalWidth * canvasAspectRatio;
        }
        
        // Center the image on the page
        const x = (pdfWidth - finalWidth) / 2;
        const y = (pdfHeight - finalHeight) / 2;
        
        pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
        
        // Generate filename with user's name
        const fileName = `${currentData.personalInfo.firstName}_${currentData.personalInfo.lastName}_Portfolio.pdf`.replace(/\s+/g, '_');
        
        pdf.save(fileName);
        
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
      } finally {
        // Reset button state
        if (button) {
          button.textContent = 'Download PDF';
          button.removeAttribute('disabled');
        }
      }
    };
    
    const templateStyles = {
      modern: {
        primary: 'from-blue-500 to-purple-600',
        accent: 'text-blue-600',
        bg: 'bg-blue-50'
      },
      minimal: {
        primary: 'from-gray-700 to-gray-900',
        accent: 'text-gray-700',
        bg: 'bg-gray-50'
      },
      creative: {
        primary: 'from-pink-500 to-orange-500',
        accent: 'text-pink-600',
        bg: 'bg-pink-50'
      },
      professional: {
        primary: 'from-indigo-600 to-blue-700',
        accent: 'text-indigo-600',
        bg: 'bg-indigo-50'
      },
      developer: {
        primary: 'from-green-500 to-teal-600',
        accent: 'text-green-600',
        bg: 'bg-green-50'
      },
      designer: {
        primary: 'from-purple-500 to-pink-600',
        accent: 'text-purple-600',
        bg: 'bg-purple-50'
      }
    };

    const style = templateStyles[selectedTemplate as keyof typeof templateStyles] || templateStyles.modern;

    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg mb-8 p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Your Professional Portfolio</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  ← Edit Portfolio
                </button>
                <button
                  id="download-btn"
                  onClick={downloadPortfolioPDF}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Download PDF
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Publish Portfolio
                </button>
              </div>
            </div>
            <p className="text-gray-600">Template: <span className="font-semibold capitalize">{selectedTemplate}</span></p>
          </div>

          {/* Portfolio Content */}
          <div id="portfolio-content" className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Hero Section */}
            <div className={`bg-gradient-to-r ${style.primary} text-white p-12`}>
              <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-4">
                  {currentData.personalInfo.firstName} {currentData.personalInfo.lastName}
                </h1>
                <h2 className="text-2xl font-light mb-6 opacity-90">
                  {currentData.personalInfo.professionalTitle}
                </h2>
                <div className="flex flex-wrap gap-6 text-lg">
                  {currentData.personalInfo.email && (
                    <div className="flex items-center">
                      <span>📧</span>
                      <span className="ml-2">{currentData.personalInfo.email}</span>
                    </div>
                  )}
                  {currentData.personalInfo.phone && (
                    <div className="flex items-center">
                      <span>📞</span>
                      <span className="ml-2">{currentData.personalInfo.phone}</span>
                    </div>
                  )}
                  {(currentData.personalInfo.city || currentData.personalInfo.state || currentData.personalInfo.country) && (
                    <div className="flex items-center">
                      <span>📍</span>
                      <span className="ml-2">
                        {[currentData.personalInfo.city, currentData.personalInfo.state, currentData.personalInfo.country]
                          .filter(Boolean).join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-12">
              {/* Professional Summary */}
              {currentData.professionalSummary.careerObjective && (
                <section className="mb-12">
                  <h3 className={`text-2xl font-bold mb-6 ${style.accent}`}>Professional Summary</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      {currentData.professionalSummary.careerObjective}
                    </p>
                    {currentData.professionalSummary.valueProposition && (
                      <p className="text-gray-600 text-base leading-relaxed">
                        <strong>Value Proposition:</strong> {currentData.professionalSummary.valueProposition}
                      </p>
                    )}
                  </div>
                </section>
              )}

              {/* Skills */}
              {(currentData.skills.technicalSkills.length > 0 || currentData.skills.softSkills.length > 0) && (
                <section className="mb-12">
                  <h3 className={`text-2xl font-bold mb-6 ${style.accent}`}>Skills & Expertise</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {currentData.skills.technicalSkills.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-800">Technical Skills</h4>
                        <div className="space-y-3">
                          {currentData.skills.technicalSkills.flatMap((category: any) => 
                            category.skills.map((skill: any, index: number) => (
                              <div key={index} className="flex justify-between items-center">
                                <span className="font-medium">{skill.name}</span>
                                <div className="flex items-center space-x-2">
                                  <div className="w-24 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className={`bg-gradient-to-r ${style.primary} h-2 rounded-full`}
                                      style={{ 
                                        width: skill.proficiency === 'Expert' ? '100%' : 
                                               skill.proficiency === 'Advanced' ? '80%' : 
                                               skill.proficiency === 'Intermediate' ? '60%' : '40%' 
                                      }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-gray-600">{skill.proficiency}</span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                    
                    {currentData.skills.softSkills.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-800">Soft Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentData.skills.softSkills.map((skill: any, index: number) => (
                            <span 
                              key={index} 
                              className={`px-3 py-1 ${style.bg} ${style.accent} rounded-full text-sm font-medium`}
                            >
                              {skill.skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Work Experience */}
              {currentData.workExperience.length > 0 && (
                <section className="mb-12">
                  <h3 className={`text-2xl font-bold mb-6 ${style.accent}`}>Work Experience</h3>
                  <div className="space-y-8">
                    {currentData.workExperience.map((experience, index) => (
                      <div key={index} className="border-l-4 border-gray-200 pl-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900">{experience.position}</h4>
                            <p className={`text-lg ${style.accent} font-medium`}>{experience.company}</p>
                          </div>
                          <div className="text-right text-gray-600">
                            <p>{experience.startDate} - {experience.current ? 'Present' : experience.endDate}</p>
                            {experience.location && <p>{experience.location}</p>}
                          </div>
                        </div>
                        
                        {experience.responsibilities.length > 0 && (
                          <div className="mb-4">
                            <h5 className="font-semibold text-gray-800 mb-2">Key Responsibilities:</h5>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {experience.responsibilities.map((resp, respIndex) => (
                                <li key={respIndex}>{resp}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {experience.achievements.length > 0 && (
                          <div className="mb-4">
                            <h5 className="font-semibold text-gray-800 mb-2">Key Achievements:</h5>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {experience.achievements.map((achievement, achIndex) => (
                                <li key={achIndex}>{achievement}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {experience.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {experience.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex} 
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {currentData.education.length > 0 && (
                <section className="mb-12">
                  <h3 className={`text-2xl font-bold mb-6 ${style.accent}`}>Education</h3>
                  <div className="space-y-6">
                    {currentData.education.map((education, index) => (
                      <div key={index} className="border-l-4 border-gray-200 pl-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900">
                              {education.degreeType} {education.fieldOfStudy && `in ${education.fieldOfStudy}`}
                            </h4>
                            <p className={`text-lg ${style.accent} font-medium`}>{education.institution}</p>
                          </div>
                          <div className="text-right text-gray-600">
                            <p>{education.startDate} - {education.currentlyEnrolled ? 'Present' : education.endDate}</p>
                            {education.location && <p>{education.location}</p>}
                          </div>
                        </div>
                        
                        <div className="flex space-x-8 text-sm text-gray-600 mb-3">
                          {education.gpa && <span>GPA: {education.gpa}</span>}
                          {education.honors && <span>Honors: {education.honors}</span>}
                        </div>
                        
                        {education.relevantCoursework.length > 0 && (
                          <div className="mb-3">
                            <span className="font-semibold text-gray-800">Relevant Coursework: </span>
                            <span className="text-gray-700">{education.relevantCoursework.join(', ')}</span>
                          </div>
                        )}
                        
                        {education.activities.length > 0 && (
                          <div className="mb-3">
                            <span className="font-semibold text-gray-800">Activities: </span>
                            <span className="text-gray-700">{education.activities.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Contact Links */}
              <section>
                <h3 className={`text-2xl font-bold mb-6 ${style.accent}`}>Connect With Me</h3>
                <div className="flex flex-wrap gap-4">
                  {currentData.personalInfo.linkedinUrl && (
                    <a 
                      href={currentData.personalInfo.linkedinUrl} 
                      className={`px-4 py-2 ${style.bg} ${style.accent} rounded-lg hover:opacity-80 transition-opacity`}
                    >
                      LinkedIn
                    </a>
                  )}
                  {currentData.personalInfo.githubUrl && (
                    <a 
                      href={currentData.personalInfo.githubUrl} 
                      className={`px-4 py-2 ${style.bg} ${style.accent} rounded-lg hover:opacity-80 transition-opacity`}
                    >
                      GitHub
                    </a>
                  )}
                  {currentData.personalInfo.portfolioUrl && (
                    <a 
                      href={currentData.personalInfo.portfolioUrl} 
                      className={`px-4 py-2 ${style.bg} ${style.accent} rounded-lg hover:opacity-80 transition-opacity`}
                    >
                      Portfolio
                    </a>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main Component Render Logic
  if (showPreview) {
    return renderPortfolioPreview();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create Professional Portfolio</h1>
              <p className="text-gray-600 mt-1">
                Using <span className="capitalize font-semibold text-blue-600">{selectedTemplate}</span> template
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Section {currentSection} of {SECTIONS.length}</div>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentSection / SECTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentSection === section.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : currentSection > section.id
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{section.icon}</span>
                <span className="hidden sm:inline">{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-3xl">{SECTIONS[currentSection - 1]?.icon}</span>
                {SECTIONS[currentSection - 1]?.title}
              </h2>
              <p className="text-gray-600 mt-2">
                Please fill in all required fields marked with an asterisk (*).
              </p>
            </div>

            {renderCurrentSection()}
          </div>

          {/* Navigation Buttons */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Link
                  to="/templates"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  ← Back to Templates
                </Link>
                {currentSection > 1 && (
                  <button
                    type="button"
                    onClick={prevSection}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    ← Previous
                  </button>
                )}
              </div>

              <div className="flex gap-4">
                {currentSection < SECTIONS.length ? (
                  <button
                    type="button"
                    onClick={nextSection}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
                  >
                    🚀 Create Portfolio
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioCreationForm;
