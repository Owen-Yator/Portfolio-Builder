import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolioSection {
  type: 'hero' | 'about' | 'experience' | 'projects' | 'education' | 'skills' | 'contact' | 'custom';
  title: string;
  content: any;
  order: number;
  isVisible: boolean;
}

export interface IPortfolio extends Document {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  template: 'modern' | 'minimal' | 'creative' | 'professional' | 'developer' | 'designer';
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
  };
  sections: IPortfolioSection[];
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
  settings: {
    isPublic: boolean;
    allowComments: boolean;
    showContactForm: boolean;
    customDomain?: string;
    passwordProtected: boolean;
    password?: string;
    analytics: {
      googleAnalyticsId?: string;
      enableTracking: boolean;
    };
  };
  owner: mongoose.Types.ObjectId;
  collaborators: {
    user: mongoose.Types.ObjectId;
    role: 'viewer' | 'editor' | 'admin';
    invitedAt: Date;
    acceptedAt?: Date;
  }[];
  stats: {
    views: number;
    uniqueViews: number;
    lastViewed?: Date;
    shares: number;
    downloads: number;
  };
  publishedAt?: Date;
  publishedUrl?: string;
  version: number;
  backups: {
    version: number;
    data: any;
    createdAt: Date;
    createdBy: mongoose.Types.ObjectId;
  }[];
  aiGenerated: boolean;
  aiPrompt?: string;
  createdAt: Date;
  updatedAt: Date;
  incrementViews(isUnique?: boolean): Promise<IPortfolio>;
  canEdit(userId: string): boolean;
  canView(userId?: string): boolean;
}

const portfolioSectionSchema = new Schema<IPortfolioSection>({
  type: {
    type: String,
    required: true,
    enum: ['hero', 'about', 'experience', 'projects', 'education', 'skills', 'contact', 'custom']
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Section title cannot exceed 100 characters']
  },
  content: {
    type: Schema.Types.Mixed,
    required: true
  },
  order: {
    type: Number,
    required: true,
    min: 0
  },
  isVisible: {
    type: Boolean,
    default: true
  }
});

const portfolioSchema = new Schema<IPortfolio>({
  title: {
    type: String,
    required: [true, 'Portfolio title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  template: {
    type: String,
    required: true,
    enum: ['modern', 'minimal', 'creative', 'professional', 'developer', 'designer'],
    default: 'modern'
  },
  theme: {
    primaryColor: { type: String, default: '#3B82F6' },
    secondaryColor: { type: String, default: '#8B5CF6' },
    accentColor: { type: String, default: '#F59E0B' },
    backgroundColor: { type: String, default: '#FFFFFF' },
    textColor: { type: String, default: '#1F2937' },
    fontFamily: { type: String, default: 'Inter' }
  },
  sections: [portfolioSectionSchema],
  seo: {
    metaTitle: { type: String, maxlength: [60, 'Meta title cannot exceed 60 characters'] },
    metaDescription: { type: String, maxlength: [160, 'Meta description cannot exceed 160 characters'] },
    keywords: [{ type: String, maxlength: 50 }],
    ogImage: String
  },
  settings: {
    isPublic: { type: Boolean, default: true },
    allowComments: { type: Boolean, default: false },
    showContactForm: { type: Boolean, default: true },
    customDomain: String,
    passwordProtected: { type: Boolean, default: false },
    password: { type: String, select: false },
    analytics: {
      googleAnalyticsId: String,
      enableTracking: { type: Boolean, default: false }
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collaborators: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['viewer', 'editor', 'admin'], default: 'viewer' },
    invitedAt: { type: Date, default: Date.now },
    acceptedAt: Date
  }],
  stats: {
    views: { type: Number, default: 0 },
    uniqueViews: { type: Number, default: 0 },
    lastViewed: Date,
    shares: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 }
  },
  publishedAt: Date,
  publishedUrl: String,
  version: { type: Number, default: 1 },
  backups: [{
    version: Number,
    data: Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
  }],
  aiGenerated: { type: Boolean, default: false },
  aiPrompt: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
portfolioSchema.index({ owner: 1 });
portfolioSchema.index({ slug: 1 });
portfolioSchema.index({ 'settings.isPublic': 1 });
portfolioSchema.index({ publishedAt: -1 });
portfolioSchema.index({ 'stats.views': -1 });
portfolioSchema.index({ template: 1 });

// Compound indexes
portfolioSchema.index({ owner: 1, createdAt: -1 });
portfolioSchema.index({ 'settings.isPublic': 1, publishedAt: -1 });

// Virtual for full URL
portfolioSchema.virtual('fullUrl').get(function() {
  return this.settings.customDomain 
    ? `https://${this.settings.customDomain}`
    : `${process.env.FRONTEND_URL}/portfolio/${this.slug}`;
});

// Pre-save middleware to generate slug
portfolioSchema.pre('save', async function(next) {
  if (this.isModified('title') && (!this.slug || this.isNew)) {
    let baseSlug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    let slug = baseSlug;
    let counter = 1;
    
    // Check for existing slugs and append number if needed
    while (await mongoose.model('Portfolio').findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    this.slug = slug;
  }
  
  next();
});

// Pre-save middleware to create backup on version change
portfolioSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    // Create backup of previous version
    this.backups.push({
      version: this.version,
      data: this.toObject(),
      createdAt: new Date(),
      createdBy: this.owner
    });
    
    // Keep only last 10 backups
    if (this.backups.length > 10) {
      this.backups = this.backups.slice(-10);
    }
    
    this.version += 1;
  }
  
  next();
});

// Instance method to increment views
portfolioSchema.methods.incrementViews = function(isUnique = false) {
  this.stats.views += 1;
  if (isUnique) {
    this.stats.uniqueViews += 1;
  }
  this.stats.lastViewed = new Date();
  return this.save();
};

// Instance method to check if user can edit
portfolioSchema.methods.canEdit = function(userId: string) {
  if (this.owner.toString() === userId.toString()) {
    return true;
  }
  
  const collaborator = this.collaborators.find(
    (c: any) => c.user.toString() === userId.toString() && c.acceptedAt
  );
  
  return collaborator && ['editor', 'admin'].includes(collaborator.role);
};

// Instance method to check if user can view
portfolioSchema.methods.canView = function(userId?: string) {
  if (this.settings.isPublic) {
    return true;
  }
  
  if (!userId) {
    return false;
  }
  
  if (this.owner.toString() === userId.toString()) {
    return true;
  }
  
  return this.collaborators.some(
    (c: any) => c.user.toString() === userId.toString() && c.acceptedAt
  );
};

export default mongoose.model<IPortfolio>('Portfolio', portfolioSchema);
