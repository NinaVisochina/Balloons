using BackendShop.Core.Services;

namespace BackendShop.Core.Interfaces
{
    public interface IGoogleAuthService
    {
        Task<GoogleUserInfo?> ValidateGoogleTokenAsync(string token);

    }
}
