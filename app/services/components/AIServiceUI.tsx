import { ServiceState } from "../hooks/useAIServices";
import { languages } from "../data/languages";
import MarkdownViewer from "./MarkdownViewer";

interface AIServiceUIProps {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  state: ServiceState;
  onProcess: (text: string, ...args: string[]) => void;
  onInputChange: (text: string) => void;
  onLanguageChange?: (language: string) => void;
  onSourceLanguageChange?: (language: string) => void;
  onClear: () => void;
  showLanguageSelector?: boolean;
  showTranslationLanguages?: boolean;
}

export default function AIServiceUI({
  title,
  description,
  placeholder,
  buttonText,
  state,
  onProcess,
  onInputChange,
  onLanguageChange,
  onSourceLanguageChange,
  onClear,
  showLanguageSelector = true,
  showTranslationLanguages = false,
}: AIServiceUIProps) {
  const handleSubmit = () => {
    if (!state.inputText.trim()) return;

    if (showTranslationLanguages) {
      onProcess(state.inputText, state.sourceLanguage, state.targetLanguage);
    } else {
      onProcess(state.inputText, state.language);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white/80 dark:bg-yellow-800/80 backdrop-blur-sm rounded-3xl p-4 sm:p-8 shadow-lg border-2 border-yellow-200 dark:border-yellow-600">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-handwriting text-emerald-800 dark:text-yellow-200 mb-2 transform rotate-[-0.3deg]">
            {title}
          </h2>
          <p className="text-emerald-700 dark:text-yellow-300 text-sm sm:text-base">
            {description}
          </p>
        </div>
        {state.result && (
          <button
            onClick={onClear}
            className="paper-texture px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm touch-manipulation active:scale-95 self-start sm:self-auto"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Language Selectors */}
        {showLanguageSelector && (
          <div className="grid grid-cols-1 gap-4">
            {showTranslationLanguages ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-800 dark:text-yellow-200 mb-2">
                    From Language
                  </label>
                  <select
                    value={state.sourceLanguage}
                    onChange={(e) => onSourceLanguageChange?.(e.target.value)}
                    className="w-full px-3 py-3 sm:py-2 rounded-lg border-2 border-amber-200 dark:border-amber-600 bg-white/90 dark:bg-yellow-700/90 text-emerald-800 dark:text-yellow-200 focus:outline-none focus:border-emerald-500 transition-colors text-base touch-manipulation"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-800 dark:text-yellow-200 mb-2">
                    To Language
                  </label>
                  <select
                    value={state.targetLanguage}
                    onChange={(e) => onLanguageChange?.(e.target.value)}
                    className="w-full px-3 py-3 sm:py-2 rounded-lg border-2 border-amber-200 dark:border-amber-600 bg-white/90 dark:bg-yellow-700/90 text-emerald-800 dark:text-yellow-200 focus:outline-none focus:border-emerald-500 transition-colors text-base touch-manipulation"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-emerald-800 dark:text-yellow-200 mb-2">
                  Language
                </label>
                <select
                  value={state.language}
                  onChange={(e) => onLanguageChange?.(e.target.value)}
                  className="w-full px-3 py-3 sm:py-2 rounded-lg border-2 border-amber-200 dark:border-amber-600 bg-white/90 dark:bg-yellow-700/90 text-emerald-800 dark:text-yellow-200 focus:outline-none focus:border-emerald-500 transition-colors text-base touch-manipulation"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Input Text */}
        <div>
          <label className="block text-sm font-medium text-emerald-800 dark:text-yellow-200 mb-2">
            Input Text
          </label>
          <textarea
            value={state.inputText}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full h-32 sm:h-40 px-4 py-3 rounded-xl border-2 border-amber-200 dark:border-amber-600 bg-white/90 dark:bg-yellow-700/90 text-emerald-800 dark:text-yellow-200 focus:outline-none focus:border-emerald-500 transition-colors resize-none text-base touch-manipulation"
            placeholder={placeholder}
            disabled={state.isLoading}
          />
          <p className="text-xs text-emerald-600 dark:text-yellow-400 mt-1">
            Tip: Press Ctrl+Enter (or Cmd+Enter on Mac) to submit
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={state.isLoading || !state.inputText.trim()}
          className="paper-texture w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center touch-manipulation active:scale-95 min-h-[48px]"
        >
          {state.isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            buttonText
          )}
        </button>

        {/* Error Display */}
        {state.error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 sm:p-4">
            <p className="text-red-800 dark:text-red-200 text-sm">
              Error: {state.error}
            </p>
          </div>
        )}

        {/* Result Display */}
        {state.result && (
          <div>
            <label className="block text-sm font-medium text-emerald-800 dark:text-yellow-200 mb-2">
              Result
            </label>
            <div className="w-full min-h-32 px-4 py-3 rounded-xl border-2 border-amber-200 dark:border-amber-600 bg-gray-50/90 dark:bg-yellow-900/90 text-emerald-800 dark:text-yellow-200 max-h-64 sm:max-h-96 overflow-y-auto">
              <MarkdownViewer content={state.result} />
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(state.result);
                }}
                className="paper-texture px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-lg transition-colors touch-manipulation active:scale-95"
              >
                Copy Result
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
