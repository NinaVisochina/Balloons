import SidebarLinks from "./SidebarLinks";
import returnImage from "../../../assets/Return.webp"; // Додай відповідне зображення в assets

const ReturnPolicyPage = () => {
    return (
        <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
                <SidebarLinks />
            </div>

            {/* Main content */}
            <div className="md:col-span-3">
                <h1 className="text-3xl font-bold mb-6 text-purple-800">Повернення</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ліва колонка — текст */}
                    <div>
                        <p className="text-lg text-purple-950 mb-4">
                            Ми піклуємось про вашу впевненість у покупках! Якщо товар не відповідає очікуванням або має
                            дефект, ви можете його повернути згідно з чинним законодавством України.
                        </p>

                        <h2 className="text-xl font-semibold text-purple-800 mt-6 mb-2">📦 Умови повернення:</h2>
                        <ul className="list-disc pl-6 text-purple-950 space-y-2 text-lg">
                            <li>Повернення можливе протягом <strong>14 днів</strong> з моменту отримання замовлення</li>
                            <li>Товар має бути <strong>в оригінальній упаковці</strong>, без ознак використання</li>
                            <li>Не підлягають поверненню товари, які були виготовлені на замовлення</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-purple-800 mt-6 mb-2">📬 Як оформити повернення?</h2>
                        <p className="text-lg text-purple-950">
                            Зв'яжіться з нами за телефонами, вказаними у розділі{" "}
                            <a href="/contacts" className="text-violet-800 underline hover:text-pink-500">Контакти</a>, 
                            або напишіть нам на email.
                        </p>
                        <p className="text-lg text-purple-950 mt-2">
                            Ми надамо вам інструкції щодо відправлення та реквізити для повернення коштів.
                        </p>
                    </div>

                    {/* Права колонка — зображення */}
                    <div className="flex justify-center items-center">
                        <img
                            src={returnImage}
                            alt="Повернення товару"
                            className="rounded-lg shadow-lg max-w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnPolicyPage;
