# LEGIT - AICTE Grievance Intelligence Platform

**Version 1.1** | **SIH Problem Statement: SIH26264**

An integrated grievance intelligence platform with two distinct user experiences:
- **Legit Fox** - Student-facing complaint assistant
- **AICTE Legit** - Official admin dashboard

## 🎯 Purpose

LEGIT addresses the challenge of coordinating complaint cases across multiple AICTE Bureaus/Cells by providing:
- Semantic grievance matching to identify related complaints
- Smart complaint quality checking for completeness
- Historical resolution intelligence from verified outcomes
- Cross-Bureau coordination features
- AI-powered assistant for understanding regulations and procedures

## ✨ Features

### Student Experience (Legit Fox)
- **AI Grievance Assistant** - Natural language guidance on complaint categories and requirements
- **Smart Complaint Checker** - Completeness validation with explanations
- **Quality Improvement** - Suggestions for adding missing information
- **Historical Examples** - Anonymized case outcomes for reference

### Official Experience (AICTE Legit)
- **Executive Dashboard** - Consolidated metrics and complaint activity
- **Institution Directory** - Search and view institution profiles
- **Complaint Registry** - Searchable case management
- **Case Workspace** - Detailed complaint view with timeline
- **Similar Cases Detection** - AI-powered relationship suggestions
- **Cross-Bureau Coordination** - Overlap detection and collaboration tools

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone or navigate to the project directory
cd LEGIT

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

### Demo Access

The application runs in **demo mode** by default with synthetic data.

Demo login credentials:
- **Student**: `student@demo.legit` / any password
- **Bureau Officer**: `officer@demo.legit` / any password
- **Regional Officer**: `regional@demo.legit` / any password
- **Senior Management**: `senior@demo.legit` / any password
- **Super Admin**: `admin@demo.legit` / any password

Navigate to `/login` to select a role.

## 📁 Project Structure

```
LEGIT/
├── public/
│   ├── branding/          # Logo assets
│   │   ├── legit-fox-logo.png
│   │   ├── aicte-legit-logo.png
│   │   └── legit-fox-icon.png
│   └── mascot/            # Fox mascot illustrations
│       ├── legit-fox-mascot.png
│       ├── legit-fox-avatar.png
│       ├── legit-fox-welcome.png
│       └── legit-fox-assistance.png
├── src/
│   ├── app/               # Application setup
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   └── providers/     # Context providers
│   ├── components/        # Reusable components
│   │   ├── branding/      # Logo and mascot
│   │   ├── common/        # Shared utilities
│   │   ├── layout/        # Layout components
│   │   └── ui/            # Base UI components
│   ├── config/            # Runtime configuration
│   ├── data/              # Demo data
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin pages
│   │   ├── auth/          # Authentication
│   │   └── student/       # Student pages
│   ├── services/          # API and mock services
│   ├── styles/            # CSS and themes
│   ├── types/             # TypeScript definitions
│   └── utils/             # Utility functions
├── manual_work.txt        # Backend setup instructions
└── README.md
```

## 🎨 Design System

### Colors
- **Primary (Emerald)**: `#065F46` - Main brand color
- **Accent (Gold)**: `#D4AF37` - Highlights and accents
- **Backgrounds**: Adaptive light/dark themes

### Themes
- ✅ Light mode
- ✅ Dark mode (toggle in top-right)
- Theme preference persisted in localStorage

### Typography & Spacing
- Modern, accessible typography
- Consistent spacing using Tailwind CSS
- Responsive breakpoints for all device sizes

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 3000)

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run type-check       # TypeScript type checking
npm run lint             # ESLint checking
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Data mode: 'mock' for demo, 'api' for backend connection
VITE_DATA_MODE=mock

# Backend API URL (when using api mode)
VITE_API_BASE_URL=http://localhost:4000/api
```

### Demo Mode vs API Mode

**Demo Mode** (default):
- Uses synthetic data from `src/data/`
- No backend required
- Data persisted in localStorage
- All features work with mock responses

**API Mode**:
- Requires backend server running
- Connects to real database
- Gemini AI integration active
- See `manual_work.txt` for backend setup

## 📊 Demo Data

The application includes comprehensive demo data:
- 8 synthetic institutions across regions
- 20+ complaints in various statuses
- 5 Bureau/Cell entries (clearly marked as demo)
- Historical outcomes with different resolution types
- Realistic timeline and status progressions

**Important**: All demo data is clearly labeled as synthetic and not official AICTE data.

## 🔐 Security & Privacy

### Current Implementation
- ✅ Demo authentication with role-based access
- ✅ Frontend authorization checks
- ✅ No real personal data
- ✅ No hardcoded secrets
- ✅ .gitignore configured for .env files

### Production Requirements (See manual_work.txt)
- Real authentication (Supabase Auth or similar)
- Server-side authorization
- Row-level security policies
- API key protection (server-only)
- Input validation and sanitization
- File upload security
- Rate limiting

## 🚧 Current Limitations

This is a **prototype/demo phase** focusing on UI and application structure.

**Working in Demo Mode**:
- ✅ All UI screens and navigation
- ✅ Theme switching and responsive design
- ✅ Demo login with role switching
- ✅ Mock complaint and institution data
- ✅ Search and filter functionality
- ✅ Status tracking and metrics
- ✅ Student assistant (demo responses)
- ✅ Complaint quality checker

**Requires Backend Setup** (see manual_work.txt):
- ❌ Real Gemini AI responses
- ❌ Semantic complaint matching (embeddings)
- ❌ RAG-based regulatory sources
- ❌ Database persistence
- ❌ Real authentication
- ❌ File uploads
- ❌ Email notifications
- ❌ Advanced analytics

## 📋 Next Steps

1. **Install Dependencies**: `npm install`
2. **Start Development Server**: `npm run dev`
3. **Explore Demo Mode**: Visit `/login` and select a role
4. **Review Manual Work**: See `manual_work.txt` for backend setup
5. **Configure Backend**: Set up Express server with Gemini API
6. **Database Phase**: Design and implement PostgreSQL schema
7. **Production Deployment**: Follow deployment checklist in manual_work.txt

## 🎓 Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand + React Context
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Custom components inspired by shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns

### Backend (To Be Implemented)
- Node.js + Express + TypeScript
- Gemini AI API for chat and structured extraction
- PostgreSQL with pgvector for semantic search
- Supabase for auth and storage
- Zod for API validation

## 📝 Important Notes

1. **Demo Data Disclaimer**: All institutions, complaints, and records are fictional. This is not official AICTE data.

2. **Bureau List**: The demo includes 5 sample Bureau entries. The authoritative list must be verified before production.

3. **No Auto-Actions**: The system never automatically rejects, merges, or transfers complaints. All AI suggestions require human review.

4. **Not Legal Advice**: Assistant responses are guidance only, not binding legal advice or official decisions.

5. **Routing Rules**: Complaint routing and categorization rules must be verified against official AICTE procedures.

## 🤝 Contributing

This is a Smart India Hackathon 2026 project. For questions or contributions:

1. Review the complete specification in `Project_brief.txt`
2. Check current implementation status
3. See `manual_work.txt` for backend tasks
4. Follow the established code structure and conventions

## 📄 License

This project is developed for SIH26264 problem statement and is subject to the terms of the Smart India Hackathon.

---

**Built with ❤️ for Smart India Hackathon 2026**

For detailed backend setup instructions, API integration, and deployment guide, see `manual_work.txt`.
