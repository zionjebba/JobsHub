// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'conic-gradient':  'linear-gradient(to bottom, rgb(14, 165, 233), rgb(254, 215, 170), rgb(202, 138, 4))',
      }),
      colors: {
        primary: "#141414",
        blue: "#3575E2",
      },
    },
  },
  plugins: [
    require('tailwindcss-gradients'),
  ],
}
