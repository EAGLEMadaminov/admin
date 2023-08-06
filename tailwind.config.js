/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "yound-doctor": "url('./src/images/Frame.png')",
        "yound-doctor": "url('./src/images/young-doctor1.png')",
        "top-bottom": "url('./src/images/top-bottom.png')",
        "top-bottom": "url('./src/images/middle.png')",
        "top-right": "url('./src/images/top-right.png')",
        "top-left": "url('./src/images/top-left.png')",
      },
    },
  },
  plugins: [],
};
