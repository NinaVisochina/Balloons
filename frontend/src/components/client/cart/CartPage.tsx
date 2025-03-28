import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../env';
// import { addToCart, CartItem, removeFromCart } from '../../../interfaces/cart/cartSlice';
import { CartItem, removeFromCart } from '../../../interfaces/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
//import { removeFromCart as removeFromCartAPI } from '../../../services/cartApi'; // імпортуємо функцію для API
// import axios from 'axios';
import { updateCartItemQuantity } from '../../../interfaces/cart/cartSlice';
import { useRemoveCartItemMutation, useUpdateCartItemQuantityMutation } from '../../../services/cartApi';
import { useNavigate } from 'react-router-dom';


const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [localCart, setLocalCart] = useState<CartItem[]>([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  //const [updateCartItemQuantityMutation] = useUpdateCartItemQuantityMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [updateCartItemQuantityMutation] = useUpdateCartItemQuantityMutation();

  // Ініціалізація кошика з localStorage
  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
    if (Array.isArray(cartFromLocalStorage)) {
      setLocalCart(cartFromLocalStorage);
    } else {
      setLocalCart([]);
    }
  }, []);

  const handleRemoveItem = async (productId: number) => {
    if (userId) {
      try {
        await removeCartItem({ userId, productId }).unwrap();
        dispatch(removeFromCart(productId));
      } catch (error) {
        console.error("Не вдалося видалити товар із кошика:", error);
      }
    } else {
      const updatedCart = localCart.filter(item => item.productId !== productId);
      setLocalCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      dispatch(removeFromCart(productId));
    }
  };


  const handleChangeQuantity = async (productId: number, newQuantity: number) => {
    // Знаходимо товар у кошику
    const item = cart.find(item => item.productId === productId);
    if (!item) return;

    // Перевірка на мінімальну кількість
    if (newQuantity <= 0) return;

    // Перевірка на максимальну кількість (quantityInStock)
    if (newQuantity > item.quantityInStock) {
      return; // Не дозволяємо збільшувати кількість, кнопка "+" буде неактивною
    }

    if (userId) {
      try {
        // Оновлення через API
        await updateCartItemQuantityMutation({ userId, productId, quantity: newQuantity }).unwrap();
        dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
      } catch (error) {
        console.error('Failed to update quantity:', error);
      }
    } else {
      // Оновлення в Redux
      dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
      // Оновлення в localStorage
      const updatedCart = localCart.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      setLocalCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Корзина порожня!");
      return;
    }
    // Перехід на сторінку оформлення замовлення за допомогою useNavigate
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Корзина</h1>
      {!Array.isArray(cart) || cart.length === 0 ? (
        <p>Корзина порожня</p>
      ) : (
        <ul className="space-y-4">
          {cart.map(item => {
            const isAddButtonDisabled = item.quantity >= item.quantityInStock; // Оголошуємо тут для кожного товару

            return (
              <li key={item.productId} className="bg-white p-4 shadow-md rounded-lg space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
                {/* Блок зображення + інформації */}
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <img
                    src={item.images && item.images.length > 0 ? `${API_URL}/images/300_${item.images[0]}` : "/path-to-placeholder-image.jpg"}
                    alt={item.productName}
                    className="w-28 h-28 object-cover rounded-md mx-auto sm:mr-4"
                  />
                  <div className="text-center sm:text-left mt-4 sm:mt-0">
                    <h3 className="font-semibold text-lg">{item.productName || `Product ID: ${item.productId}`}</h3>
                    <p>Кількість: {item.quantity}</p>
                    <p>На складі: {item.quantityInStock} шт.</p>
                    <p className="text-gray-600">{!isNaN(item.price) ? `${item.price} грн` : "N/A"}</p>
                  </div>
                </div>

                {/* Блок кнопок */}
                <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => handleChangeQuantity(item.productId, item.quantity + 1)}
                    className={`px-3 py-1 rounded-md text-white ${isAddButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700'}`}
                    disabled={isAddButtonDisabled}
                  >
                    +
                  </button>
                  <span className="px-2 font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleChangeQuantity(item.productId, item.quantity - 1)}
                    className="px-3 py-1 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
                  >
                    -
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleRemoveItem(item.productId)}
                  >
                    Видалити
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <div className="mt-6">
        {cart.length > 0 && (
          <button
            className="bg-accent px-6 py-3 text-white rounded-lg font-semibold transition duration-300 hover:bg-opacity-80"
            onClick={handleCheckout}
          >
            Оформити замовлення
          </button>
        )}
      </div>
    </div>
  );
};


export default CartPage;
