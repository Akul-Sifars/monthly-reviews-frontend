# HR Anonymous Reviews Frontend

A React + TypeScript frontend for the HR Anonymous Reviews Application.

## Tech Stack

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS (can be added)

## Features

- Anonymous review submission (no login required)
- Simple admin authentication
- Questions management interface
- Reviews viewing with filtering
- Responsive design

## Prerequisites

- Node.js (v18 or higher)
- Backend API running on port 3001

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Environment Variables

```env
VITE_API_URL=http://localhost:3001
VITE_CLIENT_SALT=client_salt_development
```

## Pages

### Public Pages
- `/` - Home page with information and links
- `/submit` - Submit anonymous review (no login required)
- `/success` - Review submission confirmation

### Admin Pages (Requires authentication)
- `/admin/login` - Admin login
- `/admin` - Admin dashboard
- `/admin/questions` - Manage questions
- `/admin/reviews` - View reviews

## Default Admin Credentials

- **Password**: admin123

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── api/                    # API calls
│   ├── axios.config.ts
│   ├── auth.api.ts
│   ├── questions.api.ts
│   └── reviews.api.ts
├── components/            # Reusable components
│   ├── common/
│   │   └── ProtectedRoute.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── TextArea.tsx
│       └── Card.tsx
├── context/              # React Context
│   └── AuthContext.tsx
├── hooks/                # Custom hooks
│   └── useBrowserId.ts
├── pages/                # Page components
│   ├── employee/
│   │   ├── SubmitReview.tsx
│   │   └── ReviewSuccess.tsx
│   ├── admin/
│   │   ├── AdminLogin.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── ManageQuestions.tsx
│   │   └── ViewReviews.tsx
│   └── HomePage.tsx
├── types/                # TypeScript types
│   └── index.ts
├── utils/                # Utility functions
│   └── crypto.ts
├── App.tsx               # Main app with routing
└── main.tsx              # Entry point
```

## Security Notes

- Browser ID stored in localStorage for one-per-month validation
- Password hashed client-side before sending to server
- Session tokens stored in localStorage
- All admin routes protected with authentication

## License

MIT
