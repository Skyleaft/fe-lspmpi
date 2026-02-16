import type { WebSettingPublic } from '$lib/types';

let cachedSettings: WebSettingPublic | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function getCachedSettings(now: number) {
    if (cachedSettings && (now - cacheTimestamp) < CACHE_DURATION) {
        return cachedSettings;
    }
    return null;
}

export function setCachedSettings(settings: WebSettingPublic, now: number) {
    cachedSettings = settings;
    cacheTimestamp = now;
}

export function clearSettingsCache() {
    cachedSettings = null;
    cacheTimestamp = 0;
}
