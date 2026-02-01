import { writable } from 'svelte/store';
import type { ClaimUser } from '$lib/types';
import { buildApiUrl } from '../utils/api';

// Helper function to get profile photo URL
function getProfilePhotoUrl(userId: string, refreshKey: number): string {
    const path = `api/users/profile-photo/${userId}`;
    const url = new URL(path, window.location.origin);
    if (refreshKey > 0) {
        url.searchParams.set('t', refreshKey.toString());
    }
    return url.toString();
}

// Default avatar URL
const DEFAULT_AVATAR_URL = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face';

export interface AuthState {
    user: ClaimUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    profilePhotoRefreshKey: number;
    profilePhotoUrl: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    profilePhotoRefreshKey: 0,
    profilePhotoUrl: null,
};

function createAuthStore() {
    const { subscribe, set, update } = writable<AuthState>(initialState);

    return {
        subscribe,
        set,
        update,

        async login(username: string, password: string): Promise<{ success: boolean; message: string }> {
            update(state => ({ ...state, isLoading: true }));

            try {
                const response = await fetch(buildApiUrl('api/auth/login'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok && data.isAuth) {
                    // Set cookie includes user's session, now fetch user data
                    const userResponse = await fetch(buildApiUrl('api/auth/me'), {
                        method: 'GET',
                        credentials: 'include' // Include cookies
                    });

                    
                    if (userResponse.ok) {
                        const user: ClaimUser = await userResponse.json();
                        const profilePhotoUrl = user.id ? await checkProfilePhotoExists(user.id, 0) : null;
                        update(state => ({ 
                            ...state, 
                            user, 
                            isLoading: false, 
                            isAuthenticated: true,
                            profilePhotoUrl
                        }));
                        return { success: true, message: 'Login berhasil' };
                    } else {
                        update(state => ({ ...state, user: null, isLoading: false, isAuthenticated: false, profilePhotoUrl: null }));
                        return { success: false, message: 'Gagal mengambil data pengguna' };
                    }
                } else {
                    update(state => ({ ...state, user: null, isLoading: false, isAuthenticated: false, profilePhotoUrl: null }));
                    return { success: false, message: data.message || 'Username atau password salah' };
                }
            } catch {
                update(state => ({ ...state, user: null, isLoading: false, isAuthenticated: false, profilePhotoUrl: null }));
                return { success: false, message: 'Username atau password salah' };
            }
        },

        async logout(): Promise<{ success: boolean; message: string }> {
            try {
                const response = await fetch(buildApiUrl('api/auth/logout'), {
                    method: 'POST',
                    credentials: 'include'
                });

                const data = await response.json();

                if (response.ok) {
                    set(initialState);
                    return { success: true, message: 'Logout berhasil' };
                } else {
                    return { success: false, message: data.message || 'Gagal logout' };
                }
            } catch {
                set(initialState);
                return { success: false, message: 'Terjadi kesalahan jaringan, tetap logout' };
            }
        },

        async checkAuth(): Promise<boolean> {
            try {
                const response = await fetch(buildApiUrl('api/auth/me'), {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const user: ClaimUser = await response.json();
                    const profilePhotoUrl = user.id ? await checkProfilePhotoExists(user.id, 0) : null;
                    update(state => ({ 
                        ...state, 
                        user, 
                        isLoading: false, 
                        isAuthenticated: true,
                        profilePhotoUrl
                    }));
                    return true;
                } else {
                    update(state => ({ ...state, user: null, isLoading: false, isAuthenticated: false, profilePhotoRefreshKey: 0, profilePhotoUrl: null }));
                    return false;
                }
            } catch {
                update(state => ({ ...state, user: null, isLoading: false, isAuthenticated: false, profilePhotoRefreshKey: 0, profilePhotoUrl: null }));
                return false;
            }
        },

        setLoading(loading: boolean) {
            update(state => ({ ...state, isLoading: loading }));
        },

        async refreshProfilePhoto() {
            const currentState = await getCurrentState();
            const newRefreshKey = currentState.profilePhotoRefreshKey + 1;
            const newProfilePhotoUrl = currentState.user?.id 
                ? await checkProfilePhotoExists(currentState.user.id, newRefreshKey) 
                : null;
            update(state => ({
                ...state,
                profilePhotoRefreshKey: newRefreshKey,
                profilePhotoUrl: newProfilePhotoUrl
            }));
        }
    };

    // Helper function to get current state
    function getCurrentState(): Promise<AuthState> {
        return new Promise((resolve) => {
            const unsubscribe = subscribe(state => {
                unsubscribe();
                resolve(state);
            });
        });
    }

    // Helper function to check if profile photo exists and return appropriate URL
    async function checkProfilePhotoExists(userId: string, refreshKey: number): Promise<string> {
        const profilePhotoUrl = getProfilePhotoUrl(userId, refreshKey);
        
        try {
            const response = await fetch(profilePhotoUrl, {
                method: 'HEAD', // Use HEAD to check existence without downloading
                credentials: 'include'
            });
            
            // If response is not found (404), return default avatar
            if (!response.ok) {
                return DEFAULT_AVATAR_URL;
            }
            
            return profilePhotoUrl;
        } catch {
            // If fetch fails, return default avatar
            return DEFAULT_AVATAR_URL;
        }
    }
}

export const authStore = createAuthStore();
