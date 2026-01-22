/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/html/utils/withMT";

export default withMT({
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				primary: '#2190E4',
				secondary: '#64748b',
				accent: '#0BF594',
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
		},
	},
	plugins: [],
});