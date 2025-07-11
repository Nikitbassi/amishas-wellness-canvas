
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import bcrypt from 'bcryptjs';

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign in with email:', email);
      
      // Query the admin_users table directly
      const { data: adminUsers, error: queryError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('is_active', true);

      if (queryError) {
        console.error('Database query error:', queryError);
        return { error: queryError };
      }

      if (!adminUsers || adminUsers.length === 0) {
        console.log('No admin user found with email:', email);
        return { error: { message: 'Invalid credentials' } };
      }

      const adminUser = adminUsers[0];
      console.log('Found admin user:', adminUser.email);

      // Compare password with stored hash
      const isValidPassword = await bcrypt.compare(password, adminUser.password_hash);
      
      if (!isValidPassword) {
        console.log('Invalid password for user:', email);
        return { error: { message: 'Invalid credentials' } };
      }

      // Create user object
      const userObj: User = {
        id: adminUser.id,
        email: adminUser.email,
        full_name: adminUser.full_name,
        role: adminUser.role,
      };

      setUser(userObj);
      localStorage.setItem('admin_user', JSON.stringify(userObj));
      
      console.log('Login successful for user:', userObj.email);
      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: { message: 'An unexpected error occurred' } };
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('admin_user');
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
