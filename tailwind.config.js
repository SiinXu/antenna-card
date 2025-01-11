/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(135deg, #ffffff, #e6e6fa, #dcd0ff)",
        "custom-radial-gradient":
          "linear-gradient(135deg, #ffffff, #e6e6fa, #dcd0ff)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(230,230,250,0.3), rgba(220,208,255,0.3))",
        "button-gradient":
          "linear-gradient(135deg, rgba(230,230,250,0.2), rgba(220,208,255,0.2))",
        "button-hover-gradient":
          "linear-gradient(135deg, rgba(230,230,250,0.3), rgba(220,208,255,0.3))",
        "custom-card-gradient":
          "radial-gradient(circle, rgba(234,230,191,1) 0%, rgba(241,222,86,1) 100%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(30px, 20px) scale(1.1)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.5, transform: 'translate(0, 0)' },
          '50%': { opacity: 0.7, transform: 'translate(10px, 10px)' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'float': 'float 10s infinite ease-in-out',
        'glow': 'glow 8s infinite ease-in-out',
      },
      backdropBlur: {
        'glass': '10px',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'glass': '12px',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
