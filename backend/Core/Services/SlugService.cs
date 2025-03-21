using System.Text;
using System.Text.RegularExpressions;

namespace BackendShop.Core.Services
{
    public static class SlugService
    {
        private static string TransliterateToLatin(string input)
        {
            Dictionary<char, string> translitMap = new()
        {
            { 'а', "a" }, { 'б', "b" }, { 'в', "v" }, { 'г', "h" }, { 'ґ', "g" }, { 'д', "d" },
            { 'е', "e" }, { 'є', "ye" }, { 'ж', "zh" }, { 'з', "z" }, { 'и', "y" }, { 'і', "i" },
            { 'ї', "yi" }, { 'й', "y" }, { 'к', "k" }, { 'л', "l" }, { 'м', "m" }, { 'н', "n" },
            { 'о', "o" }, { 'п', "p" }, { 'р', "r" }, { 'с', "s" }, { 'т', "t" }, { 'у', "u" },
            { 'ф', "f" }, { 'х', "kh" }, { 'ц', "ts" }, { 'ч', "ch" }, { 'ш', "sh" }, { 'щ', "shch" },
            { 'ь', "" }, { 'ю', "yu" }, { 'я', "ya" }, { ' ', "-" }
        };

            var sb = new StringBuilder();
            foreach (char c in input.ToLower())
            {
                if (translitMap.ContainsKey(c))
                    sb.Append(translitMap[c]);
                else if (char.IsLetterOrDigit(c) || c == '-')
                    sb.Append(c);
            }

            string result = Regex.Replace(sb.ToString(), @"\s+", " "); // 🔹 Замінюємо всі пробіли на 1 пробіл
            return result.Trim().Replace(" ", "-"); // 🔹 Гарантовано перетворюємо пробіли на дефіси
        }
        public static string GenerateSlug(string name)
        {
            string transliterated = TransliterateToLatin(name);
            return transliterated.ToLower()
                                 .Replace(" ", "-")  // Заміна пробілів на дефіси
                                 .Replace("--", "-") // Видалення подвійних дефісів
                                 .Trim('-');         // Видалення дефісів на початку і в кінці
        }
    }

}
