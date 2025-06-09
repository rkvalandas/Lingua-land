"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";
import ParticleBackground from "../components/ParticleBackground";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, user } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/services");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await register(username, email, password);
      router.push("/services");
    } catch (err: any) {
      setError(err.message || "An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    return (
      username.length >= 2 &&
      email.includes("@") &&
      password.length >= 6 &&
      password === confirmPassword
    );
  };

  return (
    <div className="min-h-screen overflow-hidden relative bg-amber-50/50 dark:bg-indigo-900/50">
      <ParticleBackground />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div
            className="bg-yellow-200/70 dark:bg-yellow-700/40 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-amber-400 dark:border-amber-500 transform hover:scale-[1.02] transition-all duration-300"
            style={{
              filter: "url(#paper-filter)",
              boxShadow:
                "6px 6px 10px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-handwriting text-emerald-800 dark:text-emerald-200 mb-2 transform rotate-[-0.5deg]">
                Join Lingua Land!
              </h1>
              <p className="text-emerald-700 dark:text-emerald-100 font-handwriting text-lg">
                Start your magical language adventure
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-400 dark:border-amber-500 bg-amber-100/50 dark:bg-amber-900/30 text-emerald-800 dark:text-emerald-100 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Choose a username"
                  required
                  minLength={2}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-400 dark:border-amber-500 bg-amber-100/50 dark:bg-amber-900/30 text-emerald-800 dark:text-emerald-100 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-400 dark:border-amber-500 bg-amber-100/50 dark:bg-amber-900/30 text-emerald-800 dark:text-emerald-100 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Create a password"
                  required
                  minLength={6}
                />
                <p className="text-xs text-emerald-600 dark:text-emerald-300 mt-1">
                  Minimum 6 characters
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-400 dark:border-amber-500 bg-amber-100/50 dark:bg-amber-900/30 text-emerald-800 dark:text-emerald-100 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!validateForm() || isLoading}
                className="paper-texture w-full bg-amber-100 dark:bg-yellow-700 hover:bg-amber-200 dark:hover:bg-yellow-600 disabled:bg-gray-400 text-amber-800 dark:text-white font-semibold py-3 px-6 rounded-xl transition-colors transform hover:scale-105 disabled:transform-none border-2 border-amber-400 dark:border-amber-500"
                style={{
                  filter: "url(#paper-filter)",
                  boxShadow: "4px 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-emerald-700 dark:text-emerald-100">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/"
                className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
