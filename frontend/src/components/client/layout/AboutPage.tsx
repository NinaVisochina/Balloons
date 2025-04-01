import SidebarLinks from "./SidebarLinks"; // Імпортуємо SidebarLinks

const AboutPage = () => {
    return (
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-6">
            {/* Ліва колонка: Sidebar */}
            <SidebarLinks />

            {/* Права колонка: Основний контент */}
            <div className="flex-1">
                {/* Заголовок сторінки */}
                <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">Про нас</h1>

                {/* Основний текст */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Лівий блок: текст */}
                    <div>
                        <p className="text-lg text-violet-950 mb-4">
                            Ласкаво просимо до нашого інтернет-магазину, де свято починається з яскравих деталей! Ми
                            спеціалізуємося на продажі повітряних кульок, святкових прикрас, подарункових наборів та
                            всього, що потрібно для незабутніх моментів. Наша мета — допомогти вам створити ідеальну
                            атмосферу для будь-якої події.
                        </p>
                        <p className="text-lg text-violet-950 mb-4">
                            Ми співпрацюємо з найкращими виробниками, щоб запропонувати вам якісну продукцію за
                            доступними цінами. Незалежно від того, чи це дитячий день народження, корпоративна вечірка
                            або романтична вечеря, у нас знайдеться щось особливе для кожного.
                        </p>
                        <p className="text-lg text-violet-950">
                            Приєднуйтесь до нашої спільноти любителів свят, і дозвольте нам зробити ваші моменти
                            яскравішими!
                        </p>
                    </div>

                    {/* Правий блок: зображення */}
                    <div className="flex justify-center">
                        <img
                            src="https://images.pexels.com/photos/4684169/pexels-photo-4684169.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Святкові кульки"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>

                {/* Додатковий розділ: Наші переваги */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-4 text-violet-800 text-center">Чому обирають нас?</h2>
                    <ul className="space-y-4 text-lg text-violet-800">
                        <li>
                            🎈 <strong>Широкий вибір товарів</strong> — у нас є все: від кульок із гелієм до святкових
                            гірлянд і декорацій.
                        </li>
                        <li>
                            🚚 <strong>Швидка доставка</strong> — ми доставляємо ваші замовлення по всій Україні
                            максимально швидко і безпечно.
                        </li>
                        <li>
                            💸 <strong>Доступні ціни</strong> — ми пропонуємо продукцію високої якості за найкращими
                            цінами.
                        </li>
                        <li>
                            ⭐ <strong>Відгуки клієнтів</strong> — нам довіряють тисячі задоволених покупців.
                        </li>
                    </ul>
                </div>

                {/* Графічний блок */}
                <div className="mt-10 flex justify-center">
                    <img
                        src="https://images.pexels.com/photos/17840129/pexels-photo-17840129.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Святкова атмосфера"
                        className="rounded-lg shadow-lg"
                    />
                </div>

                {/* Контактний блок */}
                <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Зв’яжіться з нами</h3>
                    <p className="text-lg text-gray-700 mb-2">
                        📧 <strong>Email:</strong> perlamutr.net@gmail.com
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                        📞 <strong>Телефон:</strong> +38 (068) 022-76-08
                    </p>
                    <p className="text-lg text-gray-700">
                        📍 <strong>Адреса:</strong> м. Рівне, вул. Шевченка, 7. р-к "Моріон", 80
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
