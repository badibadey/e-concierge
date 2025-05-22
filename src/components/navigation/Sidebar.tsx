import { 
  Home, 
  ShoppingCart, 
  Wrench, 
  MessageCircle, 
  Calendar, 
  Settings,
  Building,
  HelpCircle
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type SidebarProps = {
  onItemClick?: () => void;
};

const Sidebar = ({ onItemClick }: SidebarProps) => {
  const { user } = useAuth();
  
  const navItems = [
    {
      name: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      roles: ['resident', 'admin', 'staff'],
    },
    {
      name: 'Marketplace',
      icon: ShoppingCart,
      path: '/marketplace',
      roles: ['resident', 'admin', 'staff'],
    },
    {
      name: 'Maintenance',
      icon: Wrench,
      path: '/maintenance',
      roles: ['resident', 'admin', 'staff'],
    },
    {
      name: 'Communication',
      icon: MessageCircle,
      path: '/communication',
      roles: ['resident', 'admin', 'staff'],
    },
    {
      name: 'Amenities',
      icon: Building,
      path: '/amenities',
      roles: ['resident', 'admin', 'staff'],
    },
    {
      name: 'Admin Panel',
      icon: Settings,
      path: '/admin',
      roles: ['admin'],
    },
  ];
  
  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <div className="h-full flex flex-col py-4">
      <div className="flex-1 space-y-1 px-2">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
            onClick={onItemClick}
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
      
      <div className="px-2 mt-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <HelpCircle className="h-5 w-5 text-primary-600" />
            <h4 className="ml-2 text-sm font-medium text-gray-900">Need Help?</h4>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Contact our support team or check our FAQ section for help.
          </p>
          <button 
            className="mt-3 w-full btn btn-primary text-xs py-1.5"
            onClick={() => window.location.href = '/communication'}
          >
            Get Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;