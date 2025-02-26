import { useSearchParams } from "react-router-dom";
import { useGetProductsByNameQuery } from "../../../services/productApi";
import { IProductItem } from "../../../interfaces/products";
import { API_URL } from "../../../env";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, CartItem } from "../../../interfaces/cart/cartSlice";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("name") || "";
  const { data: products, isLoading } = useGetProductsByNameQuery(query);
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [productQuantities, setProductQuantities] = useState<Record<number, number>>({});
  const dispatch = useDispatch();

  const handleQuantityChange = (productId: number, increment: number) => {
    setProductQuantities(prev => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) + increment, 1),
    }));
  };

  const handleAddToCart = (product: IProductItem) => {
    const quantity = productQuantities[product.id] || 1;
    const cartItem: CartItem = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity,
      images: product.images || [],
    };
    dispatch(addToCart(cartItem));

    // Оновлення кошика в localStorage
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cartItems.find(item => item.productId === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push(cartItem);
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    console.log("Товар додано до кошика:", product.name);
  };

  if (isLoading) return <div>Завантаження...</div>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Результати пошуку для "{query}"</h1>
      {products && products.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product: IProductItem) => (
            <li
              key={product.id}
              className="relative bg-white p-4 shadow-md rounded-lg overflow-hidden"
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
            >
              <img
                src={`${API_URL}/images/600_${product.images[0]}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              {hoveredProductId === product.id && (
                <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-80 text-white p-4 transition-all duration-300 ease-in-out">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <button onClick={() => handleQuantityChange(product.id, -1)} className="bg-gray-600 px-2 py-1 rounded-md">-</button>
                      <span className="mx-2">{productQuantities[product.id] || 1}</span>
                      <button onClick={() => handleQuantityChange(product.id, 1)} className="bg-gray-600 px-2 py-1 rounded-md">+</button>
                    </div>
                    <button onClick={() => handleAddToCart(product)} className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600">Додати в кошик</button>
                  </div>
                </div>
              )}
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p>Модель: {product.modeles}</p>
              <p>Код: {product.code}</p>
              <p>Розмір: {product.size}</p>
              <p>Кількість в упаковці: {product.quantityInPack}</p>
              <p className="font-bold mt-2">{product.price} грн</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нічого не знайдено</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
