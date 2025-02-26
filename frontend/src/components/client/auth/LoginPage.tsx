import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthResponse } from "../../../interfaces/users/AuthResponse";
import { authFetch } from "../../../interfaces/users/authFetch";
import { useDispatch } from "react-redux";
import axios from "axios";
import { cartSlice, clearCart } from "../../../interfaces/cart/cartSlice";
import { API_URL } from "../../../env";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("accessToken");
  
    if (userId && token) {
      fetchCartFromServer(token);
    }
    if (!userId || !token) {
      // Якщо користувач не авторизований, видаляємо роль
      localStorage.removeItem("isAdmin");
    }
  }, []); // Виконувати тільки один раз після завантаження компонента
  
  const handleLogin = async () => {
    try {
      const response = await authFetch("/api/accounts/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }, () => navigate("/login")); // Pass a logout callback if necessary
  
      if (response.ok) {
        const data: AuthResponse = await response.json();
        console.log(data);

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("userId", data.userId);
        //console.log("Saving isAdmin:", data.isAdmin);
        localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
        //console.log("Is Admin saved:", localStorage.getItem("isAdmin"));

        // Перевірка чи є адміністратор
        const isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");
        //console.log("Is Admin from localStorage:", isAdmin);

        // Перевірка чи є адміністратором
        if (isAdmin) {
          //alert("Ви увійшли як адміністратор");
          navigate("/admin");
        } else {
          //alert("Успішний вхід як звичайний користувач");
          navigate("/");
        }

        // Синхронізувати кошик
        await syncCartToServer(data.accessToken);

        // Отримати кошик користувача з сервера
        await fetchCartFromServer(data.accessToken);

        //alert("Успішний вхід");
        //navigate("/"); // Перенаправлення на головну сторінку
      } else {
        alert("Невірний логін або пароль");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Отримати кошик користувача з сервера
  const fetchCartFromServer = async (token: string) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await axios.get(`${API_URL}/api/Cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched cart from server:", response.data);
        if (response.data && response.data.items) {
          // Маппінг, якщо відповідь має більш складну структуру
          const cartItems = response.data.items.map((item: any) => ({
            productId: item.productId,
            productName: item.productName || "Без назви",
            price: item.price || 0,
            quantity: item.quantity || 1,
            images: item.images || []
          }));
          
          dispatch(cartSlice.actions.addItemsToCart(cartItems));  // Тепер передається відфільтрований масив товарів
        }
      } catch (error) {
        console.error("Помилка отримання кошика з сервера", error);
      }
    }
  };
  
  const syncCartToServer = async (accessToken: string) => {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const userId = localStorage.getItem("userId");
  
    if (localCart.length > 0 && userId) {
      try {
        console.log("Syncing cart with server:", localCart);
  
        for (const item of localCart) {
          const response = await axios.post(
            `${API_URL}/api/Cart/add`,
            {
              UserId: userId,
              ProductId: item.productId,
              Quantity: item.quantity
            },
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          console.log("Item synced successfully:", response.data);
        }
  
        // Очищення локального кошика після синхронізації
        localStorage.removeItem("cart");
        dispatch(clearCart());
      } catch (error) {
        console.error("Error syncing cart", error);
      }
    }
  };
  
      // try {
      //   for (const item of localCart) {
      //     const existingItem = await axios.get(`${API_URL}/api/Cart/${userId}/item/${item.productId}`, {
      //       headers: { Authorization: `Bearer ${accessToken}` },
      //     });
      //     if (existingItem.data) {
      //       // Якщо товар є в кошику на сервері, оновлюємо його кількість
      //       await axios.put(`${API_URL}/api/Cart/update`, {
      //         userId,
      //         productId: item.productId,
      //         quantity: item.quantity,
      //       }, {
      //         headers: { Authorization: `Bearer ${accessToken}` },
      //       });
      //     } else {
      //       // Якщо товару нема в кошику, додаємо його
      //       await axios.post(`${API_URL}/api/Cart/add`, {
      //         userId,
      //         productId: item.productId,
      //         quantity: item.quantity,
      //         price: item.price,               // Додаємо ціну
      //         productName: item.productName,   // Додаємо назву товару
      //         images: item.images || [],       // Додаємо зображення (якщо є)
      //       }, {
      //         headers: { Authorization: `Bearer ${accessToken}` },
      //       });
      //     }
      //   }
  
      //   console.log("Кошик синхронізовано з сервером");
      //   localStorage.removeItem("cart");
      //   dispatch(clearCart());  // Очищуємо кошик Redux
      // } catch (error) {
      //   console.error("Помилка синхронізації кошика", error);
      // }
    
  
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Увійти</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
        >
          Увійти
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Ще не зареєстровані?{" "}
          <Link to="/register"
            className="text-blue-500 cursor-pointer"
          >
            Зареєструйтесь
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
