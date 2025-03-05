export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    userId: string;
    isAdmin: boolean; // Додане поле
  }