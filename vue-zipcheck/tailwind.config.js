import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{vue,js,ts}'],
	theme: {
		extend: {
			colors: {
				// Core Colors
				primary: {
					DEFAULT: 'hsl(210, 100%, 50%)', // Original Bright Blue
					hover: 'hsl(210, 100%, 45%)',
					foreground: 'hsl(0, 0%, 100%)', // White
				},
				secondary: {
					DEFAULT: 'hsl(215, 15%, 95%)', // Light Gray
					hover: 'hsl(215, 20%, 90%)',
					foreground: 'hsl(215, 25%, 25%)', // Dark Gray-Blue
				},
				accent: {
					DEFAULT: 'hsl(160, 80%, 45%)', // Mint Green
					hover: 'hsl(160, 80%, 40%)',
					foreground: 'hsl(215, 25%, 15%)',
				},
				// Text Colors
				text: {
					main: {
						light: 'hsl(215, 25%, 20%)',
						dark: 'hsl(215, 15%, 88%)',
					},
					sub: {
						light: 'hsl(215, 15%, 45%)',
						dark: 'hsl(215, 10%, 65%)',
					},
				},
				// Backgrounds
				background: {
					light: 'hsl(0, 0%, 100%)', // White
					dark: 'hsl(220, 20%, 7%)', // Almost Black
				},
				surface: {
					light: 'hsl(215, 20%, 98%)',
					dark: 'hsl(220, 20%, 10%)',
				},
				card: {
					light: 'hsl(0, 0%, 100%)',
					dark: 'hsl(220, 20%, 9%)',
				},
				// Borders
				border: {
					light: 'hsl(215, 20%, 90%)',
					dark: 'hsl(215, 20%, 18%)',
				}
			},
			fontFamily: {
				sans: ['Pretendard', 'Noto Sans KR', 'sans-serif'],
			},
			borderRadius: {
				sm: '0.25rem',
				md: '0.5rem',
				lg: '0.75rem',
				xl: '1rem',
				'2xl': '1.5rem',
			},
			boxShadow: {
				soft: '0 4px 20px rgba(0,0,0,0.05)',
				'soft-hover': '0 8px 30px rgba(0,0,0,0.08)',
			},
		},
	},
	plugins: [forms, containerQueries],
};
