/** @type {import('tailwindcss').Config} */
const myColors = require("./themeOveride.js")
const myTailwindColors = Object.entries(myColors).reduce((object, [key, value]) => {
  let tmp = Object.entries(value).reduce((obj, [k, v]) => {
    return {
      ...obj,
      [key + "-" + k]: v
    }
  }, {})
  return {
    ...object,
    ...tmp,
  }
}, {})

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/@styled-components/**/*.{js,ts,jsx,tsx}",
    "./src/@core/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...myTailwindColors
      }
    },
  },
  plugins: [],
}
