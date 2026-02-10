import type { PageServerLoad } from './$types';
import { API_BASE_URL } from '$lib/utils/api';
import type { Article } from '$lib/types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/articles/latest`);
		
		if (!response.ok) {
			return { articles: [] };
		}
		
		const articles: Article[] = await response.json();
		return { articles };
	} catch (error) {
		console.error('Failed to fetch latest articles:', error);
		return { articles: [] };
	}
};
