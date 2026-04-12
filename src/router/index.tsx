import { createRouter, createRootRoute, createRoute, lazyRouteComponent } from '@tanstack/react-router';
import App from '../App';

// Create root route
const rootRoute = createRootRoute({
  component: App,
});

// Create index route (home)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazyRouteComponent(() => import('../pages/HomePage'), 'HomePage'),
});

// Create submit route
const submitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/submit',
  component: lazyRouteComponent(() => import('../pages/employee/SubmitReview'), 'SubmitReview'),
});

// Create success route
const successRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/success',
  component: lazyRouteComponent(() => import('../pages/employee/ReviewSuccess'), 'ReviewSuccess'),
});

// Create admin login route
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/login',
  component: lazyRouteComponent(() => import('../pages/admin/AdminLogin'), 'AdminLogin'),
});

// Create admin dashboard route
const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: lazyRouteComponent(() => import('../pages/admin/AdminDashboard'), 'AdminDashboard'),
});

// Create admin questions route
const adminQuestionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/questions',
  component: lazyRouteComponent(() => import('../pages/admin/ManageQuestions'), 'ManageQuestions'),
});

// Create admin reviews route
const adminReviewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/reviews',
  component: lazyRouteComponent(() => import('../pages/admin/ViewReviews'), 'ViewReviews'),
});

// Create the router
const router = createRouter({
  routeTree: rootRoute.addChildren([
    indexRoute,
    submitRoute,
    successRoute,
    adminLoginRoute,
    adminDashboardRoute,
    adminQuestionsRoute,
    adminReviewsRoute,
  ]),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
