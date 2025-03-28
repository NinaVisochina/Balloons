import SidebarLinks from "./SidebarLinks";
import deliveryImage from "../../../assets/Delivery.webp"; // поклади зображення сюди

const DeliveryAndPaymentPage = () => {
    return (
        <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
                <SidebarLinks />
            </div>

            {/* Main content */}
            <div className="md:col-span-3">
                <h1 className="text-3xl font-bold mb-6 text-purple-800">Доставка і оплата</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Text column */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-purple-800">🚚 Доставка</h2>
                        <ul className="text-lg text-purple-950 space-y-3 mb-6">
                            <li>📦 <strong>Самовивіз:</strong> м. Київ, з нашого магазину</li>
                            <li>🚖 <strong>Кур'єром:</strong> По Києву — доставка в день замовлення або наступного дня</li>
                            <li>📬 <strong>Нова Пошта:</strong> Відправка по всій Україні щодня</li>
                        </ul>

                        <h2 className="text-2xl font-bold mb-4 text-purple-800">💳 Оплата</h2>
                        <ul className="text-lg text-purple-950 space-y-3">
                            <li>💵 Готівкою при отриманні (при самовивозі або кур'єрі)</li>
                            <li>💳 Онлайн-оплата через LiqPay / Monobank / Privat24</li>
                            <li>📲 Оплата на банківську картку (за реквізитами)</li>
                        </ul>

                        <p className="text-lg text-purple-950 mt-6">
                            Ми гарантуємо безпеку та зручність при оформленні вашого замовлення!
                        </p>
                    </div>

                    {/* Image column */}
                    <div className="flex justify-center items-center">
                        <img
                            src={deliveryImage}
                            alt="Доставка і оплата"
                            className="rounded-lg shadow-lg max-w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryAndPaymentPage;
