// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Додайте правильні шляхи до ваших файлів
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
      },
      colors: {
        primary: '#F9E8E1', // М’який персиковий для хедера
        background: '#FFFFFF', // Білий фон
        accent: '#FF6F61', // Кораловий для кнопок і акцентів
        text: '#2D2D2D', // Темно-сірий для основного тексту
        secondary: '#A3A3A3', // Сірий для другорядного тексту

        // lavender: '#7C3AED',        // Основний лавандовий
        // lightLavender: '#E9D8FD',   // Світло-лавандовий для фону
        // darkPurple: '#5B21B6',      // Темно-фіолетовий для заголовків
        // mint: '#6EE7B7',            // М'ятний для акцентів
        // lightPink: '#FBCFE8',       // Світло-рожевий для ніжності
        // grayLight: '#F3F4F6',       // Світло-сірий для фону
        // grayDark: '#374151',        // Темно-сірий для тексту
        // yellowAccent: '#FDE047',    // Жовтий для акцентів

        // primary: '#EDCBC2',        // header
        // background: '#FFFFFF',   // для фону #FFF3EF
        // accent: '#844E38',      // Темніший для заголовків
        // secondary: '#CB8E75',            // для іншого тексту

        //lightPink: '#FBCFE8',       // Світло-рожевий для ніжності
        //grayLight: '#F3F4F6',       // Світло-сірий для фону
        //grayDark: '#374151',        // Темно-сірий для тексту
        //yellowAccent: '#FDE047',    // Жовтий для акцентів
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      fontFamily: {
        sans: ["'Roboto'", "sans-serif"],
        caveat: ["'Open Sans'", "sans-serif"],
        rubic: ["'Lato'", "sans-serif"],
      },
    },
  },
  plugins: [],
}


