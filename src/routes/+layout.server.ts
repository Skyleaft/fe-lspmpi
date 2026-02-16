import type { LayoutServerLoad } from './$types';
import { API_BASE_URL } from '$lib/utils/api';
import type { WebSettingPublic } from '$lib/types';
import { getCachedSettings, setCachedSettings } from '$lib/server/settingsState';

export const load: LayoutServerLoad = async ({ fetch }) => {
    const now = Date.now();
    const cached = getCachedSettings(now);

    // Return cached data if still valid
    if (cached) {
        return { siteSettings: cached };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/settings`);

        if (!response.ok) {
            console.error('Failed to fetch web settings:', response.status);
            return { siteSettings: null };
        }

        const settings: WebSettingPublic = await response.json();

        // Update cache
        setCachedSettings(settings, now);

        return { siteSettings: settings };
    } catch (error) {
        console.error('Error fetching web settings:', error);
        return { siteSettings: null };
    }
};
