import SidebarLinks from "./SidebarLinks"; // Імпортуємо SidebarLinks
import workingHoursImage from "../../../assets/WorkingHours.jpg";

const WorkingHoursPage = () => {
    return (
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-6">
            {/* Ліва колонка: Sidebar */}
            <div className="w-[250px] md:w-[300px]"> {/* Додаємо відступ, як на прикладі */}
                <SidebarLinks />
            </div>

            {/* Права колонка: Основний контент */}
            <div className="flex-1 pl-6"> {/* Додаємо відступ зліва */}
                {/* Заголовок сторінки */}
                <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">Графік роботи</h1>

                {/* Основний текст */}
                <div className="grid grid-cols-1 md:grid-cols-[0.7fr_1fr] gap-6"> {/* Змінено ширину колонок */}
                    {/* Лівий блок: текст */}
                    <div>
                        <p className="text-lg text-violet-950 mb-4">
                            Наш магазин працює для вас кожного дня крім понеділка, щоб ви могли придбати найкращі святкові товари у зручний для вас час.
                        </p>
                        <p className="text-lg text-violet-950 mb-4">
                            Ознайомтеся з нашим графіком роботи:
                        </p>
                        <ul className="text-lg text-violet-950 space-y-2">
                            <li>🕘 <strong>Вівторок - Неділя:</strong> 10:00 - 16:00</li>
                            <li>📅 <strong>Святкові дні:</strong> За попередньою домовленістю</li>
                        </ul>
                    </div>

                    {/* Правий блок: зображення */}
                    <div className="flex justify-center">
                        <img
                            src={workingHoursImage}
                            alt="Графік роботи"
                            className="rounded-lg shadow-lg max-w-[80%]" /* Зменшено ширину зображення */
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkingHoursPage;
