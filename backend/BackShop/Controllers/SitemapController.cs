using Microsoft.AspNetCore.Mvc;
using BackendShop.Core.Interfaces;

namespace BackendShop.BackShop.Controllers;

[ApiController]
[Route("sitemap.xml")]
public class SitemapController : ControllerBase
{
    private readonly ISitemapService _sitemapService;

    public SitemapController(ISitemapService sitemapService)
    {
        _sitemapService = sitemapService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var sitemap = await _sitemapService.GenerateSitemapAsync();
        return Content(sitemap, "application/xml");
    }
}
