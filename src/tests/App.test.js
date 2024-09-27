import { fireEvent, render, screen } from '@testing-library/react';
import {
  GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut,
} from 'firebase/auth';

import App from '../components/App';
import { auth, googleProvider } from '../services/firebaseConfig';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
  })),
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
  GoogleAuthProvider: jest.fn(() => ({})),
}));

describe('Google Auth Tests', () => {
  beforeEach(() => {
    signInWithPopup.mockClear();
    signOut.mockClear();
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
      return jest.fn();
    });
    console.error = jest.fn();
  });

  it('should show login button when user is not logged in', () => {
    render(<App />);
    expect(screen.getByText(/Login with Google/i)).toBeInTheDocument();
  });

  it('should call signInWithPopup when login button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Login with Google/i));
    expect(signInWithPopup).toHaveBeenCalledWith(auth, googleProvider);
  });

  it('should call signOut when logout button is clicked after login', () => {
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback({ displayName: 'Test User' });
      return jest.fn();
    });
    render(<App />);
    fireEvent.click(screen.getByText(/Logout/i));
    expect(signOut).toHaveBeenCalled();
  });

  it('should update user state when onAuthStateChanged is triggered', () => {
    const user = { displayName: 'Test User', email: 'test@example.com', photoURL: 'test-photo-url' };
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(user);
      return jest.fn();
    });
    render(<App />);
    expect(screen.getByText(/Welcome, Test User!/i)).toBeInTheDocument();
    expect(screen.getByText(/Email: test@example.com/i)).toBeInTheDocument();
  });

  /*
  it('should handle login error', async () => {
    const error = new Error('Login failed');
    signInWithPopup.mockRejectedValueOnce(error);
    render(<App />);
    fireEvent.click(screen.getByText(/Login with Google/i));
    expect(signInWithPopup).toHaveBeenCalledWith(auth, googleProvider);
    await screen.findByText(/Login with Google/i); // Wait for the button to reappear
    expect(console.error).toHaveBeenCalledWith('Google login error:', error);
  });

  it('should handle logout error', async () => {
    const user = { displayName: 'Test User' };
    const error = new Error('Logout failed');
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(user);
      return jest.fn(); // Return a mock unsubscribe function
    });
    signOut.mockRejectedValueOnce(error);
    render(<App />);
    fireEvent.click(screen.getByText(/Logout/i));
    expect(signOut).toHaveBeenCalled();
    await screen.findByText(/Logout/i); // Wait for the button to reappear
    expect(console.error).toHaveBeenCalledWith('Logout error:', error);
  });
  */
});
