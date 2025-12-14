import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#3685FC',
				secondary: '#FF7A00',
				'background-light': '#FFFFFF',
				'background-dark': '#111827',
				'panel-light': '#F2F4F7',
				'panel-dark': '#1F2937',
				'text-light-primary': '#111827',
				'text-dark-primary': '#F9FAFB',
				'text-light-secondary': '#6B7280',
				'text-dark-secondary': '#9CA3AF',
				'border-light': '#E5E7EB',
				'border-dark': '#374151',
			},
			fontFamily: {
				display: ['Manrope', 'Noto Sans KR', 'sans-serif'],
			},
			borderRadius: {
				DEFAULT: '0.25rem',
				lg: '0.5rem',
				xl: '0.75rem',
				full: '9999px',
			},
		},
	},
	plugins: [forms, containerQueries],
};
