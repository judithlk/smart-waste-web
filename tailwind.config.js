module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this to match your file structure
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")], // Ensure this line is present
};
