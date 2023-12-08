/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
      colors:{
        'primary': '#00ADB5',
        'text-primary': '#222831',
        'text-secondary': '#acacac',
        'background': '#ebebeb',
      }
    },
  },
  plugins: [flowbitePlugin],
}

