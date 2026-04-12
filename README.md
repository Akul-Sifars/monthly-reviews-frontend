# HR Reviews Frontend

A modern React-based employee feedback system for anonymous monthly reviews.

## Overview

This application provides an interface for employees to submit anonymous monthly reviews and for administrators to manage questions and view feedback. The system ensures one submission per employee per month using browser-based identification.

## Features

### Employee Interface
- **Anonymous Review Submission**: Submit feedback without revealing identity
- **Monthly Submission Limit**: One review submission per month per browser
- **Dynamic Questions**: Respond to active questions configured by administrators
- **User-Friendly Form**: Clean interface with validation and error handling

### Admin Interface
- **Secure Authentication**: Double-hashed password authentication with JWT tokens
- **Dashboard**: Real-time statistics and monthly breakdowns
- **Question Management**: Create, edit, delete, and toggle review questions
- **Review Viewing**: Filter and view all submitted anonymous reviews

## Tech Stack

- **React 19.2.4**: Latest React with improved performance
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **TanStack Router**: Modern routing solution
- **TanStack Query**: Data fetching and caching
- **Axios**: HTTP client for API communication

## Project Structure

```
hr-reviews-frontend/
├── src/
│   ├── api/              # API layer
│   │   ├── axios.config.ts       # Axios configuration
│   │   ├── auth.api.ts           # Authentication endpoints
│   │   ├── questions.api.ts      # Question endpoints
│   │   └── reviews.api.ts        # Review endpoints
│   ├── components/
│   │   ├── common/              # Shared components
│   │   │   └── ProtectedRoute.tsx  # Auth guard component
│   │   └── ui/                  # UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       └── TextArea.tsx
│   ├── context/                 # React contexts
│   │   └── AuthContext.tsx      # Authentication state management
│   ├── hooks/                   # Custom hooks
│   │   └── useBrowserId.ts      # Browser ID management
│   ├── pages/                   # Page components
│   │   ├── employee/            # Employee-facing pages
│   │   │   ├── SubmitReview.tsx # Review submission form
│   │   │   └── ReviewSuccess.tsx # Success confirmation
│   │   ├── admin/               # Admin pages
│   │   │   ├── AdminLogin.tsx   # Admin authentication
│   │   │   ├── AdminDashboard.tsx # Dashboard with stats
│   │   │   ├── ManageQuestions.tsx # Question CRUD
│   │   │   └── ViewReviews.tsx  # View submitted reviews
│   │   └── HomePage.tsx         # Landing page
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   └── utils/
│       └── crypto.ts            # Cryptographic utilities
```

## Key Components

### Authentication System
- **Double Hashing**: Password hashed on client side, then hashed again on server
- **JWT Tokens**: Secure token-based authentication for admin routes
- **Protected Routes**: Guard components to ensure authenticated access

### Browser ID System
- **Unique Identification**: Generates and stores unique browser identifier
- **Monthly Validation**: Prevents duplicate submissions within same month
- **Privacy**: Browser ID only used for validation, never displayed

### Data Management
- **TanStack Query**: Automatic caching, refetching, and state management
- **Optimistic Updates**: Immediate UI feedback for better UX
- **Error Handling**: Comprehensive error handling and user feedback

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running on configured port

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hr-reviews-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
VITE_API_URL=http://localhost:3001
VITE_CLIENT_SALT=your_client_salt_here
```

4. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## API Integration

The frontend communicates with a NestJS backend. Ensure the backend is running and accessible via the configured `VITE_API_URL`.

### Endpoints Used
- `POST /api/auth/validate` - Admin authentication
- `GET /api/questions/active` - Get active questions
- `GET /api/questions` - Get all questions (admin)
- `POST /api/reviews/submit` - Submit review
- `GET /api/reviews/status/:browserId` - Check submission status
- `GET /api/admin/reviews/all` - Get all reviews (admin)
- `GET /api/admin/reviews/stats/summary` - Get statistics (admin)

## Security Features

1. **Password Hashing**: Client-side salt hashing before transmission
2. **JWT Authentication**: Secure token-based admin authentication
3. **Route Protection**: Protected routes for admin-only pages
4. **Anonymous Submissions**: Employee reviews stored without personal identification
5. **Browser Validation**: Prevents duplicate monthly submissions

## Development

### Linting
```bash
npm run lint
```

### Type Checking
The project uses TypeScript for type safety. Run:
```bash
npx tsc --noEmit
```

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses localStorage for browser ID and token storage

## Performance

- **Vite**: Lightning-fast hot module replacement
- **TanStack Query**: Intelligent data caching and background updates
- **Code Splitting**: Route-based code splitting with TanStack Router
- **React 19**: Latest React optimizations and automatic batching

## Future Enhancements

- Dark mode support
- Multi-language support
- Export reviews to CSV/PDF
- Advanced filtering and search
- Mobile app version
- Email notifications for new reviews

## Support

For issues or questions about the frontend application, please contact the development team.

## License

[Your License Here]
