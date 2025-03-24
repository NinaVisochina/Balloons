import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { clearCart } from '../../../interfaces/cart/cartSlice';
import { useCreateOrderMutation } from '../../../services/ordersApi';
import { ICreateOrder, IOrderItem } from '../../../interfaces/order';
import { authFetch } from '../../../interfaces/users/authFetch';  
import { ICity, IWarehouse } from '../../../interfaces/adress';

const CheckoutPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const [userData, setUserData] = useState({
    address: '',
    phone: '',
    city: '',
    warehouse: '',
  });
  const [user, setUser] = useState<any | null>(null); // To hold user data
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cities, setCities] = useState<ICity[]>([]);
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);

  // Define the onLogout function
  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };  

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await authFetch(`/api/Accounts/profile`, { method: 'GET' }, onLogout);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
            setUserData(prevState => ({
              ...prevState,
              phone: data.phoneNumber || '',
            }));
          } else {
            console.error('Не вдалося отримати дані користувача');
          }
        }
      } catch (error) {
        console.error('Помилка під час отримання даних користувача:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');
  
    if (!userId || !accessToken) {
      alert('Будь ласка, увійдіть у систему перед оформленням замовлення.');
      navigate('/login');
      return;
    }
  
    if (!userData.city || !userData.warehouse || !userData.phone) {
      alert('Заповніть всі поля!');
      return;
    }
  
    const orderItems: IOrderItem[] = cart.map(item => ({
      productId: item.productId, // Видаляємо .toString()
      productName: item.productName,
      price: Number(item.price.toFixed(2)), // Округлюємо до 2 знаків після коми
      quantity: item.quantity,
    }));
  
    //const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    // Перевірка, чи є елементи в кошику
    if (orderItems.length === 0) {
      alert('Кошик порожній!');
      return;
    }

    // Перевірка коректності даних
    const invalidItems = orderItems.filter(item => 
      !item.productId || item.quantity <= 0 || !item.price || !item.productName
    );
    if (invalidItems.length > 0) {
      alert('Деякі товари в кошику мають некоректні дані. Перевірте кошик.');
      return;
    }

    // Перевірка QuantityInStock
    const outOfStockItems = cart.filter(item => item.quantity > item.quantityInStock);
    if (outOfStockItems.length > 0) {
      const errorMessage = outOfStockItems.map(item => 
        `Товар "${item.productName}": у кошику ${item.quantity} шт., але на складі лише ${item.quantityInStock} шт.`
      ).join("\n");
      alert(`Не можна оформити замовлення:\n${errorMessage}`);
      return;
    }

    const orderData: ICreateOrder = {
      userId: userId,  
      address: `${userData.city}, Warehouse: ${userData.warehouse}`,
      items: orderItems,
      discountId: null,
    };

    console.log("Дані, які надсилаються на сервер:", orderData);
    
    try {
      await createOrder(orderData).unwrap();
      
      // Очищення корзини на сервері
      const response = await fetch(`/api/Cart/clear/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        console.error('Помилка очищення корзини на сервері');
        alert('Сталася помилка при очищенні корзини на сервері.');
      }
  
      alert('Ваше замовлення успішно оформлено!');
      dispatch(clearCart());
      localStorage.removeItem('cart'); // Очистка локального сховища
      navigate('/order-success');
    } catch (error) {
      console.error('Помилка оформлення замовлення:', error);
      alert('Виникла проблема з оформленням замовлення. Спробуйте ще раз.');
    }
  };
  
  const fetchCities = async () => {
    try {
      const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: import.meta.env.VITE_NP_API_KEY,
          modelName: "Address",
          calledMethod: "getCities",
        }),
      });
  
      const data = await response.json();
      setCities(data.data as ICity[]);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);
  
  const fetchWarehouses = async (cityRef: string) => {
    try {
      const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: import.meta.env.VITE_NP_API_KEY,
          modelName: "Address",
          calledMethod: "getWarehouses",
          methodProperties: { CityRef: cityRef },
        }),
      });
  
      const data = await response.json();
      setWarehouses(data.data as IWarehouse[]);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };
  
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Оформлення замовлення</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {user && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Ваші дані</h3>
            <p><strong>Ім'я:</strong> {user.firstname} {user.lastname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Телефон:</strong> {user.phoneNumber || 'Не вказано'}</p>
          </div>
        )}

        {/* <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div> */}

        <div>
          <label className="block text-sm font-medium">Місто</label>
          <select
            name="city"
            value={userData.city}
            onChange={(e) => {
              setUserData({ ...userData, city: e.target.value });
              fetchWarehouses(e.target.value);
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Виберіть місто</option>
            {cities.map(city => (
              <option key={city.Ref} value={city.Ref}>
                {city.Description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Відділення</label>
          <select
            name="warehouse"
            value={userData.warehouse}
            onChange={(e) => setUserData({ ...userData, warehouse: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            disabled={!userData.city}
          >
            <option value="">Виберіть відділення</option>
            {warehouses.map(warehouse => (
              <option key={warehouse.SiteKey} value={warehouse.SiteKey}>
                {warehouse.Description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Телефон</label>
          <input
            type="tel"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-accent px-6 py-3 text-white rounded-lg font-semibold transition duration-300 hover:bg-opacity-80"
        >
          Оформити замовлення
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Ваша корзина</h2>
        <ul>
          {cart.map(item => (
            <li key={item.productId} className="flex justify-between py-2">
              <span>{item.productName}</span>
              <span>{item.quantity} x {item.price} грн</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-semibold">
          Сума: {cart.reduce((total, item) => total + item.price * item.quantity, 0)} грн
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;
