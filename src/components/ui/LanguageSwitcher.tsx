// components/LanguageSwitcher.tsx
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe, Languages } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(newLang);
  };

  const currentLang = i18n.language === "en" ? "English" : "हिंदी";
  const nextLang = i18n.language === "en" ? "हिंदी" : "English";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="
        group
        relative
        min-w-[100px]
        h-9
        px-3
        border
        border-gray-200
        bg-white
        hover:bg-gray-50
        transition-all
        duration-300
        ease-out
        shadow-sm
        hover:shadow
        rounded-lg
        font-medium
        text-sm
        text-gray-700
        hover:text-gray-900
        dark:border-gray-700
        dark:bg-gray-800
        dark:text-gray-200
        dark:hover:bg-gray-700
        dark:hover:text-white
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-1
      "
      title={`Switch to ${nextLang}`}
    >
      <div className="flex items-center gap-2">
        <Globe 
          className="w-4 h-4 transition-transform duration-300 ease-out group-hover:scale-110" 
        />
        <span className="font-medium transition-colors duration-200">
          {currentLang}
        </span>
      </div>
    </Button>
  );
};

export default LanguageSwitcher;