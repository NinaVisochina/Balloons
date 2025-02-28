﻿using BackendShop.Core.Dto.Category;
using BackendShop.Core.Dto.Product;

namespace BackendShop.Core.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductItemViewModel>> GetListAsync();
        Task<ProductItemViewModel> GetByIdAsync(int id);
        Task CreateAsync(ProductCreateViewModel model);
        Task EditAsync(ProductEditViewModel model);
        Task DeleteAsync(int id);
        Task<ProductDescImageIdViewModel> UploadDescImageAsync(ProductDescImageUploadViewModel model);
        Task<List<ProductItemViewModel>> GetBySubCategoryIdAsync(int subCategoryId);
        Task<List<ProductItemViewModel>> SearchProductsAsync(string query);
        Task<ProductItemViewModel> GetBySlugAsync(string slug);


    }
}
