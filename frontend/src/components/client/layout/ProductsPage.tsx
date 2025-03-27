import { Link, useParams, useLocation } from "react-router-dom";
import { useGetProductsByCategoryIdQuery, useGetProductsBySubCategoryIdQuery } from "../../../services/productApi";
import { useGetSubCategoryBySlugQuery } from "../../../services/subcategoryApi";
import CategorySidebar from "./CategorySidebar";
import ProductFilter from "./ProductFilter";
import { API_URL } from "../../../env";
import { useDispatch } from "react-redux";
import { addToCart, CartItem } from "../../../interfaces/cart/cartSlice";
import { IProductItem, ProductsPageProps } from "../../../interfaces/products";
import { useEffect, useState } from "react";
import axios from "axios";
import bookmark from '../../../assets/images/bookmark.png';
import bookmarkWhite from '../../../assets/images/bookmark-white.png';
import { useGetCategoryBySlugQuery } from "../../../services/categoryApi";
import { FaHome, FaShoppingCart } from "react-icons/fa";

const ProductsPage: React.FC<ProductsPageProps> = ({ categorySlug, subCategorySlug }) => {
  const { slug, subslug } = useParams<{ slug?: string, subslug?: string }>();
  console.log("Slug", slug);
  console.log("SubSlug", subslug);
  const location = useLocation();

  const { data: category } = useGetCategoryBySlugQuery(slug ?? "", { skip: !slug });
  const { data: subCategory } = useGetSubCategoryBySlugQuery(subslug ?? "", { skip: !subslug });

  const categoryId = category?.id ?? null;
  const subCategoryId = subCategory?.id ?? null;

  const { data: products = [] } = categoryId
    ? useGetProductsByCategoryIdQuery(categoryId, { skip: !categoryId })
    : useGetProductsBySubCategoryIdQuery(subCategoryId ?? 0, { skip: !subCategoryId });

  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedQuantities, setSelectedQuantities] = useState<number[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [wishList, setWishList] = useState<number[]>([]);
  const isCategoryPage = location.pathname.includes(`/category/${categorySlug}`);
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [productQuantities, setProductQuantities] = useState<Record<number, number>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesManufacturer =
      selectedManufacturers.length === 0 || selectedManufacturers.includes(product.manufacturer);
    const matchesQuantity =
      selectedQuantities.length === 0 || selectedQuantities.includes(product.quantityInPack);
    const matchesSize = 
    selectedSizes.length === 0 || selectedSizes.includes(product.size);
    return matchesManufacturer && matchesQuantity && matchesSize;
  });

  const dispatch = useDispatch();

  const handleQuantityChange = (productId: number, increment: number) => {
    const product = products.find((p: IProductItem) => p.id === productId);
    if (!product) return;

    const currentQuantity = productQuantities[productId] || 1;
    const newQuantity = currentQuantity + increment;

    // Перевірка на мінімальну кількість
    if (newQuantity < 1) return;

    // Перевірка на максимальну кількість (quantityInStock)
    if (newQuantity > product.quantityInStock) {
      return; // Не дозволяємо збільшувати кількість, кнопка "+" буде неактивною
    }

    setErrorMessage(null);
    setProductQuantities(prev => ({
      ...prev,
      [productId]: newQuantity,
    }));
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = async (product: IProductItem) => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const quantity = productQuantities[product.id] || 1;

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
          images: product.images || [],
          quantityInStock: product.quantityInStock
        }));

        // ✅ Показати toast
        setToastMessage(`«${product.name}» доданий у кошик`);
        setTimeout(() => setToastMessage(null), 3000);

      } catch (error) {
        console.error(error.response?.data?.message || "Помилка додавання товару в кошик.");
      }
    } else {
      const cartItem: CartItem = {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
        images: product.images || [],
        quantityInStock: product.quantityInStock
      };

      dispatch(addToCart(cartItem));

      const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cartItems.find(item => item.productId === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartItems.push(cartItem);
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));

      // ✅ Показати toast для незареєстрованих
      setToastMessage(`«${product.name}» доданий у кошик`);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  useEffect(() => {
    const fetchWishList = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("accessToken");

      if (userId && token) {
        try {
          const response = await axios.get(`${API_URL}/api/WishList/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setWishList(response.data.map((item: any) => item.productId));
        } catch (error) {
          console.error("Помилка отримання вішліста", error);
        }
      }
    };

    fetchWishList();
  }, []);

  const toggleWishList = async (productId: number) => {
    const token = localStorage.getItem("accessToken");

    const product = products?.find(p => p.id === productId);

    if (!product) {
      console.error("Продукт не знайдено");
      return;
    }

    if (wishList.includes(productId)) {
      try {
        await axios.delete(`${API_URL}/api/WishList/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWishList(prev => prev.filter(id => id !== productId));
      } catch (error) {
        console.error("Помилка видалення з вішліста", error);
      }
    } else {
      if (!token) {
        alert("Авторизуйтесь, щоб додати в обране!");
        return;
      }

      try {
        const wishListItem = {
          productId: product.id,
          productName: product.name,
          productPrice: product.price,
          productImage: product.images[0]
        };

        await axios.post(
          `${API_URL}/api/WishList`,
          wishListItem,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWishList(prev => [...prev, productId]);
      } catch (error) {
        console.error("Помилка додавання до вішліста", error);
      }
    }
  };

  useEffect(() => {
    // Скидання фільтрів при зміні підкатегорії
    setSelectedManufacturers([]);
    setSelectedQuantities([]);
    setSelectedSizes([]);
  }, [location.pathname]);
  

  if (!products || products.length === 0) {
    return <div className="font-sans text-text">Продукти не знайдено.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 flex flex-col px-6">
      {!isCategoryPage && (
        <nav className="text-gray-600 mb-4 flex items-center font-sans">
          <Link to="/" className="hover:text-pink-500 transition duration-200">
            <FaHome className="inline-block mr-2 w-5 h-5 text-gray-600 hover:text-pink-500 transition duration-200" />
          </Link>
          {category?.name && (
            <>
              <span className="mx-2">/</span>
              <Link to={`/category/${categorySlug}`} className="hover:text-pink-500 transition duration-200">
                {category.name}
              </Link>
            </>
          )}
          {subCategory?.name && (
            <>
              <span className="mx-2">/</span>
              <Link to={`/subcategory/${subCategorySlug}/products`} className="hover:text-pink-500 transition duration-200">
                {subCategory.name}
              </Link>
            </>
          )}
        </nav>
      )}
      {toastMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-sans px-6 py-2 sm:px-4 sm:py-1 xs:px-3 xs:py-1 rounded-lg shadow-md hover:from-pink-500 hover:to-pink-600 hover:shadow-lg transition duration-300 z-50">
          {toastMessage}
        </div>
      )}

      {/* Повідомлення про помилку */}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}

      {/* Основний контент: Sidebar + Продукти */}
      <div className="flex flex-col sm:flex-row">
        {/* Sidebar */}
        {!isCategoryPage && (
          <div className="w-full sm:w-64 flex flex-col gap-4 mb-4 sm:mb-0">
            <CategorySidebar onCategoryChange={() => { }} />
            <ProductFilter
              products={products || []}
              selectedManufacturers={selectedManufacturers}
              setSelectedManufacturers={setSelectedManufacturers}
              selectedQuantities={selectedQuantities}
              setSelectedQuantities={setSelectedQuantities}
              selectedSizes={selectedSizes} // 🆕
              setSelectedSizes={setSelectedSizes} // 🆕
            />
          </div>
        )}

        {/* Основний контент */}
        <div className={isCategoryPage ? "w-full" : "flex-1 sm:ml-6"}>
        {!isCategoryPage && subCategory?.name && (
            <h2 className="text-xl font-caveat text-pink-700 mb-4">{subCategory.name}</h2>
          )}
          {/* Фільтрація продуктів */}
          {filteredProducts.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full">
            {filteredProducts.map((product: IProductItem) => {
              const currentQuantity = productQuantities[product.id] || 1;
              const isAddButtonDisabled = currentQuantity >= product.quantityInStock;

              return (
                <li
                  key={product.id}
                  className="relative bg-white shadow-md rounded-lg border border-pink-100 hover:border-pink-300 hover:shadow-xl transition duration-300 group"
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  <button
                    onClick={() => toggleWishList(product.id)}
                    className="absolute top-2 right-2 w-6 h-6 z-10"
                  >
                    <img
                      src={wishList.includes(product.id) ? bookmark : bookmarkWhite}
                      alt="bookmark"
                      className="w-full h-full object-contain"
                    />
                  </button>

                  <Link to={`/product/${product.slug}`} className="block">
                    <div className="w-full h-52 sm:h-60 md:h-64 bg-white flex items-center justify-center overflow-hidden">
                      <img
                        src={`${API_URL}/images/600_${product.images[0]}`}
                        alt={product.name}
                        className="object-contain h-full w-full p-4"
                      />
                    </div>
                    <div className="p-3">
                      <h2 className="text-md font-sans text-gray-700 text-center">{product.name}</h2>
                      <p className="text-center text-sm text-gray-600">Розмір: {product.size}</p>
                      <p className="text-center font-bold text-pink-500 mt-1">{product.price} грн</p>
                    </div>
                  </Link>

                  {hoveredProductId === product.id && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-600 bg-opacity-75 text-white px-2 py-3 transition-all duration-300 ease-in-out flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="bg-gradient-to-r from-gray-200 to-gray-400 px-2 py-1 rounded-md shadow-md hover:from-gray-400 hover:to-gray-500 transition duration-300"
                        >
                          -
                        </button>
                        <span className="mx-2">{currentQuantity}</span>
                        <button
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className={`px-2 py-1 rounded-md shadow-md transition duration-300 ${isAddButtonDisabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-400 hover:to-gray-500'}`}
                          disabled={isAddButtonDisabled}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-gradient-to-r from-accent to-pink-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:from-pink-500 hover:to-pink-600 hover:shadow-xl transition duration-300 w-full sm:w-auto flex items-center justify-center"
                      >
                        <FaShoppingCart className="mr-2 w-5 h-5" />
                        Купити
                      </button>
                    </div>
                  )}
                </li>
              );
              })}
            </ul>
          ) : (
            <p className="text-gray-700 mt-4 font-sans">Немає продуктів, які відповідають фільтрам.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;