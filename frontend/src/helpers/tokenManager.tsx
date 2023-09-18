export const tokenManager = {
    getToken: (): string | null => {
      return localStorage.getItem("auth_token");
    },
    setToken: (token: string | null): void => {
      if (token) {
        localStorage.setItem("auth_token", token);
      }
    },
    removeToken: (): void => {
      localStorage.removeItem("auth_token");
    }
  };
  
