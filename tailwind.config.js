/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/renderer/**/*.html", "./src/renderer/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      body: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ],
      mono: ["JetBrains Mono", "Menlo", "ui-monospace", "monospace"]
    },
    extend: {}
  },
  plugins: []
}
