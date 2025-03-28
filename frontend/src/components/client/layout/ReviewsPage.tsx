import SidebarLinks from "./SidebarLinks";
import reviewsVideo from "../../../assets/Reviews.mp4"; // заміни на реальне зображення

const ReviewsPage = () => {
    return (
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-6">
            {/* Ліва колонка: Sidebar */}
            <div className="w-[250px] md:w-[300px]">
                <SidebarLinks />
            </div>

            {/* Права колонка: Основний контент */}
            <div className="flex-1 pl-6">
                {/* Заголовок */}
                <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">Відгуки наших клієнтів</h1>

                {/* Вміст: відгуки + зображення */}
                <div className="grid grid-cols-1 md:grid-cols-[0.7fr_1fr] gap-6">
                    {/* Лівий блок: Відгуки */}
                    <div className="space-y-6">
                        <blockquote className="bg-purple-50 p-4 rounded-lg shadow">
                            <p className="text-violet-950 italic">“Все просто супер! Кульки якісні, яскраві, тримаються довго! Замовлятиму ще.”</p>
                            <footer className="mt-2 text-right text-purple-700 font-semibold">— Ольга, Київ</footer>
                        </blockquote>

                        <blockquote className="bg-purple-50 p-4 rounded-lg shadow">
                            <p className="text-violet-950 italic">“Дуже задоволений сервісом. Замовлення прийшло швидко, упаковка чудова!”</p>
                            <footer className="mt-2 text-right text-purple-700 font-semibold">— Іван, Львів</footer>
                        </blockquote>

                        <blockquote className="bg-purple-50 p-4 rounded-lg shadow">
                            <p className="text-violet-950 italic">“Купували кульки на день народження — діти у захваті. Велике дякую!”</p>
                            <footer className="mt-2 text-right text-purple-700 font-semibold">— Марина, Одеса</footer>
                        </blockquote>
                    </div>

                    {/* Правий блок: Зображення */}
                    <div className="flex justify-center">
                        <video
                            src={reviewsVideo}
                            controls
                            autoPlay
                            muted
                            loop
                            className="rounded-lg shadow-lg max-w-[80%]"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReviewsPage;
