import type { PageServerLoad } from './$types';
import { API_BASE_URL } from '$lib/utils/api';
import type { Article, ArticleCategory } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const articleResponse = await fetch(`${API_BASE_URL}/api/articles/slug/${params.slug}`);
		
		if (!articleResponse.ok) {
			throw error(404, 'Artikel tidak ditemukan');
		}
		
		const article: Article = await articleResponse.json();
		
		const categoryResponse = await fetch(`${API_BASE_URL}/api/article-categories/${article.categoryId}`);
		const category: ArticleCategory | null = categoryResponse.ok ? await categoryResponse.json() : null;
		
		return { article, category };
	} catch (err) {
		throw error(404, 'Artikel tidak ditemukan');
	}
};
