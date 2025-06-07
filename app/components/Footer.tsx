export default function Footer() {
  return (
    <footer className="w-full mt-12 sm:mt-16 border-t border-emerald-200 dark:border-emerald-700 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-handwriting text-emerald-800 dark:text-emerald-200 mb-3">
              Lingua Land
            </h3>
            <p className="text-sm text-emerald-700 dark:text-emerald-300 font-handwriting">
              AI-powered language learning platform designed to help you master
              new languages through conversation, practice, and intelligent
              feedback.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-base font-handwriting text-emerald-800 dark:text-emerald-200 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-300 font-handwriting">
              <li>
                <a
                  href="/services"
                  className="hover:text-emerald-900 dark:hover:text-emerald-100 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-emerald-900 dark:hover:text-emerald-100 transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#languages"
                  className="hover:text-emerald-900 dark:hover:text-emerald-100 transition-colors"
                >
                  Languages
                </a>
              </li>
              <li>
                <a
                  href="/signin"
                  className="hover:text-emerald-900 dark:hover:text-emerald-100 transition-colors"
                >
                  Sign In
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Info */}
          <div className="text-center md:text-right">
            <h4 className="text-base font-handwriting text-emerald-800 dark:text-emerald-200 mb-3">
              Learn More
            </h4>
            <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-300 font-handwriting">
              <li>75+ Languages Supported</li>
              <li>AI-Powered Learning</li>
              <li>Free to Use</li>
              <li>Available 24/7</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 font-handwriting border-t border-emerald-200 dark:border-emerald-700 pt-6">
          <p>
            © {new Date().getFullYear()} Lingua Land. Empowering language
            learners worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
