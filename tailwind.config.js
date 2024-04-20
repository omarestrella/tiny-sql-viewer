/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/renderer/**/*.html", "./src/renderer/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      mono: ["JetBrains Mono", "Menlo", "ui-monospace", "monospace"]
    },
    extend: {}
  },
  plugins: []
}
