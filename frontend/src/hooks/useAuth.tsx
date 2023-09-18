import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { getToken, setToken, removeToken } from '../helpers';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiResponse = async (response: Response) => {
    if (response.status === 400) {
      const errorData = await response.json();
      setError(errorData.message || 'Validation error');
      return null;
    }
    return await response.json();
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (token) {
        setIsLoading(true);
        try {
          const response = await fetch(`${String(import.meta.env.VITE_API)}/users/me`, {
            headers: { Authorization: `${String(import.meta.env.VITE_BEARER)} ${token}` },
          });

          const data: User | null = await handleApiResponse(response);

          if (data) {
            setUser(data);
            setError(null);
          }
        } catch (e) {
          console.error(e);
          setError("Error fetching user details");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUser();
  }, []);

  const signIn = async (credentials: { identifier: string, password: string }) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${String(import.meta.env.VITE_API)}/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.status === 400) {
        setError(data.error.message || 'Validation error');
        return;
      }

      if (data.jwt) {
        setToken(data.jwt);
        setUser(data.user);
      } else {
        throw new Error('Invalid credentials');
      }
      setError(null);
    } catch (e) {
      console.error(e);
      setError('Error during sign-in');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    removeToken();
    setUser(null);
  };

  const reloadUser = async () => {
    const token = getToken();
    if (token) {
      setIsLoading(true);
      try {
        const response = await fetch(`${String(import.meta.env.VITE_API)}/users/me`, {
          headers: { Authorization: `${String(import.meta.env.VITE_BEARER)} ${token}` },
        });
  
        const data: User | null = await handleApiResponse(response);
  
        if (data) {
          setUser(data);
          setError(null);
        }
      } catch (e) {
        console.error(e);
        setError("Error fetching user details");
      } finally {
        setIsLoading(false);
      }
    }
  };  

  const signUp = async (registrationData: { username: string, email: string, password: string, nickname?: string }) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${String(import.meta.env.VITE_API)}/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();
      if (response.status === 400) {
        setError(data.error.message || 'Validation error');
        return;
      }
      setError(null);
    } catch (e) {
      console.error(e);
      setError('Error during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return { user, isLoading, signIn, signOut, signUp, reloadUser, error };
};
