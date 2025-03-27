using BackendShop.Core.Interfaces;

namespace BackendShop.Core.Services;

public class TelegramService : ITelegramService
{
    private readonly HttpClient _httpClient;
    private readonly string _botToken;
    private readonly string _chatId;

    public TelegramService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _botToken = config["TelegramBot:Token"];
        _chatId = config["TelegramBot:ChatId"];
    }

    public async Task SendMessageAsync(string message)
    {
        if (string.IsNullOrWhiteSpace(_botToken) || string.IsNullOrWhiteSpace(_chatId)) return;

        var url = $"https://api.telegram.org/bot{_botToken}/sendMessage";
        var content = new FormUrlEncodedContent(new[]
        {
            new KeyValuePair<string, string>("chat_id", _chatId),
            new KeyValuePair<string, string>("text", message)
        });

        await _httpClient.PostAsync(url, content);
    }
}
