import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'resident' | 'admin' | 'staff';
  avatar?: string;
  unit?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  hasRole: (role: string) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('e-consigier-user');
        if (storedUser) {
          // In a real app, you would validate the token with the backend
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('e-consigier-user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - would be replaced with actual API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@example.com' && password === 'password') {
        const adminUser = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin' as const,
          avatar: 'https://i.pravatar.cc/150?u=admin',
        };
        setUser(adminUser);
        localStorage.setItem('e-consigier-user', JSON.stringify(adminUser));
      } else if (email === 'user@example.com' && password === 'password') {
        const residentUser = {
          id: '2',
          name: 'John Resident',
          email: 'user@example.com',
          role: 'resident' as const,
          avatar: 'https://i.pravatar.cc/150?u=resident',
          unit: 'A-301',
        };
        setUser(residentUser);
        localStorage.setItem('e-consigier-user', JSON.stringify(residentUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('e-consigier-user');
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock registration - would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role: 'resident' as const,
        unit: 'New Resident',
      };
      
      setUser(newUser);
      localStorage.setItem('e-consigier-user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const hasRole = (role: string) => {
    return user?.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};