
import { useNavigate } from "react-router-dom";
import SidebarLinks from "../layout/SidebarLinks"; // Коректний шлях до SidebarLinks

const PricingPolicyPage = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-1/4">
                <SidebarLinks />
            </aside>

            {/* Основний контент */}
            <main className="flex-1">
                <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">
                    Цінова політика для оптових покупців
                </h1>

                <p className="text-center text-lg text-purple-950 mb-8">
                    Гарантовано отримуйте знижку на разову оптову покупку. <br />
                    Велика покупка — більша знижка!
                </p>

                {/* Сітка з цінами */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-purple-200 text-center p-6 rounded-lg shadow-md">
                        <p className="text-2xl font-bold text-purple-900 mb-2">1 500 - 3 000 грн</p>
                        <p className="text-xl font-bold text-purple-800">5%</p>
                    </div>
                    <div className="bg-purple-300 text-center p-6 rounded-lg shadow-md">
                        <p className="text-2xl font-bold text-purple-900 mb-2">3 000 - 6 000 грн</p>
                        <p className="text-xl font-bold text-purple-800">7%</p>
                    </div>
                    <div className="bg-purple-400 text-center p-6 rounded-lg shadow-md">
                        <p className="text-2xl font-bold text-purple-900 mb-2">6 000 - 10 000 грн</p>
                        <p className="text-xl font-bold text-purple-800">10%</p>
                    </div>
                    <div className="bg-purple-500 text-center p-6 rounded-lg shadow-md">
                        <p className="text-2xl font-bold text-purple-900 mb-2">10 000 - 20 000 грн</p>
                        <p className="text-xl font-bold text-purple-800">15%</p>
                    </div>
                    <div className="bg-purple-600 text-center p-6 rounded-lg shadow-md">
                        <p className="text-2xl font-bold text-purple-100 mb-2">20 000 грн і більше</p>
                        <p className="text-xl font-bold text-purple-100">17%</p>
                    </div>

                    {/* Кнопка */}
                    <button
                        onClick={() => navigate("/contact")}
                        className="bg-purple-700 text-white font-bold py-6 rounded-lg shadow-md hover:bg-purple-800 transition duration-300 text-center"
                    >
                        Хочу стати оптовим покупцем
                    </button>
                </div>
            </main>
        </div>
    );
};

export default PricingPolicyPage;
