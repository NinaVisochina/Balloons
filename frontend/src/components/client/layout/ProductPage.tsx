import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery, useGetProductBySlugQuery } from "../../../services/productApi";
import { useDispatch } from "react-redux";
import { addToCart, CartItem } from "../../../interfaces/cart/cartSlice";
import { useState, useEffect } from "react";
import { useGetSubCategoryByIdQuery } from "../../../services/subcategoryApi";
import { API_URL } from "../../../env";
import axios from "axios";
import { FaHome, FaShoppingCart } from "react-icons/fa";

const ProductPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Отримуємо ID продукту за його slug
  const { data: productBySlug, isLoading } = useGetProductBySlugQuery(slug!, {
    skip: !slug,
  });

  useEffect(() => {
    if (productBySlug?.id) {
      setProductId(productBySlug.id);
    }
  }, [productBySlug]);

  // Отримуємо продукт по ID, якщо він доступний
  const { data: productById } = useGetProductByIdQuery(productId!, {
    skip: !productId,
  });

  const product = productById || productBySlug;

  // Отримуємо підкатегорію за її ID
  const { data: subCategory } = useGetSubCategoryByIdQuery(product?.subCategoryId ?? 0, {
    skip: !product?.subCategoryId,
  });

  // Визначаємо зображення продукту
  const productImages = product?.images?.length ? product.images : [];

  // Зміна кількості товару
  const handleQuantityChange = (increment: number) => {
    const newQuantity = quantity + increment;

    // Перевірка на мінімальну кількість
    if (newQuantity < 1) return;

    // Перевірка на максимальну кількість (quantityInStock)
    if (newQuantity > product.quantityInStock) {
      return;
    }

    setQuantity(newQuantity);
  };

  // Додаємо товар у кошик
  const handleAddToCart = async () => {
    if (!product) return;

    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      try {
        await axios.post(
          `${API_URL}/api/Cart/add`,
          { userId, productId: product.id, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(addToCart({
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity,
          images: productImages,
          quantityInStock: product.quantityInStock
        }));
      } catch (error: any) {
        // Обробка помилок
      }
    } else {
      dispatch(addToCart({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
        images: productImages,
        quantityInStock: product.quantityInStock
      }));

      const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cartItems.find(item => item.productId === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartItems.push({
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity,
          images: productImages,
          quantityInStock: product.quantityInStock
        });
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  // Перемикання зображень
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  if (isLoading) return <div>Завантаження...</div>;
  if (!product) return <div>Продукт не знайдено</div>;
  const isAddButtonDisabled = quantity >= product.quantityInStock;

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6">
      <nav className="text-gray-600 mb-4 flex items-center">
        <Link to="/" className="hover:text-pink-500 transition duration-200">
          <FaHome className="inline-block mr-2 w-5 h-5 text-gray-600 hover:text-pink-500 transition duration-200" />
        </Link>
        {subCategory?.categoryName && (
          <>
            <span className="mx-2">/</span>
            <Link to={`/category/${subCategory.categoryId}`} className="hover:text-pink-500 transition duration-200">
              {subCategory.categoryName}
            </Link>
          </>
        )}
        {subCategory?.name && (
          <>
            <span className="mx-2">/</span>
            <Link to={`/subcategory/${subCategory.slug}/products`} className="hover:text-pink-500 transition duration-200">
              {subCategory.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="bg-white p-6 rounded-lg shadow-md border border-pink-100 hover:border-pink-300 hover:shadow-xl transition duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productImages.length > 0 ? (
            <div className="relative w-full max-w-lg">
              <button
                onClick={handlePrevImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-300 to-gray-600 text-white px-2 py-1 rounded-md shadow-md hover:from-gray-500 hover:to-gray-800 transition duration-300"
              >
                ◀
              </button>
              <img
                src={`${API_URL}/images/600_${productImages[currentImageIndex]}`}
                alt={product.name}
                className="w-full h-auto max-h-[500px] object-contain rounded-lg animate-fadeIn"
              />
              <button
                onClick={handleNextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-600 to-gray-300 text-white px-2 py-1 rounded-md shadow-md hover:from-gray-800 hover:to-gray-500 transition duration-300"
              >
                ▶
              </button>
            </div>
          ) : (
            <div className="w-full h-80 flex items-center justify-center bg-gray-200 text-gray-500">
              Зображення відсутнє
            </div>
          )}

          <div>
            <h1 className="text-2xl font-caveat text-pink-700 font-bold">{product.name}</h1>
            <p className="text-gray-700 leading-6"><strong>Виробник:</strong> {product.manufacturer}</p>            
            <p className="text-gray-700 leading-6"><strong>Код:</strong> {product.code}</p>
            <p className="text-gray-700 leading-6"><strong>Ціна:</strong> {product.price} грн</p>

            <div className="flex items-center mt-4">
              <span className="mr-2">Кількість:</span>
              <button
                onClick={() => handleQuantityChange(-1)}
                className="bg-gradient-to-r from-gray-200 to-gray-400 px-3 py-1 rounded-md shadow-md hover:from-gray-400 hover:to-gray-500 transition duration-300"
              >
                -
              </button>
              <span className="mx-2">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className={`px-3 py-1 rounded-md shadow-md transition duration-300 ${isAddButtonDisabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-400 hover:to-gray-500'}`}
                disabled={isAddButtonDisabled}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-4 bg-gradient-to-r from-accent to-pink-500 text-white font-sans px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-pink-500 hover:to-pink-600 hover:shadow-xl hover:scale-105 transition duration-300 flex items-center justify-center"
            >
              <FaShoppingCart className="mr-2 w-5 h-5" />
              Купити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;