import { Outlet, useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useAuth } from '../../contexts/AuthContext';
import './Layout.css';

function Layout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => navigate('/'),
    },
    {
      label: 'Surveys',
      icon: 'pi pi-list',
      command: () => navigate('/surveys'),
    },
    {
      label: 'Create Survey',
      icon: 'pi pi-plus',
      command: () => navigate('/surveys/create'),
    },
  ];

  const end = (
    <div className="flex align-items-center gap-2">
      {user && (
        <>
          <span className="text-white">Welcome, {user.username}</span>
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            className="p-button-sm"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          />
        </>
      )}
    </div>
  );

  return (
    <div className="layout">
      <Menubar model={items} end={end} className="layout-menubar" />
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
