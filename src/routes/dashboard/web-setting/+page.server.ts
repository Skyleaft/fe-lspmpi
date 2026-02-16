import type { Actions } from './$types';
import { clearSettingsCache } from '$lib/server/settingsState';

export const actions: Actions = {
    clearCache: async () => {
        clearSettingsCache();
        return { success: true };
    }
};
