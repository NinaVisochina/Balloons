import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
    const [openCategoryMenu, setOpenCategoryMenu] = useState(false);
    const [openProductMenu, setOpenProductMenu] = useState(false);
    const [openSubCategoryMenu, setOpenSubCategoryMenu] = useState(false);
    const [openUserMenu, setOpenUserMenu] = useState(false);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white">
                <div className="p-4 text-xl font-bold">Dashboard</div>
                <ul className="space-y-2 p-4">
                    {/* <li><Link to="/admin" className="hover:text-gray-400">Головна</Link></li> */}
                    <li>
                        <div
                            onClick={() => setOpenCategoryMenu(!openCategoryMenu)}
                            className="cursor-pointer hover:text-gray-400"
                        >
                            Категорії
                        </div>
                        {openCategoryMenu && (
                            <ul className="ml-4 mt-2 space-y-1">
                                <li>
                                    <Link to="/admin/categories" className="hover:text-gray-400">Список</Link>
                                </li>
                                <li>
                                    <Link to="/admin/categories/create" className="hover:text-gray-400">Створення</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <div
                            onClick={() => setOpenSubCategoryMenu(!openSubCategoryMenu)}
                            className="cursor-pointer hover:text-gray-400"
                        >
                            Підкатегорії
                        </div>
                        {openSubCategoryMenu && (
                            <ul className="ml-4 mt-2 space-y-1">
                                <li>
                                    <Link to="/admin/subcategories" className="hover:text-gray-400">Список</Link>
                                </li>
                                <li>
                                    <Link to="/admin/subcategories/create" className="hover:text-gray-400">Створення</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <div
                            onClick={() => setOpenProductMenu(!openProductMenu)}
                            className="cursor-pointer hover:text-gray-400"
                        >
                            Товари
                        </div>
                        {openProductMenu && (
                            <ul className="ml-4 mt-2 space-y-1">
                                <li>
                                    <Link to="/admin/products" className="hover:text-gray-400">Список</Link>
                                </li>
                                <li>
                                    <Link to="/admin/products/create" className="hover:text-gray-400">Створення</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li><Link to="/admin/discounts" className="hover:text-gray-400">Знижки</Link></li>
                    <li><Link to="/admin/filters" className="hover:text-gray-400">Фільтри</Link></li>
                    <li>
                        <Link to="/admin/orders" className="hover:text-gray-400">Замовлення</Link>
                    </li>
                    <li>
                        <div
                            onClick={() => setOpenUserMenu(!openUserMenu)}
                            className="cursor-pointer hover:text-gray-400"
                        >
                            Користувачі
                        </div>
                        {openUserMenu && (
                            <ul className="ml-4 mt-2 space-y-1">
                                <li>
                                    <Link to="/admin/users" className="hover:text-gray-400">Звичайні користувачі</Link>
                                </li>
                                <li>
                                    <Link to="/admin/admins" className="hover:text-gray-400">Адміністратори</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li><Link to="/logout" className="hover:text-gray-400">Авторизація</Link></li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
