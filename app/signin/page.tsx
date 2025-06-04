"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";
import ParticleBackground from "../components/ParticleBackground";
import SVGFilters from "../components/SVGFilters";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, user } = useAuth();
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

    try {
      await login(email, password);
      router.push("/services");
    } catch (err: any) {
      setError(err.message || "An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    return email.includes("@") && password.length >= 6;
  };

  return (
    <div className="min-h-screen overflow-hidden relative bg-amber-50/50 dark:bg-indigo-900/50">
      <ParticleBackground />
      <SVGFilters />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
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
                Welcome Back!
              </h1>
              <p className="text-emerald-700 dark:text-emerald-100 font-handwriting text-lg">
                Sign in to continue your language journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-400 dark:border-amber-500 bg-amber-100/50 dark:bg-amber-900/30 text-emerald-800 dark:text-emerald-100 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 placeholder-emerald-600/50 dark:placeholder-emerald-300/50"
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
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-400 dark:border-amber-500 bg-amber-100/50 dark:bg-amber-900/30 text-emerald-800 dark:text-emerald-100 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 placeholder-emerald-600/50 dark:placeholder-emerald-300/50"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-100/90 dark:bg-red-900/60 border-2 border-red-400 dark:border-red-500 text-red-700 dark:text-red-200 px-4 py-3 rounded-xl backdrop-blur-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!validateForm() || isLoading}
                className="w-full bg-amber-100 dark:bg-yellow-700 hover:bg-amber-200 dark:hover:bg-yellow-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-amber-800 dark:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none shadow-lg hover:shadow-xl disabled:shadow-md border-2 border-amber-400 dark:border-amber-500"
                style={{
                  filter: "url(#paper-filter)",
                  boxShadow: "4px 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-emerald-700 dark:text-emerald-100">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                >
                  Sign up here
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
