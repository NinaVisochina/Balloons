using System.Text;
using BackendShop.Core.Interfaces;

namespace BackendShop.Core.Services;

public class SitemapService : ISitemapService
{
    private readonly ICategoryService _categoryService;
    private readonly ISubCategoryService _subCategoryService;
    private readonly IProductService _productService;

    public SitemapService(
        ICategoryService categoryService,
        ISubCategoryService subCategoryService,
        IProductService productService)
    {
        _categoryService = categoryService;
        _subCategoryService = subCategoryService;
        _productService = productService;
    }

    public async Task<string> GenerateSitemapAsync()
    {
        var sb = new StringBuilder();
        sb.AppendLine(@"<?xml version=""1.0"" encoding=""UTF-8""?>");
        sb.AppendLine(@"<urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">");

        // Домашня сторінка
        sb.AppendLine(CreateUrl("https://balloons.in.ua/"));

        // Категорії
        var categories = await _categoryService.GetListAsync();
        foreach (var category in categories)
        {
            sb.AppendLine(CreateUrl($"https://balloons.in.ua/category/{category.Slug}"));
        }

        // Підкатегорії
        var subcategories = await _subCategoryService.GetListAsync();
        foreach (var sub in subcategories)
        {
            if (!string.IsNullOrEmpty(sub.Slug))
                sb.AppendLine(CreateUrl($"https://balloons.in.ua/subcategory/products/{sub.Slug}"));
        }

        // Продукти
        var products = await _productService.GetListAsync();
        foreach (var product in products)
        {
            if (!string.IsNullOrEmpty(product.Slug))
                sb.AppendLine(CreateUrl($"https://balloons.in.ua/product/{product.Slug}"));
        }

        sb.AppendLine("</urlset>");
        return sb.ToString();
    }

    private string CreateUrl(string loc)
    {
        return $@"<url><loc>{loc}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>";
    }
}
