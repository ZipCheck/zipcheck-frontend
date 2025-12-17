import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{vue,js,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#f9f506',
				'primary-dark': '#e6e205',
				'background-light': '#fdfdfc',
				'background-alt': '#f7f7f5',
				'background-dark': '#23220f',
				'text-main': '#181811',
				'text-muted': '#8c8b5f',
				'border-color': '#e6e6db',
			},
			fontFamily: {
				display: ['Spline Sans', 'Noto Sans KR', 'sans-serif'],
				body: ['Spline Sans', 'Noto Sans KR', 'sans-serif'],
			},
			borderRadius: {
				DEFAULT: '1rem',
				lg: '1.5rem',
				xl: '2rem',
				'2xl': '3rem',
				full: '9999px',
			},
			boxShadow: {
				soft: '0 4px 20px rgba(0,0,0,0.03)',
				'soft-hover': '0 8px 30px rgba(0,0,0,0.06)',
			},
		},
	},
	plugins: [forms, containerQueries],
};
