import { writable } from 'svelte/store';
import type { WebSettingPublic } from '$lib/types';

// Default settings as fallback
const defaultSettings: WebSettingPublic = {
    siteName: 'LSP Manajemen Pendidikan Islam',
    siteDescription: 'Lembaga Sertifikasi Profesi terdepan dalam mengembangkan kompetensi profesional di bidang manajemen pendidikan Islam yang berkualitas dan terpercaya.',
    siteUrl: null,
    siteKeywords: null,
    siteAuthor: null,
    siteVersion: null,
    siteCopyright: '© 2026 LSP Manajemen Pendidikan Islam. All rights reserved.',
    siteEmail: 'lsp.manajerpendidikan@gmail.com',
    sitePhone: '+62821197042568',
    siteAddress: 'Jl. Gedebage Selatan No.137 Kel. Cisaranteun Kidul, Kec. Gedebage, Kota Bandung 40295',
    siteLogo: null,
    siteFavicon: null,
    siteTheme: null,
    siteLanguage: 'id',
    siteTimezone: 'Asia/Jakarta',
    siteStatus: true,
    siteMaintenance: false,
    siteMaintenanceMessage: null,
    siteSocialMedia: null,
    siteSeo: null,
    siteThemeConfig: null,
    siteFooter: null,
    siteHeader: null,
    siteMeta: null,
};

function createSiteSettingsStore() {
    const { subscribe, set, update } = writable<WebSettingPublic>(defaultSettings);

    return {
        subscribe,
        set,
        update,
        /** Initialize store from server-loaded data */
        init(data: WebSettingPublic | null) {
            if (data) {
                set(data);
            }
        },
        /** Get default settings */
        getDefaults() {
            return defaultSettings;
        }
    };
}

export const siteSettings = createSiteSettingsStore();
