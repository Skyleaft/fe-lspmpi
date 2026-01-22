import { writable } from 'svelte/store';

export const theme = writable('light');

export const colors = {
	primary: '#2563eb',
	secondary: '#64748b',
	accent: '#f59e0b',
	success: '#10b981',
	error: '#ef4444',
	warning: '#f59e0b',
	info: '#3b82f6'
};
