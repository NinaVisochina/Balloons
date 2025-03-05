import { Link } from "react-router-dom";

const SidebarLinks = () => {
    return (
        <div className="text-purple-800">
            {/* Інформація */}
            <div className="mb-6">
                <h3 className="font-bold mb-2 text-lg">Інформація</h3>
                <ul className="space-y-1 text-sm">
                    <li>
                        <Link to="/about" className="text-purple-600 hover:underline font-medium">
                            Про нас
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="text-purple-600 hover:underline font-medium">
                            Контакт
                        </Link>
                    </li>
                    <li>
                        <Link to="/pricing-policy" className="text-purple-600 hover:underline font-medium">
                            Цінова політика
                        </Link>
                    </li>
                    <li>
                        <Link to="/cooperation" className="text-purple-600 hover:underline font-medium">
                            Співпраця
                        </Link>
                    </li>
                    <li>
                        <Link to="/how-to-use" className="text-purple-600 hover:underline font-medium">
                            Як користуватись сайтом
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Послуги і сервіси */}
            <div className="mb-6">
                <h3 className="font-bold mb-2 text-lg">Послуги і сервіси</h3>
                <ul className="space-y-1 text-sm">
                    <li>
                        <Link to="/joint-purchases" className="text-purple-600 hover:underline font-medium">
                            Спільні покупки
                        </Link>
                    </li>
                    <li>
                        <Link to="/reviews" className="text-purple-600 hover:underline font-medium">
                            Відгуки наших клієнтів
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Покупцю */}
            <div>
                <h3 className="font-bold mb-2 text-lg">Покупцю</h3>
                <ul className="space-y-1 text-sm">
                    <li>
                        <Link to="/delivery" className="text-purple-600 hover:underline font-medium">
                            Доставка і оплата
                        </Link>
                    </li>
                    <li>
                        <Link to="/returns" className="text-purple-600 hover:underline font-medium">
                            Повернення
                        </Link>
                    </li>
                    <li>
                        <Link to="/terms" className="text-purple-600 hover:underline font-medium">
                            Умови використання сайту
                        </Link>
                    </li>
                    <li>
                        <Link to="/blog" className="text-purple-600 hover:underline font-medium">
                            Блог
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarLinks;
