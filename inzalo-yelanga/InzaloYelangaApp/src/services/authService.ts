import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { User, UserPreferences } from '../types';

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

class AuthService {
  private currentUser: User | null = null;

  // Initialize auth state listener
  init(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const userData = await this.getUserData(firebaseUser.uid);
            this.currentUser = userData;
            resolve(userData);
          } catch (error) {
            console.error('Error fetching user data:', error);
            resolve(null);
          }
        } else {
          this.currentUser = null;
          resolve(null);
        }
        unsubscribe();
      });
    });
  }

  // Register new user
  async register(data: RegisterData): Promise<AuthResult> {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return { success: false, error: 'Invalid email format' };
      }

      // Validate password strength
      if (data.password.length < 8) {
        return { success: false, error: 'Password must be at least 8 characters long' };
      }

      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
        return { success: false, error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' };
      }

      // Create Firebase user
      const userCredential = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password
      );

      const firebaseUser = userCredential.user;

      // Update Firebase user profile
      await firebaseUser.updateProfile({
        displayName: `${data.firstName} ${data.lastName}`,
      });

      // Send email verification
      await firebaseUser.sendEmailVerification();

      // Create user document in Firestore
      const defaultPreferences: UserPreferences = {
        enableNotifications: true,
        enableAds: false,
        language: 'en',
        theme: 'auto',
      };

      const userData: User = {
        id: firebaseUser.uid,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        isVerified: false,
        createdAt: new Date(),
        preferences: defaultPreferences,
      };

      await firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .set({
          ...userData,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      this.currentUser = userData;

      return { success: true, user: userData };
    } catch (error: any) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: this.getFirebaseErrorMessage(error.code) 
      };
    }
  }

  // Login user
  async login(data: LoginData): Promise<AuthResult> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        data.email,
        data.password
      );

      const userData = await this.getUserData(userCredential.user.uid);
      this.currentUser = userData;

      return { success: true, user: userData };
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: this.getFirebaseErrorMessage(error.code) 
      };
    }
  }

  // Logout user
  async logout(): Promise<AuthResult> {
    try {
      await auth().signOut();
      this.currentUser = null;
      return { success: true };
    } catch (error: any) {
      console.error('Logout error:', error);
      return { success: false, error: 'Failed to logout' };
    }
  }

  // Reset password
  async resetPassword(email: string): Promise<AuthResult> {
    try {
      await auth().sendPasswordResetEmail(email);
      return { success: true };
    } catch (error: any) {
      console.error('Password reset error:', error);
      return { 
        success: false, 
        error: this.getFirebaseErrorMessage(error.code) 
      };
    }
  }

  // Resend email verification
  async resendEmailVerification(): Promise<AuthResult> {
    try {
      const firebaseUser = auth().currentUser;
      if (!firebaseUser) {
        return { success: false, error: 'No user logged in' };
      }

      await firebaseUser.sendEmailVerification();
      return { success: true };
    } catch (error: any) {
      console.error('Email verification error:', error);
      return { success: false, error: 'Failed to send verification email' };
    }
  }

  // Update user profile
  async updateProfile(updates: Partial<User>): Promise<AuthResult> {
    try {
      const firebaseUser = auth().currentUser;
      if (!firebaseUser || !this.currentUser) {
        return { success: false, error: 'No user logged in' };
      }

      // Update Firestore document
      await firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .update({
          ...updates,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      // Update Firebase profile if name changed
      if (updates.firstName || updates.lastName) {
        const firstName = updates.firstName || this.currentUser.firstName;
        const lastName = updates.lastName || this.currentUser.lastName;
        await firebaseUser.updateProfile({
          displayName: `${firstName} ${lastName}`,
        });
      }

      // Update local user data
      this.currentUser = { ...this.currentUser, ...updates };

      return { success: true, user: this.currentUser };
    } catch (error: any) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Get user data from Firestore
  private async getUserData(uid: string): Promise<User> {
    const userDoc = await firestore().collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      throw new Error('User document not found');
    }

    const userData = userDoc.data();
    return {
      id: uid,
      email: userData?.email || '',
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      profileImage: userData?.profileImage,
      isVerified: auth().currentUser?.emailVerified || false,
      createdAt: userData?.createdAt?.toDate() || new Date(),
      preferences: userData?.preferences || {
        enableNotifications: true,
        enableAds: false,
        language: 'en',
        theme: 'auto',
      },
    };
  }

  // Convert Firebase error codes to user-friendly messages
  private getFirebaseErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email address is already registered. Please use a different email or try logging in.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled. Please contact support.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'auth/user-not-found':
        return 'No account found with this email address. Please check your email or create a new account.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again or reset your password.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection and try again.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
}

export const authService = new AuthService();
export default authService;