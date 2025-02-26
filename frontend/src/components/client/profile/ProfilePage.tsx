import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import Avatar from "react-avatar";
import { API_URL } from "../../../env/index.ts";
import { User } from "../../../interfaces/users/index.ts";
import { authFetch } from "../../../interfaces/users/authFetch.ts";
// import { IOrder, OrderStatus } from "../../../interfaces/order/index.ts";
import { IOrder} from "../../../interfaces/order/index.ts";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("account"); // Для відстеження активної вкладки
  const [orders, setOrders] = useState<IOrder[]>([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // Define the onLogout function
  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  const getOrderStatus = (status: string) => {
    console.log("Received status:", status); // додайте лог, щоб побачити отриманий статус
    switch (status.toLowerCase()) { // використовуйте toLowerCase для порівняння
      case "pending":
        return 'Очікується';
      case "completed":
        return 'Завершено';
      case "cancelled":
        return 'Скасовано';
      case "shipped":
        return 'Відправлено';
      default:
        return 'Невідомий статус';
    }
  };
  
  // First useEffect: fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No token found");
          }

        const response = await authFetch(`${API_URL}/api/Accounts/profile`, {
          method: "GET",
        }, () => alert("Session expired, please log in again")); // onLogout callback
        if (response.ok) {
            const data = await response.json();
            console.log("Refresh token result ", data);
            console.log("User ID:", user?.id);
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

  // Second useEffect: fetch orders data when userId is available
  useEffect(() => {
    if (!user?.id) return;

    console.log("User ID from URL:", userId); // Log the user ID correctly
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await authFetch(`${API_URL}/api/Order/${userId}`, {
          method: "GET",
        }, onLogout);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched orders for user:", userId);
          setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };    
    fetchOrders();
  }, [user]);

  if (!user) {
    return <p>Завантаження інформації про профіль...</p>;
  }

  
  // Вміст для кожної вкладки
  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Інформація про обліковий запис</h2>
            <div className="flex items-center space-x-4 mb-6">
              <Avatar
                name={`${user.firstname} ${user.lastname}`}
                size="64"
                round
                className="shadow-md"
              />
              <div>
                <h3 className="text-lg font-bold">{user.firstname} {user.lastname}</h3>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-gray-100 rounded-md shadow">
                <h4 className="font-semibold mb-2">Контактна інформація</h4>
                <p><span className="font-bold">Телефон:</span> {user.phoneNumber || "Не вказано"}</p>
                <p>
                  <span className="font-bold">Дата народження:</span>{" "}
                  {user.birthdate ? new Date(user.birthdate).toLocaleDateString("uk-UA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }) : "Не вказано"}
                </p>
              </div>
            </div>
            <Link
              to="/profile/edit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Редагувати
            </Link>
          </div>
        );
      case "orders":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Мої замовлення</h2>
            {orders.length > 0 ? (
              <div className="grid gap-4">
                {orders.map((order) => (
                  <div key={order.id} className="border p-4 bg-gray-50 rounded-md shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold">
                        Замовлення #{order.id}
                      </h3>
                      <span className="text-sm text-gray-600">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      Сума: {order.totalPrice.toFixed(2)} грн
                    </div>
                    <h4 className="font-semibold mt-2">Товари:</h4>
                    <ul className="list-disc pl-5">
                      {order.items.map((item) => (
                        <li key={item.productId} className="text-gray-800">
                          {item.quantity} x <strong>{item.productName}</strong> — {item.price.toFixed(2)} грн
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 text-sm text-gray-700">
                      <strong>Статус:</strong> {getOrderStatus(order.status)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>У вас немає замовлень.</p>
            )}
          </div>
        );
      case "wishlist":
        return <h2 className="text-2xl font-bold">Мій список бажань</h2>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md flex">
      {/* Ліве меню */}
      <div className="w-1/4 border-r pr-4">
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("account")}
            className={`block text-left w-full px-4 py-2 rounded-md hover:bg-gray-100 ${
              activeTab === "account" ? "bg-gray-100 font-bold" : ""
            }`}
          >
            Обліковий запис
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`block text-left w-full px-4 py-2 rounded-md hover:bg-gray-100 ${
              activeTab === "orders" ? "bg-gray-100 font-bold" : ""
            }`}
          >
            Мої замовлення
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`block text-left w-full px-4 py-2 rounded-md hover:bg-gray-100 ${
              activeTab === "wishlist" ? "bg-gray-100 font-bold" : ""
            }`}
          >
            Мій список бажань
          </button>
          <button
            onClick={onLogout}
            className="block text-left w-full px-4 py-2 rounded-md text-red-600 hover:bg-gray-100"
          >
            Вихід
          </button>
        </nav>
      </div>

      {/* Правий контент */}
      <div className="w-3/4 pl-4">{renderTabContent()}</div>
    </div>
  );
};

export default ProfilePage;
