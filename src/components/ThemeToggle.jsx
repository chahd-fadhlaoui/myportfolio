import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 14px",
        borderRadius: "999px",
        border: "1px solid rgba(254,42,162,0.3)",
        background: isDark
          ? "rgba(254,42,162,0.08)"
          : "rgba(254,42,162,0.12)",
        cursor: "pointer",
        fontSize: "0.82rem",
        fontWeight: 500,
        color: "var(--color-text)",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(254,42,162,0.2)";
        e.currentTarget.style.borderColor = "rgba(254,42,162,0.55)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isDark
          ? "rgba(254,42,162,0.08)"
          : "rgba(254,42,162,0.12)";
        e.currentTarget.style.borderColor = "rgba(254,42,162,0.3)";
      }}
    >
      <span style={{ fontSize: "1rem" }}>{isDark ? "☀️" : "🌙"}</span>
      {isDark ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;