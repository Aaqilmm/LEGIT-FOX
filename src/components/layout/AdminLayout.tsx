import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar';

export function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavbar variant="admin" />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
