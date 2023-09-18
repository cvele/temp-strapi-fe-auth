export const getToken = (): string | null => {
    return localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN);
};

export const setToken = (token: string | null): void => {
    if (token) {
        localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN, token);
    }
};

export const removeToken = (): void => {
    localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN);
};

