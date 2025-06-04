interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  disabled: boolean;
}

export default function LanguageSelector({
  languages,
  selectedLanguage,
  setSelectedLanguage,
  disabled
}: LanguageSelectorProps) {
  return (
    <div className="mb-6 mx-auto max-w-xs w-full">
      <label 
        htmlFor="language" 
        className="block text-lg font-handwriting text-emerald-700 dark:text-emerald-200 mb-2 transform rotate-[0.3deg]"
      >
        Choose Your Adventure Language
      </label>
      <select
        id="language"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="w-full p-2 bg-amber-50 dark:bg-amber-900/70 text-emerald-800 dark:text-amber-100 border-2 border-amber-400 dark:border-amber-500 rounded-xl font-handwriting"
        style={{ boxShadow: "2px 3px 0 rgba(146, 64, 14, 0.2)" }}
        disabled={disabled}
      >
        {languages.map((lang) => (
          <option key={lang} value={lang} className="font-sans">
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}