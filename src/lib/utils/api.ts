import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { dev } from '$app/environment';
import { browser } from '$app/environment';
import type {
    FindRequest,
    PaginatedResponse,
    CreateArticleRequest,
    ArticleCategory,
    UpdateArticleRequest,
    User,
    CreateUserRequest,
    UpdateUserRequest,
    ArticleCategoryPaginatedResponse,
    CreateArticleCategoryDto,
    UpdateArticleCategoryDto,
    ArticleTagPaginatedResponse,
    CreateArticleTagDto,
    UpdateArticleTagDto,
    ArticleTag,
    Article,
    ArticlePaginatedResponse,
    CreateArticleWithThumbnailDto,
    PhotoUploadResponse,
    CompetencySchema,
    CompetencySchemaResponse,
    WebSetting,
    UpdateWebSettingRequest
} from '$lib/types';

export const API_BASE_URL = PUBLIC_API_BASE_URL || 'http://localhost:3000';

// Use relative URLs for same-origin requests (works with proxy)
export function buildApiUrl(path: string): string {
    // For development with Vite proxy, use relative URLs for client-side requests
    // For server-side requests or production, use absolute URLs
    if (dev && browser) {
        // Use relative paths that get proxied by Vite (client-side only)
        return path.startsWith('/') ? path : `/${path}`;
    }

    // Use absolute URLs for server-side requests and production
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${API_BASE_URL}/${cleanPath}`;
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

export async function findArticleCategories(params: FindRequest = { page: 1, pageSize: 10, search: '' }): Promise<ArticleCategoryPaginatedResponse> {
    const response = await fetch(buildApiUrl('/api/article-categories/find'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        throw new Error(`Failed to find article categories: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function createArticleCategory(data: CreateArticleCategoryDto): Promise<Response> {
    const response = await fetch(buildApiUrl('/api/article-categories'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to create article category: ${response.status} ${response.statusText}`);
    }

    return response;
}

export async function getArticleCategory(id: number): Promise<ArticleCategory> {
    const response = await fetch(buildApiUrl(`/api/article-categories/${id}`), {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to get article category: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function updateArticleCategory(id: number, data: UpdateArticleCategoryDto): Promise<Response> {
    const response = await fetch(buildApiUrl(`/api/article-categories/${id}`), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to update article category: ${response.status} ${response.statusText}`);
    }

    return response;
}

export async function deleteArticleCategory(id: number): Promise<Response> {
    const response = await fetch(buildApiUrl(`/api/article-categories/${id}`), {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete article category: ${response.status} ${response.statusText}`);
    }

    return response;
}

// Article API
export async function findArticles(params: FindRequest = { page: 1, pageSize: 10, search: '' }): Promise<ArticlePaginatedResponse> {
    const response = await fetch(buildApiUrl('/api/articles/find'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        throw new Error(`Failed to find articles: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function getArticle(id: number): Promise<Article> {
    const response = await fetch(buildApiUrl(`/api/articles/${id}`), {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to get article: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function findArticleBySlug(slug: string): Promise<Article> {
    const response = await fetch(buildApiUrl(`/api/articles/slug/${slug}`), {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to find article by slug: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function createArticleWithThumbnail(data: CreateArticleWithThumbnailDto): Promise<Response> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('categoryId', data.categoryId.toString());
    if (data.content) formData.append('content', data.content);
    if (data.author) formData.append('author', data.author);
    if (data.thumbnailFile) formData.append('thumbnailFile', data.thumbnailFile);

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

export async function uploadThumbnail(file: File): Promise<PhotoUploadResponse> {
    const formData = new FormData();
    formData.append('thumbnail', file);

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

export async function getThumbnail(fileName: string): Promise<Blob> {
    const response = await fetch(buildApiUrl(`/api/articles/thumbnail/${fileName}`), {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to get thumbnail: ${response.status} ${response.statusText}`);
    }

    return response.blob();
}

export async function getArticleTags(articleId: number): Promise<ArticleTag[]> {
    const response = await fetch(buildApiUrl(`/api/articles/${articleId}/tags`), {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to get article tags: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function addArticleTags(articleId: number, tagIds: number[]): Promise<Response> {
    const response = await fetch(buildApiUrl(`/api/articles/${articleId}/tags`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(tagIds),
    });

    if (!response.ok) {
        throw new Error(`Failed to add article tags: ${response.status} ${response.statusText}`);
    }

    return response;
}

export async function removeArticleTags(articleId: number, tagIds: number[]): Promise<Response> {
    const response = await fetch(buildApiUrl(`/api/articles/${articleId}/tags?tagIds=${tagIds.join(',')}`), {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to remove article tags: ${response.status} ${response.statusText}`);
    }

    return response;
}

// Article Tags API
export async function findArticleTags(params: FindRequest = { page: 1, pageSize: 10, search: '' }): Promise<ArticleTagPaginatedResponse> {
    const response = await fetch(buildApiUrl('/api/article-tags/find'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        throw new Error(`Failed to find article tags: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function createArticleTag(data: CreateArticleTagDto): Promise<Response> {
    const response = await fetch(buildApiUrl('/api/article-tags'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to create article tag: ${response.status} ${response.statusText}`);
    }

    return response;
}

export async function getArticleTag(id: number): Promise<ArticleTag> {
    const response = await fetch(buildApiUrl(`/api/article-tags/${id}`), {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to get article tag: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function updateArticleTag(id: number, data: UpdateArticleTagDto): Promise<Response> {
    const response = await fetch(buildApiUrl(`/api/article-tags/${id}`), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to update article tag: ${response.status} ${response.statusText}`);
    }

    return response;
}

export async function deleteArticleTag(id: number): Promise<Response> {
    const response = await fetch(buildApiUrl(`/api/article-tags/${id}`), {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete article tag: ${response.status} ${response.statusText}`);
    }

    return response;
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

export async function getUsers(params: FindRequest = { page: 1, pageSize: 100, search: '' }): Promise<PaginatedResponse<User>> {
    const response = await fetch(buildApiUrl('/api/users/find'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        throw new Error(`Failed to get users: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
}

export async function getAllUsers(): Promise<User[]> {
    const response = await fetch(buildApiUrl('/api/users'), {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to get users: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function createUser(data: CreateUserRequest): Promise<Response> {
    const response = await fetch(buildApiUrl('/api/users'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to create user: ${response.status} ${response.statusText}`);
    }

    return response;
}

export async function updateUser(id: string, data: UpdateUserRequest): Promise<Response> {
    const response = await fetch(buildApiUrl(`/api/users/${id}`), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to update user: ${response.status} ${response.statusText}`);
    }

    return response;
}

export async function deleteUser(id: string): Promise<Response> {
    const response = await fetch(buildApiUrl(`/api/users/${id}`), {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.status} ${response.statusText}`);
    }

    return response;
}

export async function uploadProfilePhoto(file: File): Promise<{ fileName: string; message: string }> {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await fetch(buildApiUrl('/api/users/profile-photo'), {
        method: 'POST',
        credentials: 'include',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Failed to upload profile photo: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

// Competency Schema API functions
export async function findCompetencySchemas(params: FindRequest = { page: 1, pageSize: 10, search: '' }): Promise<CompetencySchemaResponse> {
    const dummySchemas: CompetencySchema[] = [
        {
            id: 1,
            name: 'Sertifikasi Okupasi Kepala Madrasah Ibtidaiyah',
            description: 'Sertifikasi untuk posisi Kepala Madrasah Ibtidaiyah',
            duration: '6 bulan',
            fee: 2500000,
            competencies: ['Kepemimpinan Pendidikan', 'Manajemen Lembaga', 'Kurikulum Islam'],
            image: '/img/1.jpeg'
        },
        {
            id: 2,
            name: 'Sertifikasi Okupasi Kepala Madrasah Tsanawiyah',
            description: 'Sertifikasi untuk posisi Kepala Madrasah Tsanawiyah',
            duration: '4 bulan',
            fee: 2500000,
            competencies: ['Pedagogik Islam', 'Metodologi Pembelajaran', 'Evaluasi Pembelajaran'],
            image: '/img/2.jpeg'
        },
        {
            id: 3,
            name: 'Sertifikasi Okupasi Kepala Madrasah Aliyah',
            description: 'Sertifikasi untuk posisi Kepala Madrasah Aliyah',
            duration: '3 bulan',
            fee: 2500000,
            competencies: ['Administrasi Akademik', 'Manajemen Data', 'Sistem Informasi'],
            image: '/img/3.jpeg'
        },
        {
            id: 4,
            name: 'Sertifikasi Okupasi Pimpinan Perguruan Tinggi Keagamaan Islam',
            description: 'Sertifikasi untuk posisi Pimpinan Perguruan Tinggi Keagamaan Islam',
            duration: '3 bulan',
            fee: 2500000,
            competencies: ['Administrasi Akademik', 'Manajemen Data', 'Sistem Informasi'],
            image: '/img/4.jpeg'
        }
    ];

    let filteredSchemas = dummySchemas;
    if (params.search) {
        filteredSchemas = dummySchemas.filter(schema =>
            schema.name.toLowerCase().includes(params.search!.toLowerCase()) ||
            schema.description.toLowerCase().includes(params.search!.toLowerCase())
        );
    }

    const startIndex = (params.page - 1) * params.pageSize;
    const endIndex = startIndex + params.pageSize;
    const paginatedData = filteredSchemas.slice(startIndex, endIndex);

    return {
        data: paginatedData,
        totalCount: filteredSchemas.length,
        totalPages: Math.ceil(filteredSchemas.length / params.pageSize),
        currentPage: params.page
    };
}

export async function getCompetencySchema(id: number): Promise<CompetencySchema | null> {
    const response = await findCompetencySchemas();
    return response.data.find(schema => schema.id === id) || null;
}

// Get latest articles API
export async function getLatestArticles(): Promise<Article[]> {
    const response = await fetch(buildApiUrl('/api/articles/latest'), {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to get latest articles: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

// Web Settings API
export async function getWebSettingsAdmin(): Promise<WebSetting> {
    const response = await fetch(buildApiUrl('/api/settings/admin'), {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to get web settings: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function updateWebSettings(data: UpdateWebSettingRequest): Promise<Response> {
    const response = await fetch(buildApiUrl('/api/settings'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to update web settings: ${response.status} ${response.statusText}`);
    }

    return response;
}
