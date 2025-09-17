# 🚀 Deployment Guide

## Quick Deploy Options

### Option 1: Netlify (Recommended for Frontend)

1. **Build the project:**
```bash
npm run build
```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select the `Portfolio-Builder` repository
   - Set build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `build`
   - Click "Deploy site"

3. **Configure environment variables:**
   - In Netlify dashboard → Site settings → Environment variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.railway.app/api`

### Option 2: Railway (For Backend)

1. **Deploy backend:**
   - Go to [railway.app](https://railway.app)
   - Sign up/Login with GitHub
   - Click "Deploy from GitHub repo"
   - Select `Portfolio-Builder` repository
   - Choose `backend` folder as root directory
   - Railway will auto-detect Node.js and deploy

2. **Set environment variables:**
   - In Railway dashboard → Variables tab
   - Add:
     - `NODE_ENV=production`
     - `PORT=8080` (Railway auto-assigns)
     - `JWT_SECRET=your-super-secret-key`

### Option 3: Vercel (Alternative Frontend)

1. **Install Vercel CLI (if not already installed):**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
cd "c:\Users\user\Desktop\PORTFOLIO BUILDER"
vercel --prod
```

### Option 4: Render (Full-Stack)

1. **Frontend:**
   - Go to [render.com](https://render.com)
   - Create "Static Site"
   - Connect GitHub repo
   - Build command: `npm run build`
   - Publish directory: `build`

2. **Backend:**
   - Create "Web Service"
   - Connect same GitHub repo
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`

## Environment Variables

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
```

### Backend (.env)
```env
NODE_ENV=production
PORT=8080
JWT_SECRET=your-super-secret-jwt-key-change-this
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio-builder
```

## Custom Domain Setup

1. **In your hosting provider:**
   - Go to Domain settings
   - Add custom domain
   - Follow DNS configuration instructions

2. **Update CORS in backend:**
```javascript
app.use(cors({
  origin: [
    'https://yourdomain.com',
    'https://www.yourdomain.com'
  ],
  credentials: true
}));
```

## SSL/HTTPS

- All modern hosting platforms (Netlify, Vercel, Railway, Render) provide free SSL certificates
- Your site will automatically be served over HTTPS

## Database (MongoDB Atlas)

1. **Create free cluster:**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Sign up and create free cluster
   - Get connection string

2. **Update backend environment:**
   - Set `MONGODB_URI` to your Atlas connection string

## Live URLs

Once deployed, your portfolio builder will be accessible at:
- **Frontend**: `https://your-app-name.netlify.app`
- **Backend**: `https://your-backend.railway.app`
- **Public Portfolios**: `https://your-app-name.netlify.app/portfolio/username`

## Features Available After Deployment

✅ **Public Portfolio Links**: Share portfolios with anyone worldwide
✅ **Cross-Device Access**: Works on mobile, tablet, desktop
✅ **Offline Portfolio Downloads**: Standalone HTML files
✅ **Custom Domain Support**: Use your own domain name
✅ **HTTPS Security**: Secure connections everywhere
✅ **Global CDN**: Fast loading worldwide
