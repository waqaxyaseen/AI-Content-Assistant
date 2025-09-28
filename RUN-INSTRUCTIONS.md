# 🚀 AI Content Assistant - How to Run Locally

## Quick Start

### Option 1: Simple Web App Only (Recommended for Testing)
1. **Double-click** `start-simple.bat` in the project folder
2. Wait for installation to complete
3. The web app will start on **http://localhost:3001**

### Option 2: Manual Setup
If the batch file doesn't work, follow these manual steps:

## Manual Installation Steps

### 1. Install Web App Dependencies
```bash
cd web
npm install --legacy-peer-deps
```

### 2. Start the Web Application
```bash
npm run dev
```

The app will be available at: **http://localhost:3001**

## 🎯 What You'll See

### Landing Page (http://localhost:3001)
- Professional marketing website
- Features overview
- Pricing plans
- Testimonials
- Call-to-action sections

### Authentication Pages
- **Login**: `/auth/login`
- **Register**: `/auth/register`

### Dashboard (After Login)
- **Welcome section** with personalized greeting
- **Stats cards** showing content metrics
- **Quick actions** for content creation
- **Analytics overview** with charts and performance data
- **Recent activity** feed
- **Monthly goals** progress tracking

## 🔧 Demo Mode Features

Since this is running in demo mode (without backend API), you'll see:

1. **Static Demo Data**: Pre-populated analytics, content, and user information
2. **Interactive UI**: All buttons and navigation work
3. **Responsive Design**: Test on different screen sizes
4. **Form Validation**: Registration and login forms with proper validation
5. **State Management**: Redux store managing app state
6. **Modern UI**: Professional design with animations and transitions

## 🎮 How to Test

### 1. Landing Page
- Scroll through all sections
- Click navigation links
- Test responsive design (resize browser)
- Try the "Get Started" buttons

### 2. Authentication
- Go to "Sign In" or register as a new user
- Test form validation by submitting empty forms
- Try invalid email formats
- Test password visibility toggles

### 3. Dashboard (Demo Mode)
- View the welcome message and stats
- Click on quick action buttons
- Explore the analytics charts
- Check the recent activity feed
- Test the sidebar navigation

### 4. Navigation
- Use the sidebar menu
- Test mobile responsive menu (narrow browser)
- Try the search bar
- Click user profile section

## 🔑 API Integration (Optional)

To enable full AI features, you can:

1. **Add API Keys** to `web/.env.local`:
```env
# Add these for full functionality
NEXT_PUBLIC_OPENAI_API_KEY=your-openai-key
NEXT_PUBLIC_ANTHROPIC_API_KEY=your-anthropic-key
```

2. **Start Backend Services** (Advanced):
```bash
# In separate terminals:
cd backend/api-gateway && npm install && npm run dev
cd backend/auth-service && npm install && npm run dev
cd backend/ai-service && npm install && npm run dev
```

## 🛠️ Troubleshooting

### Common Issues:

1. **"npm not recognized"**
   - Install Node.js from https://nodejs.org
   - Restart your computer after installation

2. **Port 3001 already in use**
   - Close any other applications using that port
   - Or change the port in `web/package.json`

3. **Installation errors**
   - Try running: `npm install --legacy-peer-deps --force`
   - Clear npm cache: `npm cache clean --force`

4. **Browser shows blank page**
   - Wait a few minutes for compilation
   - Check console for errors (F12)
   - Try refreshing the page

### Performance Notes:
- First load might take 30-60 seconds to compile
- Subsequent changes are fast (hot reload)
- Modern browsers work best (Chrome, Firefox, Edge)

## 📱 Mobile Testing

To test mobile responsiveness:
1. Open browser dev tools (F12)
2. Click device simulation icon
3. Choose different device sizes
4. Test touch interactions

## 🎉 What's Working

✅ **Complete Frontend**: Landing page, auth, dashboard
✅ **Responsive Design**: Mobile, tablet, desktop
✅ **State Management**: Redux with persistence
✅ **Form Validation**: Real-time validation
✅ **Navigation**: Multi-page routing
✅ **UI Components**: Professional design system
✅ **Demo Data**: Realistic content and analytics
✅ **Animations**: Smooth transitions and loading states

## 🚀 Next Steps

Once you verify everything works:
1. **Customize branding** and content
2. **Add real API keys** for AI functionality
3. **Set up backend services** for full features
4. **Deploy to production** hosting
5. **Build mobile app** using this as foundation

## 📞 Support

If you encounter any issues:
1. Check this troubleshooting guide
2. Review console errors (F12 in browser)
3. Try the simple startup method first
4. Ensure Node.js is properly installed

---

**🎯 Goal**: See a fully functional AI Content Assistant web application running locally, demonstrating all the features and user interface that will be in the final product.