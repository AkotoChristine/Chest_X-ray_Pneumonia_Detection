/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      }
    },
    
    extend: {
      fontFamily: {
        "inter": ["Inter", "serif"],
        "Kumbh": ["Kumbh Sans", "serif"],
        "OpenSans": ["Open Sans", "serif"]
      },
      colors: {
        "bgColor": "#00abf0",
      }
    },
  },
  plugins: [],
}


