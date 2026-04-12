import { AuthProvider } from './context/AuthContext';
import { Outlet, useLocation } from '@tanstack/react-router';
import { ProtectedRoute } from './components/common/ProtectedRoute';

function App() {
  const location = useLocation();

  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  return (
    <AuthProvider>
      {isAdminRoute ? (
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      ) : (
        <Outlet />
      )}
    </AuthProvider>
  );
}

export default App;
