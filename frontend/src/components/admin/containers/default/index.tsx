import {Link} from "react-router-dom";
import { ReactNode } from "react";

// Типізація для AdminDashboard
interface AdminDashboardProps {
    children: ReactNode; // Тип для дочірніх елементів
}

// Компонент AdminDashboard
const AdminDashboard: React.FC<AdminDashboardProps> = ({ children }) => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white">
                <div className="p-4 text-xl font-bold">Dashboard</div>
                <ul className="space-y-2 p-4">
                    <li><Link to="/admin" className="hover:text-gray-400">Головна</Link></li>
                    <li>
                        <Link to="/admin/categories" className="hover:text-gray-400">Категорії</Link>
                        <ul className="ml-4 mt-2 space-y-1">
                            <li><Link to="/admin/categories" className="hover:text-gray-400">Список</Link></li>
                            <li><Link to="/admin/categories/create" className="hover:text-gray-400">Створення</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/admin/products" className="hover:text-gray-400">Товари</Link>
                        <ul className="ml-4 mt-2 space-y-1">
                            <li><Link to="/admin/products" className="hover:text-gray-400">Список</Link></li>
                            <li><Link to="/admin/products/create" className="hover:text-gray-400">Створення</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/admin/discounts" className="hover:text-gray-400">Знижки</Link></li>
                    <li><Link to="/admin/filters" className="hover:text-gray-400">Фільтри</Link></li>
                    <li><Link to="/admin/orders" className="hover:text-gray-400">Замовлення</Link></li>
                    <li><Link to="/admin/users" className="hover:text-gray-400">Користувачі</Link></li>
                    <li><Link to="/logout" className="hover:text-gray-400">Авторизація</Link></li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100">{children}</div>
        </div>
    );
};

export default AdminDashboard;