"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { login, register, error, isLoading, clearError } = useAuth();

  // Clear error when modal opens or mode changes
  useEffect(() => {
    if (isOpen) {
      clearError();
    }
  }, [isOpen, isLogin, clearError]);

  if (!isOpen) return null;

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid = () => {
    if (!formData.email || !formData.password) return false;
    if (!isValidEmail(formData.email)) return false;
    if (!isLogin && !formData.username) return false;
    if (!isLogin && formData.password.length < 6) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.username, formData.email, formData.password);
      }

      if (!error) {
        onClose();
      }
    } catch {
      // Error is handled by the auth context
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-handwriting text-emerald-800 dark:text-emerald-200">
            {isLogin ? "Welcome Back!" : "Join the Adventure!"}
          </h2>
          <button
            onClick={onClose}
            className="paper-texture text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required={!isLogin}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Choose a username"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder={
                isLogin
                  ? "Enter your password"
                  : "Choose a password (min 6 characters)"
              }
              minLength={isLogin ? undefined : 6}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !isFormValid()}
            className="paper-texture w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? "Please wait..."
              : isLogin
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="paper-texture ml-1 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
