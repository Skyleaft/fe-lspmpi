
export interface GalleryItem {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
	date: string;
}

export interface ClaimUser {
	id: string;
	email: string | null;
	roleId: number;
	username: string | null;
	profileName: string | null;
}

export interface Role {
	id: number;
	name?: string | null;
	level: number;
}

export interface UserProfile {
	id: string;
	name: string;
	email: string;
	phone?: string | null;
	address?: string | null;
	city?: string | null;
	profilePicture?: string | null;
}

export interface UserData {
	id: string;
	username: string;
	password: string;
	passwordSalt: string;
	roleId: number;
	role: Role;
	userProfileId: string;
	userProfile: UserProfile;
	createdAt: string;
	updatedAt: string;
	isActivated: boolean;
}

export interface CreateUserRequest {
	name: string;
	email: string;
	username: string;
	password: string;
}

export interface LoginResponse {
	message: string;
	isAuth: boolean;
}

export interface LoginRequest {
	username: string | null;
	password: string | null;
}

export interface PhotoUploadResponse {
	fileName: string;
	message: string;
}

export interface ServiceResponse {
	success: boolean;
	message: string;
}

export interface RegisterRequest {
	username?: string | null;
	password?: string | null;
	name?: string | null;
	email?: string | null;
}

export interface ChangePasswordRequest {
	oldPassword: string;
	newPassword: string;
}

export interface Article {
	id: number;
	title: string;
	slug: string;
	content: string;
	author: string;
	createdAt: string;
	updatedAt: string;
	isPublished: boolean;
	categoryId: number;
	thumbnail?: string | null;
	articleTagMappings?: ArticleTagMapping[];
}

export interface ArticleCategory {
	id: number;
	name: string;
	slug?: string | null;
	description?: string | null;
	createdAt: string;
	updatedAt: string;
	articles?: Article[];
}

export interface ArticleCategoryPaginatedResponse {
	data: ArticleCategory[];
	totalCount: number;
	page: number;
	pageSize: number;
	totalPages?: number;
}

export interface CreateArticleCategoryDto {
	name: string;
	description?: string | null;
}

export interface UpdateArticleCategoryDto {
	name: string;
	description?: string | null;
}

// API Response interfaces
export interface FindRequest {
	search?: string;
	page: number;
	pageSize: number;
	sort?: string;
	order?: string;
	filter?: string;
}

export interface PaginatedResponse<T> {
	data: T[];
	totalCount: number;
	page: number;
	pageSize: number;
}

export interface CreateArticleRequest {
	title: string;
	categoryId: number;
	content?: string;
	author?: string;
	thumbnail?: string;
}

export interface UpdateArticleRequest {
	title: string;
	categoryId: number;
	content?: string;
	thumbnail?: string;
	isPublished: boolean;
}


export interface CreateArticleDto {
	title: string;
	content?: string | null;
	author?: string | null;
	categoryId: number;
	thumbnail?: string | null;
}

export interface UpdateArticleDto {
	title: string;
	content?: string | null;
	categoryId: number;
	thumbnail?: string | null;
	isPublished: boolean;
}

export interface CreateArticleWithThumbnailDto {
	title: string;
	content?: string | null;
	author?: string | null;
	categoryId: number;
	thumbnail?: string | null;
	thumbnailFile?: File;
}

export interface ArticlePaginatedResponse {
	data: Article[];
	totalCount: number;
	page: number;
	pageSize: number;
	totalPages?: number;
}

export interface PhotoUploadRequest {
	photo?: File;
}

export interface PhotoUploadResponse {
	fileName: string;
	message: string;
}

export interface CreateArticleCategoryDto {
	name: string;
}

export interface UpdateArticleCategoryDto {
	name: string;
}

export interface ArticleTag {
	id: number;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	articleTagMappings: ArticleTagMapping[];
}

export interface ArticleTagMapping {
	articleId: number;
	article: Article;
	articleTagId: number;
	articleTag: ArticleTag;
}

export interface ArticleTagPaginatedResponse {
	data: ArticleTag[];
	totalCount: number;
	page: number;
	pageSize: number;
	totalPages?: number;
}

export interface CreateArticleTagDto {
	name: string;
	description?: string;
}

export interface UpdateArticleTagDto {
	name: string;
	description?: string;
}

// User API calls
export interface User {
	id: string;
	username: string;
	roleId: number;
	role: {
		id: number;
		name: string;
		level: number;
	};
	userProfile: {
		id: string;
		name: string;
		email: string;
		phone: string;
		address: string;
		city: string;
		profilePicture: string;
	};
	createdAt: string;
	updatedAt: string;
	isActivated: boolean;
}

export interface CreateUserRequest {
	username: string;
	password: string;
	name: string;
	email: string;
	phone?: string;
	address?: string;
	city?: string;
	roleId: number;
}
export interface UpdateUserRequest {
	username: string;
	name: string;
	email: string;
	phone?: string;
	address?: string;
	city?: string;
}

