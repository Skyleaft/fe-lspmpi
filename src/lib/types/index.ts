export interface NewsItem {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	link: string;
	image: string;
}

export interface GalleryItem {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
	date: string;
}

export interface SchemaItem {
	id: string;
	name: string;
	description: string;
	duration: string;
	fee: number;
	competencies: string[];
	image?: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
	role: 'admin' | 'user';
	avatar?: string;
}

export interface Article {
	id: string;
	title: string;
	content: string;
	author: string;
	publishedAt: string;
	tags: string[];
	image?: string;
}