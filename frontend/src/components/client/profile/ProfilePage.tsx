import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { API_URL } from "../../../env/index.ts";
import { User } from "../../../interfaces/users/index.ts";
import { authFetch } from "../../../interfaces/users/authFetch.ts";
import { IOrder } from "../../../interfaces/order/index.ts";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("account");
  const [orders, setOrders] = useState<IOrder[]>([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const getOrderStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 001.415-1.415L11 9.586V6z" />
            </svg>
            <span className="text-orange-500 font-semibold">Очікується</span>
          </span>
        );
      case "completed":
        return (
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
            </svg>
            <span className="text-green-600 font-semibold">Завершено</span>
          </span>
        );
      case "cancelled":
        return (
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
            </svg>
            <span className="text-red-600 font-semibold">Скасовано</span>
          </span>
        );
      case "shipped":
        return (
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2-5h4a1 1 0 100-2H8a1 1 0 100 2zm0-4h4a1 1 0 100-2H8a1 1 0 100 2z" />
            </svg>
            <span className="text-blue-600 font-semibold">Відправлено</span>
          </span>
        );
      default:
        return <span className="text-gray-600 font-semibold">Невідомий статус</span>;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Токен відсутній");
        }

        const response = await authFetch(`${API_URL}/api/Accounts/profile`, {
          method: "GET",
        }, () => alert("Session expired, please log in again"));
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Токен відсутній");
        }

        const response = await authFetch(`${API_URL}/api/Order/${userId}`, {
          method: "GET",
        }, onLogout);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [user, userId]);

  if (!user) {
    return <p>Завантаження інформації про профіль...</p>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Інформація про обліковий запис</h2>
            <div className="flex items-center space-x-6 mb-8">
              <Avatar
                name={`${user.firstname} ${user.lastname}`}
                size="80"
                round
                className="shadow-md"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-800">{user.firstname} {user.lastname}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h4 className="font-semibold mb-3 text-lg text-gray-700">Контактна інформація</h4>
                <p className="text-gray-600">
                  <span className="font-bold">Телефон:</span> {user.phoneNumber || "Не вказано"}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Дата народження:</span>{" "}
                  {user.birthdate
                    ? new Date(user.birthdate).toLocaleDateString("uk-UA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Не вказано"}
                </p>
              </div>
            </div>
            <Link
              to="/profile/edit"
              className="inline-block bg-gradient-to-r from-accent to-pink-500 text-white font-sans px-4 py-2 rounded-lg shadow-md hover:from-accentDark hover:to-pink-600 hover:shadow-lg transition duration-300"
            >
              Редагувати
            </Link>
          </div>
        );
      case "orders":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Мої замовлення</h2>
            {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white shadow-md rounded-lg p-6"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-gray-800">
                        Замовлення #{order.id}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {new Date(order.orderDate).toLocaleDateString("uk-UA", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-600">
                        Сума:{" "}
                        <span className="font-bold text-pink-500">
                          {order.totalPrice.toFixed(2)} грн
                        </span>
                      </p>
                      <p className="text-gray-600">
                        Статус: {getOrderStatus(order.status)}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Товари:</h4>
                      <ul className="ml-4 space-y-2">
                        {order.items.map((item) => (
                          <li key={item.productId} className="text-gray-600">
                            {item.quantity} x {item.productName} –{" "}
                            <span className="font-bold">{item.price.toFixed(2)} грн</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-4">У вас немає замовлень.</p>
                <Link
                  to="/catalog"
                  className="inline-block bg-gradient-to-r from-accent to-pink-500 text-white font-sans px-8 py-3 sm:px-6 sm:py-2 xs:px-4 xs:py-2 rounded-lg shadow-lg hover:from-accentDark hover:to-pink-600 hover:shadow-xl transition duration-300 animate-fadeIn animation-delay-400 text-lg sm:text-base xs:text-sm"
                >
                  Перейти до покупок
                </Link>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-8 bg-white shadow-md rounded-md flex">
      <div className="w-1/4 border-r pr-6">
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("account")}
            className={`block text-left w-full px-4 py-3 rounded-lg hover:bg-gray-100 ${
              activeTab === "account" ? "bg-gray-100 font-bold" : ""
            }`}
          >
            Обліковий запис
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`block text-left w-full px-4 py-3 rounded-lg hover:bg-gray-100 ${
              activeTab === "orders" ? "bg-gray-100 font-bold" : ""
            }`}
          >
            Мої замовлення
          </button>
          <button
            onClick={onLogout}
            className="block text-left w-full px-4 py-3 rounded-lg text-pink-600 hover:bg-gray-100 hover:text-pink-700 transition duration-300"
          >
            Вихід
          </button>
        </nav>
      </div>
      <div className="w-3/4 pl-6">{renderTabContent()}</div>
    </div>
  );
};

export default ProfilePage;