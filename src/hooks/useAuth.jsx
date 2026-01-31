import { useState, useEffect, useContext, createContext } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth, database } from '../config/firebase';
import LoadingSpinner from '../components/Loading';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Load user profile from database
        try {
          const userRef = ref(database, `users/${user.uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            setUserProfile(snapshot.val());
          } else {
            // Create default profile
            const defaultProfile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || '',
              role: 'patient',
              createdAt: new Date().toISOString(),
              lastLogin: new Date().toISOString()
            };
            await set(userRef, defaultProfile);
            setUserProfile(defaultProfile);
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Update last login
      if (result.user) {
        const userRef = ref(database, `users/${result.user.uid}/lastLogin`);
        await set(userRef, new Date().toISOString());
      }

      return { success: true, user: result.user };
    } catch (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error.code)
      };
    }
  };

  const register = async (email, password, additionalData = {}) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Create user profile
      const userProfile = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: additionalData.displayName || '',
        firstName: additionalData.firstName || '',
        lastName: additionalData.lastName || '',
        phone: additionalData.phone || '',
        role: 'patient',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        ...additionalData
      };

      const userRef = ref(database, `users/${result.user.uid}`);
      await set(userRef, userProfile);

      // Update Firebase Auth profile
      if (additionalData.displayName) {
        await updateProfile(result.user, {
          displayName: additionalData.displayName
        });
      }

      return { success: true, user: result.user };
    } catch (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error.code)
      };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to logout'
      };
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error.code)
      };
    }
  };

  const updateUserProfile = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in');

      const userRef = ref(database, `users/${user.uid}`);
      await set(userRef, {
        ...userProfile,
        ...updates,
        updatedAt: new Date().toISOString()
      });

      setUserProfile(prev => ({
        ...prev,
        ...updates
      }));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update profile'
      };
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    login,
    register,
    logout,
    resetPassword,
    updateUserProfile,
    isAuthenticated: !!user
  };

  if (loading) {
    return <LoadingSpinner size="large" message="Initializing..." />;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists';
    case 'auth/weak-password':
      return 'Password is too weak';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection';
    default:
      return 'An error occurred. Please try again';
  }
};