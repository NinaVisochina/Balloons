using BackendShop.Core.Interfaces;
using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace BackendShop.Core.Services
{
    public class GoogleAuthService : IGoogleAuthService
    {
        private readonly HttpClient _httpClient;

        public GoogleAuthService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<GoogleUserInfo?> ValidateGoogleTokenAsync(string token)
        {
            try
            {
                HttpClient httpClient = new HttpClient();
                const string GoogleUserInfoUrl = "https://www.googleapis.com/oauth2/v3/userinfo";
                using var request = new HttpRequestMessage(HttpMethod.Get, GoogleUserInfoUrl);
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.SendAsync(request);
                if (!response.IsSuccessStatusCode)
                {
                    return null;
                }

                var jsonResponse = await response.Content.ReadAsStringAsync();
                var userInfo = JsonConvert.DeserializeObject<GoogleUserInfoApp>(jsonResponse);

                if (userInfo == null)
                {
                    return null;
                }

                return new GoogleUserInfo
                {
                    Email = userInfo.Email,
                    Name = userInfo.GivenName,
                    Picture = userInfo.Picture
                };
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
    public class GoogleUserInfo
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
    }

    public class GoogleUserInfoApp
    {
        public string Sub { get; set; }
        public string Name { get; set; }
        public string GivenName { get; set; }
        public string FamilyName { get; set; }
        public string Picture { get; set; }
        public string Email { get; set; }
        public bool EmailVerified { get; set; }
    }
}
