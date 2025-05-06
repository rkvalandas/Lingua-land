export default function Footer() {
  return (
    <footer className="w-full mt-12 sm:mt-16 text-center text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 font-handwriting">
      <p>© {new Date().getFullYear()} Lingua Land. A magical language learning experience.</p>
    </footer>
  );
}