import SidebarLinks from "./SidebarLinks";
import howtoImage from "../../../assets/HowToUse.jpeg"; // додай відповідне зображення в папку assets

const HowToUsePage = () => {
    return (
        <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
                <SidebarLinks />
            </div>

            {/* Main content */}
            <div className="md:col-span-3">
                <h1 className="text-3xl font-bold mb-6 text-purple-800">Як користуватись сайтом</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ліва колонка — інструкція */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-purple-800">📌 Покрокова інструкція</h2>
                        <ol className="list-decimal pl-6 space-y-4 text-purple-950 text-lg">
                            <li>
                                <strong>Знайдіть товар:</strong> використовуйте пошук або відкрийте каталог.
                            </li>
                            <li>
                                <strong>Оберіть потрібний товар:</strong> перегляньте опис, фото, ціну, наявність.
                            </li>
                            <li>
                                <strong>Додайте до кошика:</strong> оберіть кількість і натисніть “Купити”.
                            </li>
                            <li>
                                <strong>Перейдіть у кошик:</strong> перевірте замовлення та натисніть “Оформити”.
                            </li>
                            <li>
                                <strong>Заповніть дані:</strong> вкажіть ім’я, номер телефону, адресу доставки.
                            </li>
                            <li>
                                <strong>Очікуйте дзвінка або підтвердження:</strong> наш менеджер зв’яжеться з вами.
                            </li>
                        </ol>

                        <p className="text-lg mt-6 text-purple-950">
                            Якщо виникають труднощі — зателефонуйте або напишіть нам, ми допоможемо ❤️
                        </p>
                    </div>

                    {/* Права колонка — зображення */}
                    <div className="flex justify-center items-center">
                        <img
                            src={howtoImage}
                            alt="Інструкція користування сайтом"
                            className="rounded-lg shadow-lg max-w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowToUsePage;
