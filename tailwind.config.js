/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB', // Royal Blue
          dark: '#1d4ed8',
          light: '#3b82f6',
        },
        secondary: '#64748B', // Slate 500
        background: '#F8FAFC', // Slate 50
        surface: '#FFFFFF',
        'text-main': '#0F172A',   // Slate 900
        text: {
          main: '#0F172A',   // Slate 900
          muted: '#64748B',  // Slate 500
          light: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
