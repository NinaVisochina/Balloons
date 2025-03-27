using BackendShop.Data.Entities;
using System.Security.Claims;

namespace BackendShop.Core.Interfaces
{
    public interface IJwtService
    {
        // ------- Access Token
        Task<IEnumerable<Claim>> GetClaims(User user); // Змінюємо на Task
        string CreateToken(IEnumerable<Claim> claims);

        // ------- Refresh Token
        string CreateRefreshToken();
        IEnumerable<Claim> GetClaimsFromExpiredToken(string token);
        bool IsRefreshTokenExpired(DateTime creationTime);
        DateTime GetLastValidRefreshTokenDate();
    }
}
