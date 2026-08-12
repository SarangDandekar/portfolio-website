/**
 * Jugadu Cafe brand design system
 * Extracted from official logo — orange brush script on dark brick
 */
export const brand = {
  colors: {
    primary: "#F07820",
    primaryLight: "#FF9A4D",
    primaryDark: "#C45E10",
    secondary: "#FFFFFF",
    secondaryLight: "#F5F5F5",
    secondaryDark: "#E0E0E0",
    accent: "#4CAF50",
    accentLight: "#66BB6A",
    background: "#121212",
    backgroundDark: "#0A0A0A",
    card: "#1E1E1E",
    cardGlass: "rgba(30, 30, 30, 0.85)",
    border: "#2A2A2A",
    borderLight: "#333333",
    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3B3",
      muted: "#777777",
      inverse: "#121212",
    },
    button: {
      primary: "#F07820",
      primaryHover: "#C45E10",
      secondary: "#FFFFFF",
      secondaryHover: "#E0E0E0",
      accent: "#4CAF50",
    },
    success: "#4CAF50",
    star: "#F07820",
  },
  gradients: {
    hero: "linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(18, 18, 18, 0.9) 50%, rgba(240, 120, 32, 0.15) 100%)",
    gold: "linear-gradient(135deg, #F07820 0%, #FF9A4D 50%, #F07820 100%)",
    card: "linear-gradient(180deg, rgba(30,30,30,0.95) 0%, rgba(18,18,18,0.98) 100%)",
    cta: "linear-gradient(135deg, #F07820 0%, #C45E10 100%)",
    warm: "linear-gradient(180deg, #121212 0%, #0A0A0A 100%)",
  },
  radius: {
    DEFAULT: "24px",
    sm: "12px",
    lg: "32px",
    full: "9999px",
  },
  shadow: {
    soft: "0 4px 24px rgba(0, 0, 0, 0.4)",
    medium: "0 8px 32px rgba(0, 0, 0, 0.5)",
    strong: "0 16px 48px rgba(0, 0, 0, 0.6)",
    glow: "0 0 40px rgba(240, 120, 32, 0.35)",
  },
} as const;

export type BrandColors = typeof brand.colors;
