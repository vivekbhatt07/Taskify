import {
  useState,
  useContext,
  createContext,
  useEffect,
  FC,
  ReactNode,
} from "react";

type ToggleThemeType = (isDarkMode: boolean) => void;

interface ModeContextType {
  isDarkTheme: boolean;
  toggleTheme: ToggleThemeType;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

const ModeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("mode") === "dark" ? true : false
  );
  const toggleTheme: ToggleThemeType = (isDarkMode) => {
    setIsDarkTheme(isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("mode", `${isDarkTheme ? "dark" : "light"}`);

    const activeMode = localStorage.getItem("mode");
    if (activeMode === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [isDarkTheme]);

  return (
    <ModeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ModeContext.Provider>
  );
};

const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
};

export { useMode, ModeProvider };
