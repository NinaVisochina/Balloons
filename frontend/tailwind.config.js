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
      colors: {
        // lavender: '#7C3AED',        // Основний лавандовий
        // lightLavender: '#E9D8FD',   // Світло-лавандовий для фону
        // darkPurple: '#5B21B6',      // Темно-фіолетовий для заголовків
        // mint: '#6EE7B7',            // М'ятний для акцентів
        // lightPink: '#FBCFE8',       // Світло-рожевий для ніжності
        // grayLight: '#F3F4F6',       // Світло-сірий для фону
        // grayDark: '#374151',        // Темно-сірий для тексту
        // yellowAccent: '#FDE047',    // Жовтий для акцентів

        primary: '#EDCBC2',        // header
        background: '#FFFFFF',   // для фону #FFF3EF
        accent: '#844E38',      // Темніший для заголовків
        secondary: '#CB8E75',            // для іншого тексту
        //lightPink: '#FBCFE8',       // Світло-рожевий для ніжності
        //grayLight: '#F3F4F6',       // Світло-сірий для фону
        //grayDark: '#374151',        // Темно-сірий для тексту
        //yellowAccent: '#FDE047',    // Жовтий для акцентів
      },
      fontFamily: {
        sans: ["'Pacifico'", "cursive"],
        caveat: ["'Caveat'", "cursive"],
        rubic: ["'Rubic Beastly'", "sans-serif"],
      },
    },
  },
  plugins: [],
}


