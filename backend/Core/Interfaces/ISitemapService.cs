namespace BackendShop.Core.Interfaces
{
    public interface ISitemapService
    {
        Task<string> GenerateSitemapAsync();
    }

}
