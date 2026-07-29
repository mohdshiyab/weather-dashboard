/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#141B31',
        dusk: {
          DEFAULT: '#1C2748',
          light: '#2A3760',
          deep: '#0F1526',
        },
        cloud: '#FAF7F2',
        amber: {
          DEFAULT: '#F2A93B',
          soft: '#FBD9A0',
        },
        rain: '#4C8DBE',
        slate: {
          ink: '#2B2740',
          soft: '#6B7280',
        },
        mist: '#E7E2D8',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        panel: '0 30px 60px -25px rgba(15, 21, 38, 0.45)',
        soft: '0 10px 30px -12px rgba(20, 27, 49, 0.25)',
      },
      backgroundImage: {
        'sky-clear': 'linear-gradient(160deg, #1C2748 0%, #3B2F5E 55%, #F2A93B 130%)',
        'sky-cloud': 'linear-gradient(160deg, #1C2748 0%, #35406B 55%, #7C8AA8 130%)',
        'sky-rain': 'linear-gradient(160deg, #10182C 0%, #1E3350 55%, #4C8DBE 130%)',
        'sky-storm': 'linear-gradient(160deg, #0D1220 0%, #232A45 55%, #556080 130%)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%': { transform: 'translateX(-6%)' },
          '100%': { transform: 'translateX(6%)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fall: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(10px)', opacity: '0' },
        },
      },
      animation: {
        rise: 'rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        drift: 'drift 6s ease-in-out infinite alternate',
        spin: 'spin 1s linear infinite',
        fall: 'fall 1.1s ease-in infinite',
      },
    },
  },
  plugins: [],
}
