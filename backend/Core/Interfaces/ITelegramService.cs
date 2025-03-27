namespace BackendShop.Core.Interfaces
{
    public interface ITelegramService
    {
        Task SendMessageAsync(string message);
    }

}
