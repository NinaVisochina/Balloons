using BackendShop.Core.Dto.Cart;
using BackendShop.Core.Interfaces;
using BackendShop.Data.Data;
using BackendShop.Data.Entities;
using Microsoft.EntityFrameworkCore;

public class CartService : ICartService
{
    private readonly ShopDbContext _context;

    public CartService(ShopDbContext context)
    {
        _context = context;
    }

    public async Task<CartDto> GetCartAsync(string userId)
    {
        var cart = await _context.Carts
            .Include(c => c.Items)
            .ThenInclude(ci => ci.Product)
            .ThenInclude(p => p.ProductImages) // Додано Include для зображень
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null) return new CartDto { UserId = userId };

        return new CartDto
        {
            CartId = cart.CartId,
            UserId = cart.UserId,
            Items = cart.Items.Select(i => new CartItemDto
            {
                ProductId = i.ProductId,
                ProductName = i.Product.Name,
                Quantity = i.Quantity,
                Price = i.Product.Price,
                Images = i.Product.ProductImages != null
                    ? i.Product.ProductImages.Select(img => img.Image).ToList()
                    : new List<string>(),
                QuantityInStock = i.Product.QuantityInStock // Додаємо кількість на складі
            }).ToList()
        };
    }

    public async Task AddToCartAsync(string userId, int productId, int quantity)
    {
        // Перевіряємо, чи існує продукт
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == productId);

        if (product == null)
        {
            throw new Exception($"Product with ID {productId} not found.");
        }

        // Перевіряємо, чи достатньо товару на складі
        var cart = await _context.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        int currentQuantityInCart = 0;

        if (cart != null)
        {
            var existingItem = cart.Items.FirstOrDefault(ci => ci.ProductId == productId);
            if (existingItem != null)
            {
                currentQuantityInCart = existingItem.Quantity;
            }
        }

        int newTotalQuantity = currentQuantityInCart + quantity;

        if (newTotalQuantity > product.QuantityInStock)
        {
            throw new Exception($"Cannot add {quantity} more of {product.Name}. Only {product.QuantityInStock} available in stock.");
        }

        // Якщо перевірка пройшла, додаємо товар у кошик
        if (cart == null)
        {
            cart = new Cart { UserId = userId };
            _context.Carts.Add(cart);
        }

        var cartItem = cart.Items.FirstOrDefault(ci => ci.ProductId == productId);
        if (cartItem != null)
        {
            cartItem.Quantity += quantity;
        }
        else
        {
            cart.Items.Add(new CartItem { ProductId = productId, Quantity = quantity });
        }

        await _context.SaveChangesAsync();
    }

    public async Task RemoveFromCartAsync(string userId, int productId)
    {
        var cart = await _context.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart != null)
        {
            var cartItem = cart.Items.FirstOrDefault(ci => ci.ProductId == productId);
            if (cartItem != null)
            {
                cart.Items.Remove(cartItem);
                await _context.SaveChangesAsync();
            }
        }
    }

    public async Task ClearCartAsync(string userId)
    {
        var cart = await _context.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart != null)
        {
            cart.Items.Clear();
            await _context.SaveChangesAsync();
        }
    }

    public async Task UpdateCartItemQuantityAsync(string userId, int productId, int quantity)
    {
        // Перевіряємо, чи існує продукт
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == productId);

        if (product == null)
        {
            throw new Exception($"Product with ID {productId} not found.");
        }

        // Перевіряємо, чи нова кількість не перевищує запас на складі
        if (quantity > product.QuantityInStock)
        {
            throw new Exception($"Cannot set quantity to {quantity} for {product.Name}. Only {product.QuantityInStock} available in stock.");
        }

        var cart = await _context.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart != null)
        {
            var cartItem = cart.Items.FirstOrDefault(ci => ci.ProductId == productId);
            if (cartItem != null)
            {
                cartItem.Quantity = quantity;
                if (cartItem.Quantity <= 0)
                {
                    cart.Items.Remove(cartItem);
                }
                await _context.SaveChangesAsync();
            }
        }
    }


}
