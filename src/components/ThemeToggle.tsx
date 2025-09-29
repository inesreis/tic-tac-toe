import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
      onClick={toggleTheme}
      className="button icon"
    >
      {theme === "light" ? (
        <Moon data-testid="moon-icon" />
      ) : (
        <Sun data-testid="sun-icon" />
      )}
    </button>
  );
};

export default ThemeToggle;
