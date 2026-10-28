import { createBrowserRouter, Navigate } from 'react-router-dom';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';

// Student pages
import { MainComplaintPage } from '@/pages/student/MainComplaintPage';
import { TrackCasePage } from '@/pages/student/TrackCasePage';

// Admin pages
import { OverviewPage } from '@/pages/admin/OverviewPage';
import { InstitutionDirectoryPage } from '@/pages/admin/InstitutionDirectoryPage';
import { InstitutionProfilePage } from '@/pages/admin/InstitutionProfilePage';
import { CaseRegisterPage } from '@/pages/admin/CaseRegisterPage';
import { CaseWorkspacePage } from '@/pages/admin/CaseWorkspacePage';
import { OverlapAlertsPage } from '@/pages/admin/OverlapAlertsPage';

// Auth pages
import { DemoLoginPage } from '@/pages/auth/DemoLoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/student" replace />,
  },
  {
    path: '/login',
    element: <DemoLoginPage />,
  },
  {
    path: '/student',
    element: <StudentLayout />,
    children: [
      { index: true, element: <MainComplaintPage /> },
      { path: 'track', element: <TrackCasePage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: 'cases', element: <CaseRegisterPage /> },
      { path: 'cases/:id', element: <CaseWorkspacePage /> },
      { path: 'overlap-alerts', element: <OverlapAlertsPage /> },
      { path: 'institutions', element: <InstitutionDirectoryPage /> },
      { path: 'institutions/:id', element: <InstitutionProfilePage /> },
      // Legacy redirects
      { path: 'complaints', element: <Navigate to="/admin/cases" replace /> },
      { path: 'complaints/by-bureau', element: <Navigate to="/admin/cases" replace /> },
      { path: 'complaints/:id', element: <CaseWorkspacePage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
