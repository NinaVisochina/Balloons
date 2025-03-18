using BackendShop.Data.Data;
using BackendShop.Data.Entities;
using BackendShop.Data.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Data;

namespace BackendShop.Data
{
    public static class ServiceExtensions
    {
       
        public static void AddDbContext(this IServiceCollection services, string connectionString)
        {
            Console.WriteLine($"Using connection string: {connectionString}");
            services.AddDbContext<ShopDbContext>(options =>
            {
                options.UseNpgsql(connectionString, npgsqlOptions =>
                {
                    // Додаткові налаштування (опціонально)
                    npgsqlOptions.EnableRetryOnFailure(); // Увімкнення повторних спроб при збої
                    npgsqlOptions.CommandTimeout(60);     // Таймаут команд (у секундах)
                });
            });

            //services.AddDbContext<ShopDbContext>(options =>
            //    options.UseNpgsql(connectionString)
            //);
        }
        public static void AddIdentity(this IServiceCollection services)
        {
            services.AddIdentityCore<User>(options =>
                options.SignIn.RequireConfirmedAccount = false)
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ShopDbContext>();
        }

        public static void AddRepository(this IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

        }
    }
}