export interface CompetencySchema {
	id: number;
	name: string;
	description: string;
	duration: string;
	fee: number;
	competencies: string[];
	image: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface CompetencySchemaResponse {
	data: CompetencySchema[];
	totalCount: number;
	totalPages: number;
	currentPage: number;
}

export interface CreateCompetencySchemaDto {
	name: string;
	description: string;
	duration: string;
	fee: number;
	competencies: string[];
	image?: string;
}

export interface UpdateCompetencySchemaDto {
	name?: string;
	description?: string;
	duration?: string;
	fee?: number;
	competencies?: string[];
	image?: string;
}

// Web Setting interfaces
export interface WebSetting {
	id: number;
	siteName?: string | null;
	siteDescription?: string | null;
	siteUrl?: string | null;
	siteKeywords?: string | null;
	siteAuthor?: string | null;
	siteVersion?: string | null;
	siteCopyright?: string | null;
	siteEmail?: string | null;
	sitePhone?: string | null;
	siteAddress?: string | null;
	siteLogo?: string | null;
	siteFavicon?: string | null;
	siteTheme?: string | null;
	siteLanguage?: string | null;
	siteTimezone?: string | null;
	siteStatus: boolean;
	sitePerPage: number;
	siteMaintenance: boolean;
	siteMaintenanceMessage?: string | null;
	siteSocialMedia?: Record<string, string | null> | null;
	siteAnalytics?: Record<string, string | null> | null;
	siteSeo?: Record<string, string | null> | null;
	siteMail?: Record<string, string | null> | null;
	siteUpload?: Record<string, string | null> | null;
	sitePayment?: Record<string, string | null> | null;
	siteMap?: Record<string, string | null> | null;
	siteCaptcha?: Record<string, string | null> | null;
	siteChat?: Record<string, string | null> | null;
	siteBackup?: Record<string, string | null> | null;
	siteOther?: Record<string, string | null> | null;
	siteNotification?: Record<string, string | null> | null;
	siteSecurity?: Record<string, string | null> | null;
	siteCache?: Record<string, string | null> | null;
	siteSession?: Record<string, string | null> | null;
	siteCookie?: Record<string, string | null> | null;
	siteDebug?: Record<string, string | null> | null;
	siteLog?: Record<string, string | null> | null;
	siteApi?: Record<string, string | null> | null;
	siteThemeConfig?: Record<string, string | null> | null;
	siteFooter?: Record<string, string | null> | null;
	siteHeader?: Record<string, string | null> | null;
	siteMeta?: Record<string, string | null> | null;
}

export interface WebSettingPublic {
	siteName?: string | null;
	siteDescription?: string | null;
	siteUrl?: string | null;
	siteKeywords?: string | null;
	siteAuthor?: string | null;
	siteVersion?: string | null;
	siteCopyright?: string | null;
	siteEmail?: string | null;
	sitePhone?: string | null;
	siteAddress?: string | null;
	siteLogo?: string | null;
	siteFavicon?: string | null;
	siteTheme?: string | null;
	siteLanguage?: string | null;
	siteTimezone?: string | null;
	siteStatus: boolean;
	siteMaintenance: boolean;
	siteMaintenanceMessage?: string | null;
	siteSocialMedia?: Record<string, string | null> | null;
	siteSeo?: Record<string, string | null> | null;
	siteThemeConfig?: Record<string, string | null> | null;
	siteFooter?: Record<string, string | null> | null;
	siteHeader?: Record<string, string | null> | null;
	siteMeta?: Record<string, string | null> | null;
}

export interface UpdateWebSettingRequest {
	siteName?: string | null;
	siteDescription?: string | null;
	siteUrl?: string | null;
	siteKeywords?: string | null;
	siteAuthor?: string | null;
	siteVersion?: string | null;
	siteCopyright?: string | null;
	siteEmail?: string | null;
	sitePhone?: string | null;
	siteAddress?: string | null;
	siteLogo?: string | null;
	siteFavicon?: string | null;
	siteTheme?: string | null;
	siteLanguage?: string | null;
	siteTimezone?: string | null;
	siteStatus: boolean;
	sitePerPage: number;
	siteMaintenance: boolean;
	siteMaintenanceMessage?: string | null;
	siteSocialMedia?: Record<string, string | null> | null;
	siteAnalytics?: Record<string, string | null> | null;
	siteSeo?: Record<string, string | null> | null;
	siteMail?: Record<string, string | null> | null;
	siteUpload?: Record<string, string | null> | null;
	sitePayment?: Record<string, string | null> | null;
	siteMap?: Record<string, string | null> | null;
	siteCaptcha?: Record<string, string | null> | null;
	siteChat?: Record<string, string | null> | null;
	siteBackup?: Record<string, string | null> | null;
	siteOther?: Record<string, string | null> | null;
	siteNotification?: Record<string, string | null> | null;
	siteSecurity?: Record<string, string | null> | null;
	siteCache?: Record<string, string | null> | null;
	siteSession?: Record<string, string | null> | null;
	siteCookie?: Record<string, string | null> | null;
	siteDebug?: Record<string, string | null> | null;
	siteLog?: Record<string, string | null> | null;
	siteApi?: Record<string, string | null> | null;
	siteThemeConfig?: Record<string, string | null> | null;
	siteFooter?: Record<string, string | null> | null;
	siteHeader?: Record<string, string | null> | null;
	siteMeta?: Record<string, string | null> | null;
}