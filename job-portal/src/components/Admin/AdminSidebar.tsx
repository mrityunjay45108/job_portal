import { NavLink } from 'react-router-dom';
import {
  IconDashboard,
  IconUsers,
  IconBriefcase,
  IconFileText,
  IconShield,
  IconLogout,
} from '@tabler/icons-react';

const AdminSidebar = () => {
  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    window.location.href = '/admin/login';
  };

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: IconDashboard },
    { to: '/admin/candidates', label: 'Candidates', icon: IconUsers },
    { to: '/admin/recruiters', label: 'Recruiters', icon: IconUsers },
    { to: '/admin/jobs', label: 'Jobs', icon: IconBriefcase },
    { to: '/admin/applications', label: 'Applications', icon: IconFileText },
    { to: '/admin/admins', label: 'Admins', icon: IconShield },
  ];

  return (
    <div className="w-64 bg-gray-900 min-h-screen p-4">
      <div className="mb-8 text-center">
        <h2 className="text-white text-xl font-bold">Admin Panel</h2>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
                isActive ? 'bg-gray-800 text-white' : ''
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors w-full mt-8"
      >
        <IconLogout size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default AdminSidebar;