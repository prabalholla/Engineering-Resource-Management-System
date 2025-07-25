module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float-subtle': 'float 6s ease-in-out infinite',
        'float-subtle-reverse': 'float 6s ease-in-out infinite reverse',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'slide-diagonal': 'slide-diagonal 20s linear infinite',
        'slide-diagonal-reverse': 'slide-diagonal-reverse 20s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-diagonal': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '100%': { transform: 'translateX(40px) translateY(40px)' },
        },
        'slide-diagonal-reverse': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '100%': { transform: 'translateX(-40px) translateY(40px)' },
        },
        'fade-in-up': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
