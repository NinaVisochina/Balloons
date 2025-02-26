const API_URL = "/api/Accounts";

const refreshTokens = async (onLogout: () => void): Promise<string | null> => {
  try {
    const accessToken = localStorage.getItem("accessToken") || "";
    const refreshToken = localStorage.getItem("refreshToken") || "";
    
    if (!refreshToken) throw new Error("Refresh token is missing");

    const response = await fetch(`${API_URL}/refreshTokens`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accessToken,
        refreshToken,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data.accessToken;
    } else {
      console.error("Failed to refresh tokens.");
      localStorage.clear();
      onLogout(); // Виклик функції для перенаправлення
      return null;
    }
  } catch (error) {
    console.error("Error refreshing tokens:", error);
    localStorage.clear();
    onLogout(); // Виклик функції для перенаправлення
    return null;
  }
};

export const authFetch = async (
  url: string,
  options: RequestInit = {},
  onLogout: () => void
): Promise<Response> => {
  const accessToken = localStorage.getItem("accessToken");

  if (!options.headers) options.headers = {};
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  let response = await fetch(url, options);

  // Якщо токен прострочений, спробуємо оновити його
  if (response.status === 401) {
    console.log("Problem token", 401);
    const newAccessToken = await refreshTokens(onLogout);
    if (newAccessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      response = await fetch(url, options); // Повторний запит
    }
  }

  return response;
};
