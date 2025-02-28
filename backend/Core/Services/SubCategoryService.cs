﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using BackendShop.Core.Dto.SubCategory;
using BackendShop.Core.Interfaces;
using BackendShop.Data.Data;
using BackendShop.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BackendShop.Services
{
    public class SubCategoryService : ISubCategoryService
    {
        private readonly ShopDbContext _context;
        private readonly IMapper _mapper;
        private readonly IImageHulk _imageHulk;

        public SubCategoryService(ShopDbContext context, IMapper mapper, IImageHulk imageHulk)
        {
            _context = context;
            _mapper = mapper;
            _imageHulk = imageHulk;
        }

        public async Task<List<SubCategoryDto>> GetListAsync()
        {
            return await _context.SubCategories
                .ProjectTo<SubCategoryDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<SubCategoryDto> GetByIdAsync(int id)
        {
            var subCategory = await _context.SubCategories
                .ProjectTo<SubCategoryDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x => x.Id == id);

            if (subCategory == null) throw new Exception("Підкатегорію не знайдено");

            return subCategory;
        }

        public async Task<List<SubCategoryDto>> GetByCategoryIdAsync(int categoryId)
        {
            var subcategories = await _context.SubCategories
                .Where(sc => sc.CategoryId == categoryId)
                .ProjectTo<SubCategoryDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            if (!subcategories.Any()) throw new Exception("Підкатегорій не знайдено");

            return subcategories;
        }

        public async Task CreateAsync(CreateSubCategoryDto model)
        {
            if (!_context.Categories.Any(c => c.CategoryId == model.CategoryId))
                throw new Exception("Invalid CategoryId.");

            var imageName = await _imageHulk.Save(model.ImageSubCategory);
            var entity = _mapper.Map<SubCategory>(model);
            entity.ImageSubCategoryPath = imageName;
            entity.GenerateSlug();
            await _context.SubCategories.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        //public async Task EditAsync(EditSubCategoryDto model)
        //{
        //    var subCategory = await _context.SubCategories.SingleOrDefaultAsync(x => x.SubCategoryId == model.Id);
        //    if (subCategory == null) throw new Exception("Підкатегорію не знайдено");

        //    subCategory.Name = model.Name;
        //    subCategory.CategoryId = model.CategoryId;

        //    if (model.ImageSubCategory != null && model.ImageSubCategory.Length > 0)
        //    {
        //        if (!string.IsNullOrEmpty(subCategory.ImageSubCategoryPath))
        //        {
        //            _imageHulk.Delete(subCategory.ImageSubCategoryPath);
        //        }

        //        var newImageName = await _imageHulk.Save(model.ImageSubCategory);
        //        subCategory.ImageSubCategoryPath = newImageName;
        //    }

        //    _context.SubCategories.Update(subCategory);
        //    await _context.SaveChangesAsync();
        //}
        public async Task EditAsync(EditSubCategoryDto model)
        {
            var subCategory = await _context.SubCategories.SingleOrDefaultAsync(x => x.SubCategoryId == model.Id);
            if (subCategory == null) throw new Exception("Підкатегорію не знайдено");

            // Перевіряємо, чи змінилась назва підкатегорії
            if (subCategory.Name != model.Name)
            {
                subCategory.Name = model.Name;
                subCategory.GenerateSlug(); // Генеруємо новий Slug

                // Перевіряємо, чи новий Slug вже існує
                var existingSlug = await _context.SubCategories
                    .AnyAsync(x => x.Slug == subCategory.Slug && x.SubCategoryId != subCategory.SubCategoryId);

                if (existingSlug)
                {
                    throw new Exception("Slug вже використовується. Оберіть іншу назву.");
                }
            }

            subCategory.CategoryId = model.CategoryId;

            if (model.ImageSubCategory != null && model.ImageSubCategory.Length > 0)
            {
                if (!string.IsNullOrEmpty(subCategory.ImageSubCategoryPath))
                {
                    _imageHulk.Delete(subCategory.ImageSubCategoryPath);
                }

                var newImageName = await _imageHulk.Save(model.ImageSubCategory);
                subCategory.ImageSubCategoryPath = newImageName;
            }

            _context.SubCategories.Update(subCategory);
            await _context.SaveChangesAsync();
        }


        public async Task DeleteAsync(int id)
        {
            var subCategory = await _context.SubCategories
                .Include(sc => sc.Products) // Завантажуємо продукти цієї підкатегорії
                .SingleOrDefaultAsync(x => x.SubCategoryId == id);

            if (subCategory == null)
                throw new Exception("Підкатегорію не знайдено");

            // Перевіряємо, чи є продукти у підкатегорії
            if (subCategory.Products.Any())
                throw new Exception("Неможливо видалити підкатегорію, яка містить продукти.");

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    // Видаляємо зображення підкатегорії, якщо воно є
                    if (!string.IsNullOrEmpty(subCategory.ImageSubCategoryPath))
                    {
                        _imageHulk.Delete(subCategory.ImageSubCategoryPath);
                    }

                    _context.SubCategories.Remove(subCategory);
                    await _context.SaveChangesAsync();

                    await transaction.CommitAsync(); // Підтверджуємо транзакцію
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync(); // Відкочуємо транзакцію у разі помилки
                    throw new Exception("Помилка під час видалення підкатегорії.");
                }
            }
        }

        public async Task<SubCategoryDto> GetBySlugAsync(string slug)
        {
            var subCategory = await _context.SubCategories.FirstOrDefaultAsync(sc => sc.Slug == slug);
            if (subCategory == null) return null;
            return _mapper.Map<SubCategoryDto>(subCategory);
        }

    }
}

