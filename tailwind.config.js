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
          "linear-gradient(135deg, #ffffff, #8B9DFF, #8B9DFF)",
        "custom-radial-gradient":
          "linear-gradient(135deg, #ffffff, #8B9DFF, #8B9DFF)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(139,157,255,0.3), rgba(139,157,255,0.3))",
        "button-purple-glow":
          "radial-gradient(circle at center, rgba(139,157,255,0.6), rgba(139,157,255,0.5))",
        "button-blue-glow":
          "radial-gradient(circle at center, rgba(139,157,255,0.6), rgba(139,157,255,0.5))",
        "button-indigo-glow":
          "radial-gradient(circle at center, rgba(139,157,255,0.7), rgba(139,157,255,0.6))",
        "button-end-gradient":
          "linear-gradient(to right, rgba(254,202,202,0.9), rgba(252,165,165,0.9))",
        "button-connect-gradient":
          "linear-gradient(to right, rgba(167,243,208,0.9), rgba(110,231,183,0.9))",
        "button-loading-gradient":
          "linear-gradient(to right, rgba(253,230,138,0.9), rgba(252,211,77,0.9))",
        "button-hover-gradient":
          "linear-gradient(135deg, rgba(147,112,219,0.7), rgba(139,157,255,0.6))",
        "custom-card-gradient":
          "radial-gradient(circle, rgba(234,230,191,1) 0%, rgba(241,222,86,1) 100%)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'text-gradient': 'linear-gradient(to right, #6366f1, #818cf8, #93c5fd)',
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
        },
        'avatar-pulse': {
          '0%, 100%': {
            'box-shadow': '0 0 15px 5px rgba(139,157,255, 0.4), 0 0 30px 10px rgba(139,157,255, 0.2)',
          },
          '50%': {
            'box-shadow': '0 0 25px 10px rgba(139,157,255, 0.5), 0 0 50px 15px rgba(139,157,255, 0.3)',
          },
        },
        glow: {
          '0%, 100%': {
            'text-shadow': '0 0 10px #8B9DFF, 0 0 20px #8B9DFF, 0 0 30px #8B9DFF'
          },
          '50%': {
            'text-shadow': '0 0 20px #8B9DFF, 0 0 30px #8B9DFF, 0 0 40px #8B9DFF'
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'float': 'float 10s infinite ease-in-out',
        'glow': 'glow 8s infinite ease-in-out',
        'avatar-glow': 'avatar-pulse 3s ease-in-out infinite',
        "glow": "glow 2s ease-in-out infinite"
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
        'history-purple': '#8B9DFF',  // Changed to Antenna blue-purple
        'current-purple': '#8B9DFF',  // Changed to Antenna blue-purple
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
