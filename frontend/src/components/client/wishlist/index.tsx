import axios from "axios";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWishList, removeFromWishList } from "../../../store/wishlistSlice";
import { RootState } from "../../../store";
import { API_URL } from "../../../env";
import { addToCart, CartItem } from "../../../interfaces/cart/cartSlice";

const WishListPage = () => {
  const dispatch = useDispatch();
  const wishListItems = useSelector((state: RootState) => state.wishlist.items);
  const userId = localStorage.getItem("userId");

  // Отримання вішліста при завантаженні сторінки
  useEffect(() => {
    if (userId) {
      axios
        .get(`/api/wishlist/${userId}`)
        .then((response) => {
          const mappedData = response.data.map((item: any) => ({
            id: item.id,
            productId: item.productId,
            productName: item.productName || "No Name",
            productPrice: item.productPrice || 0,
            productImage: item.productImage || "",
          }));
          dispatch(setWishList(mappedData));
        })
        .catch((error) => {
          console.error("Error fetching wish list items:", error);
        });
    }
  }, [userId, dispatch]);

  // Видалення з вішліста
  const handleRemove = (productId: number) => {
    const token = localStorage.getItem("accessToken"); // Отримуємо токен

    if (!token) {
      console.error("Token is missing");
      return;
    }
    
    axios
      .delete(`${API_URL}/api/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(removeFromWishList(productId));
      })
      .catch((error) => {
        console.error("Error removing from wish list:", error);
      });
  };

  // Додавання до кошика
  const handleAddToCart = async (item: any) => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const quantity = 1;

    if (token && userId) {
      try {
        await axios.post(
          `${API_URL}/api/Cart/add`,
          { userId, productId: item.productId, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(addToCart({ productId: item.productId, productName: item.productName, price: item.productPrice, quantity, images: [item.productImage] }));
      } catch (error) {
        console.error("Помилка додавання товару в БД", error);
      }
    } else {
      const cartItem: CartItem = {
        productId: item.productId,
        productName: item.productName,
        price: item.productPrice,
        quantity,
        images: [item.productImage],
      };
      dispatch(addToCart(cartItem));

      const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cartItems.find(i => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartItems.push(cartItem);
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-3xl font-semibold mb-6">My Wish List</h2>
      {wishListItems.length > 0 ? (
        <ul className="space-y-4">
          {wishListItems.map((item) => (
            <li
              key={`${item.id}-${item.productId}`}
              className="bg-white p-4 shadow-md rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src={`${API_URL}/images/300_${item.productImage}`}
                  alt={item.productName}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-semibold">{item.productName}</h3>
                  <p className="text-gray-700">{item.productPrice} грн</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  Додати до кошика
                </button>
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Видалити
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No items in wish list.</p>
      )}
    </div>
  );
};

export default WishListPage;
