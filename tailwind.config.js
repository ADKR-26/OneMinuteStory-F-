/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'cinema': {
//           'black': '#0a0a0a',
//           'dark': '#1a1a1a',
//           'medium': '#2a2a2a',
//           'light': '#3a3a3a',
//           'accent': '#f59e0b',
//           'accent-dark': '#d97706',
//           'text': '#e5e5e5',
//           'text-dim': '#a3a3a3',
//         },
//       },
//       fontFamily: {
//         'sans': ['Inter', 'sans-serif'],
//         'serif': ['Crimson Pro', 'serif'],
//       },
//       animation: {
//         'pulse-urgent': 'pulse-urgent 1s ease-in-out infinite',
//         'fade-in': 'fade-in 0.5s ease-out',
//         'slide-up': 'slide-up 0.3s ease-out',
//       },
//       keyframes: {
//         'pulse-urgent': {
//           '0%, 100%': { opacity: '1' },
//           '50%': { opacity: '0.7', transform: 'scale(1.02)' }
//         },
//         'fade-in': {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' }
//         },
//         'slide-up': {
//           '0%': { transform: 'translateY(20px)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' }
//         }
//       }
//     },
//   },
//   plugins: [],
// }



