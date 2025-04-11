/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
      {
        pattern: /p-(1|2|3|4|5|6)/, 
      },
      {
        pattern: /(focus|hover):ring-.+/,
      },
      'w-full',
      'rounded-xl',
      'border',
      'border-gray-300',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  