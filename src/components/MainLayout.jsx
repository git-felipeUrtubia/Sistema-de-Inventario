
import { Outlet } from 'react-router-dom';
import { Navbar } from '../general/NavBar';

export const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
};