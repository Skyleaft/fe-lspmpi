import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { dev } from '$app/environment';

export const API_BASE_URL = PUBLIC_API_BASE_URL || 'http://localhost:3000';

// Use relative URLs for same-origin requests (works with proxy)
export function buildApiUrl(path: string): string {
    // For development with Vite proxy, use relative URLs
    // For production, use absolute URLs from environment
    if (dev) {
        // Use relative paths that get proxied by Vite
        return path.startsWith('/') ? path : `/${path}`;
    }

    // Use absolute URLs for production
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${API_BASE_URL}/${cleanPath}`;
}

// Article API calls
export interface CreateArticleRequest {
    title: string;
    categoryId: number;
    content?: string;
    author?: string;
    thumbnail?: string;
}

export interface ArticleCategory {
    id: number;
    name: string;
}

export async function createArticle(data: CreateArticleRequest): Promise<Response> {
    const response = await fetch(buildApiUrl('/api/articles'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to create article: ${response.status} ${response.statusText}`);
    }

    return response;
}

export async function createArticleWithThumbnail(data: CreateArticleRequest, thumbnailFile: File): Promise<Response> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('categoryId', data.categoryId.toString());
    if (data.content) formData.append('content', data.content);
    if (data.author) formData.append('author', data.author);
    formData.append('thumbnailFile', thumbnailFile);

    const response = await fetch(buildApiUrl('/api/articles/with-thumbnail'), {
        method: 'POST',
        credentials: 'include',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Failed to create article with thumbnail: ${response.status} ${response.statusText}`);
    }

    return response;
}

export async function uploadThumbnail(thumbnailFile: File): Promise<{ fileName: string; message: string }> {
    const formData = new FormData();
    formData.append('thumbnail', thumbnailFile);

    const response = await fetch(buildApiUrl('/api/articles/thumbnail'), {
        method: 'POST',
        credentials: 'include',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Failed to upload thumbnail: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function deleteArticle(id: number): Promise<Response> {
    const response = await fetch(buildApiUrl(`/api/articles/${id}`), {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete article: ${response.status} ${response.statusText}`);
    }

    return response;
}

export async function getArticleCategories(): Promise<ArticleCategory[]> {
    const response = await fetch(buildApiUrl('/api/article-categories'), {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to get article categories: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export interface UpdateArticleRequest {
    title: string;
    categoryId: number;
    content?: string;
    thumbnail?: string;
    isPublished: boolean;
}

export async function updateArticle(id: number, data: UpdateArticleRequest): Promise<Response> {
    const response = await fetch(buildApiUrl(`/api/articles/${id}`), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to update article: ${response.status} ${response.statusText}`);
    }

    return response;
}
