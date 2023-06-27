/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#FEFEFE",
        mainBg: "#eceef9",
        primaryBlue: "#5358e2",
        primaryYellow: "#feae33",
        secondaryYellow: "#fec46b",
        primaryGray: "#f5f7fb",
        primaryBlack: "#292b31",
        redCard: "#ed6f71",
        purpleCard: "#ce76fe",
        blueCard: "#5358e2",
      },
      width: {
        '128': '32rem',
      },
      height: {
        '128': '32rem',
        '150': '39rem',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
      }
    },
  },
  plugins: [],
}